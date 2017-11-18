module.exports = [
  {
    constant: true,
    inputs: [{ name: "cardNumber", type: "uint256" }],
    name: "getAmountOfTickets",
    outputs: [{ name: "amount", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "cardNumber", type: "uint256" },
      { name: "idTicket", type: "uint256" },
      { name: "time", type: "uint256" }
    ],
    name: "checkGuarantee",
    outputs: [{ name: "restGuaranteeTime", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "cardNumber", type: "uint256" },
      { name: "idTicket", type: "uint256" }
    ],
    name: "getTicket",
    outputs: [
      { name: "_productName", type: "bytes16" },
      { name: "_serialNumber", type: "bytes16" },
      { name: "_fn", type: "uint256" },
      { name: "_fd", type: "uint256" },
      { name: "_fpd", type: "uint256" },
      { name: "_guaranteeTime", type: "uint256" },
      { name: "_warrantyCase", type: "bytes16" }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "cardNumber", type: "uint256" },
      { name: "fn", type: "uint256" },
      { name: "fd", type: "uint256" },
      { name: "fpd", type: "uint256" },
      { name: "serialNumber", type: "bytes16" },
      { name: "guaranteeTime", type: "uint256" },
      { name: "warrantyCase", type: "bytes16" },
      { name: "productName", type: "bytes16" }
    ],
    name: "setTicket",
    outputs: [{ name: "idTicket", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
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
