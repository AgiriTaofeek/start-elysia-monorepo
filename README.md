# 🚀 start-elysia-monorepo

Welcome to **start-elysia-monorepo**, the ultimate professional-grade starter template for modern full-stack TypeScript applications.

Designed for teams prioritizing speed, type-safety, and developer experience, this template merges the best-in-class contemporary tools into a monolithic repository built to scale.

## 💎 The Tech Stack

- **Frontend**: [TanStack Start](https://tanstack.com/start) & [React 19](https://react.dev/) — The future of server-side React routing.
- **Backend / API**: [ElysiaJS](https://elysiajs.com/) — A ridiculously fast Bun web framework.
- **Database**: [PostgreSQL](https://www.postgresql.org/) manipulated via [Prisma ORM](https://www.prisma.io/).
- **Authentication**: [Better Auth](https://www.better-auth.com/) — Comprehensive, securely typed authentication.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/) components.
- **Testing**: [Playwright](https://playwright.dev/) (End-to-End) and dual-runners (`bun test` for backend, `vitest` for frontend).
- **Tooling**: [Bun](https://bun.sh/) (Runtime & Package Manager), [Turborepo](https://turbo.build/) (Build System), [Biome](https://biomejs.dev/) (Linter/Formatter).

---

## 🏎️ 5-Minute Quick Start

### 1. Prerequisites
Ensure you have installed:
- [Bun](https://bun.sh) (`curl -fsSL https://bun.sh/install | bash`)
- [Docker](https://www.docker.com/) (Must be running for the local database)

### 2. Setup Commands
```bash
# 1. Install all dependencies across the monorepo
bun install

# 2. Setup your local environment variables
# Copy examples to .env in each package (or run the helper below)
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
cp packages/database/.env.example packages/database/.env

# 3. Start your local PostgreSQL database via Docker
bun db:up

# 4. Push the database schema and generate the Prisma Client
bun db:push
bun db:generate

# 5. Launch the development servers!
bun dev
```

### 3. Explore
- **Frontend App**: [http://localhost:3000](http://localhost:3000)
- **API Server**: [http://localhost:4000](http://localhost:4000)
- **Interactive Swagger Docs**: [http://localhost:4000/swagger](http://localhost:4000/swagger)

---

## 🏛️ Monorepo Architecture

This project is structured as a Turborepo monorepo, cleanly dividing applications from their shared foundational packages.

```text
.
├── apps/
│   ├── web/        # Frontend app (TanStack Start, React, Tailwind, Vite)
│   └── api/        # Backend server (Elysia, rate-limiting, auth mounting)
└── packages/
    ├── database/   # Prisma schema, migrations, and exported client
    ├── env/        # Zod environment validation logic mapping to .env
    ├── types/      # Shared TS interfaces used by both sides
    ├── ui/         # Reusable shadcn/ui components
    ├── biome-config/       # Centralized lint/format rules
    └── typescript-config/  # Base TS configurations
```

---

## 🛠️ Daily Development Guide

### 1. Navigating Routes & Endpoints
* **Adding Web Pages**: Add files to `apps/web/src/routes`. TanStack Router will generate the routing tree automatically.
* **Adding API Endpoints**: Add code to `apps/api/src/routes/` and attach it to the main `app` instance in `apps/api/src/app.ts`.

### 2. End-to-End Type Safety (Eden Treaty)
When you build an endpoint in Elysia, its types are immediately available to the frontend without code generation.

```tsx
// inside apps/web
import { api } from "@/lib/api";

// Fully autocomplete-able. If the API changes, this crashes at build time!
const { data, error } = await api.health.get();
```

### 3. Adding UI Components
To add a new `shadcn/ui` component to your shared `packages/ui` library:

```bash
cd apps/web
bunx --bun shadcn@latest add <component-name>
```

### 4. Database & Prisma
Whenever you modify `packages/database/prisma/schema.prisma` to add new tables/fields:

```bash
# Applies changes directly to your local db during prototyping
bun db:push

# Re-generates the TS Client
bun db:generate

# (Optional) Open the visual table editor
bun db:studio
```
*Note: Before shipping to production, always create formal migrations using `bun db:migrate:dev`.*

### 5. Authentication
Authentication is fully wired up using **Better Auth**.
- **Backend**: Configured in `apps/api/src/lib/auth.ts`. Add OAuth providers (Google, GitHub) here.
- **Frontend**: The React client lives in `apps/web/src/lib/auth-client.ts`. Use the exported `signIn`, `signUp`, and `useSession` functions in your components.

---

## 🛡️ Code Quality & Rules

This repository enforces strict, professional open-source standards to maintain pristine code health.

### Biome (Formatting & Linting)
We use [Biome](https://biomejs.dev/) instead of Prettier/ESLint. If you use VS Code, the recommended extension will automatically format your code on save.

```bash
# Verify formatting and linting
bun run lint
bun run format
```

### Strict Commit Messages
This repo uses **Commitlint** with Husky. You cannot push arbitrary commit messages like `fixed bug`. You **must** follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):
* ✅ `feat: add user profile page`
* ✅ `fix: correct typo in health route`
* ✅ `chore: update dependencies`
* ❌ `Added profile` *(Will be blocked by Husky)*

### Type Checking
Ensure you have zero TypeScript errors before pushing:
```bash
bun run check-types
```

---

## 🧪 Testing Suite

We employ a bifurcated testing strategy to give you maximum confidence:

1. **Fast Unit Tests (`bun test` + `vitest`)**
   ```bash
   # Runs unit tests concurrently across the whole monorepo
   bun run test
   ```
2. **End-to-End Playwright Tests**
   ```bash
   # Make sure you've installed browsers first!
   cd apps/web && bunx playwright install --with-deps chromium

   # Run the E2E suite headless via turbo
   bun run test:e2e

   # Or run via UI for visual debugging
   cd apps/web && bun run test:ui
   ```

---

## 🚢 Production Deployment

The project is pre-configured with multi-stage, pruned Dockerfiles ensuring the smallest possible image sizes for your servers.

To test the full production environment (API + Database) locally:
```bash
bun run compose:up
```

To build isolated production images manually:
```bash
bun run docker:build:api
bun run docker:build:web
```

---
Made with ❤️ for developers who love moving fast without breaking things.
