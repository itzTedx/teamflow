import Image from "next/image";

import { SafeContent } from "@/components/rich-text-editor/safe-content";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { getAvatar } from "@/lib/avatar";
import { Message } from "@/server/schema";

interface MessageItemProps {
  message: Message;
}

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <div className="group relative flex gap-3 rounded-lg p-2 hover:bg-muted/50">
      <Avatar className="relative rounded-lg">
        <Image
          alt={`${message.authorName}'s Avatar`}
          height={32}
          src={getAvatar(message.authorEmail, message.authorAvatar)}
          width={32}
        />
        <AvatarFallback>{message.authorName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-x-2">
          <p className="flex items-center gap-x-2 font-medium leading-none">{message.authorName}</p>
          <p className="text-muted-foreground text-sm">
            {new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(message.createdAt)}{" "}
            {new Intl.DateTimeFormat("en-GB", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            }).format(message.createdAt)}
          </p>
        </div>
        <SafeContent content={JSON.parse(message.content)} />
      </div>
    </div>
  );
};
