import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, StrictMode } from "react";
import ErrorBoundary from "@/pages/error";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HelmetProvider } from "react-helmet-async";
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from '@mui/material';
import {roboto, darkTheme, lightTheme} from "@/constant";
import styled from "styled-components";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  })
  // console.log(Component.displayName)
  return (
    <>
      <Main className={roboto.className}>
        <ThemeProvider theme={lightTheme || darkTheme}>
          <StyledEngineProvider injectFirst>
            <CssBaseline />
            <HelmetProvider>
              <StrictMode>
                <LocalizationProvider dataAdapter={DateAdapter}>
                  <ErrorBoundary>
                    <SessionProvider session={session}>
                     <Component {...pageProps} />
                    </SessionProvider>
                  </ErrorBoundary>
                </LocalizationProvider>
              </StrictMode>
            </HelmetProvider>
          </StyledEngineProvider>
        </ThemeProvider>
      </Main>
    </>
  );
}

const Main = styled.main``