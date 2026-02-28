package service

import (
	"context"
	"github.com/google/uuid"
	"github.com/neonstrannik/bank-app/backend/internal/models"
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