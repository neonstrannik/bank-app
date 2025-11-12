FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

#WORKDIR /app

RUN apk add --no-cache libc6-compat && npm ci && npx next build --no-lint
#WORKDIR /app

# Копируем package files
#COPY package.json package-lock.json* ./
#RUN npm ci

# Копируем исходный код
#COPY . .

# Собираем приложение, игнорируя ошибки TypeScript
#RUN npx next build --no-lint

EXPOSE 3000
ENTRYPOINT ["npx","next","start"]
