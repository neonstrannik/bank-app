"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./investments.module.css";

export default function Investments() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  const handleClick = (productName: string) => {
    setSelectedProduct(productName);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct("");
  };

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Назад
      </Link>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>Инвестиции в V-банк</h1>
          <p className={styles.subtitle}>
            Управляйте своими финансами умно: надёжные инвестиции, прозрачные
            условия и гибкие инструменты для роста капитала.
          </p>
        </header>

        {/* Статистика */}
        <div className={styles.statsBanner}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>+48%</div>
            <div className={styles.statLabel}>Средняя доходность портфелей</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>1 млн+</div>
            <div className={styles.statLabel}>Довольных инвесторов</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>0 ₽</div>
            <div className={styles.statLabel}>Комиссия за вход</div>
          </div>
        </div>

        {/* Категории инвестиций */}
        <div className={styles.categoriesGrid}>
          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>📈</div>
              <div>
                <h3 className={styles.categoryTitle}>Акции и ETF</h3>
                <p className={styles.cashbackAmount}>
                  Доходность до 25% годовых
                </p>
              </div>
            </div>
            <p className={styles.categoryDescription}>
              Инвестируйте в крупнейшие компании России и мира. Доступ к акциям,
              облигациям и биржевым фондам без скрытых комиссий.
            </p>
            <div className={styles.conditions}>
              Без минимальной суммы, вывод средств в любое время.
            </div>
            <button
              className={styles.activateButton}
              onClick={() => handleClick("Акции и ETF")}
            >
              Открыть инвестиционный счёт
            </button>
          </div>

          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>🏦</div>
              <div>
                <h3 className={styles.categoryTitle}>
                  Накопительные облигации
                </h3>
                <p className={styles.cashbackAmount}>До 12% годовых</p>
              </div>
            </div>
            <p className={styles.categoryDescription}>
              Сбалансированное решение для консервативных инвесторов. Регулярные
              купонные выплаты и надёжность государственных бумаг.
            </p>
            <div className={styles.conditions}>
              Срок — от 6 месяцев, минимальный риск, гибкий вывод.
            </div>
            <button
              className={styles.activateButton}
              onClick={() => handleClick("Накопительные облигации")}
            >
              Купить облигации
            </button>
          </div>

          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>🤖</div>
              <div>
                <h3 className={styles.categoryTitle}>Робо-консультант</h3>
                <p className={styles.cashbackAmount}>
                  Автоматическая стратегия
                </p>
              </div>
            </div>
            <p className={styles.categoryDescription}>
              Искусственный интеллект подберёт оптимальное распределение активов
              под ваш уровень риска и цели.
            </p>
            <div className={styles.conditions}>
              Персонализированные стратегии. Контроль и прозрачность 24/7.
            </div>
            <button
              className={styles.activateButton}
              onClick={() => handleClick("Робо-консультант")}
            >
              Подобрать стратегию
            </button>
          </div>

          <div className={styles.categoryCard}>
            <div className={styles.categoryHeader}>
              <div className={styles.categoryIcon}>🌍</div>
              <div>
                <h3 className={styles.categoryTitle}>ESG-инвестиции</h3>
                <p className={styles.cashbackAmount}>Ответственный капитал</p>
              </div>
            </div>
            <p className={styles.categoryDescription}>
              Инвестируйте в компании, которые заботятся о планете. ESG-портфели
              — будущее ответственного инвестирования.
            </p>
            <div className={styles.conditions}>
              Поддержка зелёных проектов и прозрачная отчётность.
            </div>
            <button
              className={styles.activateButton}
              onClick={() => handleClick("ESG-инвестиции")}
            >
              Инвестировать в ESG
            </button>
          </div>
        </div>

        {/* Примечание */}
        <div className={styles.disclaimer}>
          <h3>⚠️ Важно</h3>
          <p>
            Инвестиции сопряжены с рисками. Доходность в прошлом не гарантирует
            доходность в будущем. Перед вложением средств ознакомьтесь с
            условиями продуктов V-банка.
          </p>
        </div>
      </div>

      {/* Модальное окно */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              ×
            </button>
            <div className={styles.modalIcon}>🏦</div>
            <h3 className={styles.modalTitle}>
              {selectedProduct || "Инвестиционный продукт"}
            </h3>
            <p className={styles.modalText}>
              Для оформления данного продукта, пожалуйста, обратитесь в
              ближайшее отделение V-банка.
            </p>
            <p className={styles.modalSubtext}>
              Наши специалисты помогут вам подобрать оптимальную стратегию
              инвестирования и ответят на все вопросы.
            </p>
            <div className={styles.modalButtons}>
              <button className={styles.modalButton} onClick={closeModal}>
                Понятно
              </button>
              <button
                className={styles.modalButtonSecondary}
                onClick={() => {
                  window.open(
                    "https://maps.google.com/?q=банк+отделение",
                    "_blank",
                  );
                }}
              >
                Найти отделение
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
