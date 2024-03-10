import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as shop from "./schema/shops";
import * as shopHours from "./schema/shop-hours";
import * as review from "./schema/reviews";
import * as tag from "./schema/tags";
import * as product from "./schema/products";
import * as user from "./schema/users";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client, {
  schema: { ...shop, ...shopHours, ...review, ...tag, ...product, ...user },
});
