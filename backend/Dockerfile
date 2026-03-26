# Этап сборки
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Копируем go.mod и go.sum
COPY go.mod go.sum ./
RUN go mod download

# Копируем исходный код
COPY . .

# Собираем приложение
RUN go build -o main ./cmd/api/main.go

# Финальный образ
FROM alpine:latest

WORKDIR /app

# Устанавливаем CA-сертификаты для HTTPS
RUN apk --no-cache add ca-certificates

# Копируем собранное приложение
COPY --from=builder /app/main .

# Копируем .env (если есть) - убираем .env.example
# COPY .env ./
COPY .env ./
EXPOSE 8080

CMD ["./main"]