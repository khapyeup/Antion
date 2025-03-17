"use client";

import Dialog from "@/components/dialog";
import { useTrash } from "@/hooks/useTrash";
import { restoreDocument } from "@/lib/action";
import { File, Trash, Undo2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

export default function TrashPanel() {
    const { data: trashItems, isLoading } = useTrash();
  const [isTrashOpen, setIsTrashOpen] = useState(false);

  async function handleRestoreTrashItem(id: string) {
    const promise = restoreDocument(id).then(() => {
      
    });
    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored",
      error: "Error",
    });
    mutate("/api/documents");
      mutate("/api/trash");
  }
  

  return (
    <>
      <div>
        <div
          onClick={() => setIsTrashOpen(true)}
          className="flex gap-2 items-center cursor-pointer p-2 hover:bg-neutral-200"
        >
          <Trash className="size-5  text-neutral-500 " />
          <p className=" text-neutral-500 text-sm">Trash</p>
        </div>
        <Dialog
          isOpen={isTrashOpen}
          onClose={() => setIsTrashOpen(false)}
          title="Trash"
        >
          <div className="flex flex-col  min-w-[180px] max-w-[calc(-24px + 100vw)] max-h-[500px]  ">
            <input
              placeholder="Search pages in trash"
              className="w-full h-7 bg-neutral-100 rounded-md mb-4 outline-neutral-300 outline px-2 py-1.5"
            />
            <div className="overflow-y-auto flex flex-col gap-1">
              {trashItems?.length > 0 ? (
                trashItems.map((item: { id: string; title: string }) => (
                  <div
                    className="flex gap-2 hover:bg-neutral-200 p-2 rounded-md cursor-pointer items-center"
                    key={item.id}
                  >
                    <div>
                      <File className="size-5" />
                    </div>
                    <div className="overflow-hidden flex-1">{item.title}</div>
                    <div className="flex gap-3">
                      <Undo2
                        onClick={() => handleRestoreTrashItem(item.id)}
                        className="size-5"
                      />
                      <Trash className="size-5" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  Trash items will be displayed here!
                </div>
              )}
            </div>
          </div>
        </Dialog>
        ;
      </div>
    </>
  );
}
