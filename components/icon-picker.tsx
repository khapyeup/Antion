"use client";

import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export default function IconPicker({
  children,
  onChange,
}: {
  children: React.ReactNode;
  onChange: (icon: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} className="fixed inset-0" />
          <div className="absolute ">
            <EmojiPicker height={350} onEmojiClick={(data) => onChange(data.emoji)}/>
          </div>
        </>
      )}
    </div>
  );
}
