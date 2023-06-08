import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, StrictMode, ReactElement, ReactNode } from "react";
import ErrorBoundary from "@/pages/error";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HelmetProvider } from "react-helmet-async";
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import { roboto, darkTheme, lightTheme } from "@/constant";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { NextPage } from "next";
import { wrapper } from "@/store";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface MyAppProps extends AppProps {
  pageProps: any;
  Component: NextPageWithLayout;
}

function App({ Component, pageProps: { session, ...pageProps } }: MyAppProps) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });
  // console.log(Component.displayName)
  const getLayout = Component.getLayout ?? ((page) => page);
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <>
      <Provider store={store}>
        <Main className={roboto.className}>
          <ThemeProvider theme={lightTheme || darkTheme}>
            <StyledEngineProvider injectFirst>
              <CssBaseline />
              <HelmetProvider>
                <StrictMode>
                  <LocalizationProvider dataAdapter={DateAdapter}>
                    <ErrorBoundary>
                      <SessionProvider session={session}>
                        {getLayout(<Component {...pageProps} />)}
                      </SessionProvider>
                    </ErrorBoundary>
                  </LocalizationProvider>
                </StrictMode>
              </HelmetProvider>
            </StyledEngineProvider>
          </ThemeProvider>
        </Main>
      </Provider>
    </>
  );
}

export default App;
const Main = styled.main``;
