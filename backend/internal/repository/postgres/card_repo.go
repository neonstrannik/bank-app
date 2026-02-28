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

type cardRepository struct {
	db *pgxpool.Pool
}

// NewCardRepository creates a new card repository
func NewCardRepository(db *pgxpool.Pool) *cardRepository {
	return &cardRepository{db: db}
}

// Create inserts a new card into the database
func (r *cardRepository) Create(ctx context.Context, card *models.Card) error {
	query := `
		INSERT INTO cards (id, user_id, account_id, card_name, card_type, card_number, 
		                  expiry_date, cvv, status, benefits, image_url, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
	`

	_, err := r.db.Exec(ctx, query,
		card.ID, card.UserID, card.AccountID, card.CardName, card.CardType,
		card.CardNumber, card.ExpiryDate, card.CVV, card.Status,
		card.Benefits, card.ImageURL, card.CreatedAt, card.UpdatedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to create card: %w", err)
	}

	return nil
}

// GetByID retrieves a card by ID
func (r *cardRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.Card, error) {
	query := `
		SELECT id, user_id, account_id, card_name, card_type, card_number, 
		       expiry_date, cvv, status, benefits, image_url, created_at, updated_at
		FROM cards
		WHERE id = $1
	`

	var card models.Card
	var accountID *uuid.UUID

	err := r.db.QueryRow(ctx, query, id).Scan(
		&card.ID, &card.UserID, &accountID, &card.CardName, &card.CardType,
		&card.CardNumber, &card.ExpiryDate, &card.CVV, &card.Status,
		&card.Benefits, &card.ImageURL, &card.CreatedAt, &card.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get card by ID: %w", err)
	}

	if accountID != nil {
		card.AccountID = *accountID
	}

	return &card, nil
}

// GetByUserID retrieves all cards for a user
func (r *cardRepository) GetByUserID(ctx context.Context, userID uuid.UUID) ([]models.Card, error) {
	query := `
		SELECT id, user_id, account_id, card_name, card_type, card_number, 
		       expiry_date, cvv, status, benefits, image_url, created_at, updated_at
		FROM cards
		WHERE user_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, userID)
	if err != nil {
		return nil, fmt.Errorf("failed to get cards by user ID: %w", err)
	}
	defer rows.Close()

	var cards []models.Card
	for rows.Next() {
		var card models.Card
		var accountID *uuid.UUID

		err := rows.Scan(
			&card.ID, &card.UserID, &accountID, &card.CardName, &card.CardType,
			&card.CardNumber, &card.ExpiryDate, &card.CVV, &card.Status,
			&card.Benefits, &card.ImageURL, &card.CreatedAt, &card.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan card: %w", err)
		}

		if accountID != nil {
			card.AccountID = *accountID
		}

		cards = append(cards, card)
	}

	return cards, nil
}

// GetByAccountID retrieves all cards for an account
func (r *cardRepository) GetByAccountID(ctx context.Context, accountID uuid.UUID) ([]models.Card, error) {
	query := `
		SELECT id, user_id, account_id, card_name, card_type, card_number, 
		       expiry_date, cvv, status, benefits, image_url, created_at, updated_at
		FROM cards
		WHERE account_id = $1
		ORDER BY created_at DESC
	`

	rows, err := r.db.Query(ctx, query, accountID)
	if err != nil {
		return nil, fmt.Errorf("failed to get cards by account ID: %w", err)
	}
	defer rows.Close()

	var cards []models.Card
	for rows.Next() {
		var card models.Card
		var accID *uuid.UUID

		err := rows.Scan(
			&card.ID, &card.UserID, &accID, &card.CardName, &card.CardType,
			&card.CardNumber, &card.ExpiryDate, &card.CVV, &card.Status,
			&card.Benefits, &card.ImageURL, &card.CreatedAt, &card.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan card: %w", err)
		}

		if accID != nil {
			card.AccountID = *accID
		}

		cards = append(cards, card)
	}

	return cards, nil
}

// Update updates an existing card
func (r *cardRepository) Update(ctx context.Context, card *models.Card) error {
	query := `
		UPDATE cards
		SET card_name = $3, card_type = $4, status = $5, benefits = $6, updated_at = $7
		WHERE id = $1 AND user_id = $2
	`

	cmd, err := r.db.Exec(ctx, query,
		card.ID, card.UserID, card.CardName, card.CardType,
		card.Status, card.Benefits, card.UpdatedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to update card: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("card not found")
	}

	return nil
}

// Delete removes a card by ID
func (r *cardRepository) Delete(ctx context.Context, id uuid.UUID) error {
	query := `DELETE FROM cards WHERE id = $1`

	cmd, err := r.db.Exec(ctx, query, id)
	if err != nil {
		return fmt.Errorf("failed to delete card: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("card not found")
	}

	return nil
}