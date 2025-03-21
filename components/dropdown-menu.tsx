"use client";

import { useState} from "react";

export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);


  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block">
      <div onClick={toggleDropdown}>{children}</div>

      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 1
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 2
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Option 3
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
