import cors from "@elysiajs/cors";
import { opentelemetry } from "@elysiajs/opentelemetry";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { env } from "./env";
import { auth } from "./lib/auth";
import { healthRoutes } from "./routes/health";

export const app = new Elysia()
  .use(cors())
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
  .all("/api/auth/*", betterAuthHandler)

  .listen(env.PORT);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
console.log(
  `📚 Swagger docs available at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);

// Standard Elysia handler for Better Auth
function betterAuthHandler(context: { request: Request }) {
  return auth.handler(context.request);
}

export * from "./lib/auth-client";
export type App = typeof app;
