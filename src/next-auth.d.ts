import { type DefaultSession } from "next-auth";
import { User } from "./db/schema/users";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User & DefaultSession["user"];
  }
}
