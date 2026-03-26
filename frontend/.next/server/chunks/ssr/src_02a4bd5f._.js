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
"[project]/src/app/(pages)/credit-calculator/credit-calculator.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "accountSelect": "credit-calculator-module__NvF5_q__accountSelect",
  "applyButton": "credit-calculator-module__NvF5_q__applyButton",
  "authLink": "credit-calculator-module__NvF5_q__authLink",
  "backLink": "credit-calculator-module__NvF5_q__backLink",
  "calculateButton": "credit-calculator-module__NvF5_q__calculateButton",
  "calculatorGrid": "credit-calculator-module__NvF5_q__calculatorGrid",
  "container": "credit-calculator-module__NvF5_q__container",
  "content": "credit-calculator-module__NvF5_q__content",
  "currency": "credit-calculator-module__NvF5_q__currency",
  "errorMessage": "credit-calculator-module__NvF5_q__errorMessage",
  "fadeIn": "credit-calculator-module__NvF5_q__fadeIn",
  "form": "credit-calculator-module__NvF5_q__form",
  "formGroup": "credit-calculator-module__NvF5_q__formGroup",
  "formSection": "credit-calculator-module__NvF5_q__formSection",
  "header": "credit-calculator-module__NvF5_q__header",
  "inputWrapper": "credit-calculator-module__NvF5_q__inputWrapper",
  "label": "credit-calculator-module__NvF5_q__label",
  "notAuthMessage": "credit-calculator-module__NvF5_q__notAuthMessage",
  "numberInput": "credit-calculator-module__NvF5_q__numberInput",
  "rangeInput": "credit-calculator-module__NvF5_q__rangeInput",
  "rangeLabels": "credit-calculator-module__NvF5_q__rangeLabels",
  "rate": "credit-calculator-module__NvF5_q__rate",
  "resultItem": "credit-calculator-module__NvF5_q__resultItem",
  "resultLabel": "credit-calculator-module__NvF5_q__resultLabel",
  "resultValue": "credit-calculator-module__NvF5_q__resultValue",
  "resultsCard": "credit-calculator-module__NvF5_q__resultsCard",
  "resultsGrid": "credit-calculator-module__NvF5_q__resultsGrid",
  "resultsSection": "credit-calculator-module__NvF5_q__resultsSection",
  "scaleIn": "credit-calculator-module__NvF5_q__scaleIn",
  "scheduleCard": "credit-calculator-module__NvF5_q__scheduleCard",
  "scheduleTable": "credit-calculator-module__NvF5_q__scheduleTable",
  "slideUp": "credit-calculator-module__NvF5_q__slideUp",
  "subtitle": "credit-calculator-module__NvF5_q__subtitle",
  "successButton": "credit-calculator-module__NvF5_q__successButton",
  "successContent": "credit-calculator-module__NvF5_q__successContent",
  "successIcon": "credit-calculator-module__NvF5_q__successIcon",
  "successMessage": "credit-calculator-module__NvF5_q__successMessage",
  "tableBody": "credit-calculator-module__NvF5_q__tableBody",
  "tableHeader": "credit-calculator-module__NvF5_q__tableHeader",
  "tableNote": "credit-calculator-module__NvF5_q__tableNote",
  "tableRow": "credit-calculator-module__NvF5_q__tableRow",
  "term": "credit-calculator-module__NvF5_q__term",
  "title": "credit-calculator-module__NvF5_q__title",
});
}}),
"[project]/src/app/(pages)/credit-calculator/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CreditCalculator)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(auth)/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/(pages)/credit-calculator/credit-calculator.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
;
function CreditCalculator() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        amount: 1000000,
        term: 12,
        rate: 9.9
    });
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAccount, setSelectedAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [calculation, setCalculation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [applying, setApplying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [creditApplied, setCreditApplied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Загружаем счета пользователя
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (user) {
            loadAccounts();
        }
    }, [
        user
    ]);
    const loadAccounts = async ()=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["accountsAPI"].getUserAccounts(user.id);
            setAccounts(response.data || []);
            if (response.data && response.data.length > 0) {
                setSelectedAccount(response.data[0].id);
            }
        } catch (error) {
            console.error("Ошибка загрузки счетов:", error);
        }
    };
    const calculateCredit = ()=>{
        setLoading(true);
        setTimeout(()=>{
            const { amount, term, rate } = formData;
            const monthlyRate = rate / 100 / 12;
            const monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1);
            const totalAmount = monthlyPayment * term;
            const overpayment = totalAmount - amount;
            const paymentSchedule = [];
            let remaining = amount;
            for(let month = 1; month <= term; month++){
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        calculateCredit();
    }, []);
    const handleInputChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prev)=>({
                ...prev,
                [name]: parseFloat(value) || 0
            }));
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        calculateCredit();
    };
    const handleApplyCredit = async ()=>{
        if (!selectedAccount) {
            setErrorMessage("Выберите счет для зачисления кредита");
            return;
        }
        if (!isAuthenticated) {
            router.push("/login");
            return;
        }
        setApplying(true);
        setErrorMessage("");
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["creditAPI"].applyCredit(selectedAccount, formData.amount, formData.term, formData.rate);
            console.log("✅ Кредит оформлен:", response.data);
            setCreditApplied(true);
            // Обновляем баланс счета в локальном состоянии
            setAccounts((prev)=>prev.map((acc)=>acc.id === selectedAccount ? {
                        ...acc,
                        balance: response.data.account.balance
                    } : acc));
        } catch (err) {
            console.error("❌ Ошибка оформления кредита:", err);
            setErrorMessage(err.response?.data?.error || "Не удалось оформить кредит");
        } finally{
            setApplying(false);
        }
    };
    const handleGoBack = ()=>{
        setCreditApplied(false);
        router.push("/dashboard");
    };
    const formatCurrency = (amount)=>{
        return new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0
        }).format(amount);
    };
    // Если пользователь не авторизован — показываем сообщение
    if (!isAuthenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    href: "/",
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backLink,
                    children: "← Назад"
                }, void 0, false, {
                    fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].content,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                                    children: "Кредитный калькулятор"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                    lineNumber: 187,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                                    children: "Войдите в систему, чтобы оформить кредит"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                    lineNumber: 188,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                            lineNumber: 186,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formSection,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].notAuthMessage,
                                children: [
                                    "Для оформления кредита необходимо",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/login",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].authLink,
                                        children: "войти"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                        lineNumber: 195,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                            lineNumber: 192,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                    lineNumber: 185,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
            lineNumber: 181,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backLink,
                children: "← Назад"
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].content,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].header,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                                children: "Кредитный калькулятор"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                lineNumber: 212,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].subtitle,
                                children: "Рассчитайте ежемесячный платеж и переплату по кредиту"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                        lineNumber: 211,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].calculatorGrid,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formSection,
                                children: [
                                    accounts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                                children: [
                                                    "Счёт для зачисления",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].currency,
                                                        children: "💳"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 226,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: selectedAccount,
                                                onChange: (e)=>setSelectedAccount(e.target.value),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].accountSelect,
                                                children: accounts.map((account)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: account.id,
                                                        children: [
                                                            account.account_type === "checking" ? "💰 Дебетовый" : "🏦 Кредитный",
                                                            " ",
                                                            " - Баланс: ",
                                                            formatCurrency(account.balance)
                                                        ]
                                                    }, account.id, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 234,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                        lineNumber: 223,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                        onSubmit: handleSubmit,
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].form,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                                        children: [
                                                            "Сумма кредита",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].currency,
                                                                children: "₽"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 245,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "range",
                                                                name: "amount",
                                                                min: "50000",
                                                                max: "5000000",
                                                                step: "50000",
                                                                value: formData.amount,
                                                                onChange: handleInputChange,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rangeInput
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 250,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                name: "amount",
                                                                value: formData.amount,
                                                                onChange: handleInputChange,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].numberInput,
                                                                min: "50000",
                                                                max: "5000000"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 260,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 249,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rangeLabels,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "50 000 ₽"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 271,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "5 000 000 ₽"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 272,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                lineNumber: 244,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                                        children: [
                                                            "Срок кредита",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].term,
                                                                children: "мес."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 277,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "range",
                                                                name: "term",
                                                                min: "3",
                                                                max: "60",
                                                                value: formData.term,
                                                                onChange: handleInputChange,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rangeInput
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 282,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                name: "term",
                                                                value: formData.term,
                                                                onChange: handleInputChange,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].numberInput,
                                                                min: "3",
                                                                max: "60"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 291,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 281,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rangeLabels,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "3 мес."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 302,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "60 мес."
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 303,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 301,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                lineNumber: 276,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                                        children: [
                                                            "Процентная ставка",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rate,
                                                                children: "%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 310,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].inputWrapper,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "range",
                                                                name: "rate",
                                                                min: "5",
                                                                max: "25",
                                                                step: "0.1",
                                                                value: formData.rate,
                                                                onChange: handleInputChange,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rangeInput
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 313,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "number",
                                                                name: "rate",
                                                                value: formData.rate,
                                                                onChange: handleInputChange,
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].numberInput,
                                                                min: "5",
                                                                max: "25",
                                                                step: "0.1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 323,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 312,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].rangeLabels,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "5%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 335,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "25%"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 336,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 334,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                lineNumber: 307,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].calculateButton,
                                                disabled: loading,
                                                children: loading ? "Рассчитываем..." : "Рассчитать кредит"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                lineNumber: 340,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                        lineNumber: 243,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultsSection,
                                children: [
                                    errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                                        children: errorMessage
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                        lineNumber: 353,
                                        columnNumber: 15
                                    }, this),
                                    calculation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultsCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Результаты расчета"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 359,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultsGrid,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultItem,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultLabel,
                                                                        children: "Ежемесячный платеж"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 363,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultValue,
                                                                        children: formatCurrency(calculation.monthlyPayment)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 366,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 362,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultItem,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultLabel,
                                                                        children: "Общая сумма"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 372,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultValue,
                                                                        children: formatCurrency(calculation.totalAmount)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 373,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 371,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultItem,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultLabel,
                                                                        children: "Переплата"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 379,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultValue,
                                                                        children: formatCurrency(calculation.overpayment)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 380,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 378,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultItem,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultLabel,
                                                                        children: "Эффективная ставка"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 386,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].resultValue,
                                                                        children: [
                                                                            formData.rate.toFixed(1),
                                                                            "%"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 389,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 385,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 361,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                lineNumber: 358,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scheduleCard,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        children: "График платежей"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 398,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].scheduleTable,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tableHeader,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Месяц"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 401,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Платеж"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 402,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Основной долг"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 403,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Проценты"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 404,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: "Остаток"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 405,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 400,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tableBody,
                                                                children: calculation.paymentSchedule.slice(0, 6).map((payment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tableRow,
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: payment.month
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                                lineNumber: 412,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: formatCurrency(payment.payment)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                                lineNumber: 413,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: formatCurrency(payment.principal)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                                lineNumber: 414,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: formatCurrency(payment.interest)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                                lineNumber: 415,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                children: formatCurrency(payment.remaining)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                                lineNumber: 416,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, payment.month, true, {
                                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                        lineNumber: 411,
                                                                        columnNumber: 27
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 407,
                                                                columnNumber: 21
                                                            }, this),
                                                            calculation.paymentSchedule.length > 6 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].tableNote,
                                                                children: [
                                                                    "Показаны первые 6 месяцев из",
                                                                    " ",
                                                                    calculation.paymentSchedule.length
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                                lineNumber: 421,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].applyButton,
                                                onClick: handleApplyCredit,
                                                disabled: applying,
                                                children: applying ? "Оформление..." : "Оформить кредит"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                                lineNumber: 429,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    creditApplied && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].successMessage,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].successContent,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].successIcon,
                                    children: "✅"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                    lineNumber: 444,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "Кредит успешно оформлен!"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                    lineNumber: 445,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "На ваш счёт зачислено ",
                                        formatCurrency(formData.amount),
                                        " ₽.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                            lineNumber: 448,
                                            columnNumber: 17
                                        }, this),
                                        "Ежемесячный платёж: ",
                                        formatCurrency(calculation?.monthlyPayment || 0),
                                        " ₽.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                            lineNumber: 450,
                                            columnNumber: 17
                                        }, this),
                                        "Срок кредита: ",
                                        formData.term,
                                        " месяцев."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                    lineNumber: 446,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$credit$2d$calculator$2f$credit$2d$calculator$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].successButton,
                                    onClick: handleGoBack,
                                    children: "На главную"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                                    lineNumber: 453,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                            lineNumber: 443,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(pages)/credit-calculator/page.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_02a4bd5f._.js.map