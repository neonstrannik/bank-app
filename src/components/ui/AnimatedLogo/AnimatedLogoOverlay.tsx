"use client";
import React, { useEffect, useState } from 'react';
import AnimatedLogo from './AnimatedLogo';
import './AnimatedLogoOverlay.css';

export default function AnimatedLogoOverlay({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<'draw' | 'move' | 'static'>('draw');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const hasSeenAnimation = sessionStorage?.getItem('hasSeenLogoAnimation');

    if (hasSeenAnimation) {
      setPhase('static');
      onFinish();
      return;
    }

    const drawTimer = setTimeout(() => {
      setPhase('move');
    }, 3250);

    const moveTimer = setTimeout(() => {
      setPhase('static');
      onFinish();
      sessionStorage.setItem('hasSeenLogoAnimation', 'true');
    }, 5000);

    return () => {
      clearTimeout(drawTimer);
      clearTimeout(moveTimer);
    };
  }, [onFinish]);

  return (
    <div className={`logo-overlay ${phase}`}>
      <AnimatedLogo animationPhase={phase === 'static' ? 'move' : phase} />
    </div>
  );
}