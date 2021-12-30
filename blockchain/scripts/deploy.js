const main = async () => {
  try {
    const nftContractFactory = await hre.ethers.getContractFactory("EpicNFT");
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);
  } catch (error) {
    console.error(error);
  }
};

main();
