/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { DeferredToken, DeferredTokenInterface } from "../DeferredToken";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "RequestWithdrawal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "cooldownPeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "requestOwnerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "requestWithdrawal",
    outputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "period",
        type: "uint256",
      },
    ],
    name: "setCooldownPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "requestId",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "withdrawalRequestCounts",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "withdrawalRequests",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "requestTs",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isClaimed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50612abf806100206000396000f3fe608060405234801561001057600080fd5b50600436106101b95760003560e01c806380ea3de1116100f9578063a9059cbb11610097578063cc5c1e0811610071578063cc5c1e08146103d6578063dd62ed3e1461040c578063f2fde38b14610452578063fc0c546a1461046557600080fd5b8063a9059cbb1461039d578063b6b55f25146103b0578063c4d66de8146103c357600080fd5b8063937b2581116100d3578063937b25811461033a57806395d89b411461036f5780639ee679e814610377578063a457c2d71461038a57600080fd5b806380ea3de1146102e05780638456cb59146102f35780638da5cb5b146102fb57600080fd5b8063313ce567116101665780634def2dbe116101405780634def2dbe146102775780635c975abb1461029757806370a08231146102a2578063715018a6146102d857600080fd5b8063313ce56714610240578063395093511461025a5780633f4ba83a1461026d57600080fd5b806318160ddd1161019757806318160ddd1461021257806323b872dd1461021a5780632e1a7d4d1461022d57600080fd5b806304646a49146101be57806306fdde03146101da578063095ea7b3146101ef575b600080fd5b6101c760fc5481565b6040519081526020015b60405180910390f35b6101e2610485565b6040516101d19190612629565b6102026101fd3660046126a3565b610517565b60405190151581526020016101d1565b6035546101c7565b6102026102283660046126cd565b61052f565b6101c761023b366004612709565b610553565b6102486107a6565b60405160ff90911681526020016101d1565b6102026102683660046126a3565b61084e565b61027561089a565b005b6101c7610285366004612722565b60fe6020526000908152604090205481565b60655460ff16610202565b6101c76102b0366004612722565b73ffffffffffffffffffffffffffffffffffffffff1660009081526033602052604090205490565b6102756108ac565b6102756102ee366004612709565b6108be565b6102756108cb565b60c95473ffffffffffffffffffffffffffffffffffffffff165b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016101d1565b61034d610348366004612709565b6108db565b60408051948552602085019390935291830152151560608201526080016101d1565b6101e2610918565b6101c7610385366004612709565b610927565b6102026103983660046126a3565b610986565b6102026103ab3660046126a3565b610a57565b6102756103be366004612709565b610a65565b6102756103d1366004612722565b610ad4565b6103156103e4366004612709565b60ff6020526000908152604090205473ffffffffffffffffffffffffffffffffffffffff1681565b6101c761041a366004612744565b73ffffffffffffffffffffffffffffffffffffffff918216600090815260346020908152604080832093909416825291909152205490565b610275610460366004612722565b610e5c565b60fb546103159073ffffffffffffffffffffffffffffffffffffffff1681565b60606036805461049490612777565b80601f01602080910402602001604051908101604052809291908181526020018280546104c090612777565b801561050d5780601f106104e25761010080835404028352916020019161050d565b820191906000526020600020905b8154815290600101906020018083116104f057829003601f168201915b5050505050905090565b600033610525818585610f13565b5060019392505050565b60003361053d8582856110c6565b61054885858561119d565b506001949350505050565b600061055d61141e565b600060fd8381548110610572576105726127cb565b60009182526020918290206040805160808101825260049093029091018054835260018101549383019390935260028301549082015260039091015460ff161580156060830152909150610627576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f414c524541445920434c41494d4544000000000000000000000000000000000060448201526064015b60405180910390fd5b600083815260ff602052604090205473ffffffffffffffffffffffffffffffffffffffff1633146106b4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600960248201527f4e4f54204f574e45520000000000000000000000000000000000000000000000604482015260640161061e565b4260fc5482604001516106c79190612829565b111561072f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f4e45454420434f4f4c444f574e00000000000000000000000000000000000000604482015260640161061e565b602081015160fb5490925061075b9073ffffffffffffffffffffffffffffffffffffffff16338461148b565b6107653384611564565b604080518381526020810185905233917ff279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568910160405180910390a250919050565b60fb54604080517f313ce567000000000000000000000000000000000000000000000000000000008152905160009273ffffffffffffffffffffffffffffffffffffffff169163313ce567916004808301926020929190829003018186803b15801561081157600080fd5b505afa158015610825573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108499190612841565b905090565b33600081815260346020908152604080832073ffffffffffffffffffffffffffffffffffffffff871684529091528120549091906105259082908690610895908790612829565b610f13565b6108a261169c565b6108aa61171d565b565b6108b461169c565b6108aa600061179a565b6108c661169c565b60fc55565b6108d361169c565b6108aa611811565b60fd81815481106108eb57600080fd5b60009182526020909120600490910201805460018201546002830154600390930154919350919060ff1684565b60606037805461049490612777565b600061093161141e565b61093b338361186c565b6109453383611a3e565b50604080518381526020810183905233917fadf0d81321571e1d83f52cfa9faf7add412d39431677ee21583f0d8998a9c838910160405180910390a2919050565b33600081815260346020908152604080832073ffffffffffffffffffffffffffffffffffffffff8716845290915281205490919083811015610a4a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f000000000000000000000000000000000000000000000000000000606482015260840161061e565b6105488286868403610f13565b60003361052581858561119d565b610a6d61141e565b60fb54610a929073ffffffffffffffffffffffffffffffffffffffff16333084611bf0565b610a9c3382611c4e565b60405181815233907fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c9060200160405180910390a250565b600054610100900460ff1615808015610af45750600054600160ff909116105b80610b0e5750303b158015610b0e575060005460ff166001145b610b9a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a6564000000000000000000000000000000000000606482015260840161061e565b600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790558015610bf857600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff166101001790555b60fb80547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8416908117909155604080517f06fdde030000000000000000000000000000000000000000000000000000000081529051600092916306fdde039160048083019286929190829003018186803b158015610c8c57600080fd5b505afa158015610ca0573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610ce69190810190612893565b905060008373ffffffffffffffffffffffffffffffffffffffff166395d89b416040518163ffffffff1660e01b815260040160006040518083038186803b158015610d3057600080fd5b505afa158015610d44573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610d8a9190810190612893565b9050610dd482604051602001610da09190612953565b60405160208183030381529060405282604051602001610dc09190612998565b604051602081830303815290604052611d4f565b62093a8060fc55610de3611df0565b610deb611df0565b610df3611e8f565b50508015610e5857600080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00ff169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b5050565b610e6461169c565b73ffffffffffffffffffffffffffffffffffffffff8116610f07576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161061e565b610f108161179a565b50565b73ffffffffffffffffffffffffffffffffffffffff8316610fb5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f7265737300000000000000000000000000000000000000000000000000000000606482015260840161061e565b73ffffffffffffffffffffffffffffffffffffffff8216611058576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f7373000000000000000000000000000000000000000000000000000000000000606482015260840161061e565b73ffffffffffffffffffffffffffffffffffffffff83811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b73ffffffffffffffffffffffffffffffffffffffff8381166000908152603460209081526040808320938616835292905220547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114611197578181101561118a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161061e565b6111978484848403610f13565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8316611240576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f6472657373000000000000000000000000000000000000000000000000000000606482015260840161061e565b73ffffffffffffffffffffffffffffffffffffffff82166112e3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f6573730000000000000000000000000000000000000000000000000000000000606482015260840161061e565b6112ee838383611f2e565b73ffffffffffffffffffffffffffffffffffffffff8316600090815260336020526040902054818110156113a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e63650000000000000000000000000000000000000000000000000000606482015260840161061e565b73ffffffffffffffffffffffffffffffffffffffff80851660008181526033602052604080822086860390559286168082529083902080548601905591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef906114119086815260200190565b60405180910390a3611197565b60655460ff16156108aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f5061757361626c653a2070617573656400000000000000000000000000000000604482015260640161061e565b60405173ffffffffffffffffffffffffffffffffffffffff831660248201526044810182905261155f9084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff0000000000000000000000000000000000000000000000000000000090931692909217909152611fc1565b505050565b600160fd8281548110611579576115796127cb565b6000918252602080832060049290920290910160030180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169315159390931790925573ffffffffffffffffffffffffffffffffffffffff8416815260fe90915260408120805482906115ec906129dd565b9182905550600083815261010160205260409020549091508082146116545773ffffffffffffffffffffffffffffffffffffffff8416600090815261010060209081526040808320858452825280832054848452818420819055835261010190915290208190555b60009081526101016020908152604080832083905573ffffffffffffffffffffffffffffffffffffffff90951682526101008152848220928252919091529182209190915550565b60c95473ffffffffffffffffffffffffffffffffffffffff1633146108aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161061e565b6117256120cd565b606580547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390a1565b60c9805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b61181961141e565b606580547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586117703390565b73ffffffffffffffffffffffffffffffffffffffff821661190f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360448201527f7300000000000000000000000000000000000000000000000000000000000000606482015260840161061e565b61191b82600083611f2e565b73ffffffffffffffffffffffffffffffffffffffff8216600090815260336020526040902054818110156119d1576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60448201527f6365000000000000000000000000000000000000000000000000000000000000606482015260840161061e565b73ffffffffffffffffffffffffffffffffffffffff831660008181526033602090815260408083208686039055603580548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3505050565b60fd80546040805160808101825282815260208082018681524283850190815260006060850181815260018801895597815293517f9346ac6dd7de6b96975fec380d4d994c4c12e6a8897544f22915316cc6cca280600488029081019190915591517f9346ac6dd7de6b96975fec380d4d994c4c12e6a8897544f22915316cc6cca281830155517f9346ac6dd7de6b96975fec380d4d994c4c12e6a8897544f22915316cc6cca28282015594517f9346ac6dd7de6b96975fec380d4d994c4c12e6a8897544f22915316cc6cca28390950180547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169515159590951790945573ffffffffffffffffffffffffffffffffffffffff8616815260fe909352822080549192919082611b6d83612a12565b90915550600083815260ff60209081526040808320805473ffffffffffffffffffffffffffffffffffffffff9099167fffffffffffffffffffffffff000000000000000000000000000000000000000090991689179055968252610100815286822083835281528682208590558482526101019052949094209390935592915050565b60405173ffffffffffffffffffffffffffffffffffffffff808516602483015283166044820152606481018290526111979085907f23b872dd00000000000000000000000000000000000000000000000000000000906084016114dd565b73ffffffffffffffffffffffffffffffffffffffff8216611ccb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161061e565b611cd760008383611f2e565b8060356000828254611ce99190612829565b909155505073ffffffffffffffffffffffffffffffffffffffff82166000818152603360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b600054610100900460ff16611de6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e67000000000000000000000000000000000000000000606482015260840161061e565b610e588282612139565b600054610100900460ff16611e87576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e67000000000000000000000000000000000000000000606482015260840161061e565b6108aa6121f7565b600054610100900460ff16611f26576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e67000000000000000000000000000000000000000000606482015260840161061e565b6108aa6122b8565b60655460ff161561155f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e7366657220776860448201527f696c652070617573656400000000000000000000000000000000000000000000606482015260840161061e565b6000612023826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166123589092919063ffffffff16565b80519091501561155f57808060200190518101906120419190612a4b565b61155f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161061e565b60655460ff166108aa576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f5061757361626c653a206e6f7420706175736564000000000000000000000000604482015260640161061e565b600054610100900460ff166121d0576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e67000000000000000000000000000000000000000000606482015260840161061e565b81516121e3906036906020850190612564565b50805161155f906037906020840190612564565b600054610100900460ff1661228e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e67000000000000000000000000000000000000000000606482015260840161061e565b606580547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b600054610100900460ff1661234f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602b60248201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960448201527f6e697469616c697a696e67000000000000000000000000000000000000000000606482015260840161061e565b6108aa3361179a565b6060612367848460008561236f565b949350505050565b606082471015612401576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161061e565b6000808673ffffffffffffffffffffffffffffffffffffffff16858760405161242a9190612a6d565b60006040518083038185875af1925050503d8060008114612467576040519150601f19603f3d011682016040523d82523d6000602084013e61246c565b606091505b509150915061247d87838387612488565b979650505050505050565b6060831561251b5782516125145773ffffffffffffffffffffffffffffffffffffffff85163b612514576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161061e565b5081612367565b61236783838151156125305781518083602001fd5b806040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061e9190612629565b82805461257090612777565b90600052602060002090601f01602090048101928261259257600085556125d8565b82601f106125ab57805160ff19168380011785556125d8565b828001600101855582156125d8579182015b828111156125d85782518255916020019190600101906125bd565b506125e49291506125e8565b5090565b5b808211156125e457600081556001016125e9565b60005b83811015612618578181015183820152602001612600565b838111156111975750506000910152565b60208152600082518060208401526126488160408501602087016125fd565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461269e57600080fd5b919050565b600080604083850312156126b657600080fd5b6126bf8361267a565b946020939093013593505050565b6000806000606084860312156126e257600080fd5b6126eb8461267a565b92506126f96020850161267a565b9150604084013590509250925092565b60006020828403121561271b57600080fd5b5035919050565b60006020828403121561273457600080fd5b61273d8261267a565b9392505050565b6000806040838503121561275757600080fd5b6127608361267a565b915061276e6020840161267a565b90509250929050565b600181811c9082168061278b57607f821691505b602082108114156127c5577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000821982111561283c5761283c6127fa565b500190565b60006020828403121561285357600080fd5b815160ff8116811461273d57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000602082840312156128a557600080fd5b815167ffffffffffffffff808211156128bd57600080fd5b818401915084601f8301126128d157600080fd5b8151818111156128e3576128e3612864565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f0116810190838211818310171561292957612929612864565b8160405282815287602084870101111561294257600080fd5b61247d8360208301602088016125fd565b7f446566657272656420000000000000000000000000000000000000000000000081526000825161298b8160098501602087016125fd565b9190910160090192915050565b7f442d0000000000000000000000000000000000000000000000000000000000008152600082516129d08160028501602087016125fd565b9190910160020192915050565b6000816129ec576129ec6127fa565b507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff821415612a4457612a446127fa565b5060010190565b600060208284031215612a5d57600080fd5b8151801515811461273d57600080fd5b60008251612a7f8184602087016125fd565b919091019291505056fea2646970667358221220a88beba6a3c780c928911daedb12b44c430424cc6e3595c47769b863193e584464736f6c63430008090033";

type DeferredTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DeferredTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DeferredToken__factory extends ContractFactory {
  constructor(...args: DeferredTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<DeferredToken> {
    return super.deploy(overrides || {}) as Promise<DeferredToken>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DeferredToken {
    return super.attach(address) as DeferredToken;
  }
  connect(signer: Signer): DeferredToken__factory {
    return super.connect(signer) as DeferredToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DeferredTokenInterface {
    return new utils.Interface(_abi) as DeferredTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DeferredToken {
    return new Contract(address, _abi, signerOrProvider) as DeferredToken;
  }
}
