# Sneaker NFT Factory

A simple Node.js application to interact with the Sneaker NFT Factory smart contract on the Aurora network.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- An Ethereum address and private key
- The address of the deployed SneakerFactory contract

## Setup

1. Clone the repository:

```
git clone https://github.com/bpolania/Aurora-Sneakers-App
cd sneaker-nft-factory
```

2. Install dependencies:

`npm install`

3. Create a .env file in the project root with the following content:

`PRIVATE_KEY=your_private_key_here`

Replace `your_private_key_here` with your Ethereum private key.

Note: Make sure to keep your private key secure and never share it. The .env file is ignored by default in the .gitignore file to prevent accidentally sharing your private key.

4. Update the contractAddress and fromAddress variables in the app.js file with your deployed SneakerFactory contract address and Ethereum address, respectively.

## Usage

To interact with the SneakerFactory contract and create a Sneaker NFT, run the following command:

`node app.js`

The script will call the `createSneakerNFT` function from the SneakerFactory contract, and if successful, it will print the transaction receipt to the console.
