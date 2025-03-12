"use client";

import { createDocument } from "@/lib/action";
import { File, Plus } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Documents({parentDocument, level} : {parentDocument: string | null, level: number}) {
  const { data, isLoading } = useSWR(`/api/documents${parentDocument ? `?parentDocument=${parentDocument}` : ''}`, fetcher);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full" style={{paddingLeft: `${12 * level}px`}}>
      {data.map((item) => (
        <Document key={item.id} id={item.id} title={item.title} level={0} />
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

  function handleExpand() {
    setIsExpanded(!expanded);
  }
  return (
    <>
      <div
        onClick={handleExpand}
        className="flex items-center justify-between min-h-7 p-2 cursor-pointer text-neutral-600 hover:bg-neutral-200"
      >
        <div className="flex items-center gap-2 flex-wrap">
          <File className="size-5" />
          <span>{title}</span>
        </div>
        <Plus
          onClick={() => createDocument("Untitled", id)}
          className="size-5 hover:bg-neutral-300"
        />
      </div>
      {expanded && <Documents parentDocument={id} level={level + 1}/>}
    </>
  );
}
