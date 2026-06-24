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

type accountRepository struct {
	db *pgxpool.Pool
}

// NewAccountRepository создает репозиторий счетов
func NewAccountRepository(db *pgxpool.Pool) *accountRepository {
	return &accountRepository{db: db}
}

// Create добавляет новый счет в базу данных
func (r *accountRepository) Create(ctx context.Context, account *models.Account) error {
	query := `
		INSERT INTO accounts (id, user_id, account_number, account_type, balance, currency, status, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
	`

	_, err := r.db.Exec(ctx, query,
		account.ID, account.UserID, account.AccountNumber, account.AccountType,
		account.Balance, account.Currency, account.Status, account.CreatedAt, account.UpdatedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to create account: %w", err)
	}

	return nil
}

// GetByID получает счет по ID
func (r *accountRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Account, error) {
	query := `
		SELECT id, user_id, account_number, account_type, balance, currency, status, created_at, updated_at
		FROM accounts
		WHERE id = $1
	`

	var account models.Account
	err := r.db.QueryRow(ctx, query, id).Scan(
		&account.ID, &account.UserID, &account.AccountNumber, &account.AccountType,
		&account.Balance, &account.Currency, &account.Status, &account.CreatedAt, &account.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get account by ID: %w", err)
	}

	return &account, nil
}

// GetByUserID получает все счета пользователя
func (r *accountRepository) GetByUserID(ctx context.Context, userID uuid.UUID) ([]models.Account, error) {
	query := `
		SELECT id, user_id, account_number, account_type, balance, currency, status, created_at, updated_at
		FROM accounts
		WHERE user_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get accounts by user ID: %w", err)
	}
	defer rows.Close()

	var accounts []models.Account
	for rows.Next() {
		var account models.Account
		err := rows.Scan(
			&account.ID, &account.UserID, &account.AccountNumber, &account.AccountType,
			&account.Balance, &account.Currency, &account.Status, &account.CreatedAt, &account.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan account: %w", err)
		}
		accounts = append(accounts, account)
	}

	return accounts, nil
}

// GetByNumber получает счет по номеру счета
func (r *accountRepository) GetByNumber(ctx context.Context, accountNumber string) (*models.Account, error) {
	query := `
		SELECT id, user_id, account_number, account_type, balance, currency, status, created_at, updated_at
		FROM accounts
		WHERE account_number = $1
	`

	var account models.Account
	err := r.db.QueryRow(ctx, query, accountNumber).Scan(
		&account.ID, &account.UserID, &account.AccountNumber, &account.AccountType,
		&account.Balance, &account.Currency, &account.Status, &account.CreatedAt, &account.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get account by number: %w", err)
	}

	return &account, nil
}

// UpdateBalance обновляет баланс счета
func (r *accountRepository) UpdateBalance(ctx context.Context, id uuid.UUID, amount float64) error {
	query := `
		UPDATE accounts
		SET balance = balance + $2, updated_at = NOW()
		WHERE id = $1
	`

	cmd, err := r.db.Exec(ctx, query, id, amount)
	if err != nil {
		return fmt.Errorf("failed to update balance: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("account not found")
	}

	return nil
}

// Update обновляет существующий счет
func (r *accountRepository) Update(ctx context.Context, account *models.Account) error {
	query := `
		UPDATE accounts
		SET account_type = $3, balance = $4, currency = $5, status = $6, updated_at = $7
		WHERE id = $1 AND user_id = $2
	`

	cmd, err := r.db.Exec(ctx, query,
		account.ID, account.UserID, account.AccountType,
		account.Balance, account.Currency, account.Status, account.UpdatedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to update account: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("account not found")
	}

	return nil
}

// Delete удаляет счет по ID
func (r *accountRepository) Delete(ctx context.Context, id uuid.UUID) error {
	query := `DELETE FROM accounts WHERE id = $1`

	cmd, err := r.db.Exec(ctx, query, id)
	if err != nil {
		return fmt.Errorf("failed to delete account: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("account not found")
	}

	return nil
}
// Deposit увеличивает баланс счета
func (r *accountRepository) Deposit(ctx context.Context, id uuid.UUID, amount float64) error {
	query := `
		UPDATE accounts
		SET balance = balance + $2, updated_at = NOW()
		WHERE id = $1 AND status = 'active'
	`

	cmd, err := r.db.Exec(ctx, query, id, amount)
	if err != nil {
		return fmt.Errorf("failed to deposit: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("account not found or not active")
	}

	return nil
}
// Withdraw списывает деньги со счета
func (r *accountRepository) Withdraw(ctx context.Context, id uuid.UUID, amount float64) error {
	query := `
		UPDATE accounts
		SET balance = balance - $2, updated_at = NOW()
		WHERE id = $1 AND status = 'active' AND balance >= $2
	`

	cmd, err := r.db.Exec(ctx, query, id, amount)
	if err != nil {
		return fmt.Errorf("failed to withdraw: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("insufficient funds or account not active")
	}

	return nil
}