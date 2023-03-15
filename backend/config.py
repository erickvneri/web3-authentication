import os
import logging
from configparser import ConfigParser

# Load system ENV variable
# to properly read .ini section.
# This is meant to be a private
# resource never imported.
__ENV__ = os.getenv("ENV") or "develop"

# Initialize config reader
# meant to be a private
# resource.
__config__ = ConfigParser()
__config__.read("config.ini")


# This is an actual public
# API which is meant to be
# used across API.
class env:
    # Server
    APP_NAME = __config__.get(__ENV__, "app_name")
    HOST = __config__.get(__ENV__, "host")
    PORT = __config__.getint(__ENV__, "port")
    DEBUG = __config__.getboolean(__ENV__, "debug")
    #
    # Moralis
    MORALIS_API_KEY = __config__.get(__ENV__, "moralis_api_key")
    EVM_DOMAIN = __config__.get(__ENV__, "evm_domain")
    EVM_URL = __config__.get(__ENV__, "evm_url")
    EVM_AUTH_TIMEOUT = __config__.getint(__ENV__, "evm_auth_timeout")
    EVM_AUTH_CHAIN_ID = __config__.get(__ENV__, "evm_auth_chain_id")
    AUTH_EXPIRES_IN = __config__.getint(__ENV__, "auth_expires_in")
    #
    # JWT
    JWT_SECRET = __config__.get(__ENV__, "jwt_secret")
    JWT_EXPIRES_IN = __config__.getint(__ENV__, "jwt_expires_in")
    JWT_ALGORITHM = __config__.get(__ENV__, "jwt_algorithm")


# Implicit export for a
# preconfigured logging
# instance
logging.basicConfig(
    format="%(asctime)s - %(levelname)s - %(message)s", level=logging.DEBUG
)
