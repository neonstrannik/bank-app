import React from "react";
import Link from "next/link";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content container">
        <h1>V-банк</h1>
        <p className="hero-subtitle">Ваш цифровой банк будущего — сегодня.</p>

        <div className="hero-buttons">
          <Link href="/register">
            <button className="btn-primary">Открыть счёт</button>
          </Link>
          <button className="btn-secondary">Узнать больше</button>
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
}
