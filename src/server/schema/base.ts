import { timestamp } from "drizzle-orm/pg-core";

export const baseSchema = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};
