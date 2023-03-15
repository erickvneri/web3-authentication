# Web3 Authentication

A **Blockchain Wallet** plays an important role in Web3 since it can be seen as the
_“Web3 Identity Provider”_ and not only anonymously identifies users within the blockchain,
but also allows to authenticate users within external services similarly to [OAuth 2.0](https://oauth.net/2/).

That's the case of this sample where the provided frontend React application
interacts with the Python backend to provide a Web3 Authentication flow
connecting with the MetaMask wallet extension.

### Requirements

- [Python 3.7](https://www.python.org/downloads/) or higher.
- [NodeJS](https://nodejs.org/en/download/).
- [MetaMask(https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)] web extension.
- [Moralis](https://moralis.io/) account _(no credit card required, just skip the step)_.

### Set up

- Open a new terminal to setup the Backend
  - Install dependencies

        cd ~/web3-authentication/backend
        python -m pip install virtualenv
        python -m virtualenv .env
        . .env/bin/activate
        python -m pip install -r requirements.txt

  - Setup environment
    - Rename the `config.ini.example` file to `config.ini`.
    - Copy the **Moralis API Key** and assign it to the `moralis_api_key`
      variable from the `config.ini` file.
    - Set the `jwt_secret`.

  - Run the application

        python app.py

- Open a new terminal to setup the Frontend
  - Install dependencies

        cd ~/web3-authentication/frontend
        npm install

  - Setup environment
    - Rename the `.env.example` file to `.env`.
    - If needed, change the default value of the `REACT_APP_API_URL` variable.

  - Run the application

        npm start


At this point, the `npm start` command will open a new browser tab with
the simple Frontend implementation that will allow you to interact and
authenticate yourself with your MetaMask wallet.