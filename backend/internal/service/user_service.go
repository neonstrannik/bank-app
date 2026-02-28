package service

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/neonstrannik/bank-app/backend/internal/models"
	"github.com/neonstrannik/bank-app/backend/internal/repository"
	"golang.org/x/crypto/bcrypt"
)

type userService struct {
	userRepo  repository.UserRepository
	jwtSecret string
}

// NewUserService creates a new user service
func NewUserService(userRepo repository.UserRepository, jwtSecret string) *userService {
	return &userService{
		userRepo:  userRepo,
		jwtSecret: jwtSecret,
	}
}

// Register creates a new user
func (s *userService) Register(ctx context.Context, req *models.CreateUserRequest) (*models.User, error) {
	// 1. Проверяем, не занят ли email
	existingUser, err := s.userRepo.GetByEmail(ctx, req.Email)
	if err != nil {
		return nil, err
	}
	if existingUser != nil {
		return nil, errors.New("user with this email already exists")
	}

	// 2. Хешируем пароль
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// 3. Создаем пользователя
	now := time.Now()
	user := &models.User{
		ID:        uuid.New(),
		Email:     req.Email,
		Password:  string(hashedPassword),
		FirstName: req.FirstName,
		LastName:  req.LastName,
		Phone:     req.Phone,
		CreatedAt: now,
		UpdatedAt: now,
	}

	if err := s.userRepo.Create(ctx, user); err != nil {
		return nil, err
	}

	// Не отправляем пароль
	user.Password = ""
	return user, nil
}

// Login authenticates a user
func (s *userService) Login(ctx context.Context, email, password string) (string, *models.User, error) {
	// 1. Ищем пользователя по email
	user, err := s.userRepo.GetByEmail(ctx, email)
	if err != nil {
		return "", nil, err
	}
	if user == nil {
		return "", nil, errors.New("invalid credentials")
	}

	// 2. Проверяем пароль
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return "", nil, errors.New("invalid credentials")
	}

	// 3. Генерируем JWT токен (пока простой)
	token := generateSimpleToken(user.ID.String())

	// Не отправляем пароль
	user.Password = ""
	return token, user, nil
}

// GetProfile returns user profile by ID
func (s *userService) GetProfile(ctx context.Context, userID uuid.UUID) (*models.User, error) {
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}

	user.Password = ""
	return user, nil
}

// UpdateProfile updates user profile
func (s *userService) UpdateProfile(ctx context.Context, userID uuid.UUID, req *models.UpdateUserRequest) (*models.User, error) {
	// 1. Получаем существующего пользователя
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}

	// 2. Обновляем поля
	if req.FirstName != "" {
		user.FirstName = req.FirstName
	}
	if req.LastName != "" {
		user.LastName = req.LastName
	}
	if req.Phone != "" {
		user.Phone = req.Phone
	}
	user.UpdatedAt = time.Now()

	// 3. Сохраняем
	if err := s.userRepo.Update(ctx, user); err != nil {
		return nil, err
	}

	user.Password = ""
	return user, nil
}

// Временная функция для генерации токена (потом заменим на JWT)
func generateSimpleToken(userID string) string {
	// В реальном проекте здесь будет JWT с подписью
	return "simple-token-for-" + userID
}