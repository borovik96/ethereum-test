module.exports = [
  {
    constant: false,
    inputs: [
      { name: "numberVoucher", type: "uint8" },
      { name: "serialNumber", type: "bytes16" },
      { name: "time", type: "uint16" }
    ],
    name: "setTicket",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "idTicket", type: "uint256" }],
    name: "getTicket",
    outputs: [
      {
        components: [
          { name: "serialNumber", type: "bytes16" },
          { name: "idTicket", type: "uint256" },
          { name: "numberVoucher", type: "uint8" },
          { name: "time", type: "uint16" }
        ],
        name: "ticket",
        type: "tuple"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "addr", type: "address" },
      { indexed: false, name: "idTicket", type: "uint256" }
    ],
    name: "setTicketEvent",
    type: "event"
  }
];
