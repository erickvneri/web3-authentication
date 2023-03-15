import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";

// Feature components
import MetamaskAuth from "./components/Metamaskauth";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

const App = () => {
  return (
    <div style={styles}>
      <WagmiConfig client={client}>
        <MetamaskAuth />
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
};

export default App;
