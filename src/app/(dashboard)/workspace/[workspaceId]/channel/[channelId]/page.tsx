"use client";

import { useParams } from "next/navigation";

import { ChannelHeader } from "./_components/channel-header";
import { MessageInputForm } from "./_components/message/message-input-form";
import { MessageList } from "./_components/message-list";

export default function ChannelPage() {
  const { channelId } = useParams<{ channelId: string }>();

  return (
    <main className="flex h-screen w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <ChannelHeader channelId={channelId} />
        <div className="my-4 flex-1 overflow-hidden">
          <MessageList channelId={channelId} />
        </div>

        <div className="border-t bg-background p-4">
          <MessageInputForm channelId={channelId} />
        </div>
      </div>
    </main>
  );
}
