const express = require('express')
const Web3 = require('web3');

const ABI = require('./ABI');
const CONTRACT_ADDRESS = '0x37590A73255f33CE31097d539af63b9Aa24c6Eb5';
const app = express()

app.listen(3000, () => console.log('Example app listening on port 3000!'))

const web3 = new Web3(new Web3.providers.HttpProvider("http://138.68.168.208:8545"));
const eth = web3.eth;
const personal = web3.personal;

console.log('Accounts: ', eth.accounts);
eth.defaultAccount = eth.accounts[0];

personal.unlockAccount(eth.defaultAccount, 'toor', 10000);

const contract = eth.contract(ABI).at(CONTRACT_ADDRESS);




contract.voting(1, "test", console.log)
