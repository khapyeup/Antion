"use client";

import clsx from "clsx";
import { ChevronsLeft, ChevronsRight, Home, Plus, Trash } from "lucide-react";
import { useRef, useState } from "react";
import UserItems from "./user-item";
import { createDocument } from "@/lib/action";
import { toast } from "sonner";
import Documents from "./documents";
import { useSWRConfig } from "swr";
import Link from "next/link";
import TrashPanel from "@/components/trash";

export default function Navigation() {
  const asideRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [collapsed, setCollapsed] = useState(false);
  const { mutate } = useSWRConfig();

  function handleResize(e: React.MouseEvent) {
    e.preventDefault();

    function handleMove(e: MouseEvent) {
      if (
        asideRef.current &&
        divRef.current &&
        e.clientX >= 208 &&
        e.clientX <= 350
      ) {
        asideRef.current.style.setProperty("width", `${e.clientX}px`);
        divRef.current.style.setProperty("left", `${e.clientX}px`);
      }
    }

    function handleUp() {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  }

  function handleCollapse() {
    if (asideRef.current && divRef.current && !collapsed) {
      setCollapsed(true);

      asideRef.current.style.setProperty("width", "0px");
      divRef.current.style.setProperty("left", "0px");
    } else if (asideRef.current && divRef.current && collapsed) {
      setCollapsed(false);
      asideRef.current.style.removeProperty("width");
      divRef.current.style.removeProperty("left");
    }
  }

  async function handleCreateDocument() {
    const promise = createDocument("Untiled", null).then(() => {
      mutate("/api/documents");
    });
    toast.promise(promise, {
      loading: "Creating document...",
      success: "Document created",
      error: "Error",
    });
  }

  return (
    <>
      <aside
        ref={asideRef}
        className={clsx(
          "w-full sm:w-60 group/sidebar h-full overflow-y-scroll max-h-screen bg-gray-100 relative flex flex-col z-[99] transition-all duration-300 ease-in-out"
        )}
      >
        <div className="flex items-center justify-between  p-2  rounded-md hover:bg-neutral-200">
          <UserItems />

          <ChevronsLeft
            onClick={handleCollapse}
            className="opacity-100 sm:opacity-0 cursor-pointer group-hover/sidebar:opacity-100  size-5  hover:bg-neutral-200 hover:text-black rounded-md text-gray-500 "
          />
        </div>

        <Link
          href="/documents"
          className="flex gap-2 items-center cursor-pointer p-2 hover:bg-neutral-200"
        >
          <Home className="size-5  text-neutral-500 " />
          <p className=" text-neutral-500 text-sm">Home</p>
        </Link>

        <div className="">
          <div className="flex justify-between items-center p-2 hover:bg-neutral-200">
            <label className="text-sm text-neutral-500">Private</label>
            <Plus
              onClick={handleCreateDocument}
              className="size-5 cursor-pointer text-neutral-500 hover:text-black hover:bg-neutral-300 rounded-sm"
            />
          </div>

          <Documents parentDocument={null} level={0} />
          <TrashPanel>
            <div className="flex gap-2 items-center cursor-pointer p-2 hover:bg-neutral-200">
              <Trash className="size-5  text-neutral-500 " />
              <p className="text-sm text-neutral-500">Trash</p>
            </div>
          </TrashPanel>
        </div>
        <div
          onMouseDown={handleResize}
          className="opacity-0 group-hover/sidebar:opacity-100 w-1 transition top-0 bg-gray-300 h-full cursor-e-resize absolute right-0"
        />
      </aside>
      <div
        ref={divRef}
        className="absolute z-[99999] left-0 sm:left-60 top-0 transition-all ease-in-out"
      >
        <ChevronsRight
          onClick={handleCollapse}
          className={`${
            collapsed ? "block" : "hidden"
          }  cursor-pointer size-8 p-2 hover:bg-gray-200 hover:text-black rounded-md text-neutral-800 `}
        />
      </div>
    </>
  );
}
