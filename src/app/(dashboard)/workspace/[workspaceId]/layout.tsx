import { ChevronDown } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import { ChannelList } from "./_components/channel-list";
import { CreateChannel } from "./_components/create-channel";
import { WorkspaceHeader } from "./_components/workspace-header";
import { WorkspaceMembersList } from "./_components/workspace-members-list";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-full w-80 flex-col border-r bg-secondary">
        <div className="flex h-14 items-center border-b px-4">
          <WorkspaceHeader />
        </div>
        <div className="w-full px-4 py-2">
          <CreateChannel />
        </div>

        {/* Channel List */}
        <div className="flex-1 overflow-y-auto px-4">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1 font-medium text-muted-foreground text-sm transition-[color] hover:text-accent-foreground">
              Main
              <ChevronDown className="size-3" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ChannelList />
            </CollapsibleContent>
          </Collapsible>
        </div>
        <div className="border-t px-4 py-2">
          <Collapsible defaultOpen>
            <CollapsibleTrigger className="flex w-full items-center justify-between px-2 py-1 font-medium text-muted-foreground text-sm transition-[color] hover:text-accent-foreground">
              Members
              <ChevronDown className="size-3" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <WorkspaceMembersList />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
      {children}
    </>
  );
}
