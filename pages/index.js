import {ethers} from 'ethers';
import axios from 'axios';
import {useEffect, useState} from 'react';
import getProvider from '../ethereum/provider_config';
import {nftAddress, nftMarketAddress} from '../ethereum/contract_config';

function Home () {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  
  useEffect(() => {
    loadNFTs();
  }, [])

  const loadNFTs = async () => {
    const {token, market} = await getProvider('provider');
    const data = await market.getMarketItems();
    const items = await Promise.all(data.map(async element => {
      const tokenUri = await token.tokenURI(element.tokenId);
      const meta = await axios.get(tokenUri);
      let price = ethers.utils.formatUnits(element.price.toString(), 'ether');
      let item = {
        price,
        itemId: element.itemId.toNumber(),
        seller: element.seller,
        owner: element.owner,
        image: meta.data.image,
        name: meta.data.name,
        description: meta.data.description
      }
      return item;
    }));

    setNfts(items);
    setLoadingState('loaded');
  }
  const buyNFT = async (nft) => {
    const {token, market} = await getProvider('signer');
    const price = ethers.utils.parseUnits(nft.price, 'ether');
    console.log(nft.itemId);
    const transaction = await market.createMarketSale(nftAddress, nft.itemId, {value: price});
    await transaction.wait();
    loadNFTs();
  }
    
  
  if(loadingState === 'loaded' && !nfts.length) {
    return (
      <h1 className={"px-20 py-10 text-3xl"}>
        No items in marketplace
      </h1>
    )
  }
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
            nfts.map((nft, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img src={nft.image} />
                <div className="p-4">
                  <p style={{ height: '64px' }} className="text-2xl font-semibold">{nft.name}</p>
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{nft.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  <p className="text-2xl mb-4 font-bold text-white">{nft.price} BNB</p>
                  <button className="w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => buyNFT(nft)}>Buy</button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home;
