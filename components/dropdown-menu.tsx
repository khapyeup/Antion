"use client";

import { useState} from "react";

export default function Dropdown({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);


  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative z-[9999999999] inline-block">
      <div className="select-none px-2 py-1 hover:bg-neutral-200 rounded-md" onClick={toggleDropdown}>{children}</div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Delete
            </li>
            
          </ul>
        </div>
      )}
    </div>
  );
}
