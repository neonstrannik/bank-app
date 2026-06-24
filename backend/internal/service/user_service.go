package service

import (
	"context"
	"errors"
	"regexp"
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

// NewUserService создает сервис пользователей
func NewUserService(userRepo repository.UserRepository, jwtSecret string) *userService {
	return &userService{
		userRepo:  userRepo,
		jwtSecret: jwtSecret,
	}
}

// Register регистрирует нового пользователя
func (s *userService) Register(ctx context.Context, req *models.CreateUserRequest) (*models.User, error) {
	// 1) Проверяем формат телефона
	phoneRegex := regexp.MustCompile(`^\+?[0-9]{10,15}$`)
	if !phoneRegex.MatchString(req.Phone) {
		return nil, errors.New("invalid phone number format")
	}

	// 2) Проверяем уникальность email
	existingUser, err := s.userRepo.GetByEmail(ctx, req.Email)
	if err != nil {
		return nil, err
	}
	if existingUser != nil {
		return nil, errors.New("user with this email already exists")
	}

	// 3) Проверяем уникальность телефона
	existingUserByPhone, err := s.userRepo.GetByPhone(ctx, req.Phone)
	if err != nil {
		return nil, err
	}
	if existingUserByPhone != nil {
		return nil, errors.New("user with this phone already exists")
	}

	// 4) Хешируем пароль
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	// 5) Создаем пользователя
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

	// Не возвращаем пароль в ответе
	user.Password = ""
	return user, nil
}

// Login выполняет аутентификацию пользователя
func (s *userService) Login(ctx context.Context, email, password string) (string, *models.User, error) {
	// 1) Ищем пользователя по email
	user, err := s.userRepo.GetByEmail(ctx, email)
	if err != nil {
		return "", nil, err
	}
	if user == nil {
		return "", nil, errors.New("invalid credentials")
	}

	// 2) Проверяем пароль
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
		return "", nil, errors.New("invalid credentials")
	}

	// 3) Генерируем токен сессии
	token := generateSimpleToken(user.ID.String())

	// Не возвращаем пароль в ответе
	user.Password = ""
	return token, user, nil
}

// GetProfile возвращает профиль пользователя по ID
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

// UpdateProfile обновляет профиль пользователя
func (s *userService) UpdateProfile(ctx context.Context, userID uuid.UUID, req *models.UpdateUserRequest) (*models.User, error) {
	// 1) Загружаем текущий профиль
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}

	// 2) Обновляем переданные поля
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

	// 3) Сохраняем изменения
	if err := s.userRepo.Update(ctx, user); err != nil {
		return nil, err
	}

	user.Password = ""
	return user, nil
}

// generateSimpleToken: упрощенный токен для демо-версии
func generateSimpleToken(userID string) string {
	// В прод-версии используется полноценный JWT
	return "simple-token-for-" + userID
}