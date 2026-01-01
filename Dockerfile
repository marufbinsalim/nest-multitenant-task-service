# -------- Builder --------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
COPY nx.json tsconfig.base.json ./

RUN npm ci

COPY . .

RUN npx nx build audit-service
RUN npx nx build core


# -------- Production --------
FROM node:20-alpine AS production
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ONLY production deps
RUN npm ci --omit=dev

# Copy built apps
COPY --from=builder /app/dist/apps/audit-service ./audit-service
COPY --from=builder /app/dist/apps/core ./core

EXPOSE 3000 3001
