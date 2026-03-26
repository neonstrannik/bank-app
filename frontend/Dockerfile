# Этап сборки
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Финальный образ
FROM node:18-alpine

WORKDIR /app

# Копируем собранное приложение
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/next.config.ts ./

# Устанавливаем зависимости только для продакшена
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]