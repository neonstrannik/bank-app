"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { cardsAPI, accountsAPI } from "@/lib/api";
import styles from "./cards.module.css";

interface Card {
  id: string;
  card_name: string;
  card_type: string;
  card_number: string;
  status: string;
  benefits: string[];
  description: string;
  image_url: string;
  expiry_date: string;
}

// Компонент, который использует useSearchParams
function CardsContent() {
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();

  const [userCards, setUserCards] = useState<Card[]>([]);
  const [availableCards, setAvailableCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingCard, setAddingCard] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Предопределенные карты (как в вашем дизайне)
  const bankCards = [
    {
      id: "neo",
      name: "Neo Card",
      type: "debit",
      displayType: "Дебетовая карта",
      image: "/cards/neo.jpg",
      benefits: [
        "Кэшбэк до 10% за все покупки",
        "Начисление 5% годовых на остаток",
        "Бесплатные переводы",
        "Мгновенные уведомления",
      ],
      description: "Современная карта для цифрового поколения",
    },
    {
      id: "quantum",
      name: "Quantum Card",
      type: "credit",
      displayType: "Кредитная карта",
      image: "/cards/quantum.jpg",
      benefits: [
        "Кэшбэк до 15% в избранных категориях",
        "Беспроцентный период 180 дней",
        "Бесплатное обслуживание",
        "Страхование покупок",
      ],
      description: "Идеальна для повседневных покупок и путешествий",
    },
    {
      id: "cosmic",
      name: "Cosmic Card",
      type: "premium",
      displayType: "Премиум карта",
      image: "/cards/cosmic.jpg",
      benefits: [
        "Эксклюзивный кэшбэк до 20%",
        "Беспроцентный период 365 дней",
        "Доступ в бизнес-залы аэропортов",
        "Персональный менеджер",
      ],
      description: "Премиальный статус и эксклюзивные привилегии",
    },
  ];

  // Загружаем карты пользователя
  useEffect(() => {
    if (user) {
      loadUserCards();
    }
  }, [user]);

  const loadUserCards = async () => {
    try {
      setLoading(true);
      const response = await cardsAPI.getUserCards(user!.id);
      console.log("📥 Загруженные карты пользователя:", response.data);
      setUserCards(response.data || []);

      // Определяем, какие карты еще не добавлены
      const userCardNames = (response.data || []).map((c: Card) => c.card_name);
      const available = bankCards.filter(
        (c) => !userCardNames.includes(c.name),
      );
      setAvailableCards(available);
    } catch (error) {
      console.error("❌ Ошибка загрузки карт:", error);
      setErrorMessage("Не удалось загрузить ваши карты");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCard = async (cardData: (typeof bankCards)[0]) => {
    if (!user) {
      setErrorMessage("Необходимо войти в систему");
      return;
    }

    try {
      setAddingCard(cardData.id);
      setErrorMessage("");
      setSuccessMessage("");

      console.log("🟡 Начинаем добавление карты:", cardData.name);
      console.log("🟡 ID пользователя:", user.id);

      // Получаем счета пользователя
      console.log("🟡 Запрашиваем счета пользователя...");
      const accountsRes = await accountsAPI.getUserAccounts(user.id);
      console.log("🟢 Ответ от API счетов:", accountsRes.data);

      const accounts = accountsRes.data || [];

      if (accounts.length === 0) {
        setErrorMessage("У вас нет активных счетов. Сначала создайте счет.");
        setAddingCard(null);
        return;
      }

      // Берем первый активный счет
      const targetAccount =
        accounts.find((a: any) => a.status === "active") || accounts[0];
      console.log("🟢 Выбран счет:", {
        id: targetAccount.id,
        number: targetAccount.account_number,
        type: targetAccount.account_type,
        status: targetAccount.status,
      });

      // Рассчитываем дату окончания карты (3 года от текущей даты)
      // Рассчитываем дату окончания карты (3 года от текущей даты)
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 3);

      // Форматируем в YYYY-MM-DD
      const year = expiryDate.getFullYear();
      const month = String(expiryDate.getMonth() + 1).padStart(2, "0");
      const day = String(expiryDate.getDate()).padStart(2, "0");
      const formattedExpiryDate = `${year}-${month}-${day}`;

      console.log("🟡 Сгенерированная дата:", formattedExpiryDate);

      // Формируем данные для создания карты - БЕЗ ЛИШНИХ ПОЛЕЙ
      const cardPayload = {
        account_id: targetAccount.id,
        card_name: cardData.name,
        card_type: cardData.type,
        // Важно: отправляем ТОЛЬКО те поля, которые ожидает бэкенд
        expiry_date: formattedExpiryDate,
        // Добавляем только если они обязательны
        ...(cardData.benefits && { benefits: cardData.benefits }),
        ...(cardData.image && { image_url: cardData.image }),
      };

      // Убеждаемся, что нет поля expiryDate (старое)
      delete (cardPayload as any).expiryDate;

      console.log("🟡 Отправка данных на бэкенд (финальная):", cardPayload);

      // Создаем карту
      const response = await cardsAPI.createCard(user.id, cardPayload);
      console.log("🟢 Ответ от бэкенда:", response.data);

      setSuccessMessage(`✅ Карта ${cardData.name} успешно добавлена!`);

      // Перезагружаем список карт
      await loadUserCards();

      // Очищаем сообщение через 3 секунды
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error: any) {
      console.error("❌ Ошибка добавления карты:");
      console.error("❌ Статус:", error.response?.status);
      console.error("❌ Данные ошибки:", error.response?.data);
      console.error("❌ Заголовки:", error.response?.headers);
      console.error("❌ Полная ошибка:", error);

      // Пробуем получить сообщение об ошибке в разных форматах
      const errorMsg =
        (typeof error.response?.data === "object" &&
          error.response?.data?.error) ||
        (typeof error.response?.data === "string" && error.response?.data) ||
        error.message ||
        "Не удалось добавить карту";

      setErrorMessage(errorMsg);
    } finally {
      setAddingCard(null);
    }
  };

  const formatCardNumber = (cardNumber: string) => {
    if (!cardNumber) return "•••• •••• •••• ••••";
    return `•••• •••• •••• ${cardNumber.slice(-4)}`;
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.message}>
          <p>Для просмотра карт необходимо войти в систему</p>
          <Link href="/login" className={styles.loginButton}>
            Войти
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Link href="/dashboard" className={styles.backLink}>
        ← Назад
      </Link>

      <h1 className={styles.title}>Ваши карты</h1>

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}

      {/* Мои карты */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Мои карты</h2>
        {loading ? (
          <div className={styles.loading}>Загрузка ваших карт...</div>
        ) : userCards.length > 0 ? (
          <div className={styles.myCardsGrid}>
            {userCards.map((card) => {
              const cardInfo = bankCards.find((c) => c.name === card.card_name);
              return (
                <div key={card.id} className={styles.myCard}>
                  <div className={styles.myCardHeader}>
                    <h3>{card.card_name}</h3>
                    <span
                      className={`${styles.cardStatus} ${card.status === "active" ? styles.active : styles.blocked}`}
                    >
                      {card.status === "active"
                        ? "✅ Активна"
                        : "🔒 Заблокирована"}
                    </span>
                  </div>
                  <p className={styles.cardNumber}>
                    {formatCardNumber(card.card_number)}
                  </p>
                  {cardInfo && (
                    <ul className={styles.cardBenefits}>
                      {cardInfo.benefits.slice(0, 2).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className={styles.emptyMessage}>У вас пока нет карт</p>
        )}
      </section>

      {/* Доступные карты для оформления */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Доступные карты</h2>
        {availableCards.length === 0 ? (
          <p className={styles.emptyMessage}>
            У вас уже есть все доступные карты
          </p>
        ) : (
          <div className={styles.cardsGrid}>
            {availableCards.map((card, i) => (
              <div
                key={card.id}
                className={styles.card}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <Image
                  src={card.image}
                  alt={card.name}
                  width={320}
                  height={200}
                  className={styles.cardImage}
                  priority={i === 0} // Добавляем priority для первого изображения
                />
                <div className={styles.cardInfo}>
                  <h3>{card.name}</h3>
                  <p className={styles.type}>{card.displayType}</p>
                  <p className={styles.description}>{card.description}</p>
                  <ul>
                    {card.benefits.map((b: string, idx: number) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                  <button
                    className={styles.addButton}
                    onClick={() => handleAddCard(card)}
                    disabled={addingCard === card.id}
                  >
                    {addingCard === card.id
                      ? "Добавление..."
                      : "Добавить карту"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

// Основной экспорт с Suspense
export default function CardsPage() {
  return (
    <div className={styles.container}>
      <Suspense
        fallback={
          <div className={styles.loading}>Загрузка страницы карт...</div>
        }
      >
        <CardsContent />
      </Suspense>
    </div>
  );
}
