import { relations, sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { shops } from "./shops";

export const users = sqliteTable(
  "user",
  {
    id: integer("id").primaryKey().notNull(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    image: text("image"),
    role: text("role").$type<Role>().default("customer").notNull(),
    createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => {
    return {
      emailUnique: uniqueIndex("user_email_unique").on(table.email),
    };
  },
);

export const userRelations = relations(users, ({ many }) => ({
  shops: many(shops),
}));

export type Role = "admin" | "owner" | "customer";

export type User = typeof users.$inferSelect; // return type when queried
export type InsertUser = typeof users.$inferInsert; // insert type
