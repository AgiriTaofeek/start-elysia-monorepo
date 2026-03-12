import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { dbEnv as env } from "@repo/env";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

/**
 * Uses the Prisma driver adapter with `pg` Pool.
 * This pattern supports both standard and edge/serverless deployments.
 * For simpler setups (standard Docker), you can remove the adapter
 * and use: `new PrismaClient()` directly — Prisma handles pooling internally.
 */
const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter,
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "@prisma/client";
