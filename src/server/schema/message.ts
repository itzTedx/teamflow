import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { channelTable } from "./channel";

export const messageTable = pgTable(
  "messages",
  {
    id: uuid().primaryKey().defaultRandom(),
    content: text().notNull(),
    imageUrl: text("image_url"),

    authorId: text("author_id").notNull(),
    authorEmail: text("author_email").notNull(),
    authorName: text("author_name").notNull(),
    authorAvatar: text("author_avatar").notNull(),

    channelId: uuid("channel_id")
      .references(() => channelTable.id)
      .notNull(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("messages_author_id_idx").on(table.authorId),
    index("messages_author_email_idx").on(table.authorEmail),
    index("messages_channel_id_idx").on(table.channelId),
  ]
);

export const messageRelations = relations(messageTable, ({ one }) => ({
  channel: one(channelTable, {
    fields: [messageTable.channelId],
    references: [channelTable.id],
  }),
}));

export type Message = typeof messageTable.$inferSelect;
