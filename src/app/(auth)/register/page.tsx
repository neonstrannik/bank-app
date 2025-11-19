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
    firstName: "",
    lastName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка регистрации");
      }

      login(data.user, data.token);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
                <Link href="/" className={styles.backLink}>
            ← Назад
          </Link>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добро пожаловать в V-банк</h1>
          <p className={styles.subtitle}>
            Создайте аккаунт для доступа ко всем возможностям
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                color: "#ff4757",
                backgroundColor: "rgba(255, 71, 87, 0.1)",
                padding: "12px",
                borderRadius: "8px",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.label}>Имя</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
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
              name="lastName"
              value={formData.lastName}
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
              placeholder="+7 (XXX) XXX-XX-XX"
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
