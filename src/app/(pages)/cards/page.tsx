"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./cards.module.css";


export default function CardsPage() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

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

  return (
    <div className={styles.container}>
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
            onClick={() => setActiveCard(activeCard === card.id ? null : card.id)}
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
                  <li key={idx}> {b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
