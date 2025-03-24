"use client";

import { useState } from "react";
import Dialog from "./dialog";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { updateDocument } from "@/lib/action";
import { useParams } from "next/navigation";
import { documentsTable } from "@/lib/schema";

export default function CoverImageModal({
  children,
  urlCoverImage,
}: {
  children: React.ReactNode;
  urlCoverImage: string | undefined;
}) {
  const { slug } = useParams<{ slug: string }>();
  const [file, setFile] = useState<File>();
  const [isOpen, setIsOpen] = useState(false);
  const [isSumitting, setIsSumitting] = useState(false);
  const { edgestore } = useEdgeStore();

  function onClose() {
    setIsOpen(false);
    setFile(undefined);
    setIsSumitting(false);
  }

  async function onChange(file?: File) {
    if (file) {
      setFile(file);
      setIsSumitting(true);
      
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: urlCoverImage,
        },
      });

      await updateDocument(slug, undefined, undefined, res.url);
      onClose();
    }
  }

  return (
    <div>
      <div onClick={() => setIsOpen(true)}>{children}</div>
      <Dialog isOpen={isOpen} onClose={onClose} title="Cover image">
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSumitting}
          value={file}
          onChange={onChange}
        />
      </Dialog>
    </div>
  );
}
