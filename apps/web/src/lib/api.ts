import { treaty } from "@elysiajs/eden";
import type { App } from "@repo/api";
import { env } from "./env";

/**
 * End-to-end type-safe API client via Elysia Eden Treaty.
 * All routes, request bodies, and response types are inferred automatically
 * from the server's type definition.
 *
 * Usage:
 *   const { data, error } = await api.health.get()
 */
export const api = treaty<App>(env.VITE_API_URL ?? "http://localhost:4000");
