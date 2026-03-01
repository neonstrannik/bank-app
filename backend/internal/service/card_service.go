package service

import (
	"context"
	"errors"
	"time"
"fmt"
	"github.com/google/uuid"
	"github.com/neonstrannik/bank-app/backend/internal/models"
	"github.com/neonstrannik/bank-app/backend/internal/repository"
)

type cardService struct {
	cardRepo    repository.CardRepository
	accountRepo repository.AccountRepository
	userRepo    repository.UserRepository
}

// NewCardService creates a new card service
func NewCardService(
	cardRepo repository.CardRepository,
	accountRepo repository.AccountRepository,
	userRepo repository.UserRepository,
) *cardService {
	return &cardService{
		cardRepo:    cardRepo,
		accountRepo: accountRepo,
		userRepo:    userRepo,
	}
}

// GetUserCards returns all cards for a user
func (s *cardService) GetUserCards(ctx context.Context, userID uuid.UUID) ([]models.Card, error) {
	// Проверяем, существует ли пользователь
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}

	return s.cardRepo.GetByUserID(ctx, userID)
}

// GetCard returns a specific card
func (s *cardService) GetCard(ctx context.Context, cardID uuid.UUID) (*models.Card, error) {
	card, err := s.cardRepo.GetByID(ctx, cardID)
	if err != nil {
		return nil, err
	}
	if card == nil {
		return nil, errors.New("card not found")
	}

	// Скрываем CVV для безопасности
	card.CVV = "***"

	return card, nil
}

// ActivateCard activates a card
func (s *cardService) ActivateCard(ctx context.Context, cardID uuid.UUID) error {
	card, err := s.cardRepo.GetByID(ctx, cardID)
	if err != nil {
		return err
	}
	if card == nil {
		return errors.New("card not found")
	}

	card.Status = "active"
	card.UpdatedAt = time.Now()

	return s.cardRepo.Update(ctx, card)
}

// BlockCard blocks a card
func (s *cardService) BlockCard(ctx context.Context, cardID uuid.UUID) error {
	card, err := s.cardRepo.GetByID(ctx, cardID)
	if err != nil {
		return err
	}
	if card == nil {
		return errors.New("card not found")
	}

	card.Status = "blocked"
	card.UpdatedAt = time.Now()

	return s.cardRepo.Update(ctx, card)
}

// CreateCard creates a new card for an account
func (s *cardService) CreateCard(ctx context.Context, userID uuid.UUID, req *models.CreateCardRequest) (*models.Card, error) {
	// 1. Проверяем, существует ли счет
	account, err := s.accountRepo.GetByID(ctx, req.AccountID)
	if err != nil {
		return nil, err
	}
	if account == nil {
		return nil, errors.New("account not found")
	}

	// 2. Проверяем, что счет принадлежит пользователю
	if account.UserID != userID {
		return nil, errors.New("account does not belong to this user")
	}

	// 3. Создаем карту, используя данные из запроса
	now := time.Now()
	
	// Проверяем, пришла ли дата с фронтенда
	expiryDate := req.ExpiryDate
	if expiryDate == "" {
		// Если нет - генерируем сами (на всякий случай)
		expiryDate = "2028-12-31"
	}

	card := &models.Card{
		ID:         uuid.New(),
		UserID:     userID,
		AccountID:  req.AccountID,
		CardName:   req.CardName,
		CardType:   req.CardType,
		CardNumber: generateCardNumber(),
		ExpiryDate: expiryDate, // Используем дату из запроса!
		CVV:        generateCVV(),
		Status:     "active",
		Benefits:   req.Benefits,
		ImageURL:   req.ImageURL,
		CreatedAt:  now,
		UpdatedAt:  now,
	}

	if err := s.cardRepo.Create(ctx, card); err != nil {
		return nil, err
	}

	// Скрываем CVV в ответе
	card.CVV = "***"
	return card, nil
}
// Вспомогательные функции (упрощенно)
// Генерация уникального номера карты
func generateCardNumber() string {
	// Генерируем номер карты на основе времени и случайного числа
	// Формат: 4 группы по 4 цифры
	timestamp := time.Now().UnixNano()
	
	// Берем последние 12 цифр timestamp и добавляем префикс 4
	// Это даст нам 16-значный номер, начинающийся с 4 (Visa)
	number := fmt.Sprintf("4%015d", timestamp%1000000000000000)
	
	// Форматируем для читаемости (но в БД храним без пробелов)
	return number
}

func generateExpiryDate() string {
	return "12/28"
}

func generateCVV() string {
	return "123"
}