import Image from "next/image";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MessageItemProps {
  message: string;
  createdAt: Date;
  createdBy: {
    id: number;
    name: string;
    avatar: string;
  };
}

export const MessageItem = ({ message, createdAt, createdBy }: MessageItemProps) => {
  return (
    <div className="group relative flex gap-3 rounded-lg p-2 hover:bg-muted/50">
      <Avatar className="relative rounded-lg">
        <Image alt={`${createdBy.name}'s Avatar`} height={32} src={createdBy.avatar} width={32} />
        <AvatarFallback>{createdBy.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1 space-y-1">
        <div className="flex items-center gap-x-2">
          <p className="flex items-center gap-x-2 font-medium leading-none">{createdBy.name}</p>
          <p className="text-muted-foreground text-sm">
            {new Intl.DateTimeFormat("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(createdAt)}{" "}
            {new Intl.DateTimeFormat("en-GB", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            }).format(createdAt)}
          </p>
        </div>
        <p className="wrap-break-words max-w-none text-sm">{message}</p>
      </div>
    </div>
  );
};
