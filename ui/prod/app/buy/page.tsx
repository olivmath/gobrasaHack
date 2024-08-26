export const dynamic = "force-dynamic";
export const revalidate = 0;
import React, { Suspense } from "react";
import { NFTGridLoading } from "@/components/NFT/NFTGrid";
import ListingGrid from "@/components/ListingGrid/ListingGrid";
import { MARKETPLACE, NFT_COLLECTION } from "@/services/contracts";

export default function Buy() {
	return (
		<div className="">
			<h1 className="text-4xl">Compre DCCs</h1>

			<div className="my-8">
				<Suspense fallback={<NFTGridLoading />}>
				<div className="my-8">
					Essa página ainda não está disponível!
				</div>
				</Suspense>
			</div>
		</div>
	);
}
