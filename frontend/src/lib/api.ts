import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Добавляем токен к каждому запросу
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Типы для ответов
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
}

// API функции
export const authAPI = {
  register: (data: RegisterRequest) =>
    api.post<{ message: string; user: User }>("/register", data),

  login: (data: LoginRequest) => api.post<AuthResponse>("/login", data),

  getProfile: (userId: string) => api.get<User>(`/users/${userId}`),
};

export const accountsAPI = {
  getUserAccounts: (userId: string) => api.get(`/users/${userId}/accounts`),

  createAccount: (userId: string, type: string) =>
    api.post(`/users/${userId}/accounts`, { account_type: type }),
  deposit: (accountId: string, amount: number) =>
    api.post(`/accounts/${accountId}/deposit`, { amount }),
  withdraw: (accountId: string, amount: number) =>
    api.post(`/accounts/${accountId}/withdraw`, { amount }),
};

export const cardsAPI = {
  getUserCards: (userId: string) => api.get(`/users/${userId}/cards`),

  createCard: (userId: string, data: any) => {
    console.log("API createCard получает:", data);
    return api.post(`/users/${userId}/cards`, data);
  },
};

export const creditAPI = {
  applyCredit: (
    accountId: string,
    amount: number,
    term: number,
    rate: number,
  ) =>
    api.post("/credit/apply", {
      account_id: accountId,
      amount: amount,
      term: term,
      rate: rate,
    }),
};
