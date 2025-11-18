"use client";

import Image from "next/image";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { getAvatar } from "@/lib/avatar";
import { orpc } from "@/lib/orpc/client";

export const WorkspaceMembersList = () => {
  const {
    data: { members },
  } = useSuspenseQuery(orpc.channel.list.queryOptions());
  return (
    <div className="space-y-0.5 py-1">
      {members.map((member) => (
        <div className="flex items-center gap-2" key={member.id}>
          <Avatar className="relative size-8">
            <Image alt={member.full_name ?? ""} fill src={getAvatar(member.email ?? "", member.picture)} />
            <AvatarFallback>{member.full_name?.charAt(0).toUpperCase() ?? "M"}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-sm">{member.full_name}</p>
            <p className="truncate text-muted-foreground text-xs">{member.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
