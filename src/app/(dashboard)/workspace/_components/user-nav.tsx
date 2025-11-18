"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { getAvatar } from "@/lib/avatar";
import { orpc } from "@/lib/orpc/client";

export function UserNav() {
  const {
    data: { user },
  } = useSuspenseQuery(orpc.workspace.list.queryOptions());

  if (!user) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-12 rounded-xl border-border/50 bg-background/50 transition-all duration-200 hover:rounded-lg hover:bg-accent hover:text-accent-foreground"
          size="icon"
          variant="outline"
        >
          <Avatar>
            <AvatarImage alt="User avatar" src={getAvatar(user.email ?? "", user.picture)} />
            <AvatarFallback>{user.given_name?.charAt(0).toUpperCase() ?? "CN"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" sideOffset={12}>
        Hello
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
