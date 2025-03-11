"use client";

import { useSession } from "next-auth/react";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { logout } from "@/lib/action";

export default function UserItems() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div
    
      className="flex relative items-center text-sm  w-full gap-x-2 cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      {session?.user?.image ? (
        <img
          className="size-6"
          src={session?.user?.image || undefined}
          alt="Avatar"
        />
      ) : (
        <div className="size-6 bg-neutral-300 flex justify-center items-center">
          A
        </div>
      )}

      <span>{session?.user?.name} </span>
      <ChevronDown className="text-gray-500 size-3.5" />

      {/* Dropdown Menu */}
      {open && (
        <ul className="absolute top-full outline bg-white outline-neutral-300 p-1 rounded-md shadow-lg w-full ">
          <li  className="p-1.5 text-neutral-500">{session?.user?.email}</li>
          <li className="p-1.5">
            <div className="w-full h-0.5 bg-neutral-400"></div>
          </li>
          <li
            className="p-1.5 text-neutral-500 hover:bg-neutral-200"
            onClick={logout}
          >
            Sign out
          </li>
        </ul>
      )}
    </div>
  );
}
