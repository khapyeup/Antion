"use client";

import { restoreDocument } from "@/lib/action";
import { useSWRConfig } from "swr";

export default function Banner({ id }: { id: string }) {
  const { mutate } = useSWRConfig();
  return (
    <div className="bg-red-400 text-white h-12 w-full select-none text-sm flex items-center justify-center gap-2">
      <label>This page has been moved to trash</label>
      <button
        onClick={() => {
          restoreDocument(id).then(() => {mutate("/api/documents"); mutate('/api/trash')});
        }}
        className="outline outline-white py-1 px-2 rounded-md cursor-pointer "
      >
        Restore
      </button>
      <button className="outline outline-white py-1 px-2 rounded-md cursor-pointer ">
        Delete from trash
      </button>
    </div>
  );
}
