"use client";

import { useEffect } from "react";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Назад
      </Link>

      <div className={styles.content}>
        <h1 className={styles.title}>Добро пожаловать, {user?.firstName}!</h1>

        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>Баланс</h3>
            <p className={styles.balance}>50 000 ₽</p>
            <span>Текущий баланс</span>
          </div>

          <div className={styles.card}>
            <h3>Кэшбэк</h3>
            <p className={styles.cashback}>+2 150 ₽</p>
            <span>За этот месяц</span>
          </div>

          <div className={styles.card}>
            <h3>Карты</h3>
            <p>2 активные карты</p>
            <span>Основная •••• 4512</span>
          </div>
        </div>

        <div className={styles.recentActivity}>
          <h2>Последние операции</h2>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <span>Оплата в супермаркете</span>
              <span className={styles.amount}>-1 250 ₽</span>
            </div>
            <div className={styles.activityItem}>
              <span>Кэшбэк начислен</span>
              <span className={styles.positive}>+187 ₽</span>
            </div>
            <div className={styles.activityItem}>
              <span>Перевод от друга</span>
              <span className={styles.positive}>+5 000 ₽</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
