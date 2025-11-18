import { CreateChannel } from "./_components/create-channel";
import { WorkspaceHeader } from "./_components/workspace-header";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex h-full w-80 flex-col border-r bg-secondary">
        <div className="flex h-14 items-center border-b px-4">
          <WorkspaceHeader />
        </div>
        <div className="px-4 py-2">
          <CreateChannel />
        </div>
      </div>
      {children}
    </>
  );
}
