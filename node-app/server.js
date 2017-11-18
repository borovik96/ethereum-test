const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const utils = require('./utils');

const ABI = require('./ABI');
const CONTRACT_ADDRESS = '0x05009E35FcadAEDf330FDB310e4aE9f78cbF5C3A';
const transactionOptions = { gas: 500000, gasPrice: 21 * 1000000000 };

const app = express()

app.use(bodyParser.json());

app.listen(3000, () => console.log('Node listening on port 3000!'))

const web3 = new Web3(new Web3.providers.HttpProvider("http://138.68.168.208:8545"));
const eth = web3.eth;
const personal = web3.personal;

// utils.importAccount(web3, '7703a860b087317bbd2e44a52a233df843ad22db3b60fb816aef97a8054f20a2', 'toor');

console.log('Accounts: ', eth.accounts);
eth.defaultAccount = eth.accounts[1];

personal.unlockAccount(eth.defaultAccount, 'toor', 10000);

const contract = eth.contract(ABI).at(CONTRACT_ADDRESS);


app.post('/ticket', (req, res) => {
  const { fn, fd, fpd, serialNumber, guaranteeTime } = req.body;
  contract.setTicket(
    fn, fd, fpd,
    serialNumber,
    guaranteeTime,
    transactionOptions,
    (err, tx) => {
      console.log(`Transaction: ${tx}`);
      if (err) res.status(500);
      const setTicketEvent = contract.setTicketEvent();
      setTicketEvent.watch((eventError, result) => {
        if (eventError) res.error(500);
        res.send(result);
        setTicketEvent.stopWatching();
      });
    }
  )
});

app.get('/ticket/:id', (req, res) => {
  contract.getTicket(
    req.params.id,
    transactionOptions,
    (err, result) => {
      if (err) {
        console.error('GET TICKET: ', err);
        res.status(500);
        res.send(err.message);
        return;
      }
      console.log('GET TICKET: ', result);
      let serialNumber = web3.toAscii(result[0]);
      serialNumber = serialNumber.slice(0, serialNumber.indexOf('\u0000'));
      const fn = result[1].toString();
      const fd = result[2].toString();
      const fpd = result[3].toString();
      const guaranteeTime = result[4].toString();
      res.send({
        serialNumber,
        fn, fd, fpd,
        guaranteeTime
      });
    }
  )
});
