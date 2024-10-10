import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [GitHub],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.isAdmin || false;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      console.log("Sign In Attempt:", { user, account, profile });
      if (user.email === "austin@ap2.io") {
        try {
          const updatedUser = await prisma.user.update({
            where: { email: user.email },
            data: { isAdmin: true },
          });
          console.log("Updated user:", updatedUser);
        } catch (error) {
          console.error("Error updating user:", error);
        }
      }
      return true;
    },
  },
});
