"use client";

import { documentsTable } from "@/lib/schema";
import IconPicker from "./icon-picker";
import { Image, Smile, X } from "lucide-react";
import { useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { updateDocument } from "@/lib/action";
import { useSWRConfig } from "swr";

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

  function enableInput() {
    if (preview) {
      return;
    }
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
    await mutate("/api/documents");
    await mutate(`/api/documents/${initialData.parentDocument}`);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      disableInput();
    }
  }

  async function changeEmoji(icon: string) {
    await updateDocument(
      initialData.id,
      undefined,
      undefined,
      undefined,
      icon
    ).then(() => mutate(`/api/documents/details/${initialData.id}`));
  }

  return (
    <div className="pl-[54px] group/toolbar pt-30 ">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 pt-6 group/icon ">
          <IconPicker onChange={changeEmoji}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <button
            onClick={() => {}}
            className="group-hover/icon:opacity-100 opacity-0 p-2 rounded-md hover:bg-neutral-300"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      <div className="opacity-0 group-hover/toolbar:opacity-100 mt-5">
        <div className="flex">
          {!initialData.icon && !preview && (
            <IconPicker onChange={changeEmoji}>
              <button className=" cursor-pointer flex gap-1 items-center text-sm hover:bg-neutral-200/90 rounded-md p-2">
                <Smile className="size-5" />
                Add icon
              </button>
            </IconPicker>
          )}

          {!initialData.coverImage && !preview && (
            <button className="cursor-pointer flex gap-1 items-center text-sm hover:bg-neutral-200/90 rounded-md p-2">
              <Image className="size-5" />
              Add cover
            </button>
          )}
        </div>
      </div>

      {/*Title */}
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
          {initialData.title}
        </div>
      )}
    </div>
  );
}
