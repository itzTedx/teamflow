"use client";

import Link from "next/link";

import { useSuspenseQuery } from "@tanstack/react-query";
import { Hash } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import { orpc } from "@/lib/orpc/client";
import { cn } from "@/lib/utils";

export const ChannelList = () => {
  const {
    data: { channels },
  } = useSuspenseQuery(orpc.channel.list.queryOptions());

  return (
    <div className="space-y-0.5 py-1">
      {channels.map((channel) => (
        <Link
          className={buttonVariants({
            variant: "ghost",
            className: cn(
              "h-7 w-full justify-start px-2 py-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            ),
          })}
          href={"#"}
          key={channel.id}
        >
          <Hash className="size-4" />
          <span className="truncate">{channel.name}</span>
        </Link>
      ))}
    </div>
  );
};
