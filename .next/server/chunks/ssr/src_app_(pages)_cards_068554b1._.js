module.exports = {

"[project]/src/app/(pages)/cards/cards.module.css [app-ssr] (css module)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v({
  "active": "cards-module__2Bj4Vq__active",
  "backLink": "cards-module__2Bj4Vq__backLink",
  "card": "cards-module__2Bj4Vq__card",
  "cardImage": "cards-module__2Bj4Vq__cardImage",
  "cardInfo": "cards-module__2Bj4Vq__cardInfo",
  "cardsGrid": "cards-module__2Bj4Vq__cardsGrid",
  "container": "cards-module__2Bj4Vq__container",
  "description": "cards-module__2Bj4Vq__description",
  "fadeInUp": "cards-module__2Bj4Vq__fadeInUp",
  "form": "cards-module__2Bj4Vq__form",
  "success": "cards-module__2Bj4Vq__success",
  "title": "cards-module__2Bj4Vq__title",
  "type": "cards-module__2Bj4Vq__type",
});
}}),
"[project]/src/app/(pages)/cards/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>CardsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/app/(pages)/cards/cards.module.css [app-ssr] (css module)");
"use client";
;
;
;
;
;
function CardsPage() {
    const [activeCard, setActiveCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        address: "",
        phone: ""
    });
    const [submitted, setSubmitted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const bankCards = [
        {
            id: "neo",
            name: "Neo Card",
            type: "Дебетовая карта",
            image: "/cards/neo.jpg",
            benefits: [
                "Кэшбэк до 10% за все покупки",
                "Начисление 5% годовых на остаток",
                "Бесплатные переводы",
                "Мгновенные уведомления"
            ],
            description: "Современная карта для цифрового поколения"
        },
        {
            id: "quantum",
            name: "Quantum Card",
            type: "Кредитная карта",
            image: "/cards/quantum.jpg",
            benefits: [
                "Кэшбэк до 15% в избранных категориях",
                "Беспроцентный период 180 дней",
                "Бесплатное обслуживание",
                "Страхование покупок"
            ],
            description: "Идеальна для повседневных покупок и путешествий"
        },
        {
            id: "cosmic",
            name: "Cosmic Card",
            type: "Премиум карта",
            image: "/cards/cosmic.jpg",
            benefits: [
                "Эксклюзивный кэшбэк до 20%",
                "Беспроцентный период 365 дней",
                "Доступ в бизнес-залы аэропортов",
                "Персональный менеджер"
            ],
            description: "Премиальный статус и эксклюзивные привилегии"
        }
    ];
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (formData.name && formData.address && formData.phone) {
            setSubmitted(true);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].backLink,
                children: "← Назад"
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/cards/page.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].title,
                children: "Выберите свою карту"
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/cards/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardsGrid,
                children: bankCards.map((card, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].card} ${activeCard === card.id ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].active : ""}`,
                        onClick: ()=>setActiveCard(activeCard === card.id ? null : card.id),
                        style: {
                            animationDelay: `${i * 0.2}s`
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                src: card.image,
                                alt: card.name,
                                width: 320,
                                height: 200,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardImage
                            }, void 0, false, {
                                fileName: "[project]/src/app/(pages)/cards/page.tsx",
                                lineNumber: 86,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].cardInfo,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: card.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                                        lineNumber: 94,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].type,
                                        children: card.type
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                                        lineNumber: 95,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].description,
                                        children: card.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                                        lineNumber: 96,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: card.benefits.map((b, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: b
                                            }, idx, false, {
                                                fileName: "[project]/src/app/(pages)/cards/page.tsx",
                                                lineNumber: 99,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                                        lineNumber: 97,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/(pages)/cards/page.tsx",
                                lineNumber: 93,
                                columnNumber: 13
                            }, this)
                        ]
                    }, card.id, true, {
                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                        lineNumber: 76,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/(pages)/cards/page.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            activeCard && !submitted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].form,
                onSubmit: handleSubmit,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: [
                            "Оформление ",
                            bankCards.find((c)=>c.id === activeCard)?.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Ваше ФИО",
                        value: formData.name,
                        onChange: (e)=>setFormData({
                                ...formData,
                                name: e.target.value
                            }),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                        lineNumber: 111,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Адрес доставки",
                        value: formData.address,
                        onChange: (e)=>setFormData({
                                ...formData,
                                address: e.target.value
                            }),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                        lineNumber: 118,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "tel",
                        placeholder: "Телефон",
                        value: formData.phone,
                        onChange: (e)=>setFormData({
                                ...formData,
                                phone: e.target.value
                            }),
                        required: true
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                        lineNumber: 127,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        children: "Оформить карту"
                    }, void 0, false, {
                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/cards/page.tsx",
                lineNumber: 109,
                columnNumber: 9
            }, this),
            submitted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$pages$292f$cards$2f$cards$2e$module$2e$css__$5b$app$2d$ssr$5d$__$28$css__module$29$__["default"].success,
                children: [
                    "✅ Заявка на ",
                    bankCards.find((c)=>c.id === activeCard)?.name,
                    " успешно оформлена!",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                        fileName: "[project]/src/app/(pages)/cards/page.tsx",
                        lineNumber: 142,
                        columnNumber: 90
                    }, this),
                    "Мы свяжемся с вами для уточнения деталей доставки."
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/(pages)/cards/page.tsx",
                lineNumber: 141,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/(pages)/cards/page.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
}}),

};

//# sourceMappingURL=src_app_%28pages%29_cards_068554b1._.js.map