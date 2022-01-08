import {ethers} from 'ethers';
import Web3Modal from 'web3modal';
import {nftAddress, nftMarketAddress} from './contract_config' 
import nft from './build/artifacts/ethereum/contracts/nft.sol/NFT.json';
import nftMarket from './build/artifacts/ethereum/contracts/nft-market.sol/NFTMarket.json';

const getProvider = async (options) => {
  if(options === 'signer') {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection).getSigner();
    const token = new ethers.Contract(nftAddress, nft.abi, provider);
    const market = new ethers.Contract(nftMarketAddress, nftMarket.abi, provider);
    return {token, market};
  } else if(options === 'provider') {
    const provider =  new ethers.providers.WebSocketProvider(
      'wss://speedy-nodes-nyc.moralis.io/93813387eb21013f8a586a4a/bsc/testnet/ws'
    );
    const token = new ethers.Contract(nftAddress, nft.abi, provider);
    const market = new ethers.Contract(nftMarketAddress, nftMarket.abi, provider);
    return {token, market};
  }
  throw new Error('Wrong options!');
}
 
export default getProvider;

