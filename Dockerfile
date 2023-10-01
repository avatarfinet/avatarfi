FROM oven/bun:latest as base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json ./
# COPY bun.lockb ./
# RUN bun ci // install using package-lock.json
RUN bun i

# Build the app
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set ARGs before ENVs
ARG ENV
ARG INFURA_API_KEY
ARG GA_ID
ARG WC_ID
ARG DYNAMIC_ID
# Set ENVs
ENV NEXT_PUBLIC_ENV=${ENV}
ENV NEXT_PUBLIC_INFURA_API_KEY=${INFURA_API_KEY}
ENV NEXT_PUBLIC_GA_ID=${GA_ID}
ENV NEXT_PUBLIC_WC_ID=${WC_ID}
ENV NEXT_PUBLIC_DYNAMIC_ID=${DYNAMIC_ID}


# Next.js collects completely anonymous telemetry data about general usage.
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Build The Next.js App
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN \
  addgroup --system --gid 1001 nodejs; \
  adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 8080

CMD ["bun", "start"]
