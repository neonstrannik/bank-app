"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/(auth)/context/AuthContext";
import { useRouter } from "next/navigation";
import { accountsAPI } from "@/lib/api";
import styles from "./payment.module.css";

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  balance: number;
  currency: string;
  status: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  services: Service[];
}

interface Service {
  id: string;
  name: string;
  amount: number;
  categoryId: string;
}

interface CartItem extends Service {
  quantity: number;
}

export default function PaymentPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Каталог услуг по категориям
  const categories: ServiceCategory[] = [
    {
      id: "utilities",
      name: "Коммунальные услуги",
      icon: "🏢",
      services: [
        { id: "electricity", name: "Электроэнергия", amount: 2500, categoryId: "utilities" },
        { id: "water", name: "Водоснабжение", amount: 1200, categoryId: "utilities" },
        { id: "gas", name: "Газ", amount: 800, categoryId: "utilities" },
        { id: "heating", name: "Отопление", amount: 3500, categoryId: "utilities" },
      ]
    },
    {
      id: "internet",
      name: "Интернет и связь",
      icon: "🌐",
      services: [
        { id: "internet", name: "Домашний интернет", amount: 600, categoryId: "internet" },
        { id: "mobile", name: "Мобильная связь", amount: 500, categoryId: "internet" },
        { id: "tv", name: "Телевидение", amount: 400, categoryId: "internet" },
      ]
    },
    {
      id: "fines",
      name: "Штрафы и налоги",
      icon: "📋",
      services: [
        { id: "traffic", name: "Штрафы ГИБДД", amount: 1500, categoryId: "fines" },
        { id: "tax", name: "Налоги", amount: 3000, categoryId: "fines" },
      ]
    },
    {
      id: "education",
      name: "Образование",
      icon: "📚",
      services: [
        { id: "university", name: "Оплата учебы", amount: 15000, categoryId: "education" },
        { id: "courses", name: "Курсы", amount: 5000, categoryId: "education" },
      ]
    },
  ];

  // Плоский список услуг для быстрых операций
  const allServices = categories.flatMap(cat => cat.services);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (user) {
      loadAccounts();
    }
  }, [user, isAuthenticated, router]);

  const loadAccounts = async () => {
    try {
      setLoading(true);
      const response = await accountsAPI.getUserAccounts(user!.id);
      setAccounts(response.data || []);
      
      if (response.data && response.data.length > 0) {
        setSelectedAccount(response.data[0].id);
      }
    } catch (error) {
      console.error("Ошибка загрузки счетов:", error);
      setErrorMessage("Не удалось загрузить счета");
    } finally {
      setLoading(false);
    }
  };

  // Добавляем услугу в корзину
  const addToCart = (service: Service) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === service.id);
      
      if (existingItem) {
        // Увеличиваем количество существующей позиции
        return prevCart.map(item =>
          item.id === service.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Добавляем новую позицию в корзину
        return [...prevCart, { ...service, quantity: 1 }];
      }
    });
  };

  // Удаляем услугу из корзины
  const removeFromCart = (serviceId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== serviceId));
  };

  // Меняем количество услуги
  const updateQuantity = (serviceId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(serviceId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === serviceId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Полностью очищаем корзину
  const clearCart = () => {
    setCart([]);
  };

  // Считаем итоговую сумму
  const totalAmount = cart.reduce((sum, item) => sum + (item.amount * item.quantity), 0);

  // Оплачиваем корзину одной операцией
  const handlePayAll = async () => {
    if (!selectedAccount) {
      setErrorMessage("Выберите счет для оплаты");
      return;
    }

    if (cart.length === 0) {
      setErrorMessage("Корзина пуста");
      return;
    }

    try {
      setProcessing(true);
      setErrorMessage("");
      setSuccessMessage("");

      console.log(`🟡 Оплата ${cart.length} услуг на сумму ${totalAmount} ₽`);
      
      // Списываем общую сумму со счета
      const response = await accountsAPI.withdraw(selectedAccount, totalAmount);
      
      console.log("🟢 Ответ от бэкенда:", response.data);
      
      // Формируем список оплаченных услуг для уведомления
      const paidServices = cart.map(item => 
        `${item.name} x${item.quantity} = ${item.amount * item.quantity} ₽`
      ).join('\n');
      
      setSuccessMessage(`✅ Оплачено:\n${paidServices}\n\nОбщая сумма: ${totalAmount} ₽`);
      
      // Обновляем баланс выбранного счета
      setAccounts(prev => prev.map(acc => 
        acc.id === selectedAccount 
          ? { ...acc, balance: response.data.balance }
          : acc
      ));

      // Очищаем корзину после оплаты
      setCart([]);

      setTimeout(() => setSuccessMessage(""), 5000);
      
    } catch (error: any) {
      console.error("❌ Ошибка оплаты:", error);
      console.error("❌ Детали:", error.response?.data);
      
      const errorMsg = error.response?.data?.error || "Не удалось выполнить оплату";
      setErrorMessage(errorMsg);
    } finally {
      setProcessing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Link href="/dashboard" className={styles.backLink}>
        ← Назад
      </Link>

      <div className={styles.content}>
        <h1 className={styles.title}>Оплата услуг</h1>

        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}

        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        {loading ? (
          <div className={styles.loading}>Загрузка счетов...</div>
        ) : accounts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>У вас нет счетов для оплаты</p>
            <Link href="/accounts" className={styles.createAccountLink}>
              Создать счет
            </Link>
          </div>
        ) : (
          <div className={styles.grid}>
            {/* Левая колонка: каталог услуг */}
            <div className={styles.catalog}>
              <div className={styles.accountSelector}>
                <h2 className={styles.sectionTitle}>Счет списания</h2>
                <select
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className={styles.accountSelect}
                  disabled={processing}
                >
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_type === "checking" ? "💳" : "🏦"} 
                      {account.account_number} — Баланс: {formatCurrency(account.balance)}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.servicesSection}>
                <h2 className={styles.sectionTitle}>Каталог услуг</h2>
                
                {categories.map((category) => (
                  <div key={category.id} className={styles.category}>
                    <h3 className={styles.categoryTitle}>
                      <span className={styles.categoryIcon}>{category.icon}</span>
                      {category.name}
                    </h3>
                    <div className={styles.servicesGrid}>
                      {category.services.map((service) => (
                        <button
                          key={service.id}
                          className={styles.serviceButton}
                          onClick={() => addToCart(service)}
                          disabled={processing}
                        >
                          <span className={styles.serviceName}>{service.name}</span>
                          <span className={styles.serviceAmount}>
                            {formatCurrency(service.amount)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Правая колонка: корзина */}
            <div className={styles.cart}>
              <div className={styles.cartHeader}>
                <h2 className={styles.cartTitle}>Корзина</h2>
                {cart.length > 0 && (
                  <button
                    className={styles.clearCartButton}
                    onClick={clearCart}
                    disabled={processing}
                  >
                    🗑️ Очистить
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className={styles.emptyCart}>
                  <p>Корзина пуста</p>
                  <p className={styles.emptyCartHint}>
                    Нажмите на услугу, чтобы добавить
                  </p>
                </div>
              ) : (
                <>
                  <div className={styles.cartItems}>
                    {cart.map((item) => (
                      <div key={item.id} className={styles.cartItem}>
                        <div className={styles.cartItemInfo}>
                          <span className={styles.cartItemName}>{item.name}</span>
                          <span className={styles.cartItemPrice}>
                            {formatCurrency(item.amount)} × {item.quantity}
                          </span>
                        </div>
                        
                        <div className={styles.cartItemActions}>
                          <button
                            className={styles.quantityButton}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={processing}
                          >
                            −
                          </button>
                          <span className={styles.quantity}>{item.quantity}</span>
                          <button
                            className={styles.quantityButton}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={processing}
                          >
                            +
                          </button>
                          <button
                            className={styles.removeButton}
                            onClick={() => removeFromCart(item.id)}
                            disabled={processing}
                          >
                            ×
                          </button>
                        </div>
                        
                        <div className={styles.cartItemTotal}>
                          {formatCurrency(item.amount * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={styles.cartFooter}>
                    <div className={styles.cartTotal}>
                      <span>Итого:</span>
                      <span className={styles.totalAmount}>
                        {formatCurrency(totalAmount)}
                      </span>
                    </div>
                    
                    <button
                      className={styles.payAllButton}
                      onClick={handlePayAll}
                      disabled={processing || cart.length === 0}
                    >
                      {processing ? "Обработка..." : "Оплатить всё"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}