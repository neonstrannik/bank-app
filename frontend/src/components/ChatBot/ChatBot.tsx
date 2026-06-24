"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/app/(auth)/context/AuthContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Привет! Я AI-ассистент V-банка. Чем могу помочь? Задайте вопрос о кредитах, картах или переводах!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage: Message = {
    id: Date.now().toString(),
    role: "user",
    content: input,
    timestamp: new Date(),
  };
  setMessages(prev => [...prev, userMessage]);
  const currentInput = input;
  setInput("");
  setLoading(true);
  setShowSuggestions(false);

  try {
    console.log("📤 Отправка запроса:", currentInput);
    
    const response = await fetch("http://localhost:8080/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: currentInput }),
    });

    console.log("📥 Статус ответа:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("📥 Данные ответа:", data);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: data.response || "Извините, произошла ошибка.",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, assistantMessage]);
    
  } catch (error) {
    console.error("❌ Ошибка:", error);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "⚠️ Сервис временно недоступен. Пожалуйста, попробуйте позже.",
      timestamp: new Date(),
    }]);
  } finally {
    setLoading(false);
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    "Как оформить кредитную карту?",
    "Какие условия по кэшбэку?",
    "Как сделать перевод?",
    "Что такое инвестиции?",
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Кнопка чата */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #00ccff, #00ff99)",
          border: "none",
          cursor: "pointer",
          zIndex: 1000,
          boxShadow: "0 4px 20px rgba(0, 204, 255, 0.4)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(0, 204, 255, 0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 204, 255, 0.4)";
        }}
      >
        <span style={{ fontSize: "28px" }}>💬</span>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "rgba(0, 255, 204, 0.5)",
            animation: "pulse 2s infinite",
            zIndex: -1,
          }}
        />
      </button>

      {/* Окно чата */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            width: "400px",
            height: "600px",
            background: "linear-gradient(135deg, #1a2a3a, #0f1a24)",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 255, 204, 0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 1001,
            animation: "slideUp 0.3s ease",
          }}
        >
          {/* Шапка */}
          <div
            style={{
              background: "linear-gradient(135deg, #00ccff, #0077ff)",
              padding: "16px 20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                }}
              >
                🤖
              </div>
              <div>
                <h3 style={{ color: "white", fontSize: "16px", margin: 0 }}>
                  AI Ассистент
                </h3>
                <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "11px", margin: "2px 0 0" }}>
                  Онлайн • отвечаю мгновенно
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                padding: "4px 8px",
                borderRadius: "8px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              ✕
            </button>
          </div>

          {/* Сообщения */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    borderRadius: "18px",
                    background: msg.role === "user"
                      ? "linear-gradient(135deg, #00ccff, #00ff99)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: msg.role === "user" ? "#0b1020" : "#e0f7ff",
                  }}
                >
                  <span style={{ fontSize: "14px", lineHeight: "1.4" }}>
                    {msg.content}
                  </span>
                  <div style={{ fontSize: "10px", marginTop: "4px", opacity: 0.5 }}>
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 14px",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "18px",
                    display: "flex",
                    gap: "4px",
                  }}
                >
                  <span style={{ width: "8px", height: "8px", background: "#00ffcc", borderRadius: "50%", animation: "typing 1.4s infinite" }} />
                  <span style={{ width: "8px", height: "8px", background: "#00ffcc", borderRadius: "50%", animation: "typing 1.4s infinite 0.2s" }} />
                  <span style={{ width: "8px", height: "8px", background: "#00ffcc", borderRadius: "50%", animation: "typing 1.4s infinite 0.4s" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Быстрые вопросы */}
          {showSuggestions && messages.length < 2 && (
            <div
              style={{
                padding: "12px 16px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(10, 20, 30, 0.5)",
              }}
            >
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  style={{
                    padding: "6px 12px",
                    background: "rgba(0, 204, 255, 0.1)",
                    border: "1px solid rgba(0, 204, 255, 0.3)",
                    borderRadius: "20px",
                    color: "#00ffcc",
                    fontSize: "12px",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0, 204, 255, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(0, 204, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Ввод */}
          <div
            style={{
              padding: "12px 16px",
              display: "flex",
              gap: "8px",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(10, 20, 30, 0.5)",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите ваш вопрос..."
              disabled={loading}
              style={{
                flex: 1,
                padding: "10px 14px",
                background: "rgba(255, 255, 255, 0.1)",
                border: "none",
                borderRadius: "20px",
                color: "white",
                fontSize: "14px",
                outline: "none",
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #00ccff, #00ff99)",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                fontSize: "18px",
                transition: "transform 0.3s",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              📤
            </button>
          </div>
        </div>
      )}

      {/* Анимации */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }
          30% {
            transform: translateY(-8px);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}