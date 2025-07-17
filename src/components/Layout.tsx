import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Global, ThemeProvider } from "@emotion/react";
import { globalStyles, lightTheme, darkTheme } from "../global/global";

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
      <Global styles={globalStyles(theme)} />
      <ThemeProvider theme={theme}>
        <Main>{children}</Main>
      </ThemeProvider>
    </>
  );
};

export default Layout;

const Main = styled.main`
  color: ${({ theme }) => theme.colors.color};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 5px solid blue;
`;
