import type { AppProps } from "next/app";
import { Wallet } from "../views/commons/WalletProvider";
import Navigator from "../views/commons/Navigator";
import "../styles/globals.css";

function SwapUI({ Component, pageProps }: AppProps) {
  return (
    <>
      <Wallet>
        <Navigator />
        <Component {...pageProps} />
      </Wallet>
    </>
  );
}

export default SwapUI;
