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
"[project]/src/app/(pages)/transfer/transfer.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "backButton": "transfer-module__gozuLa__backButton",
  "backLink": "transfer-module__gozuLa__backLink",
  "confirmActions": "transfer-module__gozuLa__confirmActions",
  "confirmAmount": "transfer-module__gozuLa__confirmAmount",
  "confirmButton": "transfer-module__gozuLa__confirmButton",
  "confirmDetails": "transfer-module__gozuLa__confirmDetails",
  "confirmLabel": "transfer-module__gozuLa__confirmLabel",
  "confirmRow": "transfer-module__gozuLa__confirmRow",
  "confirmStep": "transfer-module__gozuLa__confirmStep",
  "confirmTitle": "transfer-module__gozuLa__confirmTitle",
  "confirmValue": "transfer-module__gozuLa__confirmValue",
  "container": "transfer-module__gozuLa__container",
  "content": "transfer-module__gozuLa__content",
  "createAccountLink": "transfer-module__gozuLa__createAccountLink",
  "emptyState": "transfer-module__gozuLa__emptyState",
  "errorMessage": "transfer-module__gozuLa__errorMessage",
  "fadeIn": "transfer-module__gozuLa__fadeIn",
  "formGroup": "transfer-module__gozuLa__formGroup",
  "formStep": "transfer-module__gozuLa__formStep",
  "input": "transfer-module__gozuLa__input",
  "label": "transfer-module__gozuLa__label",
  "loading": "transfer-module__gozuLa__loading",
  "nextButton": "transfer-module__gozuLa__nextButton",
  "phoneSearch": "transfer-module__gozuLa__phoneSearch",
  "recipientAvatar": "transfer-module__gozuLa__recipientAvatar",
  "recipientCard": "transfer-module__gozuLa__recipientCard",
  "recipientInfo": "transfer-module__gozuLa__recipientInfo",
  "recipientName": "transfer-module__gozuLa__recipientName",
  "recipientPhone": "transfer-module__gozuLa__recipientPhone",
  "searchButton": "transfer-module__gozuLa__searchButton",
  "select": "transfer-module__gozuLa__select",
  "slideUp": "transfer-module__gozuLa__slideUp",
  "successMessage": "transfer-module__gozuLa__successMessage",
  "title": "transfer-module__gozuLa__title",
  "transferCard": "transfer-module__gozuLa__transferCard",
});
}}),
"[project]/src/app/(pages)/transfer/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>TransferPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(auth)/context/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/(pages)/transfer/transfer.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
;
;
function TransferPage() {
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$auth$292f$context$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [accounts, setAccounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedAccount, setSelectedAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("form");
    const [recipient, setRecipient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [processing, setProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [errorMessage, setErrorMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [successMessage, setSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
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
    const handleSearchRecipient = async ()=>{
        if (!phone) {
            setErrorMessage("Введите номер телефона");
            return;
        }
        // Простая валидация телефона
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        if (!phoneRegex.test(phone)) {
            setErrorMessage("Неверный формат телефона");
            return;
        }
        try {
            setSearching(true);
            setErrorMessage("");
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].get(`/users/by-phone/${encodeURIComponent(phone)}`);
            setRecipient(response.data);
        } catch (error) {
            console.error("Ошибка поиска:", error);
            if (error.response?.status === 404) {
                setErrorMessage("Пользователь с таким номером не найден");
            } else {
                setErrorMessage("Ошибка при поиске пользователя");
            }
            setRecipient(null);
        } finally{
            setSearching(false);
        }
    };
    const handleNext = ()=>{
        if (!selectedAccount) {
            setErrorMessage("Выберите счет списания");
            return;
        }
        if (!recipient) {
            setErrorMessage("Найдите получателя");
            return;
        }
        if (!amount || parseFloat(amount) <= 0) {
            setErrorMessage("Введите сумму перевода");
            return;
        }
        const selectedAcc = accounts.find((a)=>a.id === selectedAccount);
        if (selectedAcc && parseFloat(amount) > selectedAcc.balance) {
            setErrorMessage("Недостаточно средств на счете");
            return;
        }
        setStep("confirm");
        setErrorMessage("");
    };
    const handleTransfer = async ()=>{
        try {
            setProcessing(true);
            setErrorMessage("");
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].post(`/accounts/${selectedAccount}/transfer`, {
                to_phone: recipient.phone,
                amount: parseFloat(amount),
                description: description || `Перевод ${recipient.first_name} ${recipient.last_name}`
            });
            console.log("✅ Перевод выполнен:", response.data);
            setSuccessMessage(`✅ Перевод на сумму ${amount} ₽ успешно выполнен!`);
            // Обновляем баланс счета
            setAccounts((prev)=>prev.map((acc)=>acc.id === selectedAccount ? {
                        ...acc,
                        balance: acc.balance - parseFloat(amount)
                    } : acc));
            // Сбрасываем форму
            setTimeout(()=>{
                setStep("form");
                setPhone("");
                setAmount("");
                setDescription("");
                setRecipient(null);
                setSuccessMessage("");
            }, 3000);
        } catch (error) {
            console.error("❌ Ошибка перевода:", error);
            setErrorMessage(error.response?.data?.error || "Не удалось выполнить перевод");
        } finally{
            setProcessing(false);
        }
    };
    const handleBack = ()=>{
        setStep("form");
        setErrorMessage("");
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
    const selectedAccountData = accounts.find((a)=>a.id === selectedAccount);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/dashboard",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backLink,
                children: "← Назад"
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].content,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                        children: "Перевод по номеру телефона"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, this),
                    successMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].successMessage,
                        children: successMessage
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                        lineNumber: 205,
                        columnNumber: 11
                    }, this),
                    errorMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].errorMessage,
                        children: errorMessage
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this),
                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].loading,
                        children: "Загрузка счетов..."
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this) : accounts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].emptyState,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "У вас нет счетов для перевода"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                lineNumber: 216,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                href: "/accounts",
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].createAccountLink,
                                children: "Создать счет"
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                lineNumber: 217,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                        lineNumber: 215,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].transferCard,
                        children: step === "form" ? /* Шаг 1: Форма перевода */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formStep,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                            children: "Счет списания"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 227,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            value: selectedAccount,
                                            onChange: (e)=>setSelectedAccount(e.target.value),
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].select,
                                            disabled: processing,
                                            children: accounts.map((account)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: account.id,
                                                    children: [
                                                        account.account_type === "checking" ? "💳" : "🏦",
                                                        account.account_number,
                                                        " — Баланс:",
                                                        " ",
                                                        formatCurrency(account.balance)
                                                    ]
                                                }, account.id, true, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 228,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                    lineNumber: 226,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                            children: "Номер телефона получателя"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 245,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].phoneSearch,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "tel",
                                                    value: phone,
                                                    onChange: (e)=>setPhone(e.target.value),
                                                    placeholder: "+79991234567",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input,
                                                    disabled: searching || processing
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleSearchRecipient,
                                                    disabled: searching || !phone,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].searchButton,
                                                    children: searching ? "Поиск..." : "Найти"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 257,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 248,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                    lineNumber: 244,
                                    columnNumber: 17
                                }, this),
                                recipient && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].recipientCard,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].recipientAvatar,
                                            children: [
                                                recipient.first_name[0],
                                                recipient.last_name[0]
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 269,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].recipientInfo,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].recipientName,
                                                    children: [
                                                        recipient.first_name,
                                                        " ",
                                                        recipient.last_name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 274,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].recipientPhone,
                                                    children: recipient.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 273,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                    lineNumber: 268,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                            children: "Сумма перевода"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 285,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            value: amount,
                                            onChange: (e)=>setAmount(e.target.value),
                                            placeholder: "1000",
                                            min: "1",
                                            step: "1",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input,
                                            disabled: !recipient || processing
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                    lineNumber: 284,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].formGroup,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].label,
                                            children: "Комментарий (необязательно)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 299,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: description,
                                            onChange: (e)=>setDescription(e.target.value),
                                            placeholder: "Назначение перевода",
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].input,
                                            disabled: !recipient || processing
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 302,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                    lineNumber: 298,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleNext,
                                    disabled: !recipient || !amount || processing,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].nextButton,
                                    children: "Продолжить"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                    lineNumber: 312,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                            lineNumber: 225,
                            columnNumber: 15
                        }, this) : /* Шаг 2: Подтверждение */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmStep,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmTitle,
                                    children: "Проверьте данные"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                    lineNumber: 323,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmDetails,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmLabel,
                                                    children: "Со счета:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 327,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmValue,
                                                    children: selectedAccountData?.account_number
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 326,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmLabel,
                                                    children: "Получатель:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 334,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmValue,
                                                    children: [
                                                        recipient?.first_name,
                                                        " ",
                                                        recipient?.last_name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 335,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 333,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmLabel,
                                                    children: "Телефон:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 341,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmValue,
                                                    children: recipient?.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 342,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 340,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmLabel,
                                                    children: "Сумма:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 348,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmAmount,
                                                    children: formatCurrency(parseFloat(amount))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 349,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 347,
                                            columnNumber: 19
                                        }, this),
                                        description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmRow,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmLabel,
                                                    children: "Комментарий:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 356,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmValue,
                                                    children: description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 355,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                    lineNumber: 325,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmActions,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleBack,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backButton,
                                            disabled: processing,
                                            children: "Назад"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 363,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleTransfer,
                                            disabled: processing,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$transfer$2f$transfer$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].confirmButton,
                                            children: processing ? "Выполняется перевод..." : "Подтвердить перевод"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                            lineNumber: 370,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                                    lineNumber: 362,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                            lineNumber: 322,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/transfer/page.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(pages)/transfer/page.tsx",
        lineNumber: 196,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_f019cbb2._.js.map