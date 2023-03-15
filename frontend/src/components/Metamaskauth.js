import { useState } from "react";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useConnect, useSignMessage } from "wagmi";

function MetamaskAuth({}) {
  const { signMessageAsync } = useSignMessage();
  const { connectAsync } = useConnect();
  const [profileId, setProfileId] = useState(null);

  function authorize() {
    /*
     * Initialize Web3 Authentication flow
     * against preinstalled MetaMask Wallet.
     * */
    connectAsync({ connector: new MetaMaskConnector() })
      .then((res) => {
        /*
         * Follow up Web3 Athentication flow
         * by providing address and chain references
         * to owned backend.
         * */
        return fetch(`${process.env.REACT_APP_API_URL}/evm-challenge`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address: res.account,
            chain: res.chain?.id,
          }),
        });
      })
      .then((res) => res.json())
      .then((res) => {
        /*
         * Proceed to handle authentication
         * challenge provided by Moralis
         * Web3 Authentication APIs.
         * */
        const message = res.data.message;
        return signMessageAsync({ message: message }).then((signature) => {
          fetch(`${process.env.REACT_APP_API_URL}/evm-verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              message,
              signature,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              localStorage.setItem("accessToken", res.data.access_token);
              localStorage.setItem("profileId", res.data.profile_id);
              setProfileId(res.data.profile_id);
              console.log(res.data);
            });
        });
      });
  }

  return (
    <div style={styles.container}>
      {profileId ? (
        <h3>Profile: {profileId}</h3>
      ) : (
        <h3>MetaMask Authentication</h3>
      )}

      <button style={styles.button} onClick={authorize}>
        Autorize
      </button>
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
  },
  button: {
    width: "50%",
    height: "10%",
    borderRadius: "10px",
    fontSize: 20,
    fontWeight: "bold",
  },
};

export default MetamaskAuth;
