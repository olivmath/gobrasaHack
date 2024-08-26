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
					<ListingGrid
						marketplace={MARKETPLACE}
						collection={NFT_COLLECTION}
						emptyText={
							"Não há DCCs listados ainda"
						}
					/>
				</Suspense>
			</div>
		</div>
	);
}
