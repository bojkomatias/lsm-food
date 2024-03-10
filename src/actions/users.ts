"use server";

import { db } from "@/db";
import { InsertUser, users } from "@/db/schema/users";

export async function findUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
}

export async function createUser(newUser: InsertUser) {
  return await db.insert(users).values(newUser);
}
