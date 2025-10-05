"use client";
import React, { useEffect, useState } from "react";
import AnimatedLogoOverlay from "@/components/ui/AnimatedLogo/AnimatedLogoOverlay";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Link from "next/link";

export default function Home() {
  const [animationFinished, setAnimationFinished] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const options = { root: null, rootMargin: "0px", threshold: 0.6 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) setActiveSection(id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Компонент Hero теперь внутри page.tsx
  const Hero = () => (
    <section className="hero">
      <div className="hero-content container">
        <h1>V-банк</h1>
        <p className="hero-subtitle">Ваш цифровой банк будущего — сегодня.</p>

        <div className="hero-buttons">
          <Link href="/register">
            <button className="btn-primary">Открыть счёт</button>
          </Link>
          <button className="btn-primary">Узнать больше</button>
        </div>
        <div className="hero-features">
          <div className="feature">
            <h3>0 ₽ за обслуживание</h3>
            <p>Без скрытых комиссий. Прозрачные условия для всех клиентов.</p>
          </div>
          <div className="feature">
            <h3>Кэшбэк до 15%</h3>
            <p>Возвращайте часть средств за повседневные покупки и сервисы.</p>
          </div>
          <div className="feature">
            <h3>Поддержка 24/7</h3>
            <p>Наши специалисты готовы помочь вам в любое время суток.</p>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <AnimatedLogoOverlay onFinish={() => setAnimationFinished(true)} />

      <div className={`page-content ${animationFinished ? "visible" : "hidden"}`}>
        <nav className="navbar">
          <ul className="nav-links">
            <li>
              <a href="#offers" className={activeSection === "offers" ? "active" : ""}>
                Предложения
              </a>
            </li>
            <li>
              <Link href="/cashback" className={activeSection === "cashback" ? "active" : ""}>
                Кэшбэк
              </Link>
            </li>
            <li>
              <Dropdown activeSection={activeSection} />
            </li>
          </ul>
          <button className="btn-navbar">Войти</button>
        </nav>

        <main>
          <Hero />

          {/* Далее твои секции */}
          <section id="offers" className="offers container">
            <h2 className="text-center">Наши предложения</h2>
            <div className="offer-cards">
              <div className="card offer-card">
                <h3>Кэшбэк до 15%</h3>
                <p>
                  Получайте до 15% возврата за покупки в избранных категориях каждый месяц.
                </p>
              </div>
              <div className="card offer-card">
                <h3>Инвестиции без комиссии</h3>
                <p>
                  Инвестируйте в акции и облигации без скрытых комиссий прямо из приложения.
                </p>
              </div>
              <div className="card offer-card">
                <h3>Мгновенные переводы</h3>
                <p>Молниеносные переводы по номеру телефона или карты — бесплатно и круглосуточно.</p>
              </div>
              <div className="card offer-card">
                <h3>Кредитная карта 0% на 180 дней</h3>
                <p>Оформите карту с беспроцентным периодом и начните пользоваться прямо сейчас.</p>
              </div>
            </div>
          </section>

          {/* Остальные секции — credit, cards, investments */}
          {/* ... их можно оставить без изменений ... */}
        </main>
      </div>
    </>
  );
}
