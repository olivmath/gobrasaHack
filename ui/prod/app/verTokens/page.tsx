"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/services/contracts";

// Definição de tipos para o token
interface Token {
  name: string;
  symbol: string;
  description: string;
  ipfsLink: string;
  totalSupply: string;
  interestRate: string;
}

export default function ViewTokens() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (!window.ethereum) throw new Error("MetaMask não está instalado!");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);

        // Obter todos os endereços dos holders
        const holders = await contract.allHolders();
        const tokensArray: Token[] = [];

        for (const holder of holders) {
          const balance = await contract.balanceOf(holder);
          
          tokensArray.push({
            name: await contract.name(),
            symbol: await contract.symbol(),
            description: await contract.description(),
            ipfsLink: await contract.ipfsLink(),
            totalSupply: ethers.formatUnits(await contract.totalSupply(), 18),
            interestRate: (await contract.interestRate()).toString(),
          });
        }

        setTokens(tokensArray);
      } catch (error) {
        console.error("Erro ao buscar tokens:", error);
        alert("Erro ao buscar tokens!");
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white p-8 rounded-lg">
      <div className="w-full">
        <h1 className="text-2xl mb-6">Tokens Existentes</h1>
        {loading ? (
          <p>Carregando tokens...</p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nome</th>
                <th className="border px-4 py-2">Símbolo</th>
                <th className="border px-4 py-2">Descrição</th>
                <th className="border px-4 py-2">IPFS Link</th>
                <th className="border px-4 py-2">Quantidade</th>
                <th className="border px-4 py-2">Taxa de Juros (%)</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{token.name}</td>
                  <td className="border px-4 py-2">{token.symbol}</td>
                  <td className="border px-4 py-2">{token.description}</td>
                  <td className="border px-4 py-2">
                    <a href={token.ipfsLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      {token.ipfsLink}
                    </a>
                  </td>
                  <td className="border px-4 py-2">{token.totalSupply}</td>
                  <td className="border px-4 py-2">{token.interestRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}