"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./cards.module.css";

export default function CardsPage() {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const bankCards = [
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
      <div className={styles.content}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>
            ← Назад
          </Link>
          <h1 className={styles.title}>Банковские Карты</h1>
          <p className={styles.subtitle}>
            Выберите карту, которая отражает ваш стиль
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {bankCards.map((card, index) => (
            <div
              key={card.id}
              className={`${styles.cardWrapper} ${
                selectedCard === card.id ? styles.selected : ""
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={() => setSelectedCard(card.id)}
            >
              {/* Картинка карты */}
              <div className={styles.cardImageContainer}>
                <Image
                  src={card.image}
                  alt={card.name}
                  width={300}
                  height={500}
                  className={styles.cardImage}
                />
                <div className={styles.cardOverlay}>
                  <span className={styles.cardType}>{card.type}</span>
                </div>
              </div>

              {/* Информация о карте */}
              <div className={styles.cardInfo}>
                <h3 className={styles.cardName}>{card.name}</h3>
                <p className={styles.cardDescription}>{card.description}</p>

                <div className={styles.benefits}>
                  <h4>Преимущества:</h4>
                  <ul>
                    {card.benefits.map((benefit, idx) => (
                      <li key={idx}>✓ {benefit}</li>
                    ))}
                  </ul>
                </div>

                <button className={styles.selectButton}>
                  {selectedCard === card.id ? "✅ Выбрана" : "Выбрать карту"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
