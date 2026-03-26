"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import styles from "./register.module.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    first_name: "", // Изменено с firstName на first_name
    last_name: "", // Изменено с lastName на last_name
  });

  const [localError, setLocalError] = useState("");
  const { register, loading, error } = useAuth(); // Используем register из контекста

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    try {
      console.log("📤 Отправляемые данные:", formData);

      // Вызываем register из контекста
      await register(formData);

      console.log("✅ Регистрация успешна");
    } catch (err: any) {
      console.error("❌ Ошибка регистрации:", err);
      console.error("Детали ошибки:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Объединяем локальную ошибку и ошибку из контекста
  const displayError = localError || error;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добро пожаловать в V-банк</h1>
          <p className={styles.subtitle}>
            Создайте аккаунт для доступа ко всем возможностям
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {displayError && (
            <div className={styles.errorMessage}>{displayError}</div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Имя</label>
            <input
              type="text"
              name="first_name" // Изменено с firstName
              value={formData.first_name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введите ваше имя"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Фамилия</label>
            <input
              type="text"
              name="last_name" // Изменено с lastName
              value={formData.last_name}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введите вашу фамилию"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={styles.input}
              placeholder="+79991234567"
              required
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Не менее 6 символов"
              minLength={6}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Регистрация..." : "Создать аккаунт"}
          </button>

          <div className={styles.loginPrompt}>
            Уже есть аккаунт?
            <Link href="/login" className={styles.loginLink}>
              Войти
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
