## 1. **Файлова структура:**

```
/librarian
├── /public
├── /src
│   ├── /components     # 👍 Тут мають бути тільки компоненти (UI, layout)
│   ├── /content/posts  # 👍 Локальний markdown (опціонально)
│   ├── /global         # 👍 Глобальні та theme-стилі
│   ├── /images         # 👍 Локальний зображення для markdown posts (опціонально)
│   ├── /pages          # 👍 Сторінки (авто-роутинг Gatsby)
│   ├── /styles         # 👍 Cтилі
│   ├── /templates      # 👍 Для dynamical сторінок (Markdown, blog тощо)
│   └── /utils          # 👍 Утиліти: GraphQL, парсери, хелпери
├── /static             # 👍 Статика, зображення, favicon
├── gatsby-browser.js   # 👍 API Gatsby для керування рендерингом у браузері
├── gatsby-config.js    # 👍 Тут налаштування плагінів, тем, SEO, метадані
├── gatsby-node.js      # 👍 Динамічне створення сторінок, наприклад, із Markdown
├── gatsby-ssr.js       # 👍 API Gatsby для керування рендерингом на сервері (SSR)
├── package.json        # 👍 Залежності, скрипти
└── README.md           # 👍 Коротка документація, як розгорнути проект та як з ним працювати
```

---

## **Пояснення**

- `/src/data` — “Локальні markdown-файли, використовується для тестування та/або резервної копії. У продакшн версії сайт отримує контент через API.”
- `/netlify/functions` — “Serverless-функції для динамічного отримання списку та контенту статей з зовнішнього сховища або API.”

---

## 2. Шпаргалка

“Під час встановлення через pnpm з’явилися попередження щодо deprecated dependencies та peer dependency warnings. Основна робота не блокується, критичних проблем немає. Слідкувати за оновленням ключових плагінів/залежностей, якщо вони впливають на роботу проекту.”

---

### Таблиця залежностей та їх вимог (“хто що хоче”):

| **Пакет**                          | **Вимагає**                                  | **Знайдена версія** | **Де знайдено** |
| ---------------------------------- | -------------------------------------------- | ------------------- | --------------- |
| @typescript-eslint/eslint-plugin   | eslint@"^8.57.0 \|\| ^9.0.0"                 | 7.32.0              | в проекті       |
| @typescript-eslint/type-utils      | eslint@"^8.57.0 \|\| ^9.0.0"                 | 7.32.0              | в проекті       |
| @typescript-eslint/utils           | eslint@"^8.57.0 \|\| ^9.0.0"                 | 7.32.0              | в проекті       |
| @typescript-eslint/parser          | eslint@"^8.57.0 \|\| ^9.0.0"                 | 7.32.0              | в проекті       |
| eslint-config-react-app (у Gatsby) | @typescript-eslint/eslint-plugin@^4.0.0      | 5.62.0 (в Gatsby)   | у Gatsby        |
| eslint-config-react-app (у Gatsby) | @typescript-eslint/parser@^4.0.0             | 5.62.0 (в Gatsby)   | у Gatsby        |
| react-server-dom-webpack           | react\@0.0.0-experimental-c8b778b7f-20220825 | 18.3.1              | в проекті       |

---

### **Що це означає:**

- **@typescript-eslint/**\* (8.36.0) **вимагає** сучасний eslint `^8.57.0` або `^9.0.0`
  Встановлений **eslint 7.32.0** (бо Gatsby так хоче).
- **eslint-config-react-app** (який йде через Gatsby)
  вимагає старіші версії @typescript-eslint/\* (4.x),
  але знаходить 5.x (в Gatsby) і 8.x (в проекті).
- **react-server-dom-webpack** хоче експериментальний React, а я маю релізний.

---

### **Висновок:**

- Я зараз між двома “вогнями”:

  - Нові лінтери хочуть **новий eslint** (8.57+)
  - Gatsby (і старі плагіни) залежать від **старого eslint** (7.x)

- Це не “фатальні” помилки, **peer dependency warnings** — код буде працювати, але лінтер може вести себе неідеально.

І я роздратований!

---

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

"Для роботи з Gatsby 5.x рекомендується використовувати ESLint 7.1.0, CommonJS-конфіги (require), і не вказувати "type": "module" у package.json.
Peer warning-и можна ігнорувати, якщо білд і lint проходять."

“У dev режимі всі фічі працюють тільки через Netlify Dev: http://localhost:8888”

"gatsby-ssr.js та gatsby-browser.js використовують wrapPageElement із src/utils/wrapPageElement.js для обгортання сторінок у Layout."

Ось варіант зауваження для себе (чи колеги) про це рішення, з акцентом на роботу з типами і централізацію теми у Gatsby + Emotion:

---

### Зауваження щодо структури теми й типів у Gatsby + Emotion

- **Тип Theme для Emotion** має бути оголошений **ОДИН** раз у проєкті, через module augmentation у `.d.ts` файлі (наприклад, `src/global/emotion.d.ts`).
  Це технічна вимога TypeScript і самого Emotion, і її не обійти — інакше типізація працювати не буде.

- **Всі об’єкти теми (lightTheme, darkTheme), глобальні стилі та утиліти** можна централізувати у будь-якому одному `.ts` або `.tsx` файлі (наприклад, `src/global/global.tsx`).

- **Неприпустимо дублювати оголошення Theme чи розкладати його по різних файлах** — це створить плутанину і може спричинити важковловимі помилки при розширенні теми.

- **Мінімальна структура:**

  - Один `.d.ts` для типу Theme (TypeScript сам його підхопить).
  - Все інше (стилі, об'єкти теми, функції) — в одному місці.

- **Це обмеження не баг, а дизайн TypeScript + Emotion.**

  > (Спроби винести type Theme у .tsx або .ts — TypeScript ігноруватиме при module augmentation!)

---
