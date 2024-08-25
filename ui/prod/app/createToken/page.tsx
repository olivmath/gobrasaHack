// app/createToken/page.tsx
"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/const/contracts";

export default function CreateToken() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateToken = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed!");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer,
      );

      const formattedSupply = ethers.parseUnits(totalSupply, 18);
      const transaction = await contract.createToken(
        tokenName,
        tokenSymbol,
        formattedSupply,
      );
      await transaction.wait();

      setMessage("Token created successfully!");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="">
      <h1 className="text-4xl">Create Token on Polygon</h1>
      <div className="my-8">
        <div>
          <label className="block text-xl mb-2">Token Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={tokenName}
            onChange={(e) => setTokenName(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-xl mb-2">Token Symbol</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={tokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-xl mb-2">Total Supply</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={totalSupply}
            onChange={(e) => setTotalSupply(e.target.value)}
          />
        </div>
        <button
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleCreateToken}
        >
          Create Token
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
