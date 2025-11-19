"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { ControllerRenderProps } from "react-hook-form";

import { MessageType } from "@/schema/message";

import { editorExtensions } from "./extensions";
import { MenuBar } from "./menu-bar";

interface EditorProps {
  field: ControllerRenderProps<MessageType, "content">;
  sendButton: React.ReactNode;
  footer?: React.ReactNode;
}

export const Editor = ({ field, sendButton, footer }: EditorProps) => {
  const editor = useEditor({
    extensions: editorExtensions,
    content: (() => {
      if (!field.value) return "";
      try {
        return JSON.parse(field.value);
      } catch {
        return "";
      }
    })(),
    onUpdate: ({ editor }) => {
      if (field.onChange) {
        field.onChange(JSON.stringify(editor.getJSON()));
      }
    },
    onBlur: () => {
      if (field.onBlur) {
        field.onBlur();
      }
    },

    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "max-w-none min-h-[125px] focus:outline-none p-4 !w-full prose prose-stone dark:prose-invert marker:text-primary",
      },
    },
  });

  return (
    <div className="relative flex w-full max-w-none flex-col overflow-hidden rounded-lg border border-input dark:bg-input/30">
      <MenuBar editor={editor} />
      <EditorContent className="max-h-[200px] overflow-y-auto" editor={editor} ref={field.ref} />
      <div className="flex items-center justify-between gap-2 border-input border-t bg-card px-3 py-2">
        <div className="flex min-h-8 items-center">{footer}</div>
        <div className="shrink-0">{sendButton}</div>
      </div>
    </div>
  );
};
