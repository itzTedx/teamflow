import { ChevronDown } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { orpc } from "@/lib/orpc/client";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";

import { ChannelList } from "./_components/channel-list";
import { CreateChannel } from "./_components/create-channel";
import { WorkspaceHeader } from "./_components/workspace-header";
import { WorkspaceMembersList } from "./_components/workspace-members-list";

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.channel.list.queryOptions());

  return (
    <>
      <div className="flex h-full w-80 flex-col border-r bg-secondary">
        <div className="flex h-14 items-center border-b px-4">
          <HydrateClient client={queryClient}>
            <WorkspaceHeader />
          </HydrateClient>
        </div>
        <div className="w-full px-4 py-2">
          <CreateChannel />
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto px-4">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1 font-medium text-muted-foreground text-sm transition-[color] hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180">
              Main
              <ChevronDown className="size-3 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <HydrateClient client={queryClient}>
                <ChannelList />
              </HydrateClient>
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="border-t px-4 py-2">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1 font-medium text-muted-foreground text-sm transition-[color] hover:text-accent-foreground [&[data-state=open]>svg]:rotate-180">
              Members
              <ChevronDown className="size-3 transition-transform" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <HydrateClient client={queryClient}>
                <WorkspaceMembersList />
              </HydrateClient>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      {children}
    </>
  );
}
