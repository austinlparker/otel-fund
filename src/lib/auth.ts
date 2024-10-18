import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { trace, Exception } from "@opentelemetry/api";

const tracer = trace.getTracer("auth");

export const { handlers, signIn, signOut, auth } = NextAuth({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  adapter: PrismaAdapter(prisma) as any,
  trustHost: true,
  providers: [GitHub],
  callbacks: {
    async session({ session, user }) {
      return tracer.startActiveSpan("session-callback", async (span) => {
        try {
          span.setAttribute("user.id", user.id);
          if (session.user) {
            session.user.id = user.id;
            session.user.isAdmin = user.isAdmin || false;
          }
          span.setAttribute("session.isAdmin", session.user?.isAdmin || false);
          return session;
        } finally {
          span.end();
        }
      });
    },
    async signIn({ user, account, profile }) {
      return tracer.startActiveSpan("signIn-callback", async (span) => {
        try {
          span.setAttribute("user.email", user.email || "unknown");
          span.setAttribute("account.provider", account?.provider || "unknown");

          console.log("Sign In Attempt:", { user, account, profile });

          if (user.email === "austin@ap2.io") {
            try {
              const updatedUser = await tracer.startActiveSpan(
                "update-admin-user",
                async (updateSpan) => {
                  try {
                    // Check if user.email is not null or undefined
                    if (user.email) {
                      const result = await prisma.user.update({
                        where: { email: user.email },
                        data: { isAdmin: true },
                      });
                      updateSpan.setAttribute("update.success", true);
                      console.log("Updated user:", result);
                      return result;
                    } else {
                      throw new Error("User email is null or undefined");
                    }
                  } catch (error) {
                    updateSpan.setAttribute("update.success", false);
                    updateSpan.recordException(error as Exception);
                    console.error("Error updating user:", error);
                    throw error;
                  } finally {
                    updateSpan.end();
                  }
                },
              );
              span.setAttribute("user.isAdmin", updatedUser.isAdmin);
            } catch (error) {
              span.recordException(error as Exception);
            }
          }

          return true;
        } finally {
          span.end();
        }
      });
    },
  },
});
