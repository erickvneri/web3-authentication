# Moralis Python SDK Documentation:
# https://moralisweb3.github.io/Moralis-Python-SDK/
from datetime import datetime
from flask import Flask, request, abort, jsonify
from flask_cors import CORS

# locals
from config import logging, env
from authentication import Authentication

app = Flask(__name__)
CORS(app)

# Initialize Web3 Authentication
auth = Authentication()


@app.route("/evm-challenge", methods=["POST"])
def handle_challenge():
    result = None
    error = None
    reqbody = request.get_json()

    address = reqbody.get("address")
    chain_id = reqbody.get("chain")

    if not address or not chain_id:
        error = jsonify(status="ERROR", message="Missing required parameters")
        error.status_code = 400

    authres = auth.req_evm_challenge(address, chain_id)
    result = jsonify(dict(status="SUCCESS", message="Challenge started", data=authres))
    result.status_code = 200

    if error:
        return abort(error)
    return result


@app.route("/evm-verify", methods=["POST"])
def handle_verify():
    result = None
    error = None
    reqbody = request.get_json()

    # parse
    message = reqbody.get("message")
    signature = reqbody.get("signature")

    if not message or not signature:
        error = jsonify(status="ERROR", message="Missing required parameters")
        error.status_code = 400

    authres = auth.verify_evm_challenge(message, signature)
    result = jsonify(
        dict(status="SUCCESS", message="Verification successful", data=authres)
    )
    result.status_code = 200

    if error:
        return abort(error)
    return result


if __name__ == "__main__":
    app.run(host=env.HOST, port=env.PORT, debug=env.DEBUG)
