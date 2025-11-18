import { KindeOrganization, KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";

import { requireAuth } from "@/middleware/auth";
import { base } from "@/middleware/base";
import { requireWorkspace } from "@/middleware/workspace";

export const listWorkspaces = base
  .use(requireAuth)
  .use(requireWorkspace)
  .route({ method: "GET", path: "/workspace", summary: "List all workspaces", tags: ["workspace"] })
  .input(z.void())
  .output(
    z.object({
      workspaces: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          avatar: z.string(),
        })
      ),
      user: z.custom<KindeUser<Record<string, unknown>> | null>(),
      currentOrganization: z.custom<KindeOrganization<unknown> | null>(),
    })
  )
  .handler(async ({ context, errors }) => {
    const { getUserOrganizations } = getKindeServerSession();
    const organizations = await getUserOrganizations();

    if (!organizations) {
      throw errors.FORBIDDEN();
    }

    const workspaces = organizations?.orgs.map((org) => ({
      id: org.code,
      name: org.name ?? "My workspace",
      avatar: org.name?.charAt(0).toUpperCase() ?? "M",
    }));

    return {
      workspaces,
      user: context.user,
      currentOrganization: context.workspace,
    };
  });
