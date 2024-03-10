import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";

import { relations, sql } from "drizzle-orm";
import { shops } from "./shops";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const shopHours = sqliteTable("business_hours", {
  shop: integer("business_id").notNull(),
  day: integer("day").notNull(),
  opens: text("opens").notNull(),
  closes: text("closes").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const shopHoursRelation = relations(shopHours, ({ one }) => ({
  shop: one(shops, { fields: [shopHours.shop], references: [shops.id] }),
}));

export type ShopHours = typeof shopHours.$inferSelect; // return type when queried
export type InsertShopHours = typeof shopHours.$inferInsert; // insert type

export const insertShopHoursSchema = z.object({
  shopHours: createInsertSchema(shopHours, {
    day: z.coerce.number(),
    shop: z.coerce.number(),
  }).array(),
});
