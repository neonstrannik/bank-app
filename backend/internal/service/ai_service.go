package service

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"
)

type AIService struct {
	ollamaURL string
	model     string
	client    *http.Client
}

type OllamaRequest struct {
	Model  string `json:"model"`
	Prompt string `json:"prompt"`
	Stream bool   `json:"stream"`
}

type OllamaResponse struct {
	Response   string `json:"response"`
	Text       string `json:"text"`
	Result     string `json:"result"`
	Completion string `json:"completion"`
	Choices    []struct {
		Text    string                 `json:"text"`
		Message map[string]interface{} `json:"message"`
	} `json:"choices"`
}

func NewAIService() *AIService {
	ollamaHost := os.Getenv("OLLAMA_HOST")
	if ollamaHost == "" {
		ollamaHost = "http://ollama:11434"
	}
	return &AIService{
		ollamaURL: strings.TrimRight(ollamaHost, "/") + "/api/generate",
		model:     "deepseek-r1:1.5b",
		client: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

func (s *AIService) Chat(prompt string) (string, error) {
	reqBody := OllamaRequest{
		Model:  s.model,
		Prompt: prompt,
		Stream: false,
	}

	jsonData, err := json.Marshal(reqBody)
	if err != nil {
		return "", err
	}

	maxRetries := 3
	var lastErr error

	for attempt := 1; attempt <= maxRetries; attempt++ {
		resp, err := s.client.Post(s.ollamaURL, "application/json", bytes.NewBuffer(jsonData))
		if err != nil {
			lastErr = err
			if attempt < maxRetries && shouldRetry(err) {
				time.Sleep(time.Duration(attempt) * time.Second)
				continue
			}
			return "", err
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			lastErr = err
			if attempt < maxRetries && shouldRetry(err) {
				time.Sleep(time.Duration(attempt) * time.Second)
				continue
			}
			return "", err
		}

		if resp.StatusCode != http.StatusOK {
			lastErr = fmt.Errorf("ollama returned status %d: %s", resp.StatusCode, strings.TrimSpace(string(body)))
			if attempt < maxRetries && (resp.StatusCode == http.StatusBadGateway || resp.StatusCode == http.StatusServiceUnavailable || resp.StatusCode == http.StatusGatewayTimeout) {
				time.Sleep(time.Duration(attempt) * time.Second)
				continue
			}
			return "", lastErr
		}

		var ollamaResp OllamaResponse
		if err := json.Unmarshal(body, &ollamaResp); err != nil {
			lastErr = fmt.Errorf("failed to decode ollama response: %w; body=%s", err, strings.TrimSpace(string(body)))
			if attempt < maxRetries && shouldRetry(err) {
				time.Sleep(time.Duration(attempt) * time.Second)
				continue
			}
			return "", lastErr
		}

		if answer := strings.TrimSpace(ollamaResp.Response); answer != "" {
			return answer, nil
		}

		if answer := strings.TrimSpace(ollamaResp.Text); answer != "" {
			return answer, nil
		}

		if answer := strings.TrimSpace(ollamaResp.Result); answer != "" {
			return answer, nil
		}

		if answer := strings.TrimSpace(ollamaResp.Completion); answer != "" {
			return answer, nil
		}

		if len(ollamaResp.Choices) > 0 {
			if text := strings.TrimSpace(ollamaResp.Choices[0].Text); text != "" {
				return text, nil
			}
			if messageText, ok := ollamaResp.Choices[0].Message["text"].(string); ok && strings.TrimSpace(messageText) != "" {
				return strings.TrimSpace(messageText), nil
			}
		}

		if len(body) > 0 {
			clean := strings.TrimSpace(string(body))
			if clean != "" {
				return clean, nil
			}
		}

		if attempt < maxRetries {
			time.Sleep(time.Duration(attempt) * time.Second)
			continue
		}

		return "", fmt.Errorf("ollama returned an empty response")
	}

	return "", lastErr
}

func shouldRetry(err error) bool {
	if err == nil {
		return false
	}

	msg := strings.ToLower(err.Error())
	return strings.Contains(msg, "connection refused") || strings.Contains(msg, "eof") || strings.Contains(msg, "timeout") || strings.Contains(msg, "temporary")
}

// Финансовый анализ с DeepSeek-R1
func (s *AIService) GetFinancialAnalysis(userData map[string]interface{}) (string, error) {
	prompt := fmt.Sprintf(`
Ты финансовый эксперт. Проанализируй данные клиента и дай конкретные рекомендации:

Данные клиента:
%s

Ответь кратко, по делу. Дай 3-4 конкретных совета по улучшению финансового положения.`, userData)

	return s.Chat(prompt)
}

// GetFinancialAdvice возвращает финансовый совет на основе дохода, расходов и накоплений.
func (s *AIService) GetFinancialAdvice(income, expenses, savings int) (string, error) {
	prompt := fmt.Sprintf(`
Ты финансовый эксперт. Проанализируй финансовые данные клиента и предложи рекомендации:

Доход: %d
Расходы: %d
Накопления: %d

Ответь кратко и по делу. Дай 3-4 конкретных совета по улучшению финансового состояния.`, income, expenses, savings)

	return s.Chat(prompt)
}

// Банковский консультант
func (s *AIService) BankConsultant(question string) (string, error) {
	prompt := fmt.Sprintf(`
Ты консультант банка. Ответь на вопрос клиента профессионально и дружелюбно.

Вопрос: %s

Ответ:`, question)

	return s.Chat(prompt)
}