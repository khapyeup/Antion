"use client";

import { documentsTable } from "@/lib/schema";
import IconPicker from "./icon-picker";
import { Image, Smile } from "lucide-react";

export default function Toolbar({
  initialData,
  preview,
}: {
  initialData: typeof documentsTable.$inferSelect;
  preview?: boolean;
}) {
  return (
    <div className="flex group/toolbar pt-30 px-4">
      {!!initialData.icon && !preview && <div></div>}

      <div className="hidden group-hover/toolbar:block">
        <div className="flex">
          {!initialData.icon && !preview}
          {
            <IconPicker onChange={(icon) => {console.log(icon)}}>
              <button className=" cursor-pointer flex gap-1 items-center text-sm hover:bg-neutral-200/90 rounded-md p-2">
                <Smile className="size-5" />
                Add icon
              </button>
            </IconPicker>
          }
          {!initialData.coverImage && !preview}
          {
            <button className="cursor-pointer flex gap-1 items-center text-sm hover:bg-neutral-200/90 rounded-md p-2">
              <Image className="size-5" />
              Add cover
            </button>
          }
        </div>
      </div>
    </div>
  );
}
