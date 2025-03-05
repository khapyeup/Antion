"use client";

import { ChevronsLeft } from "lucide-react";
import { MouseEventHandler, useRef, useState } from "react";

export default function Navigation() {
  const asideRef = useRef<HTMLDivElement>(null);
  const divResizeRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(300);

  console.log(isResizing)
  function handleResize() {
    setIsResizing(true);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(e: MouseEvent) {
    
    if (isResizing && asideRef.current) {
        console.log("hello")
      setWidth((prev) => prev + e.movementX);
    }
  }

  function handleMouseUp() {
    setIsResizing(false);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }
  return (
    <>
      <aside
        ref={asideRef}
        style={{ width: `${width}px` }}
        className={`group/sidebar  h-full overflow-y-auto flex flex-col group/sidebar relative px-1 min-w-auto`}
      >
        <div className="flex items-center justify-between p-1 hover:bg-gray-100 rounded-md">
          Workspace
          <ChevronsLeft className="opacity-0 group-hover/sidebar:opacity-100 size-8 p-2 hover:bg-gray-200 hover:text-black rounded-md text-gray-500" />
        </div>
        <div>
          <span>Private</span>
        </div>
        <div
          onMouseDown={handleResize}
          ref={divResizeRef}
          className="opacity-0 group-hover/sidebar:opacity-100 w-1 bg-gray-300 h-full cursor-e-resize absolute right-0"
        ></div>
      </aside>
    </>
  );
}
