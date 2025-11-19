import { useQuery } from "@tanstack/react-query";

import { orpc } from "@/lib/orpc/client";

import { MessageItem } from "./message/message-item";
import { MessageListSkeleton } from "./message/message-list-skeleton";

export const MessageList = ({ channelId }: { channelId: string }) => {
  const { data: messages, isLoading } = useQuery(orpc.message.list.queryOptions({ input: { channelId } }));

  if (isLoading) {
    return <MessageListSkeleton />;
  }

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto px-4">
        {messages?.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
};
