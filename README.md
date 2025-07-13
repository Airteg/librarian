## 1. **Файлова структура:**

```
/librarian
├── /public
├── /src
│   ├── /components   # 👍 Тут мають бути тільки компоненти (UI, layout)
│   ├── /pages        # 👍 Сторінки (авто-роутинг Gatsby)
│   ├── /styles       # 👍 Глобальні та theme-стилі, якщо працюєш через Emotion
│   ├── /templates    # 👍 Для dynamical сторінок (Markdown, blog тощо)
│   ├── /data         # 👍 Локальний markdown (опціонально)
│   └── /utils        # 👍 Утиліти: GraphQL, парсери, хелпери
├── /static           # 👍 Статика, зображення, favicon
├── /netlify/functions # (Netlify Functions)
├── gatsby-config.js  # 👍 Тут налаштування плагінів, тем, SEO, метадані
├── gatsby-node.js    # 👍 Динамічне створення сторінок, наприклад, із Markdown
├── package.json      # 👍 Залежності, скрипти
├── netlify.toml      # 👍 Конфіг для Netlify, build, редиректи, env-змінні, функції
└── README.md         # 👍 Коротка документація, як розгорнути проект та як з ним працювати
```

---

## **Пояснення**

- `/src/data` — “Локальні markdown-файли, використовується для тестування та/або резервної копії. У продакшн версії сайт отримує контент через API.”
- `/netlify/functions` — “Serverless-функції для динамічного отримання списку та контенту статей з зовнішнього сховища або API.”

---

## 2. Шпаргалка

“Під час встановлення через pnpm з’явилися попередження щодо deprecated dependencies та peer dependency warnings. Основна робота не блокується, критичних проблем немає. Слідкувати за оновленням ключових плагінів/залежностей, якщо вони впливають на роботу проекту.”

“Виконано pnpm approve-builds для всіх критичних пакетів (gatsby, gatsby-cli, sharp, core-js та ін.). Build-скрипти дозволено згідно рекомендацій Gatsby.”

“Схвалення build-скриптів через pnpm approve-builds потрібно робити тільки для нових або оновлених пакетів, які вимагають build. Для вже схвалених — pnpm запам’ятовує вибір.”

“.pnpm-state.yaml — службовий файл pnpm, який зберігає статус дозволів build-скриптів, щоб їх не треба було схвалювати при кожному встановленні залежностей.
pnpm-workspace.yaml потрібен тільки для монорепозиторіїв, для звичайного проекту не обов'язковий.”

“pnpm зберігає інформацію про дозволені build-скрипти локально — або у кеші, або у lock-файлі.
Спеціальний файл .pnpm-state.yaml може не з’явитися у корені проекту, але дозволи будуть збережені.”

“ESLint та основні плагіни встановлено через pnpm.
Деякі peer dependency warning-і — це типова ситуація для сучасної екосистеми.
Для чистого JS/React/Gatsby достатньо @babel/eslint-parser, eslint-plugin-react, eslint-plugin-jsx-a11y, eslint-plugin-react-hooks.”

“Для зручності та кращої підтримки tooling ESLint-конфіг зберігається у форматі .eslintrc.js навіть у TypeScript-проектах.
Gatsby-конфіги можуть бути у .ts (gatsby-config.ts), бо Gatsby їх автоматично обробляє.”

“Gatsby v5 працює виключно з React 18. Використовуємо останню стабільну версію в межах 18.x, щоб уникнути peer-помилок і забезпечити підтримку всіх фіч.”

“На етапі ініціалізації Gatsby було обрано:

- Responsive images (gatsby-plugin-image та gatsby-plugin-sharp)
- Sitemap (gatsby-plugin-sitemap)
- Markdown support (gatsby-transformer-remark та gatsby-source-filesystem, лише для локального dev або резервної копії)”

“Для PWA:

- Використовується gatsby-plugin-manifest для генерації manifest.webmanifest.
- Використовується gatsby-plugin-offline для кешування та роботи у офлайн-режимі.
- Іконки для PWA зберігаються у /src/static/icon.png (512x512px).”

"PWA enabled via:

- gatsby-plugin-manifest (src/static/icon.png, 512x512px)
- gatsby-plugin-offline"

"Для уникнення конфліктів з flowtype/старими eslint-config, рекомендується використовувати тільки сучасний набір eslint-плагінів:

eslint
eslint-plugin-react
eslint-plugin-react-hooks"

"В проєкті НЕ використовується Flow та специфічний конфігураційний набір Create React App.
Лінтинг налаштовано через базові плагіни ESLint для React та JS."

"src/gatsby-types.d.ts — автогенерований файл типів для GraphQL-схеми Gatsby.
Оновлюється автоматично при кожному запуску develop/build, видаляти або змінювати вручну не потрібно."
