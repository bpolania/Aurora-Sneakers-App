import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './App.css';

const abi = [
  [{"inputs":[{"internalType":"address","name":"admin","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"previousAdminRole","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"newAdminRole","type":"bytes32"}],"name":"RoleAdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleGranted","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"role","type":"bytes32"},{"indexed":true,"internalType":"address","name":"account","type":"address"},{"indexed":true,"internalType":"address","name":"sender","type":"address"}],"name":"RoleRevoked","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"nftAddress","type":"address"},{"indexed":true,"internalType":"address","name":"creator","type":"address"}],"name":"SneakerNFTCreated","type":"event"},{"inputs":[],"name":"ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DEFAULT_ADMIN_ROLE","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"createSneakerNFT","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getNFTContracts","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"}],"name":"getRoleAdmin","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"grantRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"hasRole","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"nfts","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"renounceRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"role","type":"bytes32"},{"internalType":"address","name":"account","type":"address"}],"name":"revokeRole","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]
];

const contractAddress = '0x...'; // Replace with your SneakerFactory contract address

function App() {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [factory, setFactory] = useState();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);

      const signer = web3Provider.getSigner();
      setSigner(signer);

      const factory = new ethers.Contract(contractAddress, abi, signer);
      setFactory(factory);
    };

    if (window.ethereum) {
      init();
    }
  }, []);

  const createSneakerNFT = async () => {
    if (!factory) {
      console.error('Factory contract not found');
      return;
    }

    try {
      const tx = await factory.createSneakerNFT(signer.getAddress());
      await tx.wait();
      alert('Sneaker NFT contract created');
    } catch (error) {
      console.error('Error creating Sneaker NFT contract:', error);
      alert('Error creating Sneaker NFT contract');
    }
  };

  const getNFTContracts = async () => {
    if (!factory) {
      console.error('Factory contract not found');
      return;
    }

    try {
      const nfts = await factory.getNFTContracts();
      setNfts(nfts);
    } catch (error) {
      console.error('Error fetching NFT contracts:', error);
      alert('Error fetching NFT contracts');
    }
  };

  return (
    <div className="App">
      <h1>Sneaker Factory</h1>
      <button onClick={createSneakerNFT}>Create Sneaker NFT Contract</button>
      <button onClick={getNFTContracts}>Get NFT Contracts</button>
      {nfts.length > 0 && (
        <div>
          <h2>NFT Contracts:</h2>
          <ul>
            {nfts.map((nft, index) => (
              <li key={index}>{nft}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
