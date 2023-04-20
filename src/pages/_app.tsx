import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, StrictMode } from "react";
import ErrorBoundary from "@/pages/error";
import { Roboto } from "next/font/google";
import DateAdapter from "@mui/lab/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HelmetProvider } from "react-helmet-async";
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
  createTheme
} from '@mui/material';

import styled from "styled-components";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <Main className={roboto.className}>
      <ThemeProvider theme={lightTheme || darkTheme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <HelmetProvider>
            <StrictMode>
              <LocalizationProvider dataAdapter={DateAdapter}>
                <ErrorBoundary>
                  <Component {...pageProps} />
                </ErrorBoundary>
              </LocalizationProvider>
            </StrictMode>
          </HelmetProvider>
        </StyledEngineProvider>
      </ThemeProvider>
    </Main>
  );
}

const Main = styled.main``