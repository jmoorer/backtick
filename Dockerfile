# # ── Build stage ────────────────────────────────────────────────────────────────
# FROM node:22-alpine AS builder
# WORKDIR /app
#
# RUN npm install -g pnpm@9
#
# COPY .npmrc package.json pnpm-lock.yaml ./
# RUN pnpm install --frozen-lockfile
#
# COPY . .
# RUN pnpm build
#
# # ── Runtime stage ───────────────────────────────────────────────────────────────
# FROM node:22-alpine
# WORKDIR /app
#
# COPY --from=builder /app/build ./build
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/drizzle ./drizzle
#
# EXPOSE 3000
# ENV NODE_ENV=production
#
# CMD ["node", "build"]

FROM node:alpine

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .
RUN pnpm run build

CMD ["node", "build"]

EXPOSE 3000
