import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-pro-sidebar/dist/css/styles.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
export default appWithTranslation(MyApp, nextI18NextConfig);
