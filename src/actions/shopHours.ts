"use server";
import { db } from "@/db";
import { InsertShopHours, shopHours } from "@/db/schema/shop-hours";
import { eq } from "drizzle-orm";

export async function upsertBusinessHours(newShopHours: InsertShopHours[]) {
  return await db.transaction(async (tx) => {
    await tx.delete(shopHours).where(eq(shopHours.shop, newShopHours[0].shop));
    return await tx
      .insert(shopHours)
      .values(newShopHours)
      .returning({ id: shopHours.shop });
  });
}
