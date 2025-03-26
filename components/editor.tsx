"use client";

import { updateDocument } from "@/lib/action";
import { useEdgeStore } from "@/lib/edgestore";
import { documentsTable } from "@/lib/schema";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export default function Editor({
  document,
  preview
}: {
  document: typeof documentsTable.$inferSelect;
  preview?: boolean
}) {
  const { edgestore } = useEdgeStore();
  const editor = useCreateBlockNote({
    initialContent: document.content ? JSON.parse(document.content) : undefined,
    uploadFile: handleUpload,
    
  });
  async function handleUpload(file: File) {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  }
  async function onChangeDocument() {
    const blocks = JSON.stringify(editor.document, null, 2);
    await updateDocument(document.id, undefined, blocks);
  }
  return (
    <BlockNoteView
      onChange={onChangeDocument}
      theme={"light"}
      editor={editor}
      editable={!preview}
    />
  );
}
