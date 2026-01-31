import type { YogaInitialContext } from "graphql-yoga";
import { prisma } from "./prisma";

export type Role = "ADMIN" | "EMPLOYEE";

export interface Context {
  prisma: typeof prisma;
  role: Role;
}

export function createContext({ request }: YogaInitialContext): Context {
  const roleHeader = request.headers.get("x-role");

  const role: Role =
    roleHeader === "ADMIN" || roleHeader === "EMPLOYEE"
      ? roleHeader
      : "EMPLOYEE"; // safe default

  return {
    prisma,
    role,
  };
}
