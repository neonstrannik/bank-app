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

// NewCardService создает сервис карт
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

// GetUserCards возвращает все карты пользователя
func (s *cardService) GetUserCards(ctx context.Context, userID uuid.UUID) ([]models.Card, error) {
	// Проверяем, что пользователь существует
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}

	return s.cardRepo.GetByUserID(ctx, userID)
}

// GetCard возвращает карту по ее ID
func (s *cardService) GetCard(ctx context.Context, cardID uuid.UUID) (*models.Card, error) {
	card, err := s.cardRepo.GetByID(ctx, cardID)
	if err != nil {
		return nil, err
	}
	if card == nil {
		return nil, errors.New("card not found")
	}

	// Не возвращаем CVV в ответе
	card.CVV = "***"

	return card, nil
}

// ActivateCard активирует карту
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

// BlockCard блокирует карту
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

// CreateCard создает новую карту для счета
func (s *cardService) CreateCard(ctx context.Context, userID uuid.UUID, req *models.CreateCardRequest) (*models.Card, error) {
	// 1) Проверяем существование счета
	account, err := s.accountRepo.GetByID(ctx, req.AccountID)
	if err != nil {
		return nil, err
	}
	if account == nil {
		return nil, errors.New("account not found")
	}

	// 2) Проверяем владельца счета
	if account.UserID != userID {
		return nil, errors.New("account does not belong to this user")
	}

	// 3) Формируем карту из данных запроса
	now := time.Now()
	
	// Берем срок действия из запроса
	expiryDate := req.ExpiryDate
	if expiryDate == "" {
		// Фолбэк для тестового сценария
		expiryDate = "2028-12-31"
	}

	card := &models.Card{
		ID:         uuid.New(),
		UserID:     userID,
		AccountID:  req.AccountID,
		CardName:   req.CardName,
		CardType:   req.CardType,
		CardNumber: generateCardNumber(),
		ExpiryDate: expiryDate, // Срок действия карты
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

	// Не возвращаем CVV в ответе
	card.CVV = "***"
	return card, nil
}
// Вспомогательные функции для генерации реквизитов
func generateCardNumber() string {
	// Генерируем 16-значный номер на базе времени
	timestamp := time.Now().UnixNano()
	
	// Префикс 4 + оставшаяся часть номера
	number := fmt.Sprintf("4%015d", timestamp%1000000000000000)
	
	// Возвращаем номер без пробелов
	return number
}

func generateExpiryDate() string {
	return "12/28"
}

func generateCVV() string {
	return "123"
}