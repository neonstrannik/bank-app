"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import "./Dropdown.css";

interface DropdownProps {
  activeSection?: string;
}

export default function Dropdown({ activeSection }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="dropdown-button">Услуги</button>

      {open && (
        <div
          className="dropdown-menu-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="dropdown-menu">
            <li>
              <Link href="/cards">Карты</Link>
            </li>
            <li>
              <Link href="/credit-calculator">Калькулятор кредита</Link>
            </li>
            <li>
              <Link href="/investments">Инвестиции</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
