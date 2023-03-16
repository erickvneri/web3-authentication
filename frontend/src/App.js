import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

// Feature components
import MetaMaskAuth from "./components/MetaMaskAuth";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const App = () => {
  return (
    <div style={styles}>
      <WagmiConfig client={client}>
        <MetaMaskAuth />
      </WagmiConfig>
    </div>
  );
};

const styles = {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#38598b77",
};

export default App;
