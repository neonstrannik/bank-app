"use client";
import React, { useEffect, useState } from "react";
import AnimatedLogoOverlay from "@/components/ui/AnimatedLogo/AnimatedLogoOverlay";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import Link from "next/link";

export default function Home() {
  const [animationFinished, setAnimationFinished] = useState(
    typeof window !== "undefined" &&
      sessionStorage.getItem("hasSeenLogoAnimation") === "true"
  );
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
              <Link
                href="/cashback"
                className={activeSection === "cashback" ? "active" : ""}
              >
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

          <section id="about" className="offers container">
            <h2>О нас</h2>
            <div className="offer-cards">
              <div className="card offer-card">
                <h3>Миссия</h3>
                <p>
                  Мы создаём цифровой банк, который упрощает финансовую жизнь
                  клиентов и делает современные технологии доступными каждому.
                </p>
              </div>
              <div className="card offer-card">
                <h3>Надёжность</h3>
                <p>
                  V-Банк работает по международным стандартам безопасности,
                  гарантируя защиту ваших средств и данных.
                </p>
              </div>
              <div className="card offer-card">
                <h3>Инновации</h3>
                <p>
                  Используем искусственный интеллект для персонализированных
                  финансовых решений и анализа трат.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
      <footer className="footer">
        <div className="footer-inner container">
          <div className="footer-left">
            <p>📞 8-800-900-1234 | ✉️ support@vbank.ru</p>
            <p>🏢 г. Москва, ул. Инновационная, д. 5</p>
          </div>

          <div className="footer-right">
            <a
              href="https://t.me/vbank"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram
            </a>
            <span>•</span>
            <a
              href="https://vk.com/vbank"
              target="_blank"
              rel="noopener noreferrer"
            >
              VK
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 V-Банк. Все права защищены.</p>
        </div>
      </footer>
    </>
  );
}
