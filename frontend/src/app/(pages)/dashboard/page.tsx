"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

interface Transaction {
  id: string;
  type: "income" | "expense";
  category: string;
  description: string;
  amount: number;
  date: string;
  time: string;
}

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [balance] = useState(127543);
  const [cashback] = useState(2150);
  const [monthlyIncome] = useState(87500);
  const [monthlyExpenses] = useState(42350);

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "expense",
      category: "Супермаркет",
      description: "Оплата покупок",
      amount: 1250,
      date: "Сегодня",
      time: "14:32",
    },
    {
      id: "2",
      type: "income",
      category: "Кэшбэк",
      description: "Начисление кэшбэка",
      amount: 187,
      date: "Сегодня",
      time: "14:30",
    },
    {
      id: "3",
      type: "income",
      category: "Перевод",
      description: "От Ивана Иванова",
      amount: 5000,
      date: "Вчера",
      time: "18:15",
    },
    {
      id: "4",
      type: "expense",
      category: "Кафе",
      description: "Оплата в ресторане",
      amount: 2450,
      date: "Вчера",
      time: "19:45",
    },
    {
      id: "5",
      type: "expense",
      category: "Транспорт",
      description: "Оплата проезда",
      amount: 85,
      date: "03.12.2024",
      time: "08:20",
    },
    {
      id: "6",
      type: "income",
      category: "Зарплата",
      description: "Начисление зарплаты",
      amount: 75000,
      date: "01.12.2024",
      time: "10:00",
    },
  ];

  const cards = [
    {
      id: "1",
      number: "4512",
      type: "Visa",
      balance: 127543,
      currency: "RUB",
    },
    {
      id: "2",
      number: "8921",
      type: "Mastercard",
      balance: 45890,
      currency: "RUB",
    },
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
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
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Верхняя панель */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div>
              <h2 className={styles.greeting}>
                Добро пожаловать, {user?.firstName}!
              </h2>
              <p className={styles.userEmail}>{user?.email}</p>
            </div>
          </div>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {/* Главная карточка баланса */}
        <div className={styles.mainCard}>
          <div className={styles.mainCardContent}>
            <div className={styles.mainCardHeader}>
              <div>
                <p className={styles.cardLabel}>Общий баланс</p>
                <h1 className={styles.mainBalance}>
                  {formatCurrency(balance)}
                </h1>
              </div>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Доход</span>
                  <span className={styles.statValueIncome}>
                    +{formatCurrency(monthlyIncome)}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Расход</span>
                  <span className={styles.statValueExpense}>
                    -{formatCurrency(monthlyExpenses)}
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.cashbackBadge}>
              <span className={styles.cashbackIcon}>💳</span>
              <div>
                <span className={styles.cashbackLabel}>Кэшбэк за месяц</span>
                <span className={styles.cashbackAmount}>
                  +{formatCurrency(cashback)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Быстрые действия */}
        <div className={styles.quickActions}>
          <button className={styles.actionButton}>
            <span className={styles.actionIcon}>💸</span>
            <span>Перевод</span>
          </button>
          <button className={styles.actionButton}>
            <span className={styles.actionIcon}>📱</span>
            <span>Оплата</span>
          </button>
          <button className={styles.actionButton}>
            <span className={styles.actionIcon}>➕</span>
            <span>Пополнить</span>
          </button>
          <Link href="/cards" className={styles.actionButton}>
            <span className={styles.actionIcon}>💳</span>
            <span>Карты</span>
          </Link>
          <Link href="/credit-calculator" className={styles.actionButton}>
            <span className={styles.actionIcon}>📊</span>
            <span>Кредит</span>
          </Link>
          <Link href="/investments" className={styles.actionButton}>
            <span className={styles.actionIcon}>📈</span>
            <span>Инвестиции</span>
          </Link>
        </div>

        <div className={styles.grid}>
          {/* Активные карты */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>Активные карты</h3>
              <Link href="/cards" className={styles.sectionLink}>
                Все карты →
              </Link>
            </div>
            <div className={styles.cardsList}>
              {cards.map((card) => (
                <div key={card.id} className={styles.cardItem}>
                  <div className={styles.cardItemHeader}>
                    <span className={styles.cardType}>{card.type}</span>
                    <span className={styles.cardNumber}>
                      •••• {card.number}
                    </span>
                  </div>
                  <div className={styles.cardBalance}>
                    {formatCurrency(card.balance)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Статистика */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Статистика за месяц</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statCardIcon}>📊</div>
                <div>
                  <p className={styles.statCardLabel}>Транзакций</p>
                  <p className={styles.statCardValue}>127</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statCardIcon}>💰</div>
                <div>
                  <p className={styles.statCardLabel}>Средний чек</p>
                  <p className={styles.statCardValue}>{formatCurrency(333)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* История транзакций */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Последние операции</h3>
            <button className={styles.filterButton}>Все</button>
          </div>
          <div className={styles.transactionsList}>
            {transactions.map((transaction) => (
              <div key={transaction.id} className={styles.transactionItem}>
                <div className={styles.transactionIcon}>
                  {transaction.type === "income" ? "➕" : "➖"}
                </div>
                <div className={styles.transactionInfo}>
                  <div className={styles.transactionMain}>
                    <span className={styles.transactionCategory}>
                      {transaction.category}
                    </span>
                    <span
                      className={`${styles.transactionAmount} ${
                        transaction.type === "income"
                          ? styles.amountIncome
                          : styles.amountExpense
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </span>
                  </div>
                  <div className={styles.transactionMeta}>
                    <span className={styles.transactionDescription}>
                      {transaction.description}
                    </span>
                    <span className={styles.transactionDate}>
                      {transaction.date}, {transaction.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.showMoreButton}>
            Показать все операции
          </button>
        </div>
      </div>
    </div>
  );
}
