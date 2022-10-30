# How to put thousands of NFTs on OpenSea with a smart contract and without a minting website

# Set up environnement key

Rename `.env.example` to `.env` and replace the variables it contains with your personal keys.

## Launch Local Blockchain

```
yarn hardhat node --no-deploy
```

## Deploy on Local Blockchain

```
yarn hardhat deploy
```

## Deploy on Goerli

```
yarn hardhat deploy --network goerli
```