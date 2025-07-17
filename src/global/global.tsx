import { css } from "@emotion/react";

export const lightTheme = {
  colors: {
    color: "#000",
    background: "#fff",
  },
};

export const darkTheme = {
  colors: {
    color: "#fff",
    background: "#181818",
  },
};

export const globalStyles = (theme: any) => css`
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap");
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    overflow-x: hidden;
    background-color: ${theme.colors.background};
    font-family: "Inter", system-ui, sans-serif;
  }
`;
