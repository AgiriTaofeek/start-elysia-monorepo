import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const apiEnv = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		PORT: z.coerce.number().default(4000),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.string().url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		!!process.env.SKIP_ENV_VALIDATION ||
		process.env.NODE_ENV === "test" ||
		!!process.env.CI,
});
