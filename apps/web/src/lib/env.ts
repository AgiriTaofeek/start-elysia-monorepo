import { env as sharedEnv } from "@repo/env";

/**
 * Re-export validated environment variables for the web app.
 * Extend this file if you need web-specific env vars beyond what @repo/env provides.
 */
export const env = sharedEnv;
