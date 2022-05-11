import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";

const App: NextPage<AppProps> = ({ Component, pageProps }) => (
  <Fragment>
    <Head>
      <title>Pelando Clone</title>

      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>

    <div className="flex min-h-screen flex-col text-default-foreground dark:text-dark-default-foreground bg-default-background dark:bg-dark-default-background">
      <Component {...pageProps} />

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
  </Fragment>
);

export default App;
