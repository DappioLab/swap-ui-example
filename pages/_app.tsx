import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import { Wallet } from '../components/common/WalletProvider'
import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layout'

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter
} from "@solana/wallet-adapter-wallets";
import { useMemo } from 'react'
// import { clusterApiUrl } from "@solana/web3.js";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

function MyApp({ Component, pageProps }: AppProps) {
  // // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // // You can also provide a custom RPC endpoint.
  const endpoint = "https://rpc-mainnet-fork.dappio.xyz";

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
          new SlopeWalletAdapter(),
          new SolflareWalletAdapter(),
          new TorusWalletAdapter(),
          new LedgerWalletAdapter(),
          new SolletWalletAdapter({ network }),
          new SolletExtensionWalletAdapter({ network })
      ],
      [network]
  );
  
  return <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <ChakraProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
      </WalletProvider>
    </ConnectionProvider>
}

export default MyApp
