import "dotenv/config";
import { dbEnv as env } from "@repo/env/database";
import { defineConfig } from "prisma/config";

export default defineConfig({
	schema: "prisma/schema.prisma",
	migrations: {
		path: "prisma/migrations",
	},
	datasource: {
		url: env.DATABASE_URL,
	},
});
