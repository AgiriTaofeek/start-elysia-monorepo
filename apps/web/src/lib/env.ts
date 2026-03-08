import { env as sharedEnv } from "@repo/env";

/**
 * Accessor for validated client-side environment variables.
 * These are prefixed with VITE_ in the .env file.
 */
export const env = sharedEnv;
