import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "@repo/env";
import { Pool } from "pg"; // Import the Pool

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// 1. Create the Pool specifically for the adapter
const pool = new Pool({
	connectionString: env.DATABASE_URL,
});

// 2. Pass the pool to the adapter
const adapter = new PrismaPg(pool);

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		adapter,
		// Optional: Log queries to see if connection works
		// log: ['query', 'info', 'warn', 'error'],
	});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export * from "@prisma/client";
