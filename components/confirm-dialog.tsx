"use client";

import Dialog from "@/components/dialog";
import { useState } from "react";

export default function ConfirmDialog({
  children,
  onConfirm,
}: {
  children: React.ReactNode;
  onConfirm: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Dialog
        isOpen={isOpen}
        title="Are  you sure?"
        onClose={() => setIsOpen(false)}
      >
        <div>You cannot go back so think carefully</div>
        <div className="mt-6 flex gap-4">
          <button
            className="outline outline-neutral-300 rounded-md  px-4 py-1.5 cursor-pointer hover:bg-gray-200 hover:text-black transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-100 text-red-700 outline outline-red-500 rounded-md px-4 py-1.5 cursor-pointer hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </Dialog>
    </div>
  );
}
