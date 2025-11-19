import { and, desc, eq, lt, or } from "drizzle-orm";
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
  .input(
    z.object({
      channelId: z.string(),
      limit: z.number().min(1).max(100).optional(),
      cursor: z.string().optional(),
    })
  )
  .output(
    z.object({
      items: z.array(z.custom<Message>()),
      nextCursor: z.string().optional(),
    })
  )
  .handler(async ({ input, context, errors }) => {
    // Verify the channel belongs to the workspace and the user is a member of the workspace
    const channel = await db.query.channelTable.findFirst({
      where: and(eq(channelTable.id, input.channelId), eq(channelTable.workspaceId, context.workspace.orgCode)),
    });
    if (!channel) {
      throw errors.NOT_FOUND();
    }

    // Define the default limit
    const limit = input.limit ?? 30;

    // Build where clause for cursor-based pagination
    const baseWhere = eq(messageTable.channelId, input.channelId);

    let whereClause = baseWhere;

    if (input.cursor) {
      // Fetch the cursor message to get its createdAt timestamp
      const cursorMessage = await db.query.messageTable.findFirst({
        where: eq(messageTable.id, input.cursor),
      });

      if (cursorMessage) {
        // For descending order, get messages created before the cursor message
        // or with same timestamp but different id (for tie-breaking)
        const cursorCondition = or(
          lt(messageTable.createdAt, cursorMessage.createdAt),
          and(eq(messageTable.createdAt, cursorMessage.createdAt), lt(messageTable.id, cursorMessage.id))
        );
        const combinedWhere = and(baseWhere, cursorCondition);
        if (combinedWhere) {
          whereClause = combinedWhere;
        }
      }
    }

    // Get the messages for the channel
    const messages = await db.query.messageTable.findMany({
      where: whereClause,
      orderBy: [desc(messageTable.createdAt), desc(messageTable.id)],
      limit: limit + 1, // Fetch one extra to determine if there's a next page
    });

    // Determine if there's a next page and get the next cursor
    const hasNextPage = messages.length > limit;
    const items = hasNextPage ? messages.slice(0, limit) : messages;
    const nextCursor = hasNextPage ? items[items.length - 1]?.id : undefined;

    return {
      items,
      nextCursor,
    };
  });
