# Этап 1: Сборка
FROM node:18-alpine AS builder

WORKDIR /app

# Устанавливаем системные зависимости (нужны для некоторых npm пакетов)
RUN apk add --no-cache libc6-compat

# Копируем только файлы зависимостей (для кэширования)
COPY package.json package-lock.json* ./
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение (игнорируем ошибки TypeScript для теста)
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Этап 2: Запуск
FROM node:18-alpine AS runner

WORKDIR /app

# Создаем пользователя без прав
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN apk add --no-cache libc6-compat

# Копируем необходимые файлы из builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Копируем .next и node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Копируем конфиги
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/tsconfig.json ./

# Устанавливаем права
RUN chown -R nextjs:nodejs /app

# Переключаемся на пользователя без прав
USER nextjs

# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]
