import { ethers } from "ethers";
import { ThirdwebContract } from "thirdweb";
import React, { useEffect, useState } from "react";
import { NFT as NFTType } from "thirdweb";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "../../services/contracts";
import NFTGrid, { NFTGridLoading } from "../NFT/NFTGrid";

type Props = {
  marketplace: ThirdwebContract;
  collection: ThirdwebContract;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText: string;
};

// Função auxiliar para obter todos os tokens do contrato
const fetchTokensFromContract = async (contractAddress: string) => {
  const provider = new ethers.JsonRpcProvider();
  const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider);

  // Obter todos os holders de tokens
  const holders = await contract.allHolders();
  const tokens = await Promise.all(
    holders.map(async (holder) => {
      const balance = await contract.balanceOf(holder);
      return {
        holder,
        balance: ethers.formatUnits(balance, 18), // Ajuste a unidade conforme necessário
      };
    })
  );

  return tokens;
};

// Componente ListingGrid ajustado
export default function ListingGrid(props: Props) {
  const [tokens, setTokens] = useState<{ holder: string; balance: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTokens = async () => {
      try {
        const fetchedTokens = await fetchTokensFromContract(CONTRACT_ADDRESS);
        setTokens(fetchedTokens);
      } catch (error) {
        console.error("Erro ao buscar tokens:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTokens();
  }, []);

  if (loading) {
    return <NFTGridLoading />;
  }

  return (
    <NFTGrid
      nftData={tokens.map((token) => ({
        tokenId: token.holder,
        directListing: { ...token },
        auctionListing: null,
      }))}
      emptyText={props.emptyText}
      overrideOnclickBehavior={props.overrideOnclickBehavior}
    />
  );
}