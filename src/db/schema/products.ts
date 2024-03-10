import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { tagToProducts } from "./tags";

export const products = sqliteTable("product", {
  id: integer("id").primaryKey().notNull(),
  name: text("name").notNull(),
  description: text("description"),
  basePrice: real("base_price"),
  images: text("images"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  shop: integer("business_id").notNull(),
  createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const productRelations = relations(products, ({ one, many }) => ({
  tagToProduct: many(tagToProducts),
}));

export type SelectProduct = typeof products.$inferSelect; // return type when queried
export type InsertProduct = typeof products.$inferInsert; // insert type
