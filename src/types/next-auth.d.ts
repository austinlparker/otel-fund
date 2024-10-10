import "next-auth";
import { User as PrismaUser } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: PrismaUser & {
      isAdmin?: boolean;
    };
  }

  interface User extends PrismaUser {
    isAdmin?: boolean;
  }
}
