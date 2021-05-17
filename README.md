# MATIC Batch Minter

#### Requirements
- Node.js
- Matic RPC
    - Preferably paid service such as [QuikNode](https://www.quiknode.io/)
- *Optionally Rinkeby RPC for testing
##
#### Prerequisite
 - Host metadata JSON with your selected provider (S3 Bucket, heroku, etc)
 - Fund the wallet you wish to use for deployment and minting with MATIC

##
#### Setup

1. Install node modules: `npm install`
2. Add MATIC RPC url to line 17 in `hardhat.config.js`
3. Add PrivateKey to line 18 in `hardhat.config.js`
##

#### Deploy
1. Edit scripts/deploy.js
    1. Add metadata url to line 16
    2. Add contract name/symbol to line 17
    3. Add admin(minter) to line 18
2. Run `npx hardhat run scripts/deploy.js --network matic`
##

#### Batch Mint
1. Edit scripts/send.js
    1. Add contract address to line 7
    2. *Optional: Change line 22 to number of addresses to send to. Default is length of `addresses.txt`
2. Run `npx hardhat run scripts/send.js --network matic`
##

#### Troubleshoot
1. Failure to send / deploy
    - Ensure the URL and accounts in `hardhat.config.js` is filled in properly
    - Check if address has enough funds to send transaction
2. Script exits due to network connection
    - Try to wait a few minutes
    - Before re running the send script, edit line 35 `let idx = 0` so idx = the idx the script died on.
##
#### Testing
##### Hardhat:
You can test by using the same Deploy / Batch Mint instructions above, but omitting `--network matic` from the run commands.

##### Rinkeby:
1. Add RPC and account (that owns some rinkeby) to `hardhat.config.js`
2. Follow same Deploy / Batch Mint instructions as above, but change `--network matic` => `--network rinkeby`

> You can view the rinkeby assets on [Testnet OpenSea](https://testnets.opensea.io)
>> testnets.opensea.io/assets/{CONTRACT_ADDRESS_HERE}/1