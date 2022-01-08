import {useState} from 'react';
import {ethers} from 'ethers';
import {create as ipfsHttpClient} from 'ipfs-http-client';
import {useRouter} from 'next/router';
import getProvider from '../ethereum/provider_config';
import {nftAddress, nftMarketAddress} from '../ethereum/contract_config';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

function CreateItem () {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, updateFormInput] = useState({price: '', name: '', description: ''});
  const router = useRouter();

  const onChange = async (event) => {
    const file = event.target.files[0];
    try {
      const added = await client.add(
        file, { progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch(event) {
      console.log(event);
    }
  }

  const createItem = async () => {
    const {name, description, price} = formInput;
    if (!name||!description||!price||!fileUrl) return;
    const data = JSON.stringify({name, description, image: fileUrl});
    
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      createSale(url);
    } catch(err) {
      console.log('Error uploading file: ',err)
    }
  }

  const createSale = async (url) => {
    const {token, market} = await getProvider('signer');
    let transaction = await token.createToken(url);
    let tx = await transaction.wait();

    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    const price = ethers.utils.parseUnits(formInput.price, 'ether');
    let listingPrice = await market.listingPrice();
    listingPrice = listingPrice.toString();
    transaction = await market.createMarketItem(nftAddress, tokenId, price, {value: listingPrice});  
    await transaction.wait();
    router.push('/');
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={event => updateFormInput({...formInput, name: event.target.value})}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={event => updateFormInput({...formInput, description: event.target.value})}
        />
        <input
          placeholder="Asset Price in BNB"
          className="mt-2 border rounded p-4"
          onChange={event => updateFormInput({...formInput, price: event.target.value})}
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        <button onClick={createItem} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create Digital Asset
        </button>
      </div>
    </div>
  )
}

export default CreateItem;
