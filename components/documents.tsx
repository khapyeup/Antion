"use client";

import { createDocument, deleteDocument } from "@/lib/action";
import { File, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DocumentSkeleton from "@/components/document-skeletion";
import { useDocument } from "@/hooks/useDocument";
import { useChildDocument } from "@/hooks/useChildDocument";
import { useSWRConfig } from "swr";

export default function Documents({
  parentDocument,
  level,
}: {
  parentDocument: string | null;
  level: number;
}) {
  const { isLoading, data } = parentDocument ?  useChildDocument(parentDocument) : useDocument();
  if (isLoading) {
    return <DocumentSkeleton />;
  }

  return (
    <div className={`w-full`}>
      <div
        style={{ paddingLeft: level === 0 ? "8px" : `${12 * level}px` }}
        className={`w-full p-1 text-neutral-500 hidden last:block`}
      >
        No page inside
      </div>
      {data.map(
        (item: {
          id: string;
          title: string;
          parentDocument: string | null;
        }) => (
          <Document
            key={item.id}
            id={item.id}
            title={item.title}
            level={level}
            parentDocument={parentDocument}
          />
        )
      )}
    </div>
  );
}

function Document({
  id,
  title,
  level,
  parentDocument,
}: {
  id: string;
  title: string;
  level: number;
  parentDocument: string | null
}) {
  const [expanded, setIsExpanded] = useState(false);
  const {mutate} = useSWRConfig();
  
  function handleExpand() {
    setIsExpanded(!expanded);
  }

  async function handleCreateDocument(e: React.MouseEvent) {
    e.stopPropagation();
    
    const promise = createDocument("Untitled", id).then(() => {
      mutate(`/api/documents/${id}`)
      if (!expanded) {
        setIsExpanded(true);
      }
    });

    toast.promise(promise, {
      loading: "Creating document...",
      success: "Document created",
      error: "Error",
    });
  }

  async function handleDeleteDocument(e: React.MouseEvent) {
    e.stopPropagation();
    const promise = deleteDocument(id);

    toast.promise(promise, {
      loading: "Deleting...",
      success: (result) => {
        if (result.success) {
          mutate(parentDocument ?  `/api/documents/${parentDocument}` : `/api/documents` )
          return "Document moved to trash successfully";
        }
        throw new Error(result.error);
      },
      error: (err) => {
        return err instanceof Error ? err.message : "Failed to delete document";
      },
    });
  }

  return (
    <>
      <div
        onClick={handleExpand}
        style={{ paddingLeft: level === 0 ? `8px` : `${15 * level}px` }}
        className="group/item flex items-center p-1 justify-between min-h-7 cursor-pointer text-neutral-600 hover:bg-neutral-200"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <File className="size-5" />
          <span>{title}</span>
        </div>
        <div className="flex gap-2 items-center">
          <Trash
            onClick={handleDeleteDocument}
            className="sm:group-hover/item:block sm:hidden size-4 hover:bg-neutral-300 hover:text-red-500"
          />
          <Plus
            onClick={handleCreateDocument}
            className="size-5 hover:bg-neutral-300 hover:text-black"
          />
        </div>
      </div>

      {expanded && <Documents parentDocument={id} level={level + 1} />}
    </>
  );
}
