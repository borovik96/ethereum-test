const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const utils = require('./utils');

const ABI = require('./ABI');
const CONTRACT_ADDRESS = '0xE0A26Ce768129Fa8A46Ca7f81cC53507Eabb06bd';
const transactionOptions = { gas: 500000, gasPrice: 21 * 1000000000 };

const app = express()
app.use(express.static('../frontend/build'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
  const {
    cardNumber,
    fn, fd, fpd,
    serialNumber,
    dateOfBuying,
    during
  } = req.body;
  contract.setTicket(
    cardNumber,
    fn, fd, fpd,
    serialNumber,
    utils.calculateGuaranteeTime(dateOfBuying, during),
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

app.get('/account/:id', (req, res) => {
  const cardNumber = req.params.id;
  contract.getAmountOfTickets(
    cardNumber,
    transactionOptions,
    (err, idTicket) => {
      if (err) {
        console.error('GET TICKET: ', err);
        res.status(500);
        res.send(err.message);
        return;
      }
      const amountOfTickets = parseInt(idTicket.toString());
      console.log('GET TICKETS NUMBER: ', amountOfTickets);
      let indexTicket = amountOfTickets;
      const tickets = [];
      while(indexTicket--) {
        contract.getTicket(cardNumber, indexTicket + 1, (err, result) => {

          let productName = web3.toAscii(result[0]);
          productName = productName.slice(0, productName.indexOf('\u0000'));

          let serialNumber = web3.toAscii(result[1]);
          serialNumber = serialNumber.slice(0, serialNumber.indexOf('\u0000'));

          const fn = result[2].toString();
          const fd = result[3].toString();
          const fpd = result[4].toString();
          const guaranteeTime = result[5].toString();

          let warrantyCase = web3.toAscii(result[6]);
          warrantyCase = warrantyCase.slice(0, warrantyCase.indexOf('\u0000'));
          const ticketId = result[7].toString();
          const ticket = {
            serialNumber,
            fn, fd, fpd,
            guaranteeTime,
            warrantyCase,
            productName,
            ticketId
          };

          tickets.push(ticket);
          if (tickets.length === amountOfTickets) res.send({
            tickets
          });
        });
      }
    }
  )
});
