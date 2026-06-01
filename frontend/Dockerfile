# 1) Установка зависимостей
FROM node:20-alpine AS deps

RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Копируем файлы зависимостей
COPY package*.json ./
COPY package-lock.json ./

# Ставим зависимости
RUN npm ci

# 2) Сборка приложения
FROM node:20-alpine AS builder

WORKDIR /app

# Берем node_modules из deps
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Отключаем телеметрию
ENV NEXT_TELEMETRY_DISABLED=1

# Собираем Next.js
RUN npm run build

# 3) Прод-образ
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Непривилегированный пользователь (безопаснее)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем только runtime-артефакты
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]