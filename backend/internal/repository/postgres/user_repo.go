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

type userRepository struct {
	db *pgxpool.Pool
}

// NewUserRepository создает репозиторий пользователей
func NewUserRepository(db *pgxpool.Pool) *userRepository {
	return &userRepository{db: db}
}

// Create добавляет нового пользователя в базу данных
func (r *userRepository) Create(ctx context.Context, user *models.User) error {
	query := `
		INSERT INTO users (id, email, password_hash, first_name, last_name, phone, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`

	_, err := r.db.Exec(ctx, query,
		user.ID, user.Email, user.Password, user.FirstName,
		user.LastName, user.Phone, user.CreatedAt, user.UpdatedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to create user: %w", err)
	}

	return nil
}

// GetByID получает пользователя по ID
func (r *userRepository) GetByID(ctx context.Context, id uuid.UUID) (*models.User, error) {
	query := `
		SELECT id, email, password_hash, first_name, last_name, phone, created_at, updated_at
		FROM users
		WHERE id = $1
	`

	var user models.User
	err := r.db.QueryRow(ctx, query, id).Scan(
		&user.ID, &user.Email, &user.Password, &user.FirstName,
		&user.LastName, &user.Phone, &user.CreatedAt, &user.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil // пользователь не найден
		}
		return nil, fmt.Errorf("failed to get user by ID: %w", err)
	}

	return &user, nil
}

// GetByEmail получает пользователя по email
func (r *userRepository) GetByEmail(ctx context.Context, email string) (*models.User, error) {
	query := `
		SELECT id, email, password_hash, first_name, last_name, phone, created_at, updated_at
		FROM users
		WHERE email = $1
	`

	var user models.User
	err := r.db.QueryRow(ctx, query, email).Scan(
		&user.ID, &user.Email, &user.Password, &user.FirstName,
		&user.LastName, &user.Phone, &user.CreatedAt, &user.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil // пользователь не найден
		}
		return nil, fmt.Errorf("failed to get user by email: %w", err)
	}

	return &user, nil
}

// Update обновляет существующего пользователя
func (r *userRepository) Update(ctx context.Context, user *models.User) error {
	query := `
		UPDATE users
		SET email = $2, first_name = $3, last_name = $4, phone = $5, updated_at = $6
		WHERE id = $1
	`

	cmd, err := r.db.Exec(ctx, query,
		user.ID, user.Email, user.FirstName, user.LastName,
		user.Phone, user.UpdatedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to update user: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("user not found")
	}

	return nil
}

// Delete удаляет пользователя по ID
func (r *userRepository) Delete(ctx context.Context, id uuid.UUID) error {
	query := `DELETE FROM users WHERE id = $1`

	cmd, err := r.db.Exec(ctx, query, id)
	if err != nil {
		return fmt.Errorf("failed to delete user: %w", err)
	}

	if cmd.RowsAffected() == 0 {
		return errors.New("user not found")
	}

	return nil
}

// List возвращает список пользователей с пагинацией
func (r *userRepository) List(ctx context.Context, limit, offset int) ([]models.User, error) {
	query := `
		SELECT id, email, first_name, last_name, phone, created_at, updated_at
		FROM users
		ORDER BY created_at DESC
		LIMIT $1 OFFSET $2
	`

	rows, err := r.db.Query(ctx, query, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("failed to list users: %w", err)
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var user models.User
		err := rows.Scan(
			&user.ID, &user.Email, &user.FirstName,
			&user.LastName, &user.Phone, &user.CreatedAt, &user.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan user: %w", err)
		}
		users = append(users, user)
	}

	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating users: %w", err)
	}

	return users, nil
}
// GetByPhone получает пользователя по номеру телефона
func (r *userRepository) GetByPhone(ctx context.Context, phone string) (*models.User, error) {
    query := `
        SELECT id, email, password_hash, first_name, last_name, phone, created_at, updated_at
        FROM users
        WHERE phone = $1
    `

    var user models.User
    err := r.db.QueryRow(ctx, query, phone).Scan(
        &user.ID, &user.Email, &user.Password, &user.FirstName,
        &user.LastName, &user.Phone, &user.CreatedAt, &user.UpdatedAt,
    )

    if err != nil {
        if errors.Is(err, pgx.ErrNoRows) {
            return nil, nil
        }
        return nil, fmt.Errorf("failed to get user by phone: %w", err)
    }

    return &user, nil
}