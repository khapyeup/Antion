"use client";

import { useOrigin } from "@/hooks/useOrigin";
import { updateDocument } from "@/lib/action";
import { useState } from "react";
import { toast } from "sonner";
import Dialog from "./dialog";
import { documentsTable } from "@/lib/schema";

export default function Publish({
  document,
}: {
  document: typeof documentsTable.$inferSelect;
}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [coppied, setCoppied] = useState(false);
  const origin = useOrigin();
  const url = `${origin}/preview/${document.id}`;
  async function onPublish() {
    
    const promise = updateDocument(
      document.id,
      undefined,
      undefined,
      undefined,
      undefined,
      true
    )
    toast.promise(promise, {
      loading: "Publishing...",
      success: "Published",
      error: "Failed to publish",
    });
  }
  function onUnpublish() {
    
    const promise = updateDocument(
      document.id,
      undefined,
      undefined,
      undefined,
      undefined,
      false
    )
    toast.promise(promise, {
      loading: "Updating...",
      success: "Change to private successfully",
      error: "Failed to update settings",
    });
  }
  function onCopy() {
    navigator.clipboard.writeText(url);
    setCoppied(true);

    setTimeout(() => {
      setCoppied(false);
    }, 1000);
  }

  return (
    <div>
      <button
        className="hover:bg-neutral-200 px-2 py-1 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Publish
      </button>
      <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="Publish">
        <p className="text-sm text-red-400 mb-2">
          Need to refresh the page to apply changes
        </p>
        {document.isPuplished ? (
          <div>
            <h2 className="mb-2">This page was published</h2>
            <div className="flex gap-2 mb-2">
              <input
                readOnly
                value={url}
                className="flex-1 px-2 py-1 outline outline-neutral-300 rounded-md"
              />
              <button onClick={onCopy} className="bg-black text-white px-2 py-1 rounded-md text-sm"><span>{coppied ? 'Coppied' : 'Copy URL'}</span></button>
            </div>

            <button
              onClick={onUnpublish}
              className=" w-full bg-neutral-200 rounded-md px-2 py-1 hover:bg-neutral-300"
            >
              Change to private
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={onPublish}
              className="hover:bg-neutral-200 px-2 py-1 rounded-md w-full"
            >
              Publish
            </button>
          </div>
        )}
      </Dialog>
    </div>
  );
}
