package postgres

import (
	"context"
	"errors"
	"fmt"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/neonstrannik/bank-app/backend/internal/models"
)

type transactionRepository struct {
	db *pgxpool.Pool
}

// NewTransactionRepository creates a new transaction repository
func NewTransactionRepository(db *pgxpool.Pool) *transactionRepository {
	return &transactionRepository{db: db}
}

// Create inserts a new transaction into the database
func (r *transactionRepository) Create(ctx context.Context, transaction *models.Transaction) error {
	query := `
		INSERT INTO transactions (
			id, account_id, type, amount, description, 
			status, recipient_account, recipient_name, sender_account, created_at
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
	`

	_, err := r.db.Exec(ctx, query,
		transaction.ID, transaction.AccountID, transaction.Type, transaction.Amount,
		transaction.Description, transaction.Status, transaction.RecipientAccount,
		transaction.RecipientName, transaction.SenderAccount, transaction.CreatedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to create transaction: %w", err)
	}

	return nil
}

// GetByID retrieves a transaction by ID
func (r *transactionRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Transaction, error) {
	query := `
		SELECT id, account_id, type, amount, description, 
		       status, recipient_account, recipient_name, sender_account, created_at
		FROM transactions
		WHERE id = $1
	`

	var transaction models.Transaction
	var recipientAccount, recipientName, senderAccount *string

	err := r.db.QueryRow(ctx, query, id).Scan(
		&transaction.ID, &transaction.AccountID, &transaction.Type, &transaction.Amount,
		&transaction.Description, &transaction.Status, &recipientAccount,
		&recipientName, &senderAccount, &transaction.CreatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get transaction by ID: %w", err)
	}

	if recipientAccount != nil {
		transaction.RecipientAccount = recipientAccount
	}
	if recipientName != nil {
		transaction.RecipientName = recipientName
	}
	if senderAccount != nil {
		transaction.SenderAccount = senderAccount
	}

	return &transaction, nil
}

// GetByAccountID retrieves transactions for an account
func (r *transactionRepository) GetByAccountID(ctx context.Context, accountID uuid.UUID, limit, offset int) ([]models.Transaction, error) {
	query := `
		SELECT id, account_id, type, amount, description, 
		       status, recipient_account, recipient_name, sender_account, created_at
		FROM transactions
		WHERE account_id = $1
		ORDER BY created_at DESC
		LIMIT $2 OFFSET $3
	`

	rows, err := r.db.Query(ctx, query, accountID, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("failed to get transactions by account ID: %w", err)
	}
	defer rows.Close()

	var transactions []models.Transaction
	for rows.Next() {
		var transaction models.Transaction
		var recipientAccount, recipientName, senderAccount *string

		err := rows.Scan(
			&transaction.ID, &transaction.AccountID, &transaction.Type, &transaction.Amount,
			&transaction.Description, &transaction.Status, &recipientAccount,
			&recipientName, &senderAccount, &transaction.CreatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan transaction: %w", err)
		}

		if recipientAccount != nil {
			transaction.RecipientAccount = recipientAccount
		}
		if recipientName != nil {
			transaction.RecipientName = recipientName
		}
		if senderAccount != nil {
			transaction.SenderAccount = senderAccount
		}

		transactions = append(transactions, transaction)
	}

	return transactions, nil
}

// GetByUserID retrieves transactions for a user
func (r *transactionRepository) GetByUserID(ctx context.Context, userID uuid.UUID, limit, offset int) ([]models.Transaction, error) {
	query := `
		SELECT t.id, t.account_id, t.type, t.amount, t.description, 
		       t.status, t.recipient_account, t.recipient_name, t.sender_account, t.created_at
		FROM transactions t
		JOIN accounts a ON t.account_id = a.id
		WHERE a.user_id = $1
		ORDER BY t.created_at DESC
		LIMIT $2 OFFSET $3
	`

	rows, err := r.db.Query(ctx, query, userID, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("failed to get transactions by user ID: %w", err)
	}
	defer rows.Close()

	var transactions []models.Transaction
	for rows.Next() {
		var transaction models.Transaction
		var recipientAccount, recipientName, senderAccount *string

		err := rows.Scan(
			&transaction.ID, &transaction.AccountID, &transaction.Type, &transaction.Amount,
			&transaction.Description, &transaction.Status, &recipientAccount,
			&recipientName, &senderAccount, &transaction.CreatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan transaction: %w", err)
		}

		if recipientAccount != nil {
			transaction.RecipientAccount = recipientAccount
		}
		if recipientName != nil {
			transaction.RecipientName = recipientName
		}
		if senderAccount != nil {
			transaction.SenderAccount = senderAccount
		}

		transactions = append(transactions, transaction)
	}

	return transactions, nil
}

// UpdateStatus updates transaction status
func (r *transactionRepository) UpdateStatus(ctx context.Context, id uuid.UUID, status string) error {
	query := `UPDATE transactions SET status = $2 WHERE id = $1`

	cmd, err := r.db.Exec(ctx, query, id, status)
	if err != nil {
		return fmt.Errorf("failed to update transaction status: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("transaction not found")
	}

	return nil
}