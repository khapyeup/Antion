"use client";

import { updateDocument } from "@/lib/action";
import { documentsTable } from "@/lib/schema";
import { useSWRConfig } from "swr";

type Document = typeof documentsTable.$inferSelect;

export default function Title({ document }: { document: Document }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(document.title || "Untitled");
  const { mutate } = useSWRConfig();

  function enableInput() {
    setIsEditing(true);
  }
  function disableInput() {
    setIsEditing(false);
  }
  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value || "Untitled";
    setTitle(newTitle);

    await updateDocument(document.id, newTitle);

    // Revalidate the SWR cache for the document
    mutate(`/api/documents/${document.parentDocument}`);
    mutate("/api/documents");
  }
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      disableInput();
    }
  }

  return (
    <div className="flex items-center gap-x-1">
      <div>
        {isEditing ? (
          <input
            value={title}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            className="h-7 px-2 outline outline-neutral-300 rounded-md"
          />
        ) : (
          <button
            onClick={enableInput}
            className="text-sm px-2 py-1 hover:bg-neutral-200 rounded-md cursor-pointer"
          >
            {title}
          </button>
        )}
      </div>
    </div>
  );
}
