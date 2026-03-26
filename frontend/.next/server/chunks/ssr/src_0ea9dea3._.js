module.exports = {

"[project]/src/lib/api.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "accountsAPI": (()=>accountsAPI),
    "api": (()=>api),
    "authAPI": (()=>authAPI),
    "cardsAPI": (()=>cardsAPI),
    "creditAPI": (()=>creditAPI)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
;
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:8080/api") || "http://localhost:8080/api";
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
// Добавляем токен к каждому запросу
api.interceptors.request.use((config)=>{
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
const authAPI = {
    register: (data)=>api.post("/register", data),
    login: (data)=>api.post("/login", data),
    getProfile: (userId)=>api.get(`/users/${userId}`)
};
const accountsAPI = {
    getUserAccounts: (userId)=>api.get(`/users/${userId}/accounts`),
    createAccount: (userId, type)=>api.post(`/users/${userId}/accounts`, {
            account_type: type
        }),
    deposit: (accountId, amount)=>api.post(`/accounts/${accountId}/deposit`, {
            amount
        }),
    withdraw: (accountId, amount)=>api.post(`/accounts/${accountId}/withdraw`, {
            amount
        })
};
const cardsAPI = {
    getUserCards: (userId)=>api.get(`/users/${userId}/cards`),
    createCard: (userId, data)=>{
        console.log("API createCard получает:", data);
        return api.post(`/users/${userId}/cards`, data);
    }
};
const creditAPI = {
    applyCredit: (accountId, amount, term, rate)=>api.post("/credit/apply", {
            account_id: accountId,
            amount: amount,
            term: term,
            rate: rate
        })
};
}}),
"[project]/src/app/(pages)/payment/payment.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "accountBalance": "payment-module__Gdozda__accountBalance",
  "accountInfo": "payment-module__Gdozda__accountInfo",
  "accountNumber": "payment-module__Gdozda__accountNumber",
  "accountOption": "payment-module__Gdozda__accountOption",
  "accountSelect": "payment-module__Gdozda__accountSelect",
  "accountSelector": "payment-module__Gdozda__accountSelector",
  "accountType": "payment-module__Gdozda__accountType",
  "accountsList": "payment-module__Gdozda__accountsList",
  "backLink": "payment-module__Gdozda__backLink",
  "cart": "payment-module__Gdozda__cart",
  "cartFooter": "payment-module__Gdozda__cartFooter",
  "cartHeader": "payment-module__Gdozda__cartHeader",
  "cartItem": "payment-module__Gdozda__cartItem",
  "cartItemActions": "payment-module__Gdozda__cartItemActions",
  "cartItemInfo": "payment-module__Gdozda__cartItemInfo",
  "cartItemName": "payment-module__Gdozda__cartItemName",
  "cartItemPrice": "payment-module__Gdozda__cartItemPrice",
  "cartItemTotal": "payment-module__Gdozda__cartItemTotal",
  "cartItems": "payment-module__Gdozda__cartItems",
  "cartTitle": "payment-module__Gdozda__cartTitle",
  "cartTotal": "payment-module__Gdozda__cartTotal",
  "catalog": "payment-module__Gdozda__catalog",
  "category": "payment-module__Gdozda__category",
  "categoryIcon": "payment-module__Gdozda__categoryIcon",
  "categoryTitle": "payment-module__Gdozda__categoryTitle",
  "clearCartButton": "payment-module__Gdozda__clearCartButton",
  "container": "payment-module__Gdozda__container",
  "content": "payment-module__Gdozda__content",
  "createAccountLink": "payment-module__Gdozda__createAccountLink",
  "emptyCart": "payment-module__Gdozda__emptyCart",
  "emptyCartHint": "payment-module__Gdozda__emptyCartHint",
  "emptyState": "payment-module__Gdozda__emptyState",
  "errorMessage": "payment-module__Gdozda__errorMessage",
  "fadeIn": "payment-module__Gdozda__fadeIn",
  "grid": "payment-module__Gdozda__grid",
  "loading": "payment-module__Gdozda__loading",
  "payAllButton": "payment-module__Gdozda__payAllButton",
  "payButton": "payment-module__Gdozda__payButton",
  "paymentAmount": "payment-module__Gdozda__paymentAmount",
  "paymentInfo": "payment-module__Gdozda__paymentInfo",
  "paymentSection": "payment-module__Gdozda__paymentSection",
  "quantity": "payment-module__Gdozda__quantity",
  "quantityButton": "payment-module__Gdozda__quantityButton",
  "radioInput": "payment-module__Gdozda__radioInput",
  "removeButton": "payment-module__Gdozda__removeButton",
  "sectionTitle": "payment-module__Gdozda__sectionTitle",
  "selected": "payment-module__Gdozda__selected",
  "serviceAmount": "payment-module__Gdozda__serviceAmount",
  "serviceButton": "payment-module__Gdozda__serviceButton",
  "serviceName": "payment-module__Gdozda__serviceName",
  "servicesGrid": "payment-module__Gdozda__servicesGrid",
  "servicesSection": "payment-module__Gdozda__servicesSection",
  "slideUp": "payment-module__Gdozda__slideUp",
  "successMessage": "payment-module__Gdozda__successMessage",
  "title": "payment-module__Gdozda__title",
  "totalAmount": "payment-module__Gdozda__totalAmount",
});
}}),
"[project]/src/app/(pages)/payment/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>PaymentPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(auth)/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/(pages)/payment/payment.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
;
function PaymentPage() {
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAccount, setSelectedAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [processing, setProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Категории услуг
    const categories = [
        {
            id: "utilities",
            name: "Коммунальные услуги",
            icon: "🏢",
            services: [
                {
                    id: "electricity",
                    name: "Электроэнергия",
                    amount: 2500,
                    categoryId: "utilities"
                },
                {
                    id: "water",
                    name: "Водоснабжение",
                    amount: 1200,
                    categoryId: "utilities"
                },
                {
                    id: "gas",
                    name: "Газ",
                    amount: 800,
                    categoryId: "utilities"
                },
                {
                    id: "heating",
                    name: "Отопление",
                    amount: 3500,
                    categoryId: "utilities"
                }
            ]
        },
        {
            id: "internet",
            name: "Интернет и связь",
            icon: "🌐",
            services: [
                {
                    id: "internet",
                    name: "Домашний интернет",
                    amount: 600,
                    categoryId: "internet"
                },
                {
                    id: "mobile",
                    name: "Мобильная связь",
                    amount: 500,
                    categoryId: "internet"
                },
                {
                    id: "tv",
                    name: "Телевидение",
                    amount: 400,
                    categoryId: "internet"
                }
            ]
        },
        {
            id: "fines",
            name: "Штрафы и налоги",
            icon: "📋",
            services: [
                {
                    id: "traffic",
                    name: "Штрафы ГИБДД",
                    amount: 1500,
                    categoryId: "fines"
                },
                {
                    id: "tax",
                    name: "Налоги",
                    amount: 3000,
                    categoryId: "fines"
                }
            ]
        },
        {
            id: "education",
            name: "Образование",
            icon: "📚",
            services: [
                {
                    id: "university",
                    name: "Оплата учебы",
                    amount: 15000,
                    categoryId: "education"
                },
                {
                    id: "courses",
                    name: "Курсы",
                    amount: 5000,
                    categoryId: "education"
                }
            ]
        }
    ];
    // Преобразуем все услуги в плоский список для удобства
    const allServices = categories.flatMap((cat)=>cat.services);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }
        if (user) {
            loadAccounts();
        }
    }, [
        user,
        isAuthenticated,
        router
    ]);
    const loadAccounts = async ()=>{
        try {
            setLoading(true);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accountsAPI"].getUserAccounts(user.id);
            setAccounts(response.data || []);
            if (response.data && response.data.length > 0) {
                setSelectedAccount(response.data[0].id);
            }
        } catch (error) {
            console.error("Ошибка загрузки счетов:", error);
            setErrorMessage("Не удалось загрузить счета");
        } finally{
            setLoading(false);
        }
    };
    // Добавить услугу в корзину
    const addToCart = (service)=>{
        setCart((prevCart)=>{
            const existingItem = prevCart.find((item)=>item.id === service.id);
            if (existingItem) {
                // Если уже есть, увеличиваем количество
                return prevCart.map((item)=>item.id === service.id ? {
                        ...item,
                        quantity: item.quantity + 1
                    } : item);
            } else {
                // Если нет, добавляем новую
                return [
                    ...prevCart,
                    {
                        ...service,
                        quantity: 1
                    }
                ];
            }
        });
    };
    // Удалить услугу из корзины
    const removeFromCart = (serviceId)=>{
        setCart((prevCart)=>prevCart.filter((item)=>item.id !== serviceId));
    };
    // Изменить количество
    const updateQuantity = (serviceId, newQuantity)=>{
        if (newQuantity <= 0) {
            removeFromCart(serviceId);
            return;
        }
        setCart((prevCart)=>prevCart.map((item)=>item.id === serviceId ? {
                    ...item,
                    quantity: newQuantity
                } : item));
    };
    // Очистить корзину
    const clearCart = ()=>{
        setCart([]);
    };
    // Подсчет общей суммы
    const totalAmount = cart.reduce((sum, item)=>sum + item.amount * item.quantity, 0);
    // Оплатить всё сразу
    const handlePayAll = async ()=>{
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
            // Списываем общую сумму одной транзакцией
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accountsAPI"].withdraw(selectedAccount, totalAmount);
            console.log("🟢 Ответ от бэкенда:", response.data);
            // Формируем список оплаченных услуг
            const paidServices = cart.map((item)=>`${item.name} x${item.quantity} = ${item.amount * item.quantity} ₽`).join('\n');
            setSuccessMessage(`✅ Оплачено:\n${paidServices}\n\nОбщая сумма: ${totalAmount} ₽`);
            // Обновляем баланс счета
            setAccounts((prev)=>prev.map((acc)=>acc.id === selectedAccount ? {
                        ...acc,
                        balance: response.data.balance
                    } : acc));
            // Очищаем корзину
            setCart([]);
            setTimeout(()=>setSuccessMessage(""), 5000);
        } catch (error) {
            console.error("❌ Ошибка оплаты:", error);
            console.error("❌ Детали:", error.response?.data);
            const errorMsg = error.response?.data?.error || "Не удалось выполнить оплату";
            setErrorMessage(errorMsg);
        } finally{
            setProcessing(false);
        }
    };
    const formatCurrency = (amount)=>{
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };
    if (!isAuthenticated) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/dashboard",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backLink,
                children: "← Назад"
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                lineNumber: 240,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].content,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                        children: "Оплата услуг"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this),
                    successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].successMessage,
                        children: successMessage.split('\n').map((line, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: line
                            }, i, false, {
                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                lineNumber: 250,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                        lineNumber: 248,
                        columnNumber: 11
                    }, this),
                    errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                        children: errorMessage
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                        lineNumber: 256,
                        columnNumber: 11
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loading,
                        children: "Загрузка счетов..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this) : accounts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyState,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "У вас нет счетов для оплаты"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/accounts",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].createAccountLink,
                                children: "Создать счет"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                lineNumber: 264,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                        lineNumber: 262,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].grid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].catalog,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accountSelector,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                                                children: "Счет списания"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                lineNumber: 273,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: selectedAccount,
                                                onChange: (e)=>setSelectedAccount(e.target.value),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accountSelect,
                                                disabled: processing,
                                                children: accounts.map((account)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: account.id,
                                                        children: [
                                                            account.account_type === "checking" ? "💳" : "🏦",
                                                            account.account_number,
                                                            " — Баланс: ",
                                                            formatCurrency(account.balance)
                                                        ]
                                                    }, account.id, true, {
                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                lineNumber: 274,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                        lineNumber: 272,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].servicesSection,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].sectionTitle,
                                                children: "Каталог услуг"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].category,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].categoryTitle,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].categoryIcon,
                                                                    children: category.icon
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                    lineNumber: 295,
                                                                    columnNumber: 23
                                                                }, this),
                                                                category.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].servicesGrid,
                                                            children: category.services.map((service)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].serviceButton,
                                                                    onClick: ()=>addToCart(service),
                                                                    disabled: processing,
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].serviceName,
                                                                            children: service.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                            lineNumber: 306,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].serviceAmount,
                                                                            children: formatCurrency(service.amount)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                            lineNumber: 307,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, service.id, true, {
                                                                    fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                    lineNumber: 300,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                            lineNumber: 298,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, category.id, true, {
                                                    fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 19
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cart,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartHeader,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartTitle,
                                                children: "Корзина"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this),
                                            cart.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].clearCartButton,
                                                onClick: clearCart,
                                                disabled: processing,
                                                children: "🗑️ Очистить"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                lineNumber: 323,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                        lineNumber: 320,
                                        columnNumber: 15
                                    }, this),
                                    cart.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyCart,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Корзина пуста"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                lineNumber: 335,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyCartHint,
                                                children: "Нажмите на услугу, чтобы добавить"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                lineNumber: 336,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                        lineNumber: 334,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartItems,
                                                children: cart.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartItem,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartItemInfo,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartItemName,
                                                                        children: item.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                        lineNumber: 346,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartItemPrice,
                                                                        children: [
                                                                            formatCurrency(item.amount),
                                                                            " × ",
                                                                            item.quantity
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                        lineNumber: 347,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                lineNumber: 345,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartItemActions,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].quantityButton,
                                                                        onClick: ()=>updateQuantity(item.id, item.quantity - 1),
                                                                        disabled: processing,
                                                                        children: "−"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                        lineNumber: 353,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].quantity,
                                                                        children: item.quantity
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                        lineNumber: 360,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].quantityButton,
                                                                        onClick: ()=>updateQuantity(item.id, item.quantity + 1),
                                                                        disabled: processing,
                                                                        children: "+"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                        lineNumber: 361,
                                                                        columnNumber: 27
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].removeButton,
                                                                        onClick: ()=>removeFromCart(item.id),
                                                                        disabled: processing,
                                                                        children: "×"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                        lineNumber: 368,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                lineNumber: 352,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartItemTotal,
                                                                children: formatCurrency(item.amount * item.quantity)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                lineNumber: 377,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                        lineNumber: 344,
                                                        columnNumber: 23
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartFooter,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cartTotal,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Итого:"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                lineNumber: 386,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].totalAmount,
                                                                children: formatCurrency(totalAmount)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                                lineNumber: 387,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                        lineNumber: 385,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$payment$2f$payment$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].payAllButton,
                                                        onClick: handlePayAll,
                                                        disabled: processing || cart.length === 0,
                                                        children: processing ? "Обработка..." : "Оплатить всё"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                        lineNumber: 392,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                                lineNumber: 384,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                                lineNumber: 319,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/payment/page.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/payment/page.tsx",
                lineNumber: 244,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(pages)/payment/page.tsx",
        lineNumber: 239,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_0ea9dea3._.js.map