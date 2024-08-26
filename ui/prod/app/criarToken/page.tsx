"use client";

import React, { useState } from "react";
import { ethers } from "ethers";
import { BTGIssuer } from "@/services/contracts";
import { useRouter } from 'next/navigation';


export default function CreateToken() {
  const [TokenName, setTokenName] = useState("Nome Padrão do Ativo");
  const [TokenSymbol, setTokenSymbol] = useState("SÍMBOLO");
  const [TokenDescription, setTokenDescription] = useState("Descrição padrão do ativo");
  const [TokenAmount, setTokenAmount] = useState("1000");
  const [interestRate, setInterestRate] = useState("5");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const router = useRouter();


  const deployIPFS = async (file: File) => {
    alert("PDF deployed on IPFS");
    return "https://ipfs.io/CID";
  };

  const createToken = async (signer: ethers.JsonRpcSigner) => {
    try {
      const contract = new ethers.Contract(
        BTGIssuer.address,
        BTGIssuer.abi,
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

      await transaction.wait();

      const lastToken = await contract.getLastCreatedToken();

      alert(`Token criado com sucesso! Endereço do contrato: ${lastToken}`);
    } catch (error) {
      console.error("Erro ao criar o token:", error);
      alert("Erro ao criar o token!");
    }
  };

  const handleCreateToken = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask não está instalado!");

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = await provider.getSigner();
      if (pdfFile) {
        await createToken(signer) ;
        router.push("/verTokens")
      } else {
        alert("Por favor, faça o upload de um arquivo PDF.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      alert("Arquivo PDF carregado: " + file.name);
    } else {
      alert("Por favor, carregue apenas arquivos PDF.");
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
      <div style={{ height: '100%' }} className="flex flex-col w-96 p-8 bg-gray-900 text-white rounded-lg">
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
          <label className="block text-lg mb-2">Descrição do Ativo</label>
          <textarea
            style={{ resize: 'none' }} 
            className="border p-2 w-full bg-gray-800 border-gray-600 rounded"
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
      </div>
    </div>
  );
}