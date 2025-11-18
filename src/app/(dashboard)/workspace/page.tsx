import { client } from "@/lib/orpc/client";

export default async function WorkspacePage() {
  const workspaces = await client.workspace.list();

  return <div>WorkspacePage</div>;
}
