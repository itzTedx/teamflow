import { and, desc, eq } from "drizzle-orm";
import z from "zod";

import { getAvatar } from "@/lib/avatar";
import { readSecurity } from "@/middleware/arcject/read";
import { standardSecurity } from "@/middleware/arcject/standard";
import { writeSecurity } from "@/middleware/arcject/write";
import { requireAuth } from "@/middleware/auth";
import { base } from "@/middleware/base";
import { requireWorkspace } from "@/middleware/workspace";
import { messageSchema } from "@/schema/message";

import { db } from "../db";
import { channelTable, Message, messageTable } from "../schema";

export const createMessage = base
  .use(requireAuth)
  .use(requireWorkspace)
  .use(standardSecurity)
  .use(writeSecurity)
  .route({ method: "POST", path: "/messages", summary: "Create a new message", tags: ["message"] })
  .input(messageSchema)
  .output(z.custom<Message>())
  .handler(async ({ input, context, errors }) => {
    // Verify the channel belongs to the workspace and the user is a member of the workspace
    const channel = await db.query.channelTable.findFirst({
      where: and(eq(channelTable.id, input.channelId), eq(channelTable.workspaceId, context.workspace.orgCode)),
    });

    if (!channel) {
      throw errors.FORBIDDEN();
    }
    const [created] = await db
      .insert(messageTable)
      .values({
        content: input.content,
        imageUrl: input.imageUrl,
        channelId: input.channelId,
        authorId: context.user.id,
        authorEmail: context.user.email!,
        authorName: context.user.given_name ?? "John Doe",
        authorAvatar: getAvatar(context.user.email!, context.user.picture),
      })
      .returning();

    return created;
  });

export const listMessages = base
  .use(requireAuth)
  .use(requireWorkspace)
  .use(standardSecurity)
  .use(readSecurity)
  .route({ method: "GET", path: "/messages", summary: "List all messages", tags: ["message"] })
  .input(z.object({ channelId: z.string() }))
  .output(z.array(z.custom<Message>()))
  .handler(async ({ input, context, errors }) => {
    // Verify the channel belongs to the workspace and the user is a member of the workspace
    const channel = await db.query.channelTable.findFirst({
      where: and(eq(channelTable.id, input.channelId), eq(channelTable.workspaceId, context.workspace.orgCode)),
    });
    if (!channel) {
      throw errors.NOT_FOUND();
    }

    // Get the messages for the channel
    const messages = await db.query.messageTable.findMany({
      where: eq(messageTable.channelId, input.channelId),
      orderBy: [desc(messageTable.createdAt)],
    });

    // Return the messages
    return messages;
  });
