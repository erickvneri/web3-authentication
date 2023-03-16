import { useState } from "react";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useConnect, useSignMessage, useDisconnect } from "wagmi";
import { requestChallenge, verifyChallenge } from "../services/evmService";

function MetaMaskAuth({}) {
  const { signMessageAsync } = useSignMessage();
  const { connectAsync } = useConnect();
  const { disconnect } = useDisconnect({
    onSuccess: () => console.log("Disconnected!!"),
    onError: (err) => console.wan("Failed to disconnect MetaMask", err),
  });
  const [profileId, setProfileId] = useState(null);

  function authorize() {
    disconnect();
    /*
     * Initialize Web3 Authentication flow
     * against MetaMask Wallet.
     * */
    connectAsync({ connector: new MetaMaskConnector() })
      /*
       * Follow up Web3 Athentication prompt
       * to provide address and chain references
       * to backend.
       * */
      .then((res) => requestChallenge(res.account, res.chain.id))
      /*
       * Continue the prompt to sign the
       * authorization message and follow
       * up with Challenge verification
       * Web3 Authentication flow.
       * */
      .then((res) => {
        return signMessageAsync({ message: res.data.message }).then(
          (signature) => verifyChallenge(res.data.message, signature)
        );
      })
      /*
       * Save some session references
       * for later use...
       * */
      .then((res) => {
        const id = res.data.profile_id;

        localStorage.setItem("accessToken", res.data.access_token);
        localStorage.setItem("profileId", res.data.profile_id);
        setProfileId(() => {
          const prefix = id.slice(0, 5);
          const sufix = id.slice(id.length - 5, id.length);
          return `${prefix}...${sufix}`;
        });
      });
  }

  function deauth() {
    disconnect();
    setProfileId(null);
    localStorage.clear();
  }

  return (
    <div style={styles.container}>
      {profileId ? <h3>Welcome, {profileId}!</h3> : <h3>Fancy a drink?</h3>}

      {profileId ? (
        <button style={styles.button} onClick={deauth}>
          Logout
        </button>
      ) : (
        <button style={styles.button} onClick={authorize}>
          Autorize
        </button>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    height: "60%",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "#142d4c",
  },
  button: {
    width: "50%",
    height: "10%",
    borderRadius: "10px",
    fontSize: 20,
    fontWeight: "bold",
  },
};

export default MetaMaskAuth;
