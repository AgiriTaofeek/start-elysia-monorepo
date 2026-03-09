# Elysia with Bun runtime

## Getting Started

To get started with this template, simply paste this command into your terminal:

```bash
bun create elysia ./elysia-example
```

## Development

To start the development server run:

```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

---

## Monorepo Integration

This API is part of the `start-elysia-monorepo` workspace. It acts as the core backend service.

### Key Features

- **Framework**: [Elysia](https://elysiajs.com/) running on [Bun](https://bun.sh/).
- **Authentication**: Built-in integration with [Better Auth](https://www.better-auth.com/).
- **Database**: Connects natively to PostgreSQL via the shared `@repo/database` (Prisma ORM) package.
- **Environment**: Strict runtime config validation via `@repo/env` (Zod).
- **Type Safety**: Provides end-to-end type safety for the `apps/web` frontend via Elysia's Eden Treaty.

### Package Scripts

From within this `apps/api` directory, you can run:

- `bun run dev`: Starts the Elysia development server on port 3000.
- `bun run test`: Executes the native Bun unit testing suite.
- `bun run format`: Formats code using Biome.
- `bun run lint`: Lints code using Biome.
- `bun run check-types`: Validates TypeScript without emitting files.

### Docker Deployment

The API is containerized using a multi-stage Dockerfile that leverages `turbo prune` for optimal image size. To build the production image, run the following command from the **root** of the monorepo:

```bash
bun run docker:build:api
```
