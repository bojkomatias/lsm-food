import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { shops } from "./shops";
import { relations, sql } from "drizzle-orm";

export const reviews = sqliteTable("review", {
  id: integer("id").primaryKey(),
  qualification: integer("qualification").$type<1 | 2 | 3 | 4 | 5>().notNull(),
  comment: text("comment"),
  shop: integer("business_id").notNull(),
  created: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const reviewRelations = relations(reviews, ({ one }) => ({
  shop: one(shops, { fields: [reviews.shop], references: [shops.id] }),
}));

export type Review = typeof reviews.$inferSelect; // return type when queried
export type InsertReview = typeof reviews.$inferInsert; // insert type
