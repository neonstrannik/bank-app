"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

// Интерфейс пользователя из вашего бэкенда
interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

// Интерфейс для ответа от API
interface AuthResponse {
  token: string;
  user: User;
}

// Интерфейс для запроса логина
interface LoginRequest {
  email: string;
  password: string;
}

// Интерфейс для запроса регистрации
interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Проверяем сохраненную сессию при загрузке
  useEffect(() => {
    const token = Cookies.get("token");
    const savedUser = Cookies.get("user");

    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        Cookies.remove("token");
        Cookies.remove("user");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Логин с реальным API
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      setUser(user);
      router.push("/dashboard");
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || "Login failed";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Регистрация с реальным API
  const register = async (userData: RegisterRequest) => {
    setLoading(true);
    setError(null);

    try {
      console.log("📤 AuthContext отправляет:", userData);
      console.log("📤 URL:", `${API_URL}/register`);

      const response = await axios.post(`${API_URL}/register`, userData);

      console.log("📥 Ответ от сервера:", response.data);
      console.log("📥 Статус:", response.status);

      // После успешной регистрации - логинимся
      await login(userData.email, userData.password);
    } catch (err: any) {
      console.error("❌ Ошибка в AuthContext - полная информация:");

      let errorMessage = "Registration failed";

      if (err.response) {
        console.error("Статус:", err.response.status);
        console.error("Данные:", err.response.data);

        if (err.response.data) {
          if (err.response.data.details) {
            const details = err.response.data.details;
            const errorList = Object.values(details).join(", ");
            errorMessage = `${err.response.data.error || "Ошибка валидации"}: ${errorList}`;
          } else if (err.response.data.error) {
            errorMessage = err.response.data.error;
          } else if (err.response.data.message) {
            errorMessage = err.response.data.message;
          }
        }

        console.error("Заголовки:", err.response.headers);
      } else if (err.request) {
        console.error("Нет ответа от сервера. Request:", err.request);
        errorMessage = "Сервер недоступен. Проверьте подключение.";
      } else {
        console.error("Ошибка настройки запроса:", err.message);
        errorMessage = err.message;
      }

      console.error("Полная ошибка:", err);

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Выход
  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
