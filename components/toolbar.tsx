"use client";

import { documentsTable } from "@/lib/schema";
import IconPicker from "./icon-picker";
import { Image, Smile, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { updateDocument } from "@/lib/action";
import { useSWRConfig } from "swr";
import CoverImageModal from "./cover-modal";
import { supabase } from "@/lib/supabase";

export default function Toolbar({
  initialData,
  preview,
}: {
  initialData: typeof documentsTable.$inferSelect;
  preview?: boolean;
}) {
  const { mutate } = useSWRConfig();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);
  const [cover, setIsCover] = useState<string | null>(initialData.coverImage);
  const [icon, setIcon] = useState<string | null>(initialData.icon); // Explicitly allow null

  useEffect(() => {
    const channel = supabase
      .channel(`realtimew`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "documents",
          filter: `id=eq.${initialData.id}`,
        },
        (payload) => {
          const updatedDoc = payload.new as typeof documentsTable.$inferSelect;
          if (updatedDoc.icon !== undefined && updatedDoc.icon !== icon)
            setIcon(updatedDoc.icon);
          if (updatedDoc.title !== undefined && updatedDoc.title !== value)
            setValue(updatedDoc.title);
          if (
            updatedDoc.coverImage !== undefined &&
            updatedDoc.coverImage !== value
          ) {
            setIsCover(updatedDoc.coverImage);
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [initialData]);

  function enableInput() {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  }

  function disableInput() {
    setIsEditing(false);
  }

  async function onInput(value: string) {
    setValue(value || "Untitled");
    await updateDocument(initialData.id, value || "Untitled");
    await Promise.all([
      mutate("/api/documents"),
      mutate(`/api/documents/${initialData.parentDocument}`),
    ]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  }

  async function changeEmoji(newIcon: string) {
    try {
      setIcon(newIcon || null); // Optimistically set the new icon (or null if removing)
      await updateDocument(
        initialData.id,
        undefined,
        undefined,
        undefined,
        newIcon || null
      ).then(() => mutate("/api/documents"));
    } catch (error) {
      console.error("Failed to update icon:", error);
      setIcon(initialData.icon); // Revert to initial value on error
    }
  }

  return (
    <div className="pl-[54px] group/toolbar">
      {!!icon && !preview && (
        <div className="flex items-center gap-x-2 pt-6 group/icon">
          <IconPicker onChange={changeEmoji}>
            <p className="text-6xl hover:opacity-75 transition select-none">
              {icon}
            </p>
          </IconPicker>
          <button
            onClick={() => changeEmoji("")} // Remove icon by setting it to empty string/null
            className="group-hover/icon:opacity-100 opacity-0 p-2 rounded-md hover:bg-neutral-300"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {!!icon && preview && <p className="text-6xl pt-6">{icon}</p>}

      <div className="mt-5">
        <div className="flex">
          {!icon && !preview && (
            <IconPicker onChange={changeEmoji}>
              <button className="cursor-pointer flex gap-1 items-center text-sm hover:bg-neutral-200/90 rounded-md p-2">
                <Smile className="size-5" />
                Add icon
              </button>
            </IconPicker>
          )}

          {!cover && !preview && (
            <CoverImageModal>
              <button className="cursor-pointer flex gap-1 items-center text-sm hover:bg-neutral-200/90 rounded-md p-2">
                <Image className="size-5" />
                Add cover
              </button>
            </CoverImageModal>
          )}
        </div>
      </div>

      {/* Title */}
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onKeyDown={onKeyDown}
          onBlur={disableInput}
          className="text-5xl mt-5 bg-transparent font-bold break-words outline-none text-[#3F3F3F] resize-none"
          value={value}
          onChange={(e) => onInput(e.target.value)}
        />
      ) : (
        <div
          onClick={enableInput}
          className="text-5xl mt-5 font-bold break-words outline-none text-[#3F3F3F]"
        >
          {value}
        </div>
      )}
    </div>
  );
}
