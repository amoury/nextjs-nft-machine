import { ethers } from "ethers";
import contractAbi from "./contractAbi.json";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
// Setup our listener.
export const setupEventListener = async (callback) => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      // Same stuff again
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        contractAbi.abi,
        signer
      );

      connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
        if (typeof callback === "function") {
          callback(
            from,
            Number(tokenId),
            `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
          );
        }
        console.log(from, tokenId.toNumber());
      });
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const mintNFT = async (jsonUrl, callback) => {
  try {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      contractAbi.abi,
      signer
    );

    let nftTxn = await connectedContract.makeAnEpicNFT(jsonUrl);
    await nftTxn.wait();

    // connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
    //   console.log("from ", from);
    //   callback(from, tokenId.toNumber());
    // });
    console.log(`Mined `, nftTxn.hash);
  } catch (error) {
    console.error(error.message);
  }
};
