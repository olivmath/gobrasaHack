# GO BRASA HACK

Bloky is a blockchain-based platform that enables financial institutions to tokenize credit card debts and other credit securities, providing liquidity through a secure and transparent marketplace. Built on the Polygon blockchain, Bloky ensures low gas fees and high security, making it an ideal solution for both institutions and investors.

## HOW TO WORKS

### 1. Submit Your Documentation

Financial institutions submit their documentation and a detailed description of the credit card debt or other credit securities (DCC) they wish to tokenize.

### 2. Tokenization and Wallet Deposit

Bloky tokenizes the submitted documentation, creating digital tokens that represent the underlying debt.
These tokens are then deposited into the financial institution's designated wallet.

### 3. Sell Your Tokens

The institution can now list these tokens on the Bloky marketplace, where they can be sold to investors.

Selling tokens provides immediate liquidity to the institution, allowing them to access funds quickly.

### 4. Secondary Market Trading

Investors who purchase the tokens can either hold them to receive periodic interest payments or resell them on the secondary market.

The Bloky marketplace facilitates the trading of tokens, providing a platform for liquidity and investment opportunities.

### Token Lifecycle

- Creation: Debt documentation is submitted and tokenized, creating digital assets on the Polygon blockchain.

- Initial Sale: Tokens are sold on the primary market, providing liquidity to the issuing institution.

- Secondary Market: Investors trade tokens on the Bloky marketplace, with the option to hold and earn interest or resell for profit.

- Redemption: When the underlying debt is repaid, tokens are redeemed, and the repayment value is distributed to the current token holders.

### Compliance and Security

Bloky ensures compliance with all relevant regulations, including rigorous KYC processes and other measures to maintain the integrity and security of the platform.

By leveraging the Polygon blockchain, Bloky provides a highly secure environment with low transaction fees.

## HOW TO RUN

You need start 3 terminals

### 1. Run blockchain

You need install [forge](https://book.getfoundry.sh/getting-started/installation) and run Anvil:

```
anvil
```

### 2. Deploy Smartcontracts

You need run a script to deploy the smartcontract:

```
cd smartcontract/
./deploy-on-local.sh
```

### 3. Install and Configure Metamask

First: install metamask [here](https://support.metamask.io/getting-started/getting-started-with-metamask/#how-to-install-metamask)
Second: configure network [here](https://support.metamask.io/networks-and-sidechains/managing-networks/how-to-add-a-custom-network-rpc/)

### 4. Run frontend

You need to install deps before run frontend in:

```
cd ui/prod/
npm install # yarn or pnpm i
```
