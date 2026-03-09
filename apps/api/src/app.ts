import cors from "@elysiajs/cors";
import { opentelemetry } from "@elysiajs/opentelemetry";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { env } from "./env";
import { auth } from "./lib/auth";
import { healthRoutes } from "./routes/health";

// Standard Elysia handler for Better Auth
function betterAuthHandler(context: { request: Request }) {
	return auth.handler(context.request);
}

export const app = new Elysia()
	.use(
		cors({
			origin: env.BETTER_AUTH_URL,
			credentials: true,
		}),
	)
	.use(opentelemetry())
	.use(
		swagger({
			documentation: {
				info: { title: "start-elysia-monorepo API", version: "1.0.0" },
			},
		}),
	)
	.onError(({ error, code }) => {
		if (code === "NOT_FOUND") return { error: "Not Found" };
		console.error(error);
	})
	.use(healthRoutes)
	// Mount Better Auth to handle all /api/auth/* requests
	.all("/api/auth/*", betterAuthHandler);

export type App = typeof app;
