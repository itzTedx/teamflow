import { init, Organizations, organization_user } from "@kinde/management-api-js";
import { KindeOrganization } from "@kinde-oss/kinde-auth-nextjs";
import { asc, eq } from "drizzle-orm";
import z from "zod";

import { heavyWriteSecurity } from "@/middleware/arcject/heavy-write";
import { standardSecurity } from "@/middleware/arcject/standard";
import { requireAuth } from "@/middleware/auth";
import { base } from "@/middleware/base";
import { requireWorkspace } from "@/middleware/workspace";
import { channelSchema } from "@/schema/channel";

import { db } from "../db";
import { type Channel, channelTable } from "../schema";

export const createChannel = base
  .use(requireAuth)
  .use(requireWorkspace)
  .use(standardSecurity)
  .use(heavyWriteSecurity)
  .route({ method: "POST", path: "/channels", summary: "Create a new channel", tags: ["channel"] })
  .input(channelSchema)
  .output(z.custom<Channel>())
  .handler(async ({ input, context }) => {
    const [channel] = await db
      .insert(channelTable)
      .values({
        name: input.name,
        workspaceId: context.workspace.orgCode,
        createdById: context.user.id,
      })
      .returning();

    return channel;
  });

export const listChannels = base
  .use(requireAuth)
  .use(requireWorkspace)
  .route({ method: "GET", path: "/channels", summary: "List all channels", tags: ["channel"] })
  .input(z.void())
  .output(
    z.object({
      channels: z.array(z.custom<Channel>()),
      members: z.array(z.custom<organization_user>()),
      currentWorkspace: z.custom<KindeOrganization<unknown>>(),
    })
  )
  .handler(async ({ context }) => {
    const [channels, members] = await Promise.all([
      db.query.channelTable.findMany({
        where: eq(channelTable.workspaceId, context.workspace.orgCode),
        orderBy: [asc(channelTable.createdAt)],
      }),
      (async () => {
        init();

        const usersInOrg = await Organizations.getOrganizationUsers({
          orgCode: context.workspace.orgCode,
          sort: "name_asc",
        });

        return usersInOrg.organization_users ?? [];
      })(),
    ]);

    return {
      channels,
      members,
      currentWorkspace: context.workspace,
    };
  });

export const getChannelById = base
  .use(requireAuth)
  .use(requireWorkspace)
  .route({ method: "GET", path: "/channels/:id", summary: "Get a channel by ID", tags: ["channel"] })
  .input(z.object({ id: z.string() }))
  .output(z.custom<Channel>())
  .handler(async ({ input, errors }) => {
    const channel = await db.query.channelTable.findFirst({
      where: eq(channelTable.id, input.id),
    });
    if (!channel) {
      throw errors.NOT_FOUND();
    }
    return channel;
  });
