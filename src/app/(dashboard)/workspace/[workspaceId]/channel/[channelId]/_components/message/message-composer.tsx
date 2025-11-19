import { ImageIcon, Send } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

import { Editor } from "@/components/rich-text-editor/editor";
import { Button } from "@/components/ui/button";

import { MessageType } from "@/schema/message";

interface MessageComposerProps {
  field: ControllerRenderProps<MessageType, "content">;
  disabled?: boolean;
}
export const MessageComposer = ({ field, disabled }: MessageComposerProps) => {
  return (
    <>
      <Editor
        field={field}
        footer={
          <Button disabled={disabled} size="sm" type="button" variant="outline">
            <ImageIcon className="mr-1 size-4" /> Attach
          </Button>
        }
        sendButton={
          <Button disabled={disabled} size="sm" type="submit">
            <Send className="mr-1 size-4" />
            Send
          </Button>
        }
      />
    </>
  );
};
