
import React from "react";
import "./AnimatedLogo.css";

export default function AnimatedLogo({ animationPhase }: { animationPhase: 'draw' | 'move' })  {
  return (
    
    <svg className={`animated-logo ${animationPhase}`}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        className="line left"
        x1="60"
        y1="92"
        x2="30"
        y2="20"
        stroke="#CFCFCF"


        strokeWidth="12"
        strokeLinecap="butt"
      />
      <line
        className="line right"
        x2="60"
        y2="94"
        x1="90"
        y1="20"
        stroke="#CFCFCF"


        strokeWidth="10"
        strokeLinecap="butt"
      />
      <line
        className="cap-left"
        x1="20"
        y1="21"
        x2="44"
        y2="21"
        stroke="#CFCFCF"


        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        className="cap-right"
        x1="99"
        y1="21"
        x2="75"
        y2="21"
        stroke="#CFCFCF"


        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="60" cy="90" r="7" fill="#CFCFCF" />
    </svg>
  );
  
}
