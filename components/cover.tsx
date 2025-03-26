"use client";

import { updateDocument } from "@/lib/action";
import { documentsTable } from "@/lib/schema";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import CoverImageModal from "./cover-modal";
import { useEdgeStore } from "@/lib/edgestore";

export default function Cover({
  document,
  preview,
}: {
  document: typeof documentsTable.$inferSelect;
  preview?: boolean
}) {
  const [cover, setCover] = useState(document.coverImage);
  const { edgestore } = useEdgeStore();

  function handleRemove() {
    updateDocument(document.id, undefined, undefined, null).then(async () => {
      if (cover) {
        await edgestore.publicFiles.delete({ url: cover });
      }
    });
  }

  useEffect(() => {
    const channel = supabase
      .channel(`realtime`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "documents",
          filter: `id=eq.${document.id}`,
        },
        (payload) => {
          const updatedDoc = payload.new as typeof documentsTable.$inferSelect;

          setCover(updatedDoc.coverImage);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [document]);

  return (
    <div className={`${cover ? "h-[35vh]" : "h-[12vh]"} relative group/modify`}>
      {cover && <img className="h-full w-full object-cover" src={cover} alt="cover"/>}
      {cover && !preview && (
        <div className="absolute left-1/2 top-[32px] flex gap-2 opacity-0 group-hover/modify:opacity-100">
          <CoverImageModal urlCoverImage={cover}>
            <button className="px-2 py-1 bg-neutral-200 rounded-md hover:bg-neutral-300">
              Change cover
            </button>
          </CoverImageModal>
          <button
            onClick={handleRemove}
            className="px-2 py-1 bg-neutral-200 rounded-md hover:bg-neutral-300"
          >
            Remove cover
          </button>
        </div>
      )}
    </div>
  );
}
