package service

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/neonstrannik/bank-app/backend/internal/models"
	"github.com/neonstrannik/bank-app/backend/internal/repository"
)

type accountService struct {
	accountRepo repository.AccountRepository
	userRepo    repository.UserRepository
}

// NewAccountService создает сервис счетов
func NewAccountService(accountRepo repository.AccountRepository, userRepo repository.UserRepository) *accountService {
	return &accountService{
		accountRepo: accountRepo,
		userRepo:    userRepo,
	}
}

// CreateAccount создает новый счет для пользователя
func (s *accountService) CreateAccount(ctx context.Context, userID uuid.UUID, req *models.CreateAccountRequest) (*models.Account, error) {
	// 1) Проверяем пользователя
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}

	// 2) Проверяем тип счета
	if req.AccountType != "checking" && req.AccountType != "credit" {
		return nil, errors.New("invalid account type. Must be 'checking' or 'credit'")
	}

	// 3) Генерируем номер счета
	accountNumber := fmt.Sprintf("40817810%014d", time.Now().UnixNano()%10000000000000)

	// 4) Создаем счет
	now := time.Now()
	account := &models.Account{
		ID:            uuid.New(),
		UserID:        userID,
		AccountNumber: accountNumber,
		AccountType:   req.AccountType,
		Balance:       0.00,
		Currency:      "RUB",
		Status:        "active",
		CreatedAt:     now,
		UpdatedAt:     now,
	}

	if err := s.accountRepo.Create(ctx, account); err != nil {
		return nil, err
	}

	return account, nil
}

// GetAccounts возвращает все счета пользователя
func (s *accountService) GetAccounts(ctx context.Context, userID uuid.UUID) ([]models.Account, error) {
	// Проверяем, что пользователь существует
	user, err := s.userRepo.GetByID(ctx, userID)
	if err != nil {
		return nil, err
	}
	if user == nil {
		return nil, errors.New("user not found")
	}

	return s.accountRepo.GetByUserID(ctx, userID)
}

// GetAccount возвращает счет по его ID
func (s *accountService) GetAccount(ctx context.Context, accountID uuid.UUID) (*models.Account, error) {
	account, err := s.accountRepo.GetByID(ctx, accountID)
	if err != nil {
		return nil, err
	}
	if account == nil {
		return nil, errors.New("account not found")
	}
	return account, nil
}

// BlockAccount блокирует счет
func (s *accountService) BlockAccount(ctx context.Context, accountID uuid.UUID) error {
	account, err := s.accountRepo.GetByID(ctx, accountID)
	if err != nil {
		return err
	}
	if account == nil {
		return errors.New("account not found")
	}

	account.Status = "frozen"
	account.UpdatedAt = time.Now()

	return s.accountRepo.Update(ctx, account)
}

// CloseAccount закрывает счет
func (s *accountService) CloseAccount(ctx context.Context, accountID uuid.UUID) error {
	account, err := s.accountRepo.GetByID(ctx, accountID)
	if err != nil {
		return err
	}
	if account == nil {
		return errors.New("account not found")
	}

	// Закрытие доступно только при нулевом балансе
	if account.Balance > 0 {
		return errors.New("cannot close account with positive balance")
	}

	account.Status = "closed"
	account.UpdatedAt = time.Now()

	return s.accountRepo.Update(ctx, account)
}
// Deposit пополняет счет
func (s *accountService) Deposit(ctx context.Context, accountID uuid.UUID, amount float64) (*models.Account, error) {
	// 1) Проверяем существование счета
	account, err := s.accountRepo.GetByID(ctx, accountID)
	if err != nil {
		return nil, err
	}
	if account == nil {
		return nil, errors.New("account not found")
	}

	// 2) Проверяем статус счета
	if account.Status != "active" {
		return nil, errors.New("account is not active")
	}

	// 3) Выполняем пополнение
	if err := s.accountRepo.Deposit(ctx, accountID, amount); err != nil {
		return nil, err
	}

	// 4) Возвращаем обновленный счет
	return s.accountRepo.GetByID(ctx, accountID)
}
// Withdraw списывает деньги со счета
func (s *accountService) Withdraw(ctx context.Context, accountID uuid.UUID, amount float64) (*models.Account, error) {
	// Проверяем существование счета
	account, err := s.accountRepo.GetByID(ctx, accountID)
	if err != nil {
		return nil, err
	}
	if account == nil {
		return nil, errors.New("account not found")
	}

	// Проверяем статус счета
	if account.Status != "active" {
		return nil, errors.New("account is not active")
	}

	// Проверяем баланс
	if account.Balance < amount {
		return nil, errors.New("insufficient funds")
	}

	// Выполняем списание
	if err := s.accountRepo.Withdraw(ctx, accountID, amount); err != nil {
		return nil, err
	}

	// Возвращаем обновленный счет
	return s.accountRepo.GetByID(ctx, accountID)
}