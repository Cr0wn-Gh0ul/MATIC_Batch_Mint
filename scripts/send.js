
const hre = require('hardhat');
const { ethers } = require('hardhat');
const fs = require('fs');
const addresses = fs.readFileSync('./scripts/addresses.txt').toString().split("\n");

const CONTRACT_ADDRESS = ""

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(
        "Sending Transactions with:",
        deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const EB = await ethers.getContractFactory('ERC1155Batch');
    let contract = await EB.attach(CONTRACT_ADDRESS);

    let nonce = await deployer.getTransactionCount("pending");
    let addressesMax = addresses.length

    /*
        Information
    */
    /*
    let test = await contract.uri(1, { nonce: nonce, gasPrice: "10000000000", gasLimit: "20000000"})
    console.log(test.toString())
    test = await contract.balanceOf(addresses[0], 1, { nonce: nonce, gasPrice: "10000000000", gasLimit: "20000000"})
    console.log(test.toString())
    process.exit()
    */
    let promises = [];
    for (let idx = 0; idx <= addressesMax; idx += 100) {
        console.log("At idx:", idx);
        let addrs = addresses.slice(idx, ((idx + 100) <= addressesMax) ? (idx + 100) : addressesMax);
        let ids = []
        let values = []
        for (let j = 0; j < 100; j++) {
            ids.push(1)
            values.push(1)
        }
        let promise = new Promise(async function (resolve) {
            try {
                let N = nonce;
                /* HardHat */
                //await contract.batchMint(addrs, ids, values, "0x00", { nonce: N, gasPrice: 1000000000, gasLimit: 12450000 });
                /* Rinkeby */
                //await contract.batchMint(addrs, ids, values, "0x00", { nonce: N, gasPrice: 5000000000, gasLimit: 10000000 });
                /* Matic */
                await contract.batchMint(addrs, ids, values, "0x00", { nonce: N, gasPrice: 1000000000, gasLimit: 12500000 });
                resolve()
            } catch (ex) {
                console.log(ex)
            }
        })
        promises.push(promise)
        if (promises.length == 5 || (idx + 100) >= addressesMax) {
            await Promise.all(promises)
            promises = []
        }
        nonce++
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });