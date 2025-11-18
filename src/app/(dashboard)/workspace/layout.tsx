import { orpc } from "@/lib/orpc/client";
import { getQueryClient, HydrateClient } from "@/lib/query/hydration";

import { UserNav } from "./_components/user-nav";
import { WorkspaceList } from "./_components/workspace-list";

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(orpc.workspace.list.queryOptions());

  return (
    <div className="flex h-screen w-full">
      <div className="flex h-full w-16 flex-col items-center border-r bg-secondary px-2 py-3">
        <HydrateClient client={queryClient}>
          <WorkspaceList />
        </HydrateClient>

        <div className="mt-auto">
          <HydrateClient client={queryClient}>
            <UserNav />
          </HydrateClient>
        </div>
      </div>
      {children}
    </div>
  );
}
