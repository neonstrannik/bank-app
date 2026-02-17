"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./cashback.module.css";

export default function CashbackPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const absurdCategories = [
    {
      id: "crying",
      title: "Плач на публике",
      cashback: "15%",
      description: "Получайте кэшбэк за каждую публичную демонстрацию эмоций",
      conditions: "Минимум 5 свидетелей, видео-подтверждение обязательно",
      icon: "😭",
    },
    {
      id: "alien",
      title: "Общение с инопланетянами",
      cashback: "300%",
      description: "Самый высокий кэшбэк за межгалактические сделки",
      conditions: "Требуется подтверждение от NASA или МЧС",
      icon: "👽",
    },
    {
      id: "unicorn",
      title: "Катание на единорогах",
      cashback: "25%",
      description: "За каждую поездку на мифическом существе",
      conditions: "Единорог должен быть не моложе 1000 лет",
      icon: "🦄",
    },
    {
      id: "time",
      title: "Путешествия во времени",
      cashback: "∞%",
      description: "Бесконечный кэшбэк для временных аномалий",
      conditions: "Не забудьте вернуться в свое время",
      icon: "⏰",
    },
    {
      id: "dragon",
      title: "Уход за домашним драконом",
      cashback: "18%",
      description: "Кэшбэк на корм и противопожарное оборудование",
      conditions: "Страховка от выгорания королевства обязательна",
      icon: "🐉",
    },
    {
      id: "invisible",
      title: "Покупка невидимых вещей",
      cashback: "0%",
      description: "Идеально для тех, кто ничего не хочет видеть",
      conditions: "Доказательства покупки должны быть невидимы",
      icon: "👻",
    },
    {
      id: "telepathy",
      title: "Телепатические переводы",
      cashback: "12%",
      description: "Переводите деньги силой мысли",
      conditions: "Мысленные комиссии применяются дополнительно",
      icon: "🧠",
    },
    {
      id: "superhero",
      title: "Покупка суперспособностей",
      cashback: "50%",
      description: "За каждую приобретенную сверхчеловеческую способность",
      conditions: "Ответственность за спасение мира на вас",
      icon: "🦸",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleCards(Array(absurdCategories.length).fill(true));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newVisible = [...prev];
              newVisible[index] = true;
              return newVisible;
            });
            observer.unobserve(card);
          }
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      observer.observe(card);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardsRef.current[index] = el;
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Назад
      </Link>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Легендарный Кэшбэк</h1>
          <p className={styles.subtitle}>
            Самые невероятные категории кэшбэка, которые вы могли представить
          </p>
        </div>

        <div className={styles.statsBanner}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>∞%</span>
            <span className={styles.statLabel}>Максимальный кэшбэк</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>{absurdCategories.length}</span>
            <span className={styles.statLabel}>Популярные категории</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statNumber}>💫</span>
            <span className={styles.statLabel}>Гарантия улыбки</span>
          </div>
        </div>

        <div className={styles.categoriesGrid}>
          {absurdCategories.map((category, index) => (
            <div
              key={category.id}
              ref={setCardRef(index)}
              className={`${styles.categoryCard} ${
                selectedCategory === category.id ? styles.selected : ""
              } ${visibleCards[index] ? styles.visible : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )
              }
            >
              <div className={styles.categoryHeader}>
                <span className={styles.categoryIcon}>{category.icon}</span>
                <div className={styles.categoryInfo}>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                  <span className={styles.cashbackAmount}>
                    {category.cashback} кэшбэк
                  </span>
                </div>
              </div>

              <p className={styles.categoryDescription}>
                {category.description}
              </p>

              {selectedCategory === category.id && (
                <div className={styles.categoryDetails}>
                  <div className={styles.conditions}>
                    <strong>Условия:</strong> {category.conditions}
                  </div>
                  <button className={styles.activateButton}>
                    Активировать абсурдный кэшбэк 🎪
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.disclaimer}>
          <h3>⚡ Важное примечание</h3>
          <p>
            Все категории кэшбэка на этой странице являются шуточными и созданы
            в развлекательных целях. V-банк не несет ответственности за попытки
            общения с инопланетянами, катания на единорогах или путешествий во
            времени. Будьте осторожны в параллельных вселенных! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
