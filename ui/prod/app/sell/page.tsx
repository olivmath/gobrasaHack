"use client";
export const dynamic = "force-dynamic";
import React, { useEffect, useState } from "react";
import { useActiveAccount, MediaRenderer } from "thirdweb/react";
import NFTGrid, { NFTGridLoading } from "@/components/NFT/NFTGrid";
import { NFT as NFTType } from "thirdweb";
import { tokensOfOwner } from "thirdweb/extensions/erc721";
import SaleInfo from "@/components/SaleInfo";
import client from "@/lib/client";
import { NFT_COLLECTION } from "@/services/contracts";
import toast from "react-hot-toast";
import toastStyle from "@/util/toastConfig";
import { Cross1Icon } from "@radix-ui/react-icons";

export default function Sell() {
	const [loading, setLoading] = useState(false);
	const [ownedTokenIds, setOwnedTokenIds] = useState<readonly bigint[]>([]);
	const [selectedNft, setSelectedNft] = useState<NFTType>();

	const account = useActiveAccount();
	useEffect(() => {
		if (account) {
			setLoading(true);
			tokensOfOwner({
				contract: NFT_COLLECTION,
				owner: account.address,
			})
				.then(setOwnedTokenIds)
				.catch((err) => {
					toast.error(
						"Algo deu errado ao importar seus DCCs!",
						{
							position: "bottom-center",
							style: toastStyle,
						}
					);
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [account]);

	return (
		<div>
			<h1 className="text-4xl">Vender NFTs</h1>
			<div className="my-8">
				Essa página ainda não está disponível!
			</div>
		</div>
	);
}
