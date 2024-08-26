"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BTGIssuer, DCCToken } from "@/services/contracts";

// Definição de tipos para o token
interface Token {
  name: string;
  symbol: string;
  description: string;
  ipfsCID: string;
  totalSupply: string;
  interestRate: string;
  sellPercent: string;
}

export default function ViewTokens() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (!window.ethereum) throw new Error("MetaMask não está instalado!");

        const provider = new ethers.BrowserProvider(window.ethereum);
        const btgContract = new ethers.Contract(
          BTGIssuer.address,
          BTGIssuer.abi,
          provider
        );

        const tokens = await btgContract.getAllCreatedTokens();
        const tokensArray: Token[] = [];

        for (const tokenAddress of tokens) {
          const tokenContract = new ethers.Contract(
            tokenAddress,
            DCCToken.abi,
            provider
          );

          console.log(await tokenContract.issuerOwnershipPercentage());

          tokensArray.push({
            name: await tokenContract.name(),
            symbol: await tokenContract.symbol(),
            description: await tokenContract.description(),
            ipfsCID: await tokenContract.ipfsCID(),
            totalSupply: ethers.formatUnits(
              await tokenContract.totalSupply(),
              18
            ),
            interestRate: (await tokenContract.interestRate()).toString(),
            sellPercent: (
              await tokenContract.issuerOwnershipPercentage()
            ).toString(),
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
                <th className="border px-4 py-2">Vendidos (%)</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{token.name}</td>
                  <td className="border px-4 py-2">{token.symbol}</td>
                  <td className="border px-4 py-2">{token.description}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={token.ipfsCID}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline"
                    >
                      {token.ipfsCID}
                    </a>
                  </td>
                  <td className="border px-4 py-2">{token.totalSupply}</td>
                  <td className="border px-4 py-2">{token.interestRate}</td>
                  <td className="border px-4 py-2">{token.sellPercent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
