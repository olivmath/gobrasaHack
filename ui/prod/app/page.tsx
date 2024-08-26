import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";

/**
 * Landing page with a simple gradient background and a hero asset.
 * Free to customize as you see fit.
 */
const Home: NextPage = () => {
  return (
    <div className="">
      <div className="px-8 mx-auto text-center">
        <h1 className="mb-5 text-white font-bold text-6xl">
          <span className="text-transparent bg-clip-text gradient">BLOKY</span>
          <br />
          Crie tokens de DCCs com um clique
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          <Link className="hover:underline" href="/" target="_blank">
            Bloky
          </Link>{" "}
          é uma solução moderna para tokenizar DCCs.
        </p>

        <div className="flex justify-center text-lg font-medium items-center mt-12 gap-4">
          <Link
            className="w-56 p-3 rounded-lg bg-white/[.04] transition-all hover:bg-white/[.06] border-white/10 border"
            href="/criarToken"
          >
            Tokenize sua DCC
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
