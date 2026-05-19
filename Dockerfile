FROM node:20-alpine AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune animap --docker

FROM node:20-alpine AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g pnpm@9.0.0

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g pnpm@9.0.0


COPY --from=pruner /app/out/full/ .
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/apps/Anitube/node_modules ./apps/Anitube/node_modules
COPY --from=installer /app/packages/api/node_modules ./packages/api/node_modules
COPY --from=installer /app/packages/ui/node_modules ./packages/ui/node_modules

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public static files
COPY --from=builder /app/apps/Anitube/public ./apps/Anitube/public

# Copy built standalone package
# Note: output: "standalone" bundles everything into .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/apps/Anitube/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/Anitube/.next/static ./apps/Anitube/.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/Anitube/server.js"]
