"use client";

import { useRef, useState } from "react";

export default function TrashPanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  function handleClose(e: React.MouseEvent) {
    e.stopPropagation();
    setIsOpen(false);
  }

  return (
    <div className="w-full ">
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>

      {isOpen && (
        <div>Popover</div>
      )}
    </div>
  );
}
