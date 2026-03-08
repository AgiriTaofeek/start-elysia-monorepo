# Stage 1: Pruner
FROM oven/bun:1.1-alpine AS pruner
WORKDIR /app
RUN bun add -g turbo
COPY . .
RUN turbo prune @repo/api --docker

# Stage 2: Installer
FROM oven/bun:1.1-alpine AS installer
WORKDIR /app

# Copy pruned locks and package.json
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lockb ./bun.lockb
RUN bun install --frozen-lockfile

# Stage 3: Builder
FROM oven/bun:1.1-alpine AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

# Generate Prisma Client
RUN bun run db:generate

# No build step for Elysia since we run from source,
# but we could bundle here if needed for even smaller size.

# Stage 4: Runner
FROM oven/bun:1.1-alpine AS runner
WORKDIR /app

# Create a non-root user for security
RUN adduser --system --uid 1001 --group bunuser
USER bunuser

# Copy built app and dependencies
COPY --from=builder /app/ .

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# We run the API from source using Bun's runtime
CMD ["bun", "run", "apps/api/src/index.ts"]
