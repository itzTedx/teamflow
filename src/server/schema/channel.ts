import { relations } from "drizzle-orm";
import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { messageTable } from "./message";

export const channelTable = pgTable(
  "channels",
  {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),

    workspaceId: text("workspace_id").notNull(),
    createdById: text("created_by_id").notNull(),

    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("channels_workspace_id_idx").on(table.workspaceId), index("name_idx").on(table.name)]
);

export const channelRelations = relations(channelTable, ({ many }) => ({
  messages: many(messageTable),
}));

export type Channel = typeof channelTable.$inferSelect;
