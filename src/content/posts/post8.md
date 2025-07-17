---
title: Gatsby — Layout
category: programming
url: global-Layout-theme-provider-in-Gatsby
image: ../../images/Gatsby&Layout.png
---

# Як зробити глобальний Layout із провайдером теми у Gatsby

Багато хто хоче, щоб сайт одразу мав світлу або темну тему, однакові шрифти, фон і ніяких зайвих відступів. У Gatsby все це реально — треба правильно винести layout і провайдер теми на глобальний рівень. Ось як це зробити зручно й без “велосипедів”.

---

## 1. Додаємо глобальний Layout через `wrapPageElement`

У Gatsby немає прямого аналога `App.tsx`, як у Next.js. Замість цього є API-функції, через які можна “обгорнути” кожну сторінку в свій Layout-компонент. Головні з них — це `wrapPageElement`, який треба додати одразу в два файли:

- `gatsby-browser.js` — для клієнтського рендеру (перехід між сторінками).
- `gatsby-ssr.js` — для серверного рендеру (під час збірки або першого заходу).

В обох файлах додаємо один і той самий код:

```js
// gatsby-browser.js та gatsby-ssr.js
import * as React from "react";
import Layout from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};
```

Без одного з цих файлів layout працюватиме лише частково. Це важливо.

---

## 2. Layout як провайдер теми і глобальних стилів

Тепер робимо Layout таким, щоб він:

- давав глобальні стилі для всього сайту;
- дозволяв перемикати тему (світла/темна);
- динамічно підхоплював тему системи користувача.

Приклад коду (TypeScript + Emotion):

```tsx
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Global, css, ThemeProvider } from "@emotion/react";
import { darkTheme, lightTheme } from "../global/theme";

const getSystemTheme = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? darkTheme
    : lightTheme;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(getSystemTheme());

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? darkTheme : lightTheme);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  return (
    <>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            padding: 0;
            background: ${theme.colors.background};
            color: ${theme.colors.primary};
            font-family: system-ui, sans-serif;
          }
        `}
      />
      <ThemeProvider theme={theme}>
        <Main>{children}</Main>
      </ThemeProvider>
    </>
  );
};

const Main = styled.main`
  background-color: ${({ theme }) => theme.colors.background};
`;

export default Layout;
```

Що тут відбувається:

- **Global** — прибирає стандартні відступи, ставить потрібні шрифти і кольори.
- **ThemeProvider** — дає доступ до теми всім компонентам через styled.
- **useEffect** та `window.matchMedia` — реагує на зміну теми в системі користувача і міняє тему на сайті автоматично.

---

## 3. Тема за замовчуванням: як у системі

Сайт одразу відображає ту тему (світлу чи темну), яку обрав користувач у своїй ОС, і реагує на її зміну. Так UX стає природнім.

---

## 4. Чим це відрізняється від Next.js

У Next.js ти просто обгортаєш сторінки у `_app.tsx`. У Gatsby такого немає, є тільки спеціальні API:

- `wrapRootElement` — для провайдерів, що не залежать від сторінки (наприклад, state management).
- `wrapPageElement` — для layout, який залежить від сторінки, її props, context тощо.

**В Gatsby треба не забути wrapPageElement в обох файлах!**

---

## Коротко:

1. Створи `gatsby-browser.js` і `gatsby-ssr.js` з `wrapPageElement`, щоб layout був глобальним.
2. В Layout додай глобальні стилі, ThemeProvider і автоматичне визначення теми.
3. Тема за замовчуванням — як у користувача в ОС.
4. У Gatsby layout “збирається” через API, а не через окремий App-компонент, як у Next.js.

---

## Корисні посилання

- [Gatsby Browser APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/?utm_source=chatgpt.com)
- [Gatsby SSR APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/?utm_source=chatgpt.com)
- [wrapRootElement vs wrapPageElement](https://markoskon.com/wrap-root-element-vs-wrap-page-element/?utm_source=chatgpt.com)
