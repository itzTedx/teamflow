import { Editor, useEditorState } from "@tiptap/react";
import type { LucideIcon } from "lucide-react";
import { BoldIcon, Code, Italic, List, ListOrdered, Redo, Strikethrough, Underline, Undo } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Toggle } from "../ui/toggle";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface MenuBarProps {
  editor: Editor | null;
}

export const MenuBar = ({ editor }: MenuBarProps) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      if (!editor) return null;

      return {
        isBold: editor.isActive("bold"),
        isItalic: editor.isActive("italic"),
        isUnderline: editor.isActive("underline"),
        isStrike: editor.isActive("strike"),
        isCodeBlock: editor.isActive("codeBlock"),
        isBulletList: editor.isActive("bulletList"),
        isOrderedList: editor.isActive("orderedList"),
        canUndo: editor.can().undo(),
        canRedo: editor.can().redo(),
      };
    },
  });
  if (!editor) return null;

  return (
    <div className="not-prose flex flex-wrap items-center gap-1 rounded-t-lg border-input border-b bg-card px-2 py-0.5">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          <MenuBarToggle
            command={() => editor.chain().focus().toggleBold().run()}
            icon={BoldIcon}
            isActive={editorState?.isBold}
            label="Bold"
          />
          <MenuBarToggle
            command={() => editor.chain().focus().toggleItalic().run()}
            icon={Italic}
            isActive={editorState?.isItalic}
            label="Italic"
          />
          <MenuBarToggle
            command={() => editor.chain().focus().toggleUnderline().run()}
            icon={Underline}
            isActive={editorState?.isUnderline}
            label="Underline"
          />
          <MenuBarToggle
            command={() => editor.chain().focus().toggleStrike().run()}
            icon={Strikethrough}
            isActive={editorState?.isStrike}
            label="Strike"
          />
          <MenuBarToggle
            command={() => editor.chain().focus().toggleCodeBlock().run()}
            icon={Code}
            isActive={editorState?.isCodeBlock}
            label="Code Block"
          />
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-wrap gap-1">
          <MenuBarToggle
            command={() => editor.chain().focus().toggleBulletList().run()}
            icon={List}
            isActive={editorState?.isBulletList}
            label="Bullet List"
          />
          <MenuBarToggle
            command={() => editor.chain().focus().toggleOrderedList().run()}
            icon={ListOrdered}
            isActive={editorState?.isOrderedList}
            label="Numbered List"
          />
        </div>
        <div className="ml-auto flex flex-wrap gap-1">
          <MenuBarButton
            command={() => editor.chain().focus().undo().run()}
            disabled={!editorState?.canUndo}
            icon={Undo}
            label="Undo"
          />
          <MenuBarButton
            command={() => editor.chain().focus().redo().run()}
            disabled={!editorState?.canRedo}
            icon={Redo}
            label="Redo"
          />
        </div>
      </TooltipProvider>
    </div>
  );
};

interface MenuBarToggleProps {
  command: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label: string;
}

function MenuBarToggle({ command, isActive, icon: Icon, label }: MenuBarToggleProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Toggle
          className={cn(isActive && "bg-muted text-muted-foreground", "cursor-pointer")}
          onPressedChange={command}
          pressed={isActive ?? false}
          size="sm"
        >
          <Icon className="size-3" />
        </Toggle>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface MenuBarButtonProps {
  command: () => void;
  icon: LucideIcon;
  label: string;
  disabled?: boolean;
}

function MenuBarButton({ command, icon: Icon, label, disabled }: MenuBarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button disabled={disabled} onClick={command} size="sm" type="button" variant="ghost">
          <Icon className="size-3" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
