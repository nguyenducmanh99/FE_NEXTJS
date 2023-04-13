import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect } from "react";
import ErrorBoundary from "@/pages/error";
import { Roboto } from "next/font/google";
const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <main className={roboto.className}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </main>
  );
}
