import { WorkspaceList } from "./_components/workspace-list";

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <div className="flex h-full w-16 flex-col items-center border-r bg-secondary px-2 py-3">
        <WorkspaceList />
      </div>
      {children}
    </div>
  );
}
