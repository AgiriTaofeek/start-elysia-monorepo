# 🛠️ start-elysia-monorepo

Welcome to **start-elysia-monorepo**, a professional-grade, high-performance starter template for building modern web applications. Whether you are a solo developer or part of a large team, this monorepo is designed to scale with you while maintaining absolute type safety and a premium developer experience.

---

## 🚀 Quick Start (5-Minute Setup)

Follow these steps to get your project up and running locally.

### 1. Prerequisites

You will need two tools installed on your computer:

- **[Bun](https://bun.sh)**: A fast all-in-one JavaScript runtime (replaces Node.js/NPM).
- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**: To run your database locally.

### 2. Setup Commands

Open your terminal and run these commands in order:

```bash
# Install all project dependencies
bun install

# Create your local environment file
cp .env.example .env

# Start your local database (Postgres)
bun db:up

# Basic database setup (create tables)
cd packages/database && bun db:migrate:dev && cd ../..

# Launch everything!
bun dev
```

### 3. Explore your Apps

Once the commands finish, you can access:

- **Frontend (Web App)**: [http://localhost:3000](http://localhost:3000)
- **Backend (API)**: [http://localhost:4000](http://localhost:4000)
- **API Documentation (Swagger)**: [http://localhost:4000/swagger](http://localhost:4000/swagger)

---

## 📂 Project Layout

The repository is organized into a **Monorepo** structure, which keeps related code together but clearly separated.

- **`apps/`**: The "visible" parts of your project.
  - `web`: The user interface (React + TanStack Start).
  - `api`: The brain of the app (Elysia API + Better Auth).
- **`packages/`**: Shared "engines" that power your apps.
  - `ui`: Your design system (shadcn/ui + Tailwind 4).
  - `database`: Where your data lives (Prisma schema + client).
  - `env`: Validates your secrets and configuration.
  - `types`: Shared TypeScript definitions.

---

## 🛠️ Common Workflows

### Adding New UI Components

We use **shadcn/ui**. To add a new component (like a Slider or Accordion):

```bash
cd apps/web
bunx --bun shadcn@latest add <component-name>
```

_Note: Components are automatically stored in `packages/ui` so they can be reused everywhere._

### Connecting Frontend to Backend

The project uses **Eden Treaty**, giving you "end-to-end" type safety. If you change a route in the API, the Web app will immediately know and show errors if you haven't updated your code.

```ts
import { api } from "@/lib/api";

// This is fully auto-completed by your editor!
const { data, error } = await api.health.get();
```

---

## ❓ Troubleshooting

### "Invalid environment variables" Error

This happens if you haven't filled out your `.env` file correctly.

1. Open `.env` at the project root.
2. Ensure `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` are set.
3. If you just want to build without a database, run with `SKIP_ENV_VALIDATION=true`.

### Database Connection Issues

If `bun dev` complains about the database:

1. Ensure Docker is running.
2. Run `bun db:status` to check if the container is healthy.
3. Run `bun db:up` again if it's down.

---

## 💎 Tech Stack Highlights

- **Frontend**: [TanStack Start](https://tanstack.com/start) — The next generation of React frameworks.
- **Backend**: [Elysia](https://elysiajs.com) — Blazing fast, optimized for Bun.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) — Modern, high-performance CSS.
- **Auth**: [Better Auth](https://www.better-auth.com) — The most comprehensive auth solution for TypeScript.
- **Tooling**: [Biome](https://biomejs.dev) — Extremely fast linting and formatting.

---

Made with ❤️ by the test-forge team.
