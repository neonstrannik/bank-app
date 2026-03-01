"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useRouter } from "next/navigation";
import { accountsAPI } from "@/lib/api";
import styles from "./deposit.module.css";

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  balance: number;
  currency: string;
  status: string;
}

export default function DepositPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const predefinedAmounts = [500, 1000, 5000, 10000, 50000];

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

  const handleDeposit = async (amount: number) => {
    if (!selectedAccount) {
      setErrorMessage("Выберите счет для пополнения");
      return;
    }

    try {
      setProcessing(true);
      setErrorMessage("");
      setSuccessMessage("");

      console.log(`🟡 Пополнение счета ${selectedAccount} на ${amount} ₽`);

      const response = await accountsAPI.deposit(selectedAccount, amount);

      console.log("🟢 Ответ от бэкенда:", response.data);

      setSuccessMessage(`✅ Счет успешно пополнен на ${amount} ₽`);

      setAccounts((prev) =>
        prev.map((acc) =>
          acc.id === selectedAccount
            ? { ...acc, balance: response.data.balance }
            : acc,
        ),
      );

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("❌ Ошибка пополнения:", error);
      console.error("❌ Детали:", error.response?.data);

      const errorMsg =
        error.response?.data?.error || "Не удалось пополнить счет";
      setErrorMessage(errorMsg);
    } finally {
      setProcessing(false);
    }
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

  return (
    <div className={styles.container}>
      <Link href="/dashboard" className={styles.backLink}>
        ← Назад
      </Link>

      <div className={styles.content}>
        <h1 className={styles.title}>Пополнение счета</h1>

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
            <p>У вас нет счетов для пополнения</p>
            <Link href="/accounts" className={styles.createAccountLink}>
              Создать счет
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.accountSelector}>
              <h2 className={styles.sectionTitle}>Выберите счет</h2>
              <div className={styles.accountsList}>
                {accounts.map((account) => (
                  <label
                    key={account.id}
                    className={`${styles.accountOption} ${
                      selectedAccount === account.id ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="account"
                      value={account.id}
                      checked={selectedAccount === account.id}
                      onChange={(e) => setSelectedAccount(e.target.value)}
                      className={styles.radioInput}
                    />
                    <div className={styles.accountInfo}>
                      <span className={styles.accountType}>
                        {account.account_type === "checking"
                          ? "💳 Дебетовый"
                          : "🏦 Кредитный"}
                      </span>
                      <span className={styles.accountNumber}>
                        {account.account_number}
                      </span>
                      <span className={styles.accountBalance}>
                        Баланс: {formatCurrency(account.balance)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.amountSelector}>
              <h2 className={styles.sectionTitle}>Выберите сумму</h2>
              <div className={styles.amountGrid}>
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    className={styles.amountButton}
                    onClick={() => handleDeposit(amount)}
                    disabled={processing || !selectedAccount}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
