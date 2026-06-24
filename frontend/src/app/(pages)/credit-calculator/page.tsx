"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { accountsAPI, creditAPI } from "@/lib/api";
import styles from "./credit-calculator.module.css";

interface CreditCalculation {
  monthlyPayment: number;
  totalAmount: number;
  overpayment: number;
  paymentSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remaining: number;
  }>;
}

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  balance: number;
  currency: string;
  status: string;
}

export default function CreditCalculator() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    amount: 1000000,
    term: 12,
    rate: 9.9,
  });

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [calculation, setCalculation] = useState<CreditCalculation | null>(null);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const [creditApplied, setCreditApplied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Загружаем счета для зачисления кредита
  useEffect(() => {
    if (user) {
      loadAccounts();
    }
  }, [user]);

  const loadAccounts = async () => {
    try {
      const response = await accountsAPI.getUserAccounts(user!.id);
      setAccounts(response.data || []);
      if (response.data && response.data.length > 0) {
        setSelectedAccount(response.data[0].id);
      }
    } catch (error) {
      console.error("Ошибка загрузки счетов:", error);
    }
  };

  const calculateCredit = () => {
    setLoading(true);

    setTimeout(() => {
      const { amount, term, rate } = formData;
      const monthlyRate = rate / 100 / 12;
      const monthlyPayment =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, term)) /
        (Math.pow(1 + monthlyRate, term) - 1);
      const totalAmount = monthlyPayment * term;
      const overpayment = totalAmount - amount;

      const paymentSchedule = [];
      let remaining = amount;

      for (let month = 1; month <= term; month++) {
        const interest = remaining * monthlyRate;
        const principal = monthlyPayment - interest;
        remaining -= principal;

        paymentSchedule.push({
          month,
          payment: monthlyPayment,
          principal,
          interest,
          remaining: Math.max(0, remaining),
        });
      }

      setCalculation({
        monthlyPayment,
        totalAmount,
        overpayment,
        paymentSchedule,
      });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    calculateCredit();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCredit();
  };

  const handleApplyCredit = async () => {
    if (!selectedAccount) {
      setErrorMessage("Выберите счет для зачисления кредита");
      return;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    setApplying(true);
    setErrorMessage("");

    try {
      const response = await creditAPI.applyCredit(
        selectedAccount,
        formData.amount,
        formData.term,
        formData.rate
      );

      console.log("✅ Кредит оформлен:", response.data);
      setCreditApplied(true);
      
      // Обновляем баланс счета в интерфейсе
      setAccounts(prev => prev.map(acc => 
        acc.id === selectedAccount 
          ? { ...acc, balance: response.data.account.balance }
          : acc
      ));
      
    } catch (err: any) {
      console.error("❌ Ошибка оформления кредита:", err);
      setErrorMessage(err.response?.data?.error || "Не удалось оформить кредит");
    } finally {
      setApplying(false);
    }
  };

  const handleGoBack = () => {
    setCreditApplied(false);
    router.push("/dashboard");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Для гостя показываем экран с предложением войти
  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Назад
        </Link>
        <div className={styles.content}>
          <div className={styles.header}>
            <h1 className={styles.title}>Кредитный калькулятор</h1>
            <p className={styles.subtitle}>
              Войдите в систему, чтобы оформить кредит
            </p>
          </div>
          <div className={styles.formSection}>
            <p className={styles.notAuthMessage}>
              Для оформления кредита необходимо{" "}
              <Link href="/login" className={styles.authLink}>
                войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Назад
      </Link>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Кредитный калькулятор</h1>
          <p className={styles.subtitle}>
            Рассчитайте ежемесячный платеж и переплату по кредиту
          </p>
        </div>

        <div className={styles.calculatorGrid}>
          {/* Форма параметров кредита */}
          <div className={styles.formSection}>
            {/* Выбор счета зачисления */}
            {accounts.length > 0 && (
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Счёт для зачисления
                  <span className={styles.currency}>💳</span>
                </label>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className={styles.accountSelect}
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_type === "checking" ? "💰 Дебетовый" : "🏦 Кредитный"} 
                      {" "} - Баланс: {formatCurrency(account.balance)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Сумма кредита
                  <span className={styles.currency}>₽</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="range"
                    name="amount"
                    min="50000"
                    max="5000000"
                    step="50000"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={styles.rangeInput}
                  />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={styles.numberInput}
                    min="50000"
                    max="5000000"
                  />
                </div>
                <div className={styles.rangeLabels}>
                  <span>50 000 ₽</span>
                  <span>5 000 000 ₽</span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Срок кредита
                  <span className={styles.term}>мес.</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="range"
                    name="term"
                    min="3"
                    max="60"
                    value={formData.term}
                    onChange={handleInputChange}
                    className={styles.rangeInput}
                  />
                  <input
                    type="number"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    className={styles.numberInput}
                    min="3"
                    max="60"
                  />
                </div>
                <div className={styles.rangeLabels}>
                  <span>3 мес.</span>
                  <span>60 мес.</span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Процентная ставка
                  <span className={styles.rate}>%</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="range"
                    name="rate"
                    min="5"
                    max="25"
                    step="0.1"
                    value={formData.rate}
                    onChange={handleInputChange}
                    className={styles.rangeInput}
                  />
                  <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    className={styles.numberInput}
                    min="5"
                    max="25"
                    step="0.1"
                  />
                </div>
                <div className={styles.rangeLabels}>
                  <span>5%</span>
                  <span>25%</span>
                </div>
              </div>

              <button
                type="submit"
                className={styles.calculateButton}
                disabled={loading}
              >
                {loading ? "Рассчитываем..." : "Рассчитать кредит"}
              </button>
            </form>
          </div>

          {/* Результаты расчета */}
          <div className={styles.resultsSection}>
            {errorMessage && (
              <div className={styles.errorMessage}>{errorMessage}</div>
            )}
            
            {calculation && (
              <>
                <div className={styles.resultsCard}>
                  <h3>Результаты расчета</h3>

                  <div className={styles.resultsGrid}>
                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>
                        Ежемесячный платеж
                      </span>
                      <span className={styles.resultValue}>
                        {formatCurrency(calculation.monthlyPayment)}
                      </span>
                    </div>

                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>Общая сумма</span>
                      <span className={styles.resultValue}>
                        {formatCurrency(calculation.totalAmount)}
                      </span>
                    </div>

                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>Переплата</span>
                      <span className={styles.resultValue}>
                        {formatCurrency(calculation.overpayment)}
                      </span>
                    </div>

                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>
                        Эффективная ставка
                      </span>
                      <span className={styles.resultValue}>
                        {formData.rate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* График платежей */}
                <div className={styles.scheduleCard}>
                  <h4>График платежей</h4>
                  <div className={styles.scheduleTable}>
                    <div className={styles.tableHeader}>
                      <span>Месяц</span>
                      <span>Платеж</span>
                      <span>Основной долг</span>
                      <span>Проценты</span>
                      <span>Остаток</span>
                    </div>
                    <div className={styles.tableBody}>
                      {calculation.paymentSchedule
                        .slice(0, 6)
                        .map((payment) => (
                          <div key={payment.month} className={styles.tableRow}>
                            <span>{payment.month}</span>
                            <span>{formatCurrency(payment.payment)}</span>
                            <span>{formatCurrency(payment.principal)}</span>
                            <span>{formatCurrency(payment.interest)}</span>
                            <span>{formatCurrency(payment.remaining)}</span>
                          </div>
                        ))}
                    </div>
                    {calculation.paymentSchedule.length > 6 && (
                      <div className={styles.tableNote}>
                        Показаны первые 6 месяцев из{" "}
                        {calculation.paymentSchedule.length}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className={styles.applyButton}
                  onClick={handleApplyCredit}
                  disabled={applying}
                >
                  {applying ? "Оформление..." : "Оформить кредит"}
                </button>
              </>
            )}
          </div>
        </div>

        {creditApplied && (
          <div className={styles.successMessage}>
            <div className={styles.successContent}>
              <span className={styles.successIcon}>✅</span>
              <h3>Кредит успешно оформлен!</h3>
              <p>
                На ваш счёт зачислено {formatCurrency(formData.amount)} ₽.
                <br />
                Ежемесячный платёж: {formatCurrency(calculation?.monthlyPayment || 0)} ₽.
                <br />
                Срок кредита: {formData.term} месяцев.
              </p>
              <button className={styles.successButton} onClick={handleGoBack}>
                На главную
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}