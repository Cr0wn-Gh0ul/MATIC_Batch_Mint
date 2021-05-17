/**
 * @type import('hardhat/config').HardhatUserConfig
 */

 require('@nomiclabs/hardhat-ethers');
 require('@nomiclabs/hardhat-web3');
 require('@nomiclabs/hardhat-waffle');
 require('@openzeppelin/hardhat-upgrades');
 require("hardhat-gas-reporter");
 require('dotenv').config();
 
 module.exports = {
     solidity: '0.8.0',
     defaultNetwork: 'hardhat',
     networks: {
         matic: {
             url: "",
             accounts: [``]
         }
        /*,
         rinkeby: {
             url: "",
             accounts: [``]
         }*/
     }
 };