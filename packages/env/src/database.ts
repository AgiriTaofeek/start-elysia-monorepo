import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const dbEnv = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
	},
	runtimeEnv: process.env,
	emptyStringAsUndefined: true,
	skipValidation:
		!!process.env.SKIP_ENV_VALIDATION ||
		process.env.NODE_ENV === "test" ||
		!!process.env.CI,
});
