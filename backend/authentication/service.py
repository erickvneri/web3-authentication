from datetime import datetime, timedelta
from moralis.auth.challenge import request_challenge_evm, verify_challenge_evm
from jwt import encode

# locals
from config import logging, env


class Authentication:

    # Guarantees a singleton
    def __new__(cls):
        if not hasattr(cls, "instance"):
            cls.instance = super(cls, Authentication).__new__(cls)
        return cls.instance

    def req_evm_challenge(self, address: str, chain_id: int) -> dict:
        logging.info(f"Request EVM authentication challenge for address {address}")
        expires_at = datetime.now() + timedelta(seconds=env.AUTH_EXPIRES_IN)

        reqbody = {
            "domain": env.EVM_DOMAIN,
            "statement": "Please confirm",
            "expiration_time": str(expires_at),
            "not_before": str(datetime.now()),
            "uri": env.EVM_URL,
            "timeout": env.EVM_AUTH_TIMEOUT,
            "address": address,
            "chainId": str(chain_id),
        }

        # Evaluates challenge against EVM
        result = request_challenge_evm(body=reqbody, api_key=env.MORALIS_API_KEY)
        return result

    def verify_evm_challenge(self, message: str, signature: str) -> dict:
        logging.info("Request EVM challenge signature verification")
        reqbody = {"message": message, "signature": signature}

        # Evaluates signature against EVM
        result = verify_challenge_evm(body=reqbody, api_key=env.MORALIS_API_KEY)

        # Generate JWT for further API usage
        token = encode(
            result | {"expires_in": env.JWT_EXPIRES_IN},
            env.JWT_SECRET,
            algorithm=env.JWT_ALGORITHM,
        )

        logging.info("EVM challenge signature verification succeeded")
        return {"access_token": token, "profile_id": result.get("profileId")}
