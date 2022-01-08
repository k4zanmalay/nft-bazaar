import {ethers} from 'ethers';
import setProvider from './provider_config';
import {nftAddress, nftMarketAddress} from './contract_config' 
import nft from './build/artifacts/ethereum/contracts/nft.sol/NFT.json';
import nftMarket from './build/artifacts/ethereum/contracts/nft-market.sol/NFTMarket.json';

export default async () => { 
  const provider = await setProvider();
  const token = new ethers.Contract(nftAddress, nft.abi, provider);
  const market = new ethers.Contract(nftMarketAddress, nftMarket.abi, provider);
  return {token, market};
}



