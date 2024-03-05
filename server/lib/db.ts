import { PrismaClient } from "@prisma/client";
import { Client } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";

const createClient = () => {
  if (import.meta.dev) {
    return new PrismaClient({
      log: ["query", "error", "warn"],
    });
  } else {
    const psClient = new Client({ url: process.env.DATABASE_URL! });
    return new PrismaClient({
      log: ["error"],
      adapter: new PrismaPlanetScale(psClient),
    });
  }
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createClient> | undefined;
};

const db = globalForPrisma.prisma ?? createClient();

export default db;

if (import.meta.dev) globalForPrisma.prisma = db;
