import { redirect } from "next/navigation";

import { MessageCircleIcon } from "lucide-react";

import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";

import { client } from "@/lib/orpc/client";

import { CreateChannel } from "./_components/create-channel";

interface Props {
  params: Promise<{ workspaceId: string }>;
}

export default async function WorkspacePage({ params }: Props) {
  const { workspaceId } = await params;
  const { channels } = await client.channel.list();

  if (channels.length > 0) {
    return redirect(`/workspace/${workspaceId}/channel/${channels[0].id}`);
  }

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <MessageCircleIcon />
        </EmptyMedia>
        <EmptyTitle>No Channels Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any channels yet. Get started by creating your first channel.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <CreateChannel className="w-auto" />
      </EmptyContent>
    </Empty>
  );
}
