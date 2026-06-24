"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useRouter } from "next/navigation";
import { accountsAPI, api } from "@/lib/api";
import styles from "./transfer.module.css";

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  balance: number;
  currency: string;
  status: string;
}

interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export default function TransferPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [step, setStep] = useState<"form" | "confirm">("form");

  const [recipient, setRecipient] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user) {
      loadAccounts();
    }
  }, [user, isAuthenticated, router]);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const response = await accountsAPI.getUserAccounts(user!.id);
      setAccounts(response.data || []);

      if (response.data && response.data.length > 0) {
        setSelectedAccount(response.data[0].id);
      }
    } catch (error) {
      console.error("Ошибка загрузки счетов:", error);
      setErrorMessage("Не удалось загрузить счета");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchRecipient = async () => {
    if (!phone) {
      setErrorMessage("Введите номер телефона");
      return;
    }

    // Базовая проверка формата телефона
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setErrorMessage("Неверный формат телефона");
      return;
    }

    try {
      setSearching(true);
      setErrorMessage("");

      const response = await api.get(
        `/users/by-phone/${encodeURIComponent(phone)}`,
      );
      setRecipient(response.data);
    } catch (error: any) {
      console.error("Ошибка поиска:", error);
      if (error.response?.status === 404) {
        setErrorMessage("Пользователь с таким номером не найден");
      } else {
        setErrorMessage("Ошибка при поиске пользователя");
      }
      setRecipient(null);
    } finally {
      setSearching(false);
    }
  };

  const handleNext = () => {
    if (!selectedAccount) {
      setErrorMessage("Выберите счет списания");
      return;
    }
    if (!recipient) {
      setErrorMessage("Найдите получателя");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Введите сумму перевода");
      return;
    }

    const selectedAcc = accounts.find((a) => a.id === selectedAccount);
    if (selectedAcc && parseFloat(amount) > selectedAcc.balance) {
      setErrorMessage("Недостаточно средств на счете");
      return;
    }

    setStep("confirm");
    setErrorMessage("");
  };

  const handleTransfer = async () => {
    try {
      setProcessing(true);
      setErrorMessage("");

      const response = await api.post(`/accounts/${selectedAccount}/transfer`, {
        to_phone: recipient!.phone,
        amount: parseFloat(amount),
        description:
          description ||
          `Перевод ${recipient!.first_name} ${recipient!.last_name}`,
      });

      console.log("✅ Перевод выполнен:", response.data);

      setSuccessMessage(`✅ Перевод на сумму ${amount} ₽ успешно выполнен!`);

      // Обновляем баланс счета в интерфейсе
      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === selectedAccount
            ? { ...acc, balance: acc.balance - parseFloat(amount) }
            : acc,
        ),
      );

      // Возвращаем форму в исходное состояние
      setTimeout(() => {
        setStep("form");
        setPhone("");
        setAmount("");
        setDescription("");
        setRecipient(null);
        setSuccessMessage("");
      }, 3000);
    } catch (error: any) {
      console.error("❌ Ошибка перевода:", error);
      setErrorMessage(
        error.response?.data?.error || "Не удалось выполнить перевод",
      );
    } finally {
      setProcessing(false);
    }
  };

  const handleBack = () => {
    setStep("form");
    setErrorMessage("");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!isAuthenticated) {
    return null;
  }

  const selectedAccountData = accounts.find((a) => a.id === selectedAccount);

  return (
    <div className={styles.container}>
      <Link href="/dashboard" className={styles.backLink}>
        ← Назад
      </Link>

      <div className={styles.content}>
        <h1 className={styles.title}>Перевод по номеру телефона</h1>

        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        {loading ? (
          <div className={styles.loading}>Загрузка счетов...</div>
        ) : accounts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>У вас нет счетов для перевода</p>
            <Link href="/accounts" className={styles.createAccountLink}>
              Создать счет
            </Link>
          </div>
        ) : (
          <div className={styles.transferCard}>
            {step === "form" ? (
              /* Шаг 1: данные перевода */
              <div className={styles.formStep}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Счет списания</label>
                  <select
                    value={selectedAccount}
                    onChange={(e) => setSelectedAccount(e.target.value)}
                    className={styles.select}
                    disabled={processing}
                  >
                    {accounts.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.account_type === "checking" ? "💳" : "🏦"}
                        {account.account_number} — Баланс:{" "}
                        {formatCurrency(account.balance)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Номер телефона получателя
                  </label>
                  <div className={styles.phoneSearch}>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+79991234567"
                      className={styles.input}
                      disabled={searching || processing}
                    />
                    <button
                      onClick={handleSearchRecipient}
                      disabled={searching || !phone}
                      className={styles.searchButton}
                    >
                      {searching ? "Поиск..." : "Найти"}
                    </button>
                  </div>
                </div>

                {recipient && (
                  <div className={styles.recipientCard}>
                    <div className={styles.recipientAvatar}>
                      {recipient.first_name[0]}
                      {recipient.last_name[0]}
                    </div>
                    <div className={styles.recipientInfo}>
                      <div className={styles.recipientName}>
                        {recipient.first_name} {recipient.last_name}
                      </div>
                      <div className={styles.recipientPhone}>
                        {recipient.phone}
                      </div>
                    </div>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label className={styles.label}>Сумма перевода</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="1000"
                    min="1"
                    step="1"
                    className={styles.input}
                    disabled={!recipient || processing}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    Комментарий (необязательно)
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Назначение перевода"
                    className={styles.input}
                    disabled={!recipient || processing}
                  />
                </div>

                <button
                  onClick={handleNext}
                  disabled={!recipient || !amount || processing}
                  className={styles.nextButton}
                >
                  Продолжить
                </button>
              </div>
            ) : (
              /* Шаг 2: подтверждение */
              <div className={styles.confirmStep}>
                <h2 className={styles.confirmTitle}>Проверьте данные</h2>

                <div className={styles.confirmDetails}>
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Со счета:</span>
                    <span className={styles.confirmValue}>
                      {selectedAccountData?.account_number}
                    </span>
                  </div>

                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Получатель:</span>
                    <span className={styles.confirmValue}>
                      {recipient?.first_name} {recipient?.last_name}
                    </span>
                  </div>

                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Телефон:</span>
                    <span className={styles.confirmValue}>
                      {recipient?.phone}
                    </span>
                  </div>

                  <div className={styles.confirmRow}>
                    <span className={styles.confirmLabel}>Сумма:</span>
                    <span className={styles.confirmAmount}>
                      {formatCurrency(parseFloat(amount))}
                    </span>
                  </div>

                  {description && (
                    <div className={styles.confirmRow}>
                      <span className={styles.confirmLabel}>Комментарий:</span>
                      <span className={styles.confirmValue}>{description}</span>
                    </div>
                  )}
                </div>

                <div className={styles.confirmActions}>
                  <button
                    onClick={handleBack}
                    className={styles.backButton}
                    disabled={processing}
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleTransfer}
                    disabled={processing}
                    className={styles.confirmButton}
                  >
                    {processing
                      ? "Выполняется перевод..."
                      : "Подтвердить перевод"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
