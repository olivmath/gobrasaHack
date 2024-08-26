const deployedContracts = {
  "31337": [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        BTGIssuer: {
          address: "0xdc64a140aa3e981100a9beca4e685f962f0cf6c9",
          abi: [
            { type: "constructor", inputs: [], stateMutability: "nonpayable" },
            {
              type: "function",
              name: "createDCC",
              inputs: [
                { name: "name", type: "string", internalType: "string" },
                { name: "symbol", type: "string", internalType: "string" },
                { name: "description", type: "string", internalType: "string" },
                { name: "ipfsLink", type: "string", internalType: "string" },
                {
                  name: "interestRate",
                  type: "uint256",
                  internalType: "uint256",
                },
                { name: "amount", type: "uint256", internalType: "uint256" },
              ],
              outputs: [{ name: "", type: "address", internalType: "address" }],
              stateMutability: "nonpayable",
            },
            {
              type: "function",
              name: "owner",
              inputs: [],
              outputs: [{ name: "", type: "address", internalType: "address" }],
              stateMutability: "view",
            },
            {
              type: "event",
              name: "DCCCreated",
              inputs: [
                {
                  name: "tokenAddress",
                  type: "address",
                  indexed: false,
                  internalType: "address",
                },
              ],
              anonymous: false,
            },
          ],
        },
      },
    },
  ],
} as const;

export default deployedContracts;
