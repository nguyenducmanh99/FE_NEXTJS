import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, StrictMode, ReactElement, ReactNode } from "react";
import ErrorBoundary from "@/pages/error";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { HelmetProvider } from "react-helmet-async";
import { StyledEngineProvider, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { roboto } from "@/constant";
import styled from "styled-components";
import AOS from "aos";
import "aos/dist/aos.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { NextPage } from "next";
import { wrapper } from "@/store";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";

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

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <>
      <Provider store={store}>
        <Main className={roboto.className}>
          <ThemeProvider theme={lightTheme}>
            <StyledEngineProvider injectFirst>
              <CssBaseline />
              <HelmetProvider>
                {/* <StrictMode> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <ErrorBoundary>
                    <SessionProvider session={session}>
                      {getLayout(<Component {...pageProps} />)}
                    </SessionProvider>
                  </ErrorBoundary>
                </LocalizationProvider>
                {/* </StrictMode> */}
              </HelmetProvider>
            </StyledEngineProvider>
          </ThemeProvider>
        </Main>
      </Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#fff",
            color: "#333",
            height: "60px",
          },
        }}
      />
    </>
  );
}

export default App;
const Main = styled.main``;
