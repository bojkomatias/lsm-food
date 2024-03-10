import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { relations, sql } from "drizzle-orm";
import { shopHours } from "./shop-hours";
import { reviews } from "./reviews";
import { tagToShops, tags } from "./tags";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const shops = sqliteTable(
  "business",
  {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    phone: text("phone").notNull(),
    instagram: text("instagram").notNull(),
    address: text("address").notNull(),
    location: text("location"),
    image: text("image"),
    // Tags are virtual, but we can still store them here as a helper
    tags: text("tags").$type<string[]>().notNull(),
    // Modality is also virtual
    modality: text("modality").$type<string[]>().notNull(),
    featured: integer("featured", { mode: "boolean" }).default(false),
    enabled: integer("enabled", { mode: "boolean" }).default(false),
    owner: integer("user_id").notNull(),
    createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("shop_name_unique").on(table.name),
    };
  },
);

export const shopRelations = relations(shops, ({ one, many }) => ({
  owner: one(users, { fields: [shops.owner], references: [users.id] }),
  shopHours: many(shopHours),
  reviews: many(reviews),
  tagToShops: many(tagToShops),
}));

export type Shop = typeof shops.$inferSelect; // return type when queried
export type InsertShop = typeof shops.$inferInsert; // insert type

export const insertShopSchema = createInsertSchema(shops, {
  tags: z.string().array(),
  modality: z.string().array(),
});
