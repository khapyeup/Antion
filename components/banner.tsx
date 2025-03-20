"use client";

import { removeForever, restoreDocument } from "@/lib/action";
import { useSWRConfig } from "swr";

export default function Banner({ id }: { id: string }) {
  const { mutate } = useSWRConfig();
  return (
    <div className="bg-red-400 text-white h-12 w-full select-none text-sm flex items-center justify-center gap-2">
      <label>This page moved to trash</label>
      <button
        onClick={() => {
          restoreDocument(id).then(() => {
            mutate("/api/documents");
            mutate("/api/trash");
          });
        }}
        className="text-sm outline outline-white py-1 px-2 rounded-md cursor-pointer "
      >
        Restore
      </button>
      <button
        onClick={() => {
          removeForever(id).then(() => mutate("/api/trash"));
        }}
        className=" text-sm outline outline-white py-1 px-2 rounded-md cursor-pointer "
      >
        Delete from trash
      </button>
    </div>
  );
}
