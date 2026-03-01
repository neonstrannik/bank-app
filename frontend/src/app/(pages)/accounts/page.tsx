"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { accountsAPI } from "@/lib/api";
import styles from "./accounts.module.css";

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  balance: number;
  currency: string;
  status: string;
  created_at: string;
}

export default function AccountsPage() {
  const { user, isAuthenticated } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAccountType, setNewAccountType] = useState<"checking" | "credit">(
    "checking",
  );

  // Загружаем счета пользователя
  useEffect(() => {
    if (user) {
      loadAccounts();
    }
  }, [user]);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const response = await accountsAPI.getUserAccounts(user!.id);
      setAccounts(response.data || []);
    } catch (err: any) {
      console.error("Ошибка загрузки счетов:", err);
      setError("Не удалось загрузить счета");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError("");

    try {
      const response = await accountsAPI.createAccount(
        user!.id,
        newAccountType,
      );

      setSuccess(
        `✅ ${newAccountType === "checking" ? "Дебетовый" : "Кредитный"} счет успешно создан!`,
      );

      // Добавляем новый счет в список
      setAccounts((prev) => [response.data, ...prev]);

      // Скрываем форму через 3 секунды
      setTimeout(() => {
        setSuccess("");
        setShowCreateForm(false);
      }, 3000);
    } catch (err: any) {
      console.error("Ошибка создания счета:", err);
      setError(err.response?.data?.error || "Не удалось создать счет");
    } finally {
      setCreating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getAccountTypeLabel = (type: string) => {
    return type === "checking" ? "💰 Дебетовый" : "💳 Кредитный";
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "✅ Активен";
      case "frozen":
        return "❄️ Заморожен";
      case "closed":
        return "🔒 Закрыт";
      default:
        return status;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>
          <p>Для просмотра счетов необходимо войти в систему</p>
          <Link href="/login" className={styles.loginButton}>
            Войти
          </Link>
        </div>
      </div>
    );
  }

  const totalBalance = accounts.reduce(
    (sum, acc) => sum + (acc.balance || 0),
    0,
  );

  return (
    <div className={styles.container}>
      <Link href="/dashboard" className={styles.backLink}>
        ← Назад
      </Link>

      <div className={styles.header}>
        <h1 className={styles.title}>Мои счета</h1>
        <button
          className={styles.createButton}
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "× Отмена" : "+ Новый счет"}
        </button>
      </div>

      {/* Общий баланс */}
      <div className={styles.totalBalanceCard}>
        <p className={styles.totalBalanceLabel}>Общий баланс</p>
        <p className={styles.totalBalanceValue}>
          {formatCurrency(totalBalance)}
        </p>
      </div>

      {/* Форма создания нового счета */}
      {showCreateForm && (
        <form onSubmit={handleCreateAccount} className={styles.createForm}>
          <h2>Создание нового счета</h2>

          <div className={styles.formGroup}>
            <label>Тип счета</label>
            <select
              value={newAccountType}
              onChange={(e) =>
                setNewAccountType(e.target.value as "checking" | "credit")
              }
              className={styles.select}
            >
              <option value="checking">💳 Дебетовый счет</option>
              <option value="credit">🏦 Кредитный счет</option>
            </select>
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => setShowCreateForm(false)}
            >
              Отмена
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={creating}
            >
              {creating ? "Создание..." : "Создать счет"}
            </button>
          </div>
        </form>
      )}

      {/* Список счетов */}
      {loading ? (
        <div className={styles.loading}>Загрузка счетов...</div>
      ) : accounts.length > 0 ? (
        <div className={styles.accountsList}>
          {accounts.map((account) => (
            <div key={account.id} className={styles.accountCard}>
              <div className={styles.accountHeader}>
                <div>
                  <h3>{getAccountTypeLabel(account.account_type)}</h3>
                  <p className={styles.accountNumber}>
                    {account.account_number}
                  </p>
                </div>
                <span className={`${styles.status} ${styles[account.status]}`}>
                  {getStatusLabel(account.status)}
                </span>
              </div>

              <div className={styles.accountBody}>
                <div className={styles.balance}>
                  <p className={styles.balanceLabel}>Баланс</p>
                  <p className={styles.balanceValue}>
                    {formatCurrency(account.balance)}
                  </p>
                </div>

                <div className={styles.accountFooter}>
                  <p className={styles.createdAt}>
                    Открыт: {formatDate(account.created_at)}
                  </p>
                  <Link
                    href={`/accounts/${account.id}`}
                    className={styles.detailsLink}
                  >
                    Подробнее →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>У вас пока нет открытых счетов</p>
          <button
            className={styles.emptyStateButton}
            onClick={() => setShowCreateForm(true)}
          >
            Открыть первый счет
          </button>
        </div>
      )}
    </div>
  );
}
