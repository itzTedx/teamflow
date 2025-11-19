import { useQuery } from "@tanstack/react-query";
import { Hash } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Skeleton } from "@/components/ui/skeleton";

import { orpc } from "@/lib/orpc/client";

export const ChannelHeader = ({ channelId }: { channelId: string }) => {
  const { data: channel, isLoading } = useQuery(
    orpc.channel.getById.queryOptions({
      input: { id: channelId },
    })
  );
  return (
    <div className="flex h-14 items-center justify-between border-b px-4">
      <span className="flex items-center gap-2">
        <Hash className="size-4" />
        {isLoading ? <Skeleton className="h-4 w-24" /> : <h1 className="font-semibold text-lg">{channel?.name}</h1>}
      </span>

      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
};
