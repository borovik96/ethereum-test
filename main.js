let contract;

const startApp = () => {
    web3.version.getNetwork((err, netId) => {
      switch (netId) {
        case "1":
          console.log("This is mainnet");
          break;
        case "2":
          console.log("This is the deprecated Morden test network.");
          break;
        case "3":
          console.log("This is the ropsten test network.");
          break;
        default:
          console.log("This is an unknown network.");
      }
    });

  // ABI
  const ABI = [
    {
      constant: false,
      inputs: [{ name: "_name", type: "string" }],
      name: "addCandidate",
      outputs: [{ name: "id", type: "uint256" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      constant: false,
      inputs: [{ name: "_id", type: "uint256" }],
      name: "voting",
      outputs: [{ name: "", type: "uint256" }],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    }
  ];

  web3.eth.getAccounts((err, accounts) => {
    contract = web3.eth.contract(ABI).at('0xe5138F5000EbE506D9539D0bF0De9b00c8C332F7');
    contract.voting(1, (res, err) => console.log(res, err))
  });
}


window.addEventListener('load', function() {

  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

  // Now you can start your app & access web3 freely:
  startApp()

})
