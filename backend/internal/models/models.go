package models

import (
	"time"

	"github.com/google/uuid"
)

// User представляет пользователя банка
type User struct {
	ID        uuid.UUID `json:"id" db:"id"`
	Email     string    `json:"email" db:"email"`
	Password  string    `json:"-" db:"password_hash"` // "-" скрывает поле в JSON
	FirstName string    `json:"first_name" db:"first_name"`
	LastName  string    `json:"last_name" db:"last_name"`
	Phone     string    `json:"phone" db:"phone"`
	CreatedAt time.Time `json:"created_at" db:"created_at"`
	UpdatedAt time.Time `json:"updated_at" db:"updated_at"`
}

// Account представляет банковский счет
type Account struct {
	ID            uuid.UUID `json:"id" db:"id"`
	UserID        uuid.UUID `json:"user_id" db:"user_id"`
	AccountNumber string    `json:"account_number" db:"account_number"`
	AccountType   string    `json:"account_type" db:"account_type"` // checking, credit
	Balance       float64   `json:"balance" db:"balance"`
	Currency      string    `json:"currency" db:"currency"`
	Status        string    `json:"status" db:"status"` // active, frozen, closed
	CreatedAt     time.Time `json:"created_at" db:"created_at"`
	UpdatedAt     time.Time `json:"updated_at" db:"updated_at"`
}

// Card представляет банковскую карту
// Card представляет банковскую карту
type Card struct {
    ID         uuid.UUID `json:"id" db:"id"`
    UserID     uuid.UUID `json:"user_id" db:"user_id"`
    AccountID  uuid.UUID `json:"account_id" db:"account_id"`
    CardName   string    `json:"card_name" db:"card_name"`
    CardType   string    `json:"card_type" db:"card_type"`
    CardNumber string    `json:"card_number" db:"card_number"`
    ExpiryDate string    `json:"expiry_date" db:"expiry_date"` // Должно быть string
    CVV        string    `json:"cvv,omitempty" db:"cvv"`
    Status     string    `json:"status" db:"status"`
    Benefits   []string  `json:"benefits" db:"benefits"`
    ImageURL   string    `json:"image_url" db:"image_url"`
    CreatedAt  time.Time `json:"created_at" db:"created_at"`
    UpdatedAt  time.Time `json:"updated_at" db:"updated_at"`
}

// Transaction представляет транзакцию
type Transaction struct {
    ID               uuid.UUID  `json:"id" db:"id"`
    AccountID        uuid.UUID  `json:"account_id" db:"account_id"`
    Type             string     `json:"type" db:"type"`
    Amount           float64    `json:"amount" db:"amount"`
    Description      string     `json:"description" db:"description"`
    Status           string     `json:"status" db:"status"`
    RecipientAccount *string    `json:"recipient_account,omitempty" db:"recipient_account"`
    RecipientName    *string    `json:"recipient_name,omitempty" db:"recipient_name"`
    SenderAccount    *string    `json:"sender_account,omitempty" db:"sender_account"` // <-- Добавь это
    CreatedAt        time.Time  `json:"created_at" db:"created_at"`
}

// CreditHistory представляет кредитную историю
type CreditHistory struct {
	ID              uuid.UUID `json:"id" db:"id"`
	UserID          uuid.UUID `json:"user_id" db:"user_id"`
	AccountID       *uuid.UUID `json:"account_id,omitempty" db:"account_id"`
	CreditAmount    float64   `json:"credit_amount" db:"credit_amount"`
	InterestRate    float64   `json:"interest_rate" db:"interest_rate"`
	TermMonths      int       `json:"term_months" db:"term_months"`
	MonthlyPayment  float64   `json:"monthly_payment" db:"monthly_payment"`
	RemainingAmount float64   `json:"remaining_amount" db:"remaining_amount"`
	Status          string    `json:"status" db:"status"` // active, paid, overdue
	ApprovedAt      *time.Time `json:"approved_at,omitempty" db:"approved_at"`
	DueDate         *time.Time `json:"due_date,omitempty" db:"due_date"`
	CreatedAt       time.Time `json:"created_at" db:"created_at"`
	UpdatedAt       time.Time `json:"updated_at" db:"updated_at"`
}

// Transfer представляет перевод между счетами
type Transfer struct {
	ID                 uuid.UUID `json:"id" db:"id"`
	SenderAccountID    uuid.UUID `json:"sender_account_id" db:"sender_account_id"`
	RecipientAccountID uuid.UUID `json:"recipient_account_id" db:"recipient_account_id"`
	Amount             float64   `json:"amount" db:"amount"`
	Description        string    `json:"description" db:"description"`
	Commission         float64   `json:"commission" db:"commission"`
	Status             string    `json:"status" db:"status"` // pending, completed, failed
	CreatedAt          time.Time `json:"created_at" db:"created_at"`
}

// Для запросов API

// CreateUserRequest запрос на создание пользователя
type CreateUserRequest struct {
    Email     string `json:"email" binding:"required,email"`
    Password  string `json:"password" binding:"required,min=6,max=72"`
    FirstName string `json:"first_name" binding:"required,min=2,max=50"`
    LastName  string `json:"last_name" binding:"required,min=2,max=50"`
    Phone     string `json:"phone" binding:"required"`
}
// LoginRequest запрос на вход
type LoginRequest struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

// AuthResponse ответ с токеном
type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}
// CreateAccountRequest запрос на создание счета
type CreateAccountRequest struct {
	AccountType string `json:"account_type" binding:"required,oneof=checking credit"`
}


type CreateCardRequest struct {
	AccountID  uuid.UUID `json:"account_id" binding:"required"`
	CardName   string    `json:"card_name" binding:"required"`
	CardType   string    `json:"card_type" binding:"required,oneof=debit credit premium"`
	Benefits   []string  `json:"benefits"`
	ImageURL   string    `json:"image_url"`
	ExpiryDate string    `json:"expiry_date" binding:"required"` // <-- Добавьте эту строку
}

// UpdateUserRequest запрос на обновление профиля
type UpdateUserRequest struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Phone     string `json:"phone"`
}

// CreditRequest запрос на кредит
type CreditRequest struct {
	Amount      float64 `json:"amount" binding:"required,min=1000"`
	TermMonths  int     `json:"term_months" binding:"required,min=1,max=60"`
}

// CreditCalculation результат расчета кредита
type CreditCalculation struct {
	Amount         float64 `json:"amount"`
	InterestRate   float64 `json:"interest_rate"`
	TermMonths     int     `json:"term_months"`
	MonthlyPayment float64 `json:"monthly_payment"`
	TotalPayment   float64 `json:"total_payment"`
	Overpayment    float64 `json:"overpayment"`
}
// DepositRequest запрос на пополнение счета
type DepositRequest struct {
	Amount float64 `json:"amount" binding:"required,min=1"`
}
