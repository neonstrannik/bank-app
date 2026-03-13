package service

import (
	"context"
	"errors"
	"time"

	"github.com/google/uuid"
	"github.com/neonstrannik/bank-app/backend/internal/models"
	"github.com/neonstrannik/bank-app/backend/internal/repository"
)

// UserService defines business logic for users
type UserService interface {
	Register(ctx context.Context, req *models.CreateUserRequest) (*models.User, error)
	Login(ctx context.Context, email, password string) (string, *models.User, error)
	GetProfile(ctx context.Context, userID uuid.UUID) (*models.User, error)
	UpdateProfile(ctx context.Context, userID uuid.UUID, req *models.UpdateUserRequest) (*models.User, error)
}

// AccountService defines business logic for accounts
type AccountService interface {
	CreateAccount(ctx context.Context, userID uuid.UUID, req *models.CreateAccountRequest) (*models.Account, error)
	GetAccounts(ctx context.Context, userID uuid.UUID) ([]models.Account, error)
	GetAccount(ctx context.Context, accountID uuid.UUID) (*models.Account, error)
	BlockAccount(ctx context.Context, accountID uuid.UUID) error
	CloseAccount(ctx context.Context, accountID uuid.UUID) error
}

// CardService defines business logic for cards
type CardService interface {
	GetUserCards(ctx context.Context, userID uuid.UUID) ([]models.Card, error)
	GetCard(ctx context.Context, cardID uuid.UUID) (*models.Card, error)
	ActivateCard(ctx context.Context, cardID uuid.UUID) error
	BlockCard(ctx context.Context, cardID uuid.UUID) error
}

// TransactionService defines business logic for transactions
type TransactionService interface {
	Deposit(ctx context.Context, accountID uuid.UUID, amount float64, description string) (*models.Transaction, error)
	Withdraw(ctx context.Context, accountID uuid.UUID, amount float64, description string) (*models.Transaction, error)
	Transfer(ctx context.Context, fromAccountID, toAccountID uuid.UUID, amount float64, description string) (*models.Transaction, error)
	GetAccountTransactions(ctx context.Context, accountID uuid.UUID, limit, offset int) ([]models.Transaction, error)
}

// CreditService defines business logic for credits
type CreditService interface {
	CalculateCredit(amount float64, rate float64, months int) (*models.CreditCalculation, error)
	ApplyForCredit(ctx context.Context, userID uuid.UUID, req *models.CreditRequest) (*models.CreditHistory, error)
	GetUserCredits(ctx context.Context, userID uuid.UUID) ([]models.CreditHistory, error)
	MakePayment(ctx context.Context, creditID uuid.UUID, amount float64) error
}

// TransferService defines business logic for transfers
type TransferService interface {
	TransferByPhone(ctx context.Context, fromAccountID uuid.UUID, toPhone string, amount float64, description string) (*models.Transaction, error)
	GetUserByPhone(ctx context.Context, phone string) (*models.User, error)
}

// transferService implements TransferService
type transferService struct {
	accountRepo repository.AccountRepository
	userRepo    repository.UserRepository
	txRepo      repository.TransactionRepository
}

// NewTransferService creates a new transfer service
func NewTransferService(
	accountRepo repository.AccountRepository,
	userRepo repository.UserRepository,
	txRepo repository.TransactionRepository,
) *transferService {
	return &transferService{
		accountRepo: accountRepo,
		userRepo:    userRepo,
		txRepo:      txRepo,
	}
}

// GetUserByPhone finds a user by phone number
func (s *transferService) GetUserByPhone(ctx context.Context, phone string) (*models.User, error) {
	return s.userRepo.GetByPhone(ctx, phone)
}

// TransferByPhone transfers money by recipient's phone number
func (s *transferService) TransferByPhone(ctx context.Context, fromAccountID uuid.UUID, toPhone string, amount float64, description string) (*models.Transaction, error) {
	// 1. Check sender's account
	fromAccount, err := s.accountRepo.GetByID(ctx, fromAccountID)
	if err != nil {
		return nil, err
	}
	if fromAccount == nil {
		return nil, errors.New("sender account not found")
	}
	if fromAccount.Status != "active" {
		return nil, errors.New("sender account is not active")
	}
	if fromAccount.Balance < amount {
		return nil, errors.New("insufficient funds")
	}

	// 2. Find recipient by phone
	toUser, err := s.userRepo.GetByPhone(ctx, toPhone)
	if err != nil {
		return nil, err
	}
	if toUser == nil {
		return nil, errors.New("user with this phone not found")
	}

	// 3. Get recipient's account (first active)
	toAccounts, err := s.accountRepo.GetByUserID(ctx, toUser.ID)
	if err != nil {
		return nil, err
	}
	if len(toAccounts) == 0 {
		return nil, errors.New("recipient has no active accounts")
	}

	// Take the first active account
	var toAccount *models.Account
	for _, acc := range toAccounts {
		if acc.Status == "active" {
			toAccount = &acc
			break
		}
	}
	if toAccount == nil {
		return nil, errors.New("recipient has no active accounts")
	}

	// 4. Create transaction record
	now := time.Now()
	transaction := &models.Transaction{
		ID:               uuid.New(),
		AccountID:        fromAccountID,
		Type:             "transfer",
		Amount:           amount,
		Description:      description,
		Status:           "completed",
		RecipientAccount: &toAccount.AccountNumber,
		RecipientName:    &toUser.FirstName,
		CreatedAt:        now,
	}

	// 5. Execute transfer
	// In production, this should be done in a database transaction
	err = s.accountRepo.Withdraw(ctx, fromAccountID, amount)
	if err != nil {
		return nil, err
	}

	err = s.accountRepo.Deposit(ctx, toAccount.ID, amount)
	if err != nil {
		// In production, you'd need to rollback the withdrawal here
		return nil, err
	}

	// 6. Save transaction
	err = s.txRepo.Create(ctx, transaction)
	if err != nil {
		return nil, err
	}

	return transaction, nil
}