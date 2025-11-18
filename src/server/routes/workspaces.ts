import { os } from "@orpc/server";
import { z } from "zod";

export const listWorkspaces = os
  .route({ method: "GET", path: "/rpc/workspace", summary: "List all workspaces", tags: ["workspace"] })
  .input(z.void())
  .output(z.array(z.object({ id: z.number(), name: z.string() })))
  .handler(async ({ input }) => {
    return [
      { id: 1, name: "Workspace 1" },
      { id: 2, name: "Workspace 2" },
      { id: 3, name: "Workspace 3" },
    ];
  });

export const getWorkspace = os
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.number().int().min(0).default(0),
    })
  )
  .handler(async ({ input }) => {
    // your list code here
    return [{ id: 1, name: "name" }];
  });
