"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./credit-calculator.module.css";

interface CreditCalculation {
  monthlyPayment: number;
  totalAmount: number;
  overpayment: number;
  paymentSchedule: Array<{
    month: number;
    payment: number;
    principal: number;
    interest: number;
    remaining: number;
  }>;
}

export default function CreditCalculator() {
  const [formData, setFormData] = useState({
    amount: 1000000,
    term: 12,
    rate: 9.9
  });
  
  const [calculation, setCalculation] = useState<CreditCalculation | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateCredit = () => {
    setLoading(true);
    
    setTimeout(() => {
      const { amount, term, rate } = formData;
      const monthlyRate = rate / 100 / 12;
      const monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
      const totalAmount = monthlyPayment * term;
      const overpayment = totalAmount - amount;

      // Генерация графика платежей
      const paymentSchedule = [];
      let remaining = amount;
      
      for (let month = 1; month <= term; month++) {
        const interest = remaining * monthlyRate;
        const principal = monthlyPayment - interest;
        remaining -= principal;
        
        paymentSchedule.push({
          month,
          payment: monthlyPayment,
          principal,
          interest,
          remaining: Math.max(0, remaining)
        });
      }

      setCalculation({
        monthlyPayment,
        totalAmount,
        overpayment,
        paymentSchedule
      });
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    calculateCredit();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCredit();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link href="/" className={styles.backLink}>
            ← Назад
          </Link>
          <h1 className={styles.title}>Кредитный калькулятор</h1>
          <p className={styles.subtitle}>Рассчитайте ежемесячный платеж и переплату по кредиту</p>
        </div>

        <div className={styles.calculatorGrid}>
          {/* Форма ввода */}
          <div className={styles.formSection}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Сумма кредита
                  <span className={styles.currency}>₽</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="range"
                    name="amount"
                    min="50000"
                    max="5000000"
                    step="50000"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={styles.rangeInput}
                  />
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className={styles.numberInput}
                    min="50000"
                    max="5000000"
                  />
                </div>
                <div className={styles.rangeLabels}>
                  <span>50 000 ₽</span>
                  <span>5 000 000 ₽</span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Срок кредита
                  <span className={styles.term}>мес.</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="range"
                    name="term"
                    min="3"
                    max="60"
                    value={formData.term}
                    onChange={handleInputChange}
                    className={styles.rangeInput}
                  />
                  <input
                    type="number"
                    name="term"
                    value={formData.term}
                    onChange={handleInputChange}
                    className={styles.numberInput}
                    min="3"
                    max="60"
                  />
                </div>
                <div className={styles.rangeLabels}>
                  <span>3 мес.</span>
                  <span>60 мес.</span>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>
                  Процентная ставка
                  <span className={styles.rate}>%</span>
                </label>
                <div className={styles.inputWrapper}>
                  <input
                    type="range"
                    name="rate"
                    min="5"
                    max="25"
                    step="0.1"
                    value={formData.rate}
                    onChange={handleInputChange}
                    className={styles.rangeInput}
                  />
                  <input
                    type="number"
                    name="rate"
                    value={formData.rate}
                    onChange={handleInputChange}
                    className={styles.numberInput}
                    min="5"
                    max="25"
                    step="0.1"
                  />
                </div>
                <div className={styles.rangeLabels}>
                  <span>5%</span>
                  <span>25%</span>
                </div>
              </div>

              <button 
                type="submit" 
                className={styles.calculateButton}
                disabled={loading}
              >
                {loading ? 'Рассчитываем...' : 'Рассчитать кредит'}
              </button>
            </form>
          </div>

          {/* Результаты расчета */}
          <div className={styles.resultsSection}>
            {calculation && (
              <>
                <div className={styles.resultsCard}>
                  <h3>Результаты расчета</h3>
                  
                  <div className={styles.resultsGrid}>
                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>Ежемесячный платеж</span>
                      <span className={styles.resultValue}>
                        {formatCurrency(calculation.monthlyPayment)}
                      </span>
                    </div>
                    
                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>Общая сумма</span>
                      <span className={styles.resultValue}>
                        {formatCurrency(calculation.totalAmount)}
                      </span>
                    </div>
                    
                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>Переплата</span>
                      <span className={styles.resultValue}>
                        {formatCurrency(calculation.overpayment)}
                      </span>
                    </div>
                    
                    <div className={styles.resultItem}>
                      <span className={styles.resultLabel}>Эффективная ставка</span>
                      <span className={styles.resultValue}>
                        {formData.rate.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* График платежей */}
                <div className={styles.scheduleCard}>
                  <h4>График платежей</h4>
                  <div className={styles.scheduleTable}>
                    <div className={styles.tableHeader}>
                      <span>Месяц</span>
                      <span>Платеж</span>
                      <span>Основной долг</span>
                      <span>Проценты</span>
                      <span>Остаток</span>
                    </div>
                    <div className={styles.tableBody}>
                      {calculation.paymentSchedule.slice(0, 6).map((payment) => (
                        <div key={payment.month} className={styles.tableRow}>
                          <span>{payment.month}</span>
                          <span>{formatCurrency(payment.payment)}</span>
                          <span>{formatCurrency(payment.principal)}</span>
                          <span>{formatCurrency(payment.interest)}</span>
                          <span>{formatCurrency(payment.remaining)}</span>
                        </div>
                      ))}
                    </div>
                    {calculation.paymentSchedule.length > 6 && (
                      <div className={styles.tableNote}>
                        Показаны первые 6 месяцев из {calculation.paymentSchedule.length}
                      </div>
                    )}
                  </div>
                </div>

                <button className={styles.applyButton}>
                  Оформить кредит онлайн
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}