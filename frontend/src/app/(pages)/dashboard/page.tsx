"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useRouter } from "next/navigation";
import { accountsAPI, cardsAPI } from "@/lib/api";
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

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  balance: number;
  currency: string;
  status: string;
}

interface Card {
  id: string;
  card_name: string;
  card_type: string;
  card_number: string;
  status: string;
}

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Безопасные вычисления с защитой от null/undefined
  const totalBalance =
    accounts?.reduce((sum, acc) => sum + (acc?.balance || 0), 0) || 0;
  const totalCards = cards?.length || 0;
  const activeAccounts =
    accounts?.filter((acc) => acc?.status === "active")?.length || 0;

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
      return;
    }

    if (user) {
      loadUserData();
    }
  }, [isAuthenticated, user, router]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("📊 Загрузка данных для пользователя:", user?.id);

      // Загружаем счета и карты параллельно
      const [accountsRes, cardsRes] = await Promise.all([
        accountsAPI.getUserAccounts(user!.id),
        cardsAPI.getUserCards(user!.id),
      ]);

      console.log("✅ Счета получены:", accountsRes.data);
      console.log("✅ Карты получены:", cardsRes.data);

      setAccounts(accountsRes.data || []);
      setCards(cardsRes.data || []);

      // TODO: Загрузить транзакции когда будет готов API
      // const transactionsRes = await transactionsAPI.getUserTransactions(user!.id);
      // setTransactions(transactionsRes.data || []);
    } catch (err: any) {
      console.error("❌ Ошибка загрузки данных:", err);
      setError(
        err.response?.data?.error ||
          err.message ||
          "Не удалось загрузить данные",
      );
    } finally {
      setLoading(false);
    }
  };

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
    }).format(amount || 0);
  };

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return "•••• •••• •••• ••••";
    // Показываем только последние 4 цифры
    return `•••• ${cardNumber.slice(-4)}`;
  };

  if (!isAuthenticated) {
    return null; // Перенаправление происходит в useEffect
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Загрузка ваших данных...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>❌ {error}</p>
        <button onClick={loadUserData}>Повторить попытку</button>
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
              {user?.first_name?.[0]?.toUpperCase()}
              {user?.last_name?.[0]?.toUpperCase()}
            </div>
            <div>
              <h2 className={styles.greeting}>
                Добро пожаловать,{" "}
                {user?.first_name || user?.email || "Пользователь"}!
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
                  {formatCurrency(totalBalance)}
                </h1>
              </div>
              <div className={styles.quickStats}>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Счетов</span>
                  <span className={styles.statValue}>{accounts.length}</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Активных</span>
                  <span className={styles.statValue}>{activeAccounts}</span>
                </div>
              </div>
            </div>
            <div className={styles.cashbackBadge}>
              <span className={styles.cashbackIcon}>💳</span>
              <div>
                <span className={styles.cashbackLabel}>Всего карт</span>
                <span className={styles.cashbackAmount}>{cards.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Быстрые действия */}
        <div className={styles.quickActions}>
          <Link href="/accounts" className={styles.actionButton}>
            <span className={styles.actionIcon}>🏦</span>
            <span>Счета</span>
          </Link>
          <button className={styles.actionButton}>
            <span className={styles.actionIcon}>💸</span>
            <span>Перевод</span>
          </button>
          <Link href="/payment" className={styles.actionButton}>
            <span className={styles.actionIcon}>📱</span>
            <span>Оплата</span>
          </Link>
          <Link href="/deposit" className={styles.actionButton}>
            <span className={styles.actionIcon}>➕</span>
            <span>Пополнить</span>
          </Link>

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
              <h3 className={styles.sectionTitle}>Ваши карты</h3>
              <Link href="/cards" className={styles.sectionLink}>
                Все карты →
              </Link>
            </div>
            <div className={styles.cardsList}>
              {cards && cards.length > 0 ? (
                cards.slice(0, 3).map((card) => (
                  <div key={card.id} className={styles.cardItem}>
                    <div className={styles.cardItemHeader}>
                      <span className={styles.cardType}>
                        {card.card_name || "Карта"}
                      </span>
                      <span className={styles.cardNumber}>
                        {formatCardNumber(card.card_number)}
                      </span>
                    </div>
                    <div className={styles.cardStatus}>
                      Статус:{" "}
                      {card.status === "active"
                        ? "✅ Активна"
                        : "🔒 Заблокирована"}
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.noData}>У вас пока нет карт</p>
              )}
            </div>
          </div>

          {/* Статистика */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Сводка</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statCardIcon}>🏦</div>
                <div>
                  <p className={styles.statCardLabel}>Счетов</p>
                  <p className={styles.statCardValue}>{accounts.length}</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statCardIcon}>💳</div>
                <div>
                  <p className={styles.statCardLabel}>Карт</p>
                  <p className={styles.statCardValue}>{cards.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Счета */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Ваши счета</h3>
          </div>
          <div className={styles.accountsList}>
            {accounts && accounts.length > 0 ? (
              accounts.map((account) => (
                <div key={account.id} className={styles.accountItem}>
                  <div className={styles.accountInfo}>
                    <span className={styles.accountType}>
                      {account.account_type === "checking"
                        ? "💰 Дебетовый"
                        : "💳 Кредитный"}{" "}
                      счет
                    </span>
                    <span className={styles.accountNumber}>
                      {account.account_number || "Номер не указан"}
                    </span>
                  </div>
                  <div className={styles.accountBalance}>
                    {formatCurrency(account.balance || 0)}
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noData}>У вас пока нет счетов</p>
            )}
          </div>
        </div>

        {/* История транзакций - пока заглушка */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Последние операции</h3>
            <button className={styles.filterButton}>Все</button>
          </div>
          {transactions && transactions.length > 0 ? (
            <div className={styles.transactionsList}>
              {transactions.map((transaction) => (
                <div key={transaction.id} className={styles.transactionItem}>
                  {/* Здесь будет отображение транзакций */}
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noData}>История операций скоро появится</p>
          )}
        </div>
      </div>
    </div>
  );
}
