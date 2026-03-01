"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [localError, setLocalError] = useState("");
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.email || !formData.password) {
      setLocalError("Заполните все поля");
      return;
    }

    try {
      await login(formData.email, formData.password);
      // После успешного входа редирект на dashboard
      router.push("/dashboard");
    } catch (err: any) {
      // Ошибка уже будет в error из контекста
      console.error("Login error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const displayError = localError || error;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Добро пожаловать в V-банк</h1>
          <p className={styles.subtitle}>
            Войдите в свой аккаунт для доступа ко всем возможностям
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {displayError && (
            <div className={styles.errorMessage}>{displayError}</div>
          )}

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
            <label className={styles.label}>Пароль</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              placeholder="Введите пароль"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Вход..." : "Войти"}
          </button>

          <div className={styles.registerPrompt}>
            Нет аккаунта?
            <Link href="/register" className={styles.registerLink}>
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
