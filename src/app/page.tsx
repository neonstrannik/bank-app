"use client";
import React, { useEffect, useState } from "react";
import AnimatedLogoOverlay from "@/components/ui/AnimatedLogo/AnimatedLogoOverlay";
import Hero from "@/components/Hero/Hero";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Link from "next/link";

export default function Home() {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) setActiveSection(id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <AnimatedLogoOverlay onFinish={() => setAnimationFinished(true)} />

      <div
        className={`page-content ${animationFinished ? "visible" : "hidden"}`}
      >
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <a
                href="#offers"
                className={activeSection === "offers" ? "active" : ""}
              >
                Предложения
              </a>
            </li>
            <li>
              <a
                href="#cashback"
                className={activeSection === "cashback" ? "active" : ""}
              >
                Кэшбек
              </a>
            </li>
            <li>
              <Dropdown activeSection={activeSection} />
            </li>
          </ul>
          <button className="btn-navbar">Войти</button>
        </nav>

        <main>
          <Hero />

          <section id="offers" className="offers container">
            <h2 className="text-center">Наши предложения</h2>
            <div className="offer-cards">
              <div className="card offer-card">
                <h3>Кэшбэк до 15%</h3>
                <p>
                  Получайте до 15% возврата за покупки в избранных категориях
                  каждый месяц.
                </p>
              </div>
              <div className="card offer-card">
                <h3>Инвестиции без комиссии</h3>
                <p>
                  Инвестируйте в акции и облигации без скрытых комиссий прямо из
                  приложения.
                </p>
              </div>
              <div className="card offer-card">
                <h3>Мгновенные переводы</h3>
                <p>
                  Молниеносные переводы по номеру телефона или карты — бесплатно
                  и круглосуточно.
                </p>
              </div>
              <div className="card offer-card">
                <h3>Кредитная карта 0% на 180 дней</h3>
                <p>
                  Оформите карту с беспроцентным периодом и начните пользоваться
                  прямо сейчас.
                </p>
              </div>
            </div>
          </section>

          <section id="cashback" className="offers container">
            <h2 className="text-center">Кэшбэк</h2>
            <div className="card offer-card">
              <h3>Как работает кэшбэк</h3>
              <p>
                Каждая ваша покупка возвращает часть средств обратно — в виде
                бонусов или реальных денег. Выбирайте категории месяца и
                максимизируйте выгоду.
              </p>
              <p>
                Мы сотрудничаем с более чем 500 партнерами, включая магазины,
                рестораны и сервисы. Ваши покупки — ваш доход.
              </p>
              <p>
                Потратьте кэшбэк на новые покупки, оплату услуг или переводы.
              </p>
            </div>
          </section>

          <section id="credit" className="offers container">
            <h2 className="text-center">Кредит</h2>
            <div className="card offer-card">
              <h3>Потребительский кредит</h3>
              <p>
                Получите до 2 млн ₽ на любые цели — ремонт, образование,
                путешествия или покупка техники. Мы предлагаем быстрое одобрение
                и прозрачные условия без скрытых комиссий.
              </p>
              <p>
                Срок кредита — от 6 до 60 месяцев. Ставка начинается от 9.9%
                годовых и зависит от суммы и срока займа.
              </p>
              <p>
                Удобный и понятный онлайн-калькулятор поможет вам рассчитать
                ежемесячный платеж и общую сумму переплаты. Просто выберите
                сумму и срок — и получите мгновенный результат.
              </p>
              <Link href="/credit-calculator">
                <button className="btn-primary">Рассчитать кредит</button>
              </Link>
            </div>
          </section>
          <section id="cards" className="offers container">
            <h2 className="text-center">Карты</h2>
            <div className="card offer-card enhanced-card">
              <h3>Разнообразие банковских карт для ваших нужд</h3>

              <div className="card-section">
                <h4>💳 Дебетовые карты</h4>
                <p>
                  Идеальны для ежедневных покупок, оплаты услуг и снятия
                  наличных. Они привязаны к вашему счету и позволяют
                  контролировать расходы без риска задолженности.
                </p>
              </div>

              <div className="card-section">
                <h4>🏦 Кредитные карты</h4>
                <p>
                  Дают возможность пользоваться деньгами банка с беспроцентным
                  периодом до 180 дней. Это удобно для крупных покупок и
                  экстренных расходов, при этом вы можете планировать возврат
                  без процентов.
                </p>
              </div>

              <div className="card-section">
                <h4>🛡️ Виртуальные карты</h4>
                <p>
                  Обеспечивают безопасность онлайн-платежей. Создаются в
                  приложении и защищают ваши данные при покупках в интернете.
                </p>
              </div>
            </div>
          </section>
          <section id="investments" className="offers container">
            <h2 className="text-center">Инвестиции</h2>
            <div className="card offer-card">
              <h3>Биржа, облигации, ИИС — вложения для вашего будущего</h3>
              <p>
                Начните инвестировать с минимальными рисками и максимальной
                выгодой. Мы предлагаем широкий спектр инвестиционных продуктов,
                чтобы вы могли выбрать оптимальный вариант для себя.
              </p>
              <p>
                <strong>Акции</strong> — приобретайте доли компаний и участвуйте
                в их росте. Получайте дивиденды и увеличивайте капитал на
                фондовом рынке.
              </p>
              <p>
                <strong>Облигации</strong> — надёжные долговые ценные бумаги с
                фиксированным доходом. Идеальный вариант для тех, кто
                предпочитает стабильность и предсказуемость.
              </p>
              <p>
                <strong>Индивидуальный инвестиционный счёт (ИИС)</strong> —
                инвестируйте и экономьте на налогах благодаря государственным
                вычетам. Отличное решение для долгосрочного накопления.
              </p>
              <p>
                Наше приложение предлагает удобный интерфейс для управления
                портфелем, аналитические инструменты и актуальные новости рынка
                — всё, чтобы вы могли принимать взвешенные решения и следить за
                своими вложениями в реальном времени.
              </p>
              <p>
                Начните с небольшой суммы, постепенно расширяя свой
                инвестиционный портфель и достигайте финансовой независимости.
              </p>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
