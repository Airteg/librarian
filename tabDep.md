﻿### Таблиця залежностей та їх вимог (“хто що хоче”):

| **Пакет**                          | **Вимагає**                                  | **Знайдена версія** | **Де знайдено**  |
| ---------------------------------- | -------------------------------------------- | ------------------- | ---------------- |
| @typescript-eslint/eslint-plugin   | eslint@"^8.57.0 \|\| ^9.0.0"                 | 7.32.0              | у тебе в проекті |
| @typescript-eslint/type-utils      | eslint@"^8.57.0 \|\| ^9.0.0"                 | 7.32.0              | у тебе в проекті |
| @typescript-eslint/utils           | eslint@"^8.57.0 \|\| ^9.0.0"                 | 7.32.0              | у тебе в проекті |
| @typescript-eslint/parser          | eslint@"^8.57.0 \|\| ^9.0.0"                 | 7.32.0              | у тебе в проекті |
| eslint-config-react-app (у Gatsby) | @typescript-eslint/eslint-plugin@^4.0.0      | 5.62.0 (в Gatsby)   | у Gatsby         |
| eslint-config-react-app (у Gatsby) | @typescript-eslint/parser@^4.0.0             | 5.62.0 (в Gatsby)   | у Gatsby         |
| react-server-dom-webpack           | react\@0.0.0-experimental-c8b778b7f-20220825 | 18.3.1              | у тебе в проекті |

---

### **Що це означає:**

- **@typescript-eslint/**\* (8.36.0) **вимагає** сучасний eslint `^8.57.0` або `^9.0.0`
  Встановлений **eslint 7.32.0** (бо Gatsby так хоче).
- **eslint-config-react-app** (який йде через Gatsby)
  вимагає старіші версії @typescript-eslint/\* (4.x),
  але знаходить 5.x (в Gatsby) і 8.x (у тебе).
- **react-server-dom-webpack** хоче експериментальний React, а я маю релізний.

---

### **Висновок:**

- Я зараз між двома “вогнями”:

  - Нові лінтери хочуть **новий eslint** (8.57+)
  - Gatsby (і старі плагіни) залежать від **старого eslint** (7.x)

- Це не “фатальні” помилки, а **peer dependency warnings** — код буде працювати, але лінтер може вести себе неідеально.

І я роздратований!
