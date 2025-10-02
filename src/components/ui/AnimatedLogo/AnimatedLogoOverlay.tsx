"use client";
import React, { useEffect, useState } from "react";
import AnimatedLogo from "./AnimatedLogo";
import "./AnimatedLogoOverlay.css";

export default function AnimatedLogoOverlay({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [phase, setPhase] = useState<"draw" | "move">("draw");

  useEffect(() => {
    const drawTimer = setTimeout(() => {
      setPhase("move");
    }, 3250);

    const moveTimer = setTimeout(() => {
      onFinish();
    }, 5000);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(moveTimer);
    };
  }, [onFinish]);

  return (
    <div className={`logo-overlay ${phase}`}>
      <AnimatedLogo animationPhase={phase} />
    </div>
  );
}
