package service

import (
	"context"
	"errors"
	"time"

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

	// 3. Создаем карту
	now := time.Now()
	card := &models.Card{
		ID:         uuid.New(),
		UserID:     userID,
		AccountID:  req.AccountID,
		CardName:   req.CardName,
		CardType:   req.CardType,
		CardNumber: generateCardNumber(),
		ExpiryDate: generateExpiryDate(),
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
func generateCardNumber() string {
	return "4111111111111111"
}

func generateExpiryDate() string {
	return "12/28"
}

func generateCVV() string {
	return "123"
}