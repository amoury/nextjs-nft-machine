const main = async () => {
  try {
    const nftContractFactory = await hre.ethers.getContractFactory("EpicNFT");
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    let txn = await nftContract.makeAnEpicNFT();
    await txn.wait();
  } catch (error) {
    console.error(error);
  }
};

main();
