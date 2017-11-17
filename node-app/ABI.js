module.exports = [
  {
    constant: false,
    inputs: [
      { name: "ballotId", type: "uint8" },
      { name: "name", type: "string" }
    ],
    name: "addCandidate",
    outputs: [{ name: "id", type: "string" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "ballotId", type: "uint8" },
      { name: "name", type: "string" }
    ],
    name: "voting",
    outputs: [{ name: "", type: "uint32" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "name", type: "string" }],
    name: "addBallot",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "name", type: "string" },
      { indexed: false, name: "id", type: "uint8" }
    ],
    name: "ballotAdded",
    type: "event"
  }
];
