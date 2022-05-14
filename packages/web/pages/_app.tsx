import { AppBar } from "@/components/AppBar";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { ThemeToggler } from "@/components/ThemeToggler";
import { SidebarContextProvider } from "@/contexts/SidebarContext";
import { ThemeContextProvider } from "@/contexts/ThemeContext";
import { ThemeTogglerContextProvider } from "@/contexts/ThemeTogglerContext";
import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <ThemeContextProvider>
    <ThemeTogglerContextProvider>
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
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Head>

        <div className="text-default-foreground dark:text-dark-default-foreground bg-secondary-background dark:bg-dark-secondary-background flex min-h-screen flex-col">
          <Header />
          <Sidebar />
          <ThemeToggler />

          <main className="container my-8">
            <Component {...pageProps} />
          </main>

          <AppBar />

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
    </ThemeTogglerContextProvider>
  </ThemeContextProvider>
);

export default App;
