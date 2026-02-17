"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./cards.module.css";

// Компонент, который использует useSearchParams
function CardsContent() {
  const searchParams = useSearchParams();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [creditSuccess, setCreditSuccess] = useState(false);

  useEffect(() => {
    if (searchParams.get("creditSuccess") === "true") {
      setCreditSuccess(true);
      window.history.replaceState({}, "", "/cards");
    }
  }, [searchParams]);

  const bankCards = [
    {
      id: "neo",
      name: "Neo Card",
      type: "Дебетовая карта",
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
      type: "Кредитная карта",
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
      type: "Премиум карта",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.address && formData.phone) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <Link href="/" className={styles.backLink}>
        ← Назад
      </Link>

      <h1 className={styles.title}>Выберите свою карту</h1>

      <div className={styles.cardsGrid}>
        {bankCards.map((card, i) => (
          <div
            key={card.id}
            className={`${styles.card} ${
              activeCard === card.id ? styles.active : ""
            }`}
            onClick={() =>
              setActiveCard(activeCard === card.id ? null : card.id)
            }
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            <Image
              src={card.image}
              alt={card.name}
              width={320}
              height={200}
              className={styles.cardImage}
            />
            <div className={styles.cardInfo}>
              <h3>{card.name}</h3>
              <p className={styles.type}>{card.type}</p>
              <p className={styles.description}>{card.description}</p>
              <ul>
                {card.benefits.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Блок формы — появляется после выбора карты */}
      {activeCard && !submitted && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Оформление {bankCards.find((c) => c.id === activeCard)?.name}</h2>
          <input
            type="text"
            placeholder="Ваше ФИО"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Адрес доставки"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />
          <button type="submit">Оформить карту</button>
        </form>
      )}

      {creditSuccess && (
        <div className={styles.success}>
          ✅ Кредит успешно оформлен!
          <br />
          Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
          <button
            className={styles.closeButton}
            onClick={() => setCreditSuccess(false)}
          >
            Закрыть
          </button>
        </div>
      )}

      {submitted && (
        <div className={styles.success}>
          ✅ Заявка на {bankCards.find((c) => c.id === activeCard)?.name}{" "}
          успешно оформлена!
          <br />
          Мы свяжемся с вами для уточнения деталей доставки.
        </div>
      )}
    </>
  );
}

// Основной экспорт с Suspense
export default function CardsPage() {
  return (
    <div className={styles.container}>
      <Suspense
        fallback={<div className={styles.loading}>Загрузка карт...</div>}
      >
        <CardsContent />
      </Suspense>
    </div>
  );
}
