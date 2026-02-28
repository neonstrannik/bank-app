package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

// DBConfig хранит конфигурацию базы данных
type DBConfig struct {
	Host     string
	Port     string
	User     string
	Password string
	DBName   string
	SSLMode  string
}

// LoadDBConfig загружает конфигурацию из .env или использует значения по умолчанию
func LoadDBConfig() *DBConfig {
	// Загружаем .env файл (если есть)
	godotenv.Load()

	return &DBConfig{
		Host:     getEnv("DB_HOST", "localhost"),
		Port:     getEnv("DB_PORT", "5432"),
		User:     getEnv("DB_USER", "postgres"),
		Password: getEnv("DB_PASSWORD", "password"),
		DBName:   getEnv("DB_NAME", "bankapp_dev"),
		SSLMode:  getEnv("DB_SSLMODE", "disable"),
	}
}

// GetConnString возвращает строку подключения к БД
func (c *DBConfig) GetConnString() string {
	return fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=%s",
		c.User, c.Password, c.Host, c.Port, c.DBName, c.SSLMode,
	)
}

// ConnectDB создает подключение к базе данных
func ConnectDB() (*pgxpool.Pool, error) {
	config := LoadDBConfig()
	connString := config.GetConnString()

	// Настраиваем пул соединений
	poolConfig, err := pgxpool.ParseConfig(connString)
	if err != nil {
		return nil, fmt.Errorf("ошибка парсинга конфигурации: %w", err)
	}

	// Настройки пула
	poolConfig.MaxConns = 10
	poolConfig.MinConns = 2
	poolConfig.MaxConnLifetime = 1 * time.Hour
	poolConfig.MaxConnIdleTime = 30 * time.Minute

	// Создаем пул соединений
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	pool, err := pgxpool.NewWithConfig(ctx, poolConfig)
	if err != nil {
		return nil, fmt.Errorf("ошибка создания пула: %w", err)
	}

	// Проверяем подключение
	if err := pool.Ping(ctx); err != nil {
		return nil, fmt.Errorf("ошибка подключения к БД: %w", err)
	}

	log.Println("✅ Подключение к базе данных установлено")
	return pool, nil
}

// getEnv читает переменную окружения или возвращает значение по умолчанию
func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
