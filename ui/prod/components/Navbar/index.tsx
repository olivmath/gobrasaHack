import { ConnectButton } from "thirdweb/react";
import Image from "next/image";
import Link from "next/link";
import client from "@/lib/client";
import { NETWORK } from "@/services/contracts";

export function Navbar() {
  return (
    <div className="fixed top-0 z-10 flex items-center justify-center w-full bg-transparent text-white/60 backdrop-blur-md">
      <nav className="flex items-center justify-between w-full px-8 py-5 mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <Link href="/" className="mr-4">
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="logo"
              className="transform transition-transform duration-300 hover:scale-130 hover:filter hover:brightness-125"
            />
          </Link>


          <div className="flex items-center gap-6 font-medium">
            <Link href="/comprar" className="transition hover:text-white/100">
              Comprar
            </Link>
            <Link href="/vender" className="transition hover:text-white/100">
              Vender
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="transform transition-transform duration-300 hover:scale-130 hover:filter hover:brightness-125">
            <ConnectButton theme="dark" client={client} chain={NETWORK} />
          </div>
        </div>
      </nav>
    </div>
  );
}
