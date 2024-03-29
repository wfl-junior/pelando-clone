import { AppBar } from "@/components/AppBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Main } from "@/components/Main";
import { Modal } from "@/components/Modal";
import { Sidebar } from "@/components/Sidebar";
import { ModalContextProvider } from "@/contexts/ModalContext";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { useApolloClient } from "@/graphql/client";
import "@/styles/globals.css";
import { setAccessToken } from "@/utils/accessToken";
import { ApolloProvider } from "@apollo/client";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApolloClient(pageProps);

  useEffect(() => {
    // set access token coming from the server props for the client
    setAccessToken(pageProps.accessToken || null);
  }, [pageProps.accessToken]);

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeContextProvider>
        <ModalContextProvider>
          <SidebarContextProvider>
            <Head>
              <title>Pelando Clone</title>

              <meta charSet="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />

              <link rel="icon" href="/favicon.ico" />
              <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
              <link
                rel="apple-touch-icon"
                href="/apple-touch-icon.png"
                type="image/png"
              />
            </Head>

            <div className="text-default-foreground bg-secondary-background flex min-h-screen flex-col">
              <NextNProgress
                height={2}
                color="rgb(var(--color-primary))"
                options={{ showSpinner: false }}
                stopDelayMs={50}
              />

              <Header />
              <Sidebar />
              <Main>
                <Component {...pageProps} />
              </Main>
              <AppBar />
              <Footer />

              <Modal />

              <noscript>
                É necessário ter{" "}
                <a
                  href="https://support.google.com/adsense/answer/12654?hl=pt-BR"
                  target="_blank"
                >
                  JavaScript
                </a>{" "}
                ativado para interagir com esta página.
              </noscript>
            </div>
          </SidebarContextProvider>
        </ModalContextProvider>
      </ThemeContextProvider>
    </ApolloProvider>
  );
};

export default App;
