import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./App";
import { EIP6963Connector, createWeb3Modal, walletConnectProvider } from "@web3modal/wagmi";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "viem/chains";
import { publicProvider } from "wagmi/providers/public";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const projectId = "ba7804e457fbb5f1375cbdc14e679617";

const metadata = {
  name: "PI Vending Machine",
  description: "Vending Machine",
  // url: "",
  // icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const { chains, publicClient } = configureChains([polygonMumbai], [walletConnectProvider({ projectId }), publicProvider()]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } }),
  ],
  publicClient,
});

createWeb3Modal({ wagmiConfig, projectId, chains });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
      {/* <Web3Modal projectId={walletConnectProjectId} ethereumClient={ethereumClient} /> */}
    </WagmiConfig>
  </React.StrictMode>
);
