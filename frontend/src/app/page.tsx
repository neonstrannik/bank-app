"use client";
import React, { useEffect, useState } from "react";
import AnimatedLogoOverlay from "@/components/ui/AnimatedLogo/AnimatedLogoOverlay";
import Dropdown from "@/components/ui/Dropdown/Dropdown";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [animationFinished, setAnimationFinished] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState("mission");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("hasSeenLogoAnimation") === "true";
      if (hasSeen) {
        setAnimationFinished(true);
      }
    }
  }, []);

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
          <button
            className="btn-primary"
            onClick={() => {
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Узнать больше
          </button>
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
                onClick={() => {
                  const offerSection = document.getElementById("offers");
                  if (offerSection) {
                    offerSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
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
          {isAuthenticated ? (
            <Link href="/dashboard">
              <button className="btn-navbar btn-dashboard">
                <span>👤</span>
                Личный кабинет
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button className="btn-navbar">Вход</button>
            </Link>
          )}
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

          <section id="about" className="about container">
            <button
              className={`about-toggle ${aboutOpen ? "open" : ""}`}
              onClick={() => setAboutOpen(!aboutOpen)}
            >
              <h2>О нас</h2>
              <span className="arrow">{aboutOpen ? "▲" : "▼"}</span>
            </button>

            {aboutOpen && (
              <div className="about-content fadeIn">
                <div className="about-tabs">
                  {[
                    { id: "mission", label: "Миссия" },
                    { id: "team", label: "Наша команда" },
                    { id: "career", label: "Трудоустройство" },
                    { id: "tech", label: "Технологии" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`about-tab ${
                        activeAboutTab === tab.id ? "active" : ""
                      }`}
                      onClick={() => setActiveAboutTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="about-tab-content">
                  {activeAboutTab === "mission" && (
                    <p>
                      Наша миссия — создавать цифровой банк, который упрощает
                      финансовую жизнь клиентов и делает технологии доступными
                      каждому. Мы стремимся быть банком без границ, где всё
                      решается в одно касание.
                    </p>
                  )}

                  {activeAboutTab === "team" && (
                    <p>
                      Команда V-Банка — это инженеры, дизайнеры, аналитики и
                      специалисты по клиентскому сервису, объединённые одной
                      целью: сделать банковские услуги простыми и понятными для
                      всех.
                    </p>
                  )}

                  {activeAboutTab === "career" && (
                    <p>
                      Мы всегда ищем талантливых людей! Присоединяйтесь к
                      инновационной команде, которая создаёт будущее финансов.
                    </p>
                  )}

                  {activeAboutTab === "tech" && (
                    <p>
                      Мы используем новейшие технологии — от искусственного
                      интеллекта до анализа данных в реальном времени. Наши
                      системы соответствуют международным стандартам
                      безопасности.
                    </p>
                  )}
                </div>
              </div>
            )}
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
