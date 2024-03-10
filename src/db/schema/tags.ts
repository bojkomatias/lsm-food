import { relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { shops } from "./shops";
import { products } from "./products";

export const tags = sqliteTable(
  "tag",
  {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("tag_name_unique").on(table.name),
    };
  }
);

export const tagRelations = relations(tags, ({ many }) => ({
  tagToShop: many(tagToShops),
  tagToProducts: many(tagToProducts),
}));

export const tagToShops = sqliteTable(
  "tag_to_business",
  {
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
    shopId: integer("business_id")
      .notNull()
      .references(() => shops.id),
  },
  (t) => ({
    pk: primaryKey(t.shopId, t.tagId),
  })
);

export const tagToShopRelations = relations(tagToShops, ({ one }) => ({
  tag: one(tags, { fields: [tagToShops.tagId], references: [tags.id] }),
  shop: one(shops, { fields: [tagToShops.shopId], references: [shops.id] }),
}));

export const tagToProducts = sqliteTable(
  "tag_to_product",
  {
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),

    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
  },
  (t) => ({
    pk: primaryKey(t.productId, t.tagId),
  })
);

export const tagToProductRelations = relations(tagToProducts, ({ one }) => ({
  tag: one(tags, { fields: [tagToProducts.tagId], references: [tags.id] }),
  product: one(products, {
    fields: [tagToProducts.productId],
    references: [products.id],
  }),
}));

export type Tag = typeof tags.$inferSelect; // return type when queried
export type InsertTag = typeof tags.$inferInsert; // insert type
