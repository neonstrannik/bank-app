"use client";
import React, { useEffect, useState } from "react";
import AnimatedLogo from "./AnimatedLogo";
import "./AnimatedLogoOverlay.css";

export default function AnimatedLogoOverlay({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"draw" | "move" | "static">("draw");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const hasSeenAnimation = sessionStorage.getItem("hasSeenLogoAnimation");

    if (hasSeenAnimation) {
      setPhase("static");
      onFinish();
      return;
    }

    const drawTimer = setTimeout(() => setPhase("move"), 3250);
    const moveTimer = setTimeout(() => {
      setPhase("static");
      onFinish();
      sessionStorage.setItem("hasSeenLogoAnimation", "true");
    }, 5000);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(moveTimer);
    };
  }, [onFinish]);

  // ⛔️ Пока не знаем, что показывать — ничего не рендерим
  if (!isClient) return null;

  return (
    <div className={`logo-overlay ${phase}`}>
      <AnimatedLogo animationPhase={phase === "static" ? "move" : phase} />
    </div>
  );
}
