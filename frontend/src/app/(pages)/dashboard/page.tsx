"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useRouter } from "next/navigation";
import { accountsAPI, cardsAPI } from "@/lib/api";
import styles from "./dashboard.module.css";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      const [accountsRes, cardsRes] = await Promise.all([
        accountsAPI.getUserAccounts(user!.id),
        cardsAPI.getUserCards(user!.id),
      ]);

      setAccounts(accountsRes.data || []);
      setCards(cardsRes.data || []);
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
    return `•••• ${cardNumber.slice(-4)}`;
  };

  if (!isAuthenticated) {
    return null;
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

  // Разделяем счета на дебетовые и кредитные
  const checkingAccounts = accounts.filter(
    (acc) => acc.account_type === "checking",
  );
  const creditAccounts = accounts.filter(
    (acc) => acc.account_type === "credit",
  );

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
                <div className={styles.statItem}>
                  <span className={styles.statLabel}>Карт</span>
                  <span className={styles.statValue}>{cards.length}</span>
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
          <Link href="/transfer" className={styles.actionButton}>
            <span className={styles.actionIcon}>💸</span>
            <span>Перевод</span>
          </Link>
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

        {/* Счета */}
        <div className={styles.accountsSection}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Мои счета</h3>
            <Link href="/accounts" className={styles.sectionLink}>
              Управление счетами →
            </Link>
          </div>

          <div className={styles.accountsGrid}>
            {/* Дебетовые счета */}
            {checkingAccounts.length > 0 && (
              <div className={styles.accountGroup}>
                <h4 className={styles.groupTitle}>
                  <span className={styles.groupIcon}>💰</span> Дебетовые счета
                </h4>
                {checkingAccounts.map((account) => (
                  <div key={account.id} className={styles.accountCard}>
                    <div className={styles.accountCardHeader}>
                      <div>
                        <p className={styles.accountType}>Дебетовый счет</p>
                        <p className={styles.accountNumber}>
                          {account.account_number}
                        </p>
                      </div>
                      <div
                        className={`${styles.accountStatus} ${styles.active}`}
                      >
                        {account.status === "active" ? "Активен" : "Заморожен"}
                      </div>
                    </div>
                    <div className={styles.accountCardBody}>
                      <div className={styles.accountBalanceLarge}>
                        {formatCurrency(account.balance)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Кредитные счета */}
            {creditAccounts.length > 0 && (
              <div className={styles.accountGroup}>
                <h4 className={styles.groupTitle}>
                  <span className={styles.groupIcon}>💳</span> Кредитные счета
                </h4>
                {creditAccounts.map((account) => (
                  <div key={account.id} className={styles.accountCard}>
                    <div className={styles.accountCardHeader}>
                      <div>
                        <p className={styles.accountType}>Кредитный счет</p>
                        <p className={styles.accountNumber}>
                          {account.account_number}
                        </p>
                      </div>
                      <div
                        className={`${styles.accountStatus} ${styles.active}`}
                      >
                        {account.status === "active" ? "Активен" : "Заморожен"}
                      </div>
                    </div>
                    <div className={styles.accountCardBody}>
                      <div className={styles.accountBalanceLarge}>
                        {formatCurrency(account.balance)}
                      </div>
                      <div className={styles.creditLimit}>
                        Кредитный лимит: {formatCurrency(50000)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {accounts.length === 0 && (
              <div className={styles.emptyAccounts}>
                <p>У вас пока нет счетов</p>
                <Link href="/accounts" className={styles.createAccountLink}>
                  Создать счет
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Карты */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Мои карты</h3>
            <Link href="/cards" className={styles.sectionLink}>
              Все карты →
            </Link>
          </div>
          <div className={styles.cardsGrid}>
            {cards && cards.length > 0 ? (
              cards.map((card) => (
                <div key={card.id} className={styles.card}>
                  <div className={styles.cardContent}>
                    <div className={styles.cardChip}>💳</div>
                    <div className={styles.cardNumber}>
                      {formatCardNumber(card.card_number)}
                    </div>
                    <div className={styles.cardFooter}>
                      <div>
                        <p className={styles.cardName}>{card.card_name}</p>
                        <p className={styles.cardType}>
                          {card.card_type === "debit"
                            ? "Дебетовая"
                            : card.card_type === "credit"
                              ? "Кредитная"
                              : "Премиум"}
                        </p>
                      </div>
                      <div className={styles.cardStatusBadge}>
                        {card.status === "active"
                          ? "✅ Активна"
                          : "🔒 Заблокирована"}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noData}>У вас пока нет карт</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
