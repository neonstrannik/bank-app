package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"github.com/neonstrannik/bank-app/backend/internal/config"
	"github.com/neonstrannik/bank-app/backend/internal/models"
	"github.com/neonstrannik/bank-app/backend/internal/repository/postgres"
	"github.com/neonstrannik/bank-app/backend/internal/service"
)

func main() {
	// Загружаем .env
	if err := godotenv.Load(); err != nil {
		log.Println("⚠️  .env файл не найден, используем переменные окружения")
	}

	// Подключаемся к базе данных
	dbPool, err := config.ConnectDB()
	if err != nil {
		log.Fatal("❌ Ошибка подключения к БД:", err)
	}
	defer dbPool.Close()

	// Создаем репозитории
	userRepo := postgres.NewUserRepository(dbPool)
	accountRepo := postgres.NewAccountRepository(dbPool)
	cardRepo := postgres.NewCardRepository(dbPool)
	transactionRepo := postgres.NewTransactionRepository(dbPool)

	// Создаем сервисы
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		jwtSecret = "default-secret-key-for-development"
		log.Println("⚠️  JWT_SECRET не задан, используем значение по умолчанию")
	}

	userService := service.NewUserService(userRepo, jwtSecret)
	accountService := service.NewAccountService(accountRepo, userRepo)
	cardService := service.NewCardService(cardRepo, accountRepo, userRepo)

	// Создаем роутер
	router := gin.Default()

	// Добавляем CORS middleware
	router.Use(func(c *gin.Context) {
		// Разрешаем запросы с любого источника (для разработки)
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, PATCH, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		// Обрабатываем preflight запросы
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Health check
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"message": "Bank API is running",
			"time":    time.Now().Unix(),
		})
	})

	// ==================== AUTH ENDPOINTS ====================

	// POST /api/register - регистрация нового пользователя
	router.POST("/api/register", func(c *gin.Context) {
		var req models.CreateUserRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		user, err := userService.Register(c.Request.Context(), &req)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{
			"message": "User registered successfully",
			"user":    user,
		})
	})

	// POST /api/login - вход пользователя
	router.POST("/api/login", func(c *gin.Context) {
		var req struct {
			Email    string `json:"email" binding:"required,email"`
			Password string `json:"password" binding:"required"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		token, user, err := userService.Login(c.Request.Context(), req.Email, req.Password)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"token": token,
			"user":  user,
		})
	})

	// ==================== USER ENDPOINTS ====================

	// GET /api/users/:id - получить пользователя по ID
	router.GET("/api/users/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		id, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}

		user, err := userService.GetProfile(c.Request.Context(), id)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		if user == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		c.JSON(http.StatusOK, user)
	})

	// ==================== ACCOUNT ENDPOINTS ====================

	// POST /api/users/:id/accounts - создать новый счет для пользователя
	router.POST("/api/users/:id/accounts", func(c *gin.Context) {
		idStr := c.Param("id")
		userID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}

		var req models.CreateAccountRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		account, err := accountService.CreateAccount(c.Request.Context(), userID, &req)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, account)
	})

	// GET /api/users/:id/accounts - получить все счета пользователя
	router.GET("/api/users/:id/accounts", func(c *gin.Context) {
		idStr := c.Param("id")
		userID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}

		accounts, err := accountService.GetAccounts(c.Request.Context(), userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, accounts)
	})

	// GET /api/accounts/:id - получить счет по ID
	router.GET("/api/accounts/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		accountID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID"})
			return
		}

		account, err := accountService.GetAccount(c.Request.Context(), accountID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		if account == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Account not found"})
			return
		}

		c.JSON(http.StatusOK, account)
	})

	// GET /api/accounts/number/:number - получить счет по номеру (через репозиторий)
	router.GET("/api/accounts/number/:number", func(c *gin.Context) {
		accountNumber := c.Param("number")

		account, err := accountRepo.GetByNumber(c.Request.Context(), accountNumber)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		if account == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Account not found"})
			return
		}

		c.JSON(http.StatusOK, account)
	})

	// PATCH /api/accounts/:id/block - заблокировать счет
	router.PATCH("/api/accounts/:id/block", func(c *gin.Context) {
		idStr := c.Param("id")
		accountID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID"})
			return
		}

		if err := accountService.BlockAccount(c.Request.Context(), accountID); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Account blocked successfully"})
	})

	// PATCH /api/accounts/:id/close - закрыть счет
	router.PATCH("/api/accounts/:id/close", func(c *gin.Context) {
		idStr := c.Param("id")
		accountID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID"})
			return
		}

		if err := accountService.CloseAccount(c.Request.Context(), accountID); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Account closed successfully"})
	})

	// ==================== CARD ENDPOINTS ====================

	// POST /api/users/:id/cards - создать новую карту
	router.POST("/api/users/:id/cards", func(c *gin.Context) {
		idStr := c.Param("id")
		userID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}

		var req models.CreateCardRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		card, err := cardService.CreateCard(c.Request.Context(), userID, &req)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, card)
	})

	// GET /api/users/:id/cards - получить все карты пользователя
	router.GET("/api/users/:id/cards", func(c *gin.Context) {
		idStr := c.Param("id")
		userID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
			return
		}

		cards, err := cardService.GetUserCards(c.Request.Context(), userID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, cards)
	})

	// GET /api/cards/:id - получить карту по ID
	router.GET("/api/cards/:id", func(c *gin.Context) {
		idStr := c.Param("id")
		cardID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid card ID"})
			return
		}

		card, err := cardService.GetCard(c.Request.Context(), cardID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		if card == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Card not found"})
			return
		}

		c.JSON(http.StatusOK, card)
	})

	// GET /api/accounts/:id/cards - получить карты счета
	router.GET("/api/accounts/:id/cards", func(c *gin.Context) {
		idStr := c.Param("id")
		accountID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID"})
			return
		}

		cards, err := cardRepo.GetByAccountID(c.Request.Context(), accountID)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, cards)
	})

	// PATCH /api/cards/:id/activate - активировать карту
	router.PATCH("/api/cards/:id/activate", func(c *gin.Context) {
		idStr := c.Param("id")
		cardID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid card ID"})
			return
		}

		if err := cardService.ActivateCard(c.Request.Context(), cardID); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Card activated successfully"})
	})

	// PATCH /api/cards/:id/block - заблокировать карту
	router.PATCH("/api/cards/:id/block", func(c *gin.Context) {
		idStr := c.Param("id")
		cardID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid card ID"})
			return
		}

		if err := cardService.BlockCard(c.Request.Context(), cardID); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Card blocked successfully"})
	})

	// POST /api/accounts/:id/deposit - пополнить счет
	router.POST("/api/accounts/:id/deposit", func(c *gin.Context) {
		idStr := c.Param("id")
		accountID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID"})
			return
		}

		var req models.DepositRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		account, err := accountService.Deposit(c.Request.Context(), accountID, req.Amount)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, account)
	})

	// POST /api/accounts/:id/withdraw - списать деньги
	router.POST("/api/accounts/:id/withdraw", func(c *gin.Context) {
		idStr := c.Param("id")
		accountID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID"})
			return
		}

		var req models.DepositRequest // переиспользуем ту же структуру (amount)
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		account, err := accountService.Withdraw(c.Request.Context(), accountID, req.Amount)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, account)
	})

	// ==================== TRANSFER ENDPOINTS ====================

	// GET /api/users/by-phone/:phone - поиск пользователя по телефону
	router.GET("/api/users/by-phone/:phone", func(c *gin.Context) {
		phone := c.Param("phone")

		user, err := userRepo.GetByPhone(c.Request.Context(), phone)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		if user == nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		// Не отправляем пароль
		user.Password = ""
		c.JSON(http.StatusOK, user)
	})

	// POST /api/accounts/:id/transfer - перевод по номеру телефона
	router.POST("/api/accounts/:id/transfer", func(c *gin.Context) {
		idStr := c.Param("id")
		fromAccountID, err := uuid.Parse(idStr)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid account ID"})
			return
		}

		var req struct {
			ToPhone     string  `json:"to_phone" binding:"required"`
			Amount      float64 `json:"amount" binding:"required,min=1"`
			Description string  `json:"description"`
		}

		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Создаем сервис переводов
		transferService := service.NewTransferService(accountRepo, userRepo, transactionRepo)

		tx, err := transferService.TransferByPhone(c.Request.Context(), fromAccountID, req.ToPhone, req.Amount, req.Description)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, tx)
	})

	// ==================== SERVER START ====================

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	srv := &http.Server{
		Addr:    ":" + port,
		Handler: router,
	}

	go func() {
		log.Printf("🚀 Сервер запущен на порту %s", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("❌ Ошибка сервера: %s\n", err)
		}
	}()

	// Graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("🛑 Завершение работы сервера...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("❌ Принудительное завершение:", err)
	}

	log.Println("✅ Сервер остановлен")
}