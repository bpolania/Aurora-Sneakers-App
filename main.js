require('dotenv').config();
const fs = require('fs');
const ethers = require('ethers');

const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.providers.InfuraProvider('mainnet', process.env.INFURA_PROJECT_ID);

const wallet = new ethers.Wallet(privateKey, provider);

const sneakerFactoryAddress = '<YOUR_SNEAKER_FACTORY_CONTRACT_ADDRESS>';
const sneakerFactoryABI = JSON.parse(fs.readFileSync('sneakerFactoryABI.json', 'utf8'));

const sneakerFactoryContract = new ethers.Contract(sneakerFactoryAddress, sneakerFactoryABI, wallet);

async function createSneakerNFT() {
  const tx = await sneakerFactoryContract.createSneakerNFT();
  const receipt = await tx.wait();
  console.log('Sneaker NFT Created:', receipt.events[0].args.nftAddress);
}

async function getNFTContracts() {
  const nfts = await sneakerFactoryContract.getNFTContracts();
  console.log('NFT Contracts:', nfts);
}

// Run the desired function
createSneakerNFT();
// getNFTContracts();
