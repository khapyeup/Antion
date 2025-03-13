"use client";

import { createDocument } from "@/lib/action";
import { File, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import DocumentSkeleton from "@/components/document-skeletion";
import { useDocument } from "@/hooks/useDocument";
import Link from "next/link";

export default function Documents({
  parentDocument,
  level,
}: {
  parentDocument: string | null;
  level: number;
}) {
  const { isLoading, data } = useDocument(parentDocument);
  if (isLoading) {
    return <DocumentSkeleton />;
  }
  if (data.length === 0) {
    return (
      <div
        style={{ paddingLeft: level === 0 ? '8px' :`${12 * level}px` }}
        className="w-full p-1 text-neutral-500"
      >
        No page inside
      </div>
    );
  }
  return (
    <div className={`w-full`}>
      {data.map((item: { id: string; title: string }) => (
        <Document key={item.id} id={item.id} title={item.title} level={level} />
      ))}
    </div>
  );
}

function Document({
  id,
  title,
  level,
}: {
  id: string;
  title: string;
  level: number;
}) {
  const [expanded, setIsExpanded] = useState(false);
  const { mutate } = useDocument(id);

  function handleExpand() {
    setIsExpanded(!expanded);
  }

  async function handleCreateDocument() {
    const promise = createDocument("Untitled", id).then(() => {
      mutate();
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

  return (
    <>
      <Link href={`/documents/${id}`}>
        <div
          onClick={handleExpand}
          style={{ paddingLeft: level === 0 ? `8px` : `${15 * level}px` }}
          className="flex items-center p-1 justify-between min-h-7 cursor-pointer text-neutral-600 hover:bg-neutral-200"
        >
          <div className="flex items-center gap-2 flex-wrap">
            <File className="size-5" />
            <span>{title}</span>
          </div>
          <Plus
            onClick={handleCreateDocument}
            className="size-5 hover:bg-neutral-300 hover:text-black"
          />
        </div>
      </Link>

      {expanded && <Documents parentDocument={id} level={level + 1} />}
    </>
  );
}
