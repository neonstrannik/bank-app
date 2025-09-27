"use client";
import React, { useState } from "react";
import "./Dropdown.css";

interface DropdownProps {
  activeSection?: string;
}

export default function Dropdown({ activeSection }: DropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="dropdown-button">Услуги ▼</button>

      {open && (
        <ul className="dropdown-menu">
          <li>
            <a
              href="#cards"
              className={activeSection === "cards" ? "active" : ""}
            >
              Карты
            </a>
          </li>
          <li>
            <a
              href="#credit"
              className={activeSection === "credit" ? "active" : ""}
            >
              Кредит
            </a>
          </li>
          <li>
            <a
              href="#investments"
              className={activeSection === "investments" ? "active" : ""}
            >
              Инвестиции
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
