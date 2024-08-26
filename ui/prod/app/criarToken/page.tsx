"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/services/contracts";

export default function CreateToken() {
  const [TokenName, setTokenName] = useState("");
  const [TokenSymbol, setTokenSymbol] = useState("");
  const [TokenDescription, setTokenDescription] = useState("");
  const [TokenAmount, setTokenAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [message, setMessage] = useState("");
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const deployIPFS = async (file: File) => {
    setMessage("PDF deployed on IPFS");
    return "https://ipfs.io/CID";
  };

  const createToken = async (signer: ethers.JsonRpcSigner) => {
    try {
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const formattedSupply = ethers.parseUnits(TokenAmount, 18);
      const transaction = await contract.createDCC(
        TokenName,
        pdfFile ? await deployIPFS(pdfFile) : "",
        TokenSymbol,
        TokenDescription,
        interestRate,
        formattedSupply
      );

      const txReceipt = await transaction.wait();
      console.log("txReceipt");
      console.log(JSON.stringify(txReceipt, null, 2));

      const newDCCAddress = "111"
      setMessage(
        `Token criado com sucesso! Endereço do contrato: ${newDCCAddress}`
      );
    } catch (error) {
      console.error("Erro ao criar o token:", error);
      setMessage("Erro ao criar o token!");
    }
  };

  const handleCreateToken = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask não está instalado!");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      if (pdfFile) {
        // deploy token
        await createToken(signer);
      } else {
        setMessage("Por favor, faça o upload de um arquivo PDF.");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setMessage("Arquivo PDF carregado: " + file.name);
    } else {
      setMessage("Por favor, carregue apenas arquivos PDF.");
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex flex-1 items-center justify-center border-dashed border-4 border-gray-400 mx-4 p-4"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div>
          <p>Arraste e solte seu PDF aqui</p>
          {pdfFile && <div className="mt-4 text-white">{pdfFile.name}</div>}
        </div>
      </div>
      <div  style={{ height: '100%' }} className="flex flex-col w-96 p-8 bg-gray-900 text-white rounded-lg">
        <h1 className="text-2xl mb-6">Create Token on Polygon</h1>
        <div className="mb-4">
          <label className="block text-lg mb-2">Nome Ativo</label>
          <input
            type="text"
            className="border p-2 w-full bg-gray-800 border-gray-600 rounded"
            value={TokenName}
            onChange={(e) => setTokenName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Símbolo Ativo</label>
          <input
            type="text"
            className="border p-2 w-full bg-gray-800 border-gray-600 rounded"
            value={TokenSymbol}
            onChange={(e) => setTokenSymbol(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">
            Descrição do Ativo
          </label>
          <textarea
            className="border p-2 w-full bg-gray-800 border-gray-600 rounded resize: none"
            value={TokenDescription}
            onChange={(e) => setTokenDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Quantidade de Ativo</label>
          <input
            type="text"
            className="border p-2 w-48 bg-gray-800 border-gray-600 rounded"
            value={TokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg mb-2">Taxa de Juros (%)</label>
          <input
            type="text"
            className="border p-2 w-full bg-gray-800 border-gray-600 rounded"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleCreateToken}
        >
          Criar token DCC
        </button>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
}
