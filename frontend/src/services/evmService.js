/*
 * @param { String } address
 * @param { Number } chain
 * @param { Promise }
 * */
export function requestChallenge(address, chain) {
  return fetch(`${process.env.REACT_APP_API_URL}/evm-challenge`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address,
      chain,
    }),
  }).then((response) => response.json());
}

/*
 * @param { String } message
 * @param { String } signature
 * @param { Promise }
 * */
export function verifyChallenge(message, signature) {
  return fetch(`${process.env.REACT_APP_API_URL}/evm-verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      signature,
    }),
  }).then((response) => response.json());
}
