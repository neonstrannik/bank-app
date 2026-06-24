# 1) Builder stage - compile Go binary
FROM golang:1.23-alpine AS builder

WORKDIR /app

# Copy dependency files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build binary
RUN go build -o main ./cmd/api/main.go

# 2) Runtime stage - minimal distroless image with pre-built certs
# gcr.io/distroless/base-debian12 includes libc, ca-certificates, and timezone data
# No package manager = no network calls during build
FROM gcr.io/distroless/base-debian12

WORKDIR /app

# Copy binary from builder
COPY --from=builder /app/main .

EXPOSE 8080

ENTRYPOINT ["./main"]