import { createUser, findUserByEmail } from "@/actions/users";
import { db } from "@/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
  throw "No AUTH ENV Variables defined";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => {
      if (!user || !user.email) return false;
      const userExist = await findUserByEmail(user.email);
      if (userExist) return true;
      await createUser({
        name: user.name!,
        email: user.email,
        image: user.image,
        role: "customer",
      });
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user && user.email) {
        const userFromDb = await findUserByEmail(user.email);
        if (userFromDb) token.user = userFromDb;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
