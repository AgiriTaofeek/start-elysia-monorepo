# Stage 1: Pruner
FROM oven/bun:alpine AS pruner
WORKDIR /app
RUN apk add --no-cache nodejs
RUN bun add -g turbo
COPY . .
RUN turbo prune @repo/api --docker

# Stage 2: Installer
FROM oven/bun:alpine AS installer
WORKDIR /app

# Copy pruned locks and package.json
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/bun.lock ./bun.lock
RUN bun install --frozen-lockfile

# Stage 3: Builder
FROM oven/bun:alpine AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .

# Generate Prisma Client
ENV SKIP_ENV_VALIDATION=1
RUN cd packages/database && bun run generate

# Stage 4: Runner
FROM oven/bun:alpine AS runner
WORKDIR /app

# Create a non-root user for security
RUN addgroup -g 1001 -S bunuser && adduser -u 1001 -S bunuser -G bunuser
USER bunuser

# Copy only what's needed — not the entire workspace
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api ./apps/api
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# We run the API from source using Bun's runtime
CMD ["bun", "run", "apps/api/src/index.ts"]
