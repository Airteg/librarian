import { css } from "@emotion/react";

export const lightTheme = {
  colors: {
    color: "#000",
    background: "#fff",
    codeBackground: "#f8f8f8",
  },
};

export const darkTheme = {
  colors: {
    color: "#fff",
    background: "#181818",
    codeBackground: "#282c34",
  },
};

export const globalStyles = (theme: any) => css`
  html {
    font-size: clamp(14px, 2vw, 18px); /* адаптивний rem */
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: "Inter", system-ui, sans-serif;
    background: ${theme.colors.background};
    color: ${theme.colors.color};
    line-height: 1.6;
    min-height: 100vh;
    padding: 0 1rem;
  }

  h1 {
    font-size: clamp(2.2rem, 5vw, 3rem);
    margin: 2.5rem 0 1.5rem 0;
    line-height: 1.2;
    font-weight: 800;
  }
  h2 {
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    margin: 2rem 0 1rem 0;
    line-height: 1.25;
    font-weight: 700;
  }
  h3 {
    font-size: clamp(1.3rem, 2vw, 1.8rem);
    margin: 1.5rem 0 0.75rem 0;
    line-height: 1.3;
    font-weight: 600;
  }

  p,
  ul,
  ol {
    font-size: 1rem;
    margin-bottom: 1.15em;
  }

  ul,
  ol {
    padding-left: 2em;
  }

  li {
    margin-bottom: 0.5em;
  }

  a {
    color: ${theme.colors.primary || "#4477cc"};
    text-decoration: underline;
    transition: color 0.15s;
    &:hover {
      color: ${theme.colors.linkHover || "#ee5511"};
    }
  }

  code,
  pre {
    font-family: "Fira Mono", "Consolas", monospace;
    background: ${theme.colors.codeBackground};
    color: ${theme.colors.color};
    font-size: 0.95rem;
    border-radius: 0.25rem;
    padding: 0.15em 0.4em;
  }
  pre {
    padding: 1em;
    margin-bottom: 1.5em;
    overflow-x: auto;
  }
`;
