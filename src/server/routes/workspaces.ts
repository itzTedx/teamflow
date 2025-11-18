import { init, Organizations } from "@kinde/management-api-js";
import { KindeOrganization, KindeUser } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { z } from "zod";

import { heavyWriteSecurity } from "@/middleware/arcject/heavy-write";
import { standardSecurity } from "@/middleware/arcject/standard";
import { requireAuth } from "@/middleware/auth";
import { base } from "@/middleware/base";
import { requireWorkspace } from "@/middleware/workspace";
import { workspaceSchema } from "@/schema/workspace";

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
      currentWorkspace: z.custom<KindeOrganization<unknown> | null>(),
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
      currentWorkspace: context.workspace,
    };
  });

export const createWorkspace = base
  .use(requireAuth)
  .use(requireWorkspace)
  .use(standardSecurity)
  .use(heavyWriteSecurity)
  .route({ method: "POST", path: "/workspace", summary: "Create a new workspace", tags: ["workspace"] })
  .input(workspaceSchema)
  .output(
    z.object({
      orgCode: z.string(),
      workspaceName: z.string(),
    })
  )
  .handler(async ({ input, context, errors }) => {
    init();

    let data;

    try {
      data = await Organizations.createOrganization({
        requestBody: {
          name: input.name,
        },
      });
    } catch {
      throw errors.FORBIDDEN();
    }

    if (!data.organization?.code) {
      throw errors.FORBIDDEN({
        message: "Org code is not defined",
      });
    }

    try {
      await Organizations.addOrganizationUsers({
        orgCode: data.organization.code,
        requestBody: {
          users: [
            {
              id: context.user.id,
              roles: ["admin"],
            },
          ],
        },
      });
    } catch {
      throw errors.FORBIDDEN();
    }

    const { refreshTokens } = getKindeServerSession();

    await refreshTokens();

    return {
      orgCode: data.organization.code,
      workspaceName: input.name,
    };
  });
