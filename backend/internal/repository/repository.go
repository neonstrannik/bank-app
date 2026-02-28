package repository

import (
	"context"
	"github.com/google/uuid"
	"github.com/neonstrannik/bank-app/backend/internal/models"
)

// UserRepository defines methods for user data operations
type UserRepository interface {
	Create(ctx context.Context, user *models.User) error
	GetByID(ctx context.Context, id uuid.UUID) (*models.User, error)
	GetByEmail(ctx context.Context, email string) (*models.User, error)
	Update(ctx context.Context, user *models.User) error
	Delete(ctx context.Context, id uuid.UUID) error
	List(ctx context.Context, limit, offset int) ([]models.User, error)
}

// AccountRepository defines methods for account data operations
type AccountRepository interface {
	Create(ctx context.Context, account *models.Account) error
	GetByID(ctx context.Context, id uuid.UUID) (*models.Account, error)
	GetByUserID(ctx context.Context, userID uuid.UUID) ([]models.Account, error)
	GetByNumber(ctx context.Context, accountNumber string) (*models.Account, error)
	UpdateBalance(ctx context.Context, id uuid.UUID, amount float64) error
	Update(ctx context.Context, account *models.Account) error
	Delete(ctx context.Context, id uuid.UUID) error
}

// CardRepository defines methods for card data operations
type CardRepository interface {
	Create(ctx context.Context, card *models.Card) error
	GetByID(ctx context.Context, id uuid.UUID) (*models.Card, error)
	GetByUserID(ctx context.Context, userID uuid.UUID) ([]models.Card, error)
	GetByAccountID(ctx context.Context, accountID uuid.UUID) ([]models.Card, error)
	Update(ctx context.Context, card *models.Card) error
	Delete(ctx context.Context, id uuid.UUID) error
}

// TransactionRepository defines methods for transaction data operations
type TransactionRepository interface {
	Create(ctx context.Context, transaction *models.Transaction) error
	GetByID(ctx context.Context, id uuid.UUID) (*models.Transaction, error)
	GetByAccountID(ctx context.Context, accountID uuid.UUID, limit, offset int) ([]models.Transaction, error)
	GetByUserID(ctx context.Context, userID uuid.UUID, limit, offset int) ([]models.Transaction, error)
	UpdateStatus(ctx context.Context, id uuid.UUID, status string) error
}

// TransferRepository defines methods for transfer data operations
type TransferRepository interface {
	Create(ctx context.Context, transfer *models.Transfer) error
	GetByID(ctx context.Context, id uuid.UUID) (*models.Transfer, error)
	GetBySenderID(ctx context.Context, accountID uuid.UUID, limit, offset int) ([]models.Transfer, error)
	GetByRecipientID(ctx context.Context, accountID uuid.UUID, limit, offset int) ([]models.Transfer, error)
}

// CreditHistoryRepository defines methods for credit history operations
type CreditHistoryRepository interface {
	Create(ctx context.Context, credit *models.CreditHistory) error
	GetByID(ctx context.Context, id uuid.UUID) (*models.CreditHistory, error)
	GetByUserID(ctx context.Context, userID uuid.UUID) ([]models.CreditHistory, error)
	Update(ctx context.Context, credit *models.CreditHistory) error
}