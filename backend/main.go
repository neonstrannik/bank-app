package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	_ "github.com/lib/pq"
)

func main() {
	// Загружаем переменные окружения
	dbURL := os.Getenv("DATABASE_URL")
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Подключаемся к PostgreSQL
	db, err := sql.Open("postgres", dbURL)
	if err != nil {
		log.Fatal("Ошибка подключения к базе:", err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		log.Fatal("Не удалось достучаться до базы:", err)
	}

	fmt.Println("Успешное подключение к базе!")

	// Создаём таблицу users, если её нет
	_, err = db.Exec(`
		CREATE TABLE IF NOT EXISTS users (
			id SERIAL PRIMARY KEY,
			name TEXT NOT NULL,
			email TEXT UNIQUE NOT NULL
		);
	`)
	if err != nil {
		log.Fatal("Ошибка создания таблицы:", err)
	}

	fmt.Println("📦 Таблица users готова!")

	// Простой HTTP эндпоинт
	http.HandleFunc("/users", func(w http.ResponseWriter, r *http.Request) {
		rows, err := db.Query("SELECT id, name, email FROM users")
		if err != nil {
			http.Error(w, "Ошибка запроса", 500)
			return
		}
		defer rows.Close()

		var result string
		for rows.Next() {
			var id int
			var name, email string
			rows.Scan(&id, &name, &email)
			result += fmt.Sprintf("%d: %s (%s)\n", id, name, email)
		}
		w.Write([]byte(result))
	})

	fmt.Printf("Сервер запущен на порту %s\n", port)
	http.ListenAndServe(":"+port, nil)
}
