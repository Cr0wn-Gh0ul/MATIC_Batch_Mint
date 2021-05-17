const hre = require('hardhat');
const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const EB = await ethers.getContractFactory('ERC1155Batch');

  let metadata = "https://TEST.com/TEST.json"
  let nameSymbol = "TEST";
  let admin = deployer.address;

  const contract = await EB.deploy(nameSymbol, nameSymbol, metadata, admin);
  await contract.deployed();
  console.log('EB deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });