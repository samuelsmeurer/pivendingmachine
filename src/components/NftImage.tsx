import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './NftImage.css';

const provider = new ethers.providers.JsonRpcProvider('https://rpc-mainnet.maticvigil.com/');

const contractAddress = '0xee3c94f80A311411c9C07DdcC3Ef6Eca17Bd3361';
const abi = [
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
  'function ownerOf(uint256 tokenId) public view returns (address)',
];

const NftImage: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const owner = await contract.ownerOf(5);
        const tokenUri = await contract.tokenURI(5);
        const response = await fetch(tokenUri);
        const metadata = await response.json();
        const imageUri = metadata.image;
        const name = metadata.name;
        const description = metadata.description;
        const imageResponse = await fetch(imageUri);
        const blob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
        setName(name);
        setDescription(description);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMetadata();
  }, []);

  return (
    <div className="nft-container">
      <img className="nft-image" src={imageUrl} alt="NFT" />
      <div className="nft-metadata">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default NftImage;
