const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTBazaar", function () {
  it("Should create and execute market sales", async function () {
    const Market = await ethers.getContractFactory('NFTMarket');
    const market = await Market.deploy(); 
    await market.deployed();
    const marketAddress = market.address;

    const NFT = await ethers.getContractFactory('NFT');
    const nft = await NFT.deploy(marketAddress);
    await nft.deployed();
    const nftAddress = nft.address;

    let listingPrice = await market.listingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.utils.parseUnits('0.1', 'ether');

    await nft.createToken('https://www.mytoken.com');
    await nft.createToken('https://www.mytoken2.com');

    await market.createMarketItem(nftAddress, 1, auctionPrice, {value: listingPrice});
    await market.createMarketItem(nftAddress, 2, auctionPrice, {value: listingPrice});

    const [_, buyerAddress, nocoiner] = await ethers.getSigners(); //destructuring array assignment

    await market.connect(buyerAddress).createMarketSale(nftAddress, 1, {value: auctionPrice});

    let items = await market.getMarketItems();
    items = await Promise.all(items.map(async i=>{
      const tokenURI = await nft.tokenURI(i.tokenId);
      let item = {
        price: i.price.toString(),
        tokenID: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenURI
      }
      return item;
    }));
    console.log('items: ', items);

    items = await market.connect(buyerAddress).getMyNFTs();
    items = await Promise.all(items.map(async i=>{
      const tokenURI = await nft.tokenURI(i.tokenId);
      let item = {
        price: i.price.toString(),
        tokenID: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenURI
      }
      return item;
    }));
    console.log('items: ', items);
  });
});
