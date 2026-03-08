import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		PORT: z.coerce.number().default(4000),
		NODE_ENV: z
			.enum(["development", "production", "test"])
			.default("development"),
		BETTER_AUTH_SECRET: z.string().min(1),
		BETTER_AUTH_URL: z.string().url(),
	},
	client: {
		VITE_BETTER_AUTH_URL: z.string().url().optional(),
		VITE_API_URL: z.string().url().optional(),
	},
	runtimeEnv: process.env,
	clientPrefix: "VITE_",
	emptyStringAsUndefined: true,
	skipValidation:
		!!process.env.SKIP_ENV_VALIDATION ||
		process.env.NODE_ENV === "test" ||
		!!process.env.CI,
});
