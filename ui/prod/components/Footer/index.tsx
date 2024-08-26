import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-transparent text-white/60 backdrop-blur-md py-5">
      <div className="max-w-7xl mx-auto px-8 flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              width={48}
              height={48}
              alt="logo"
              className="transform transition-transform duration-300 hover:scale-130 hover:filter hover:brightness-125"
            />
          <div className="flex items-center gap-6 font-medium">
            <Link href="/" className="transition hover:text-white/100">
              Bloky
            </Link>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Bloky. All rights reserved.
          </p>
          <p className="text-sm">
            <Link href="/privacy" className="transition hover:text-white/100">
              Privacy Policy
            </Link> |{" "}
            <Link href="/terms" className="transition hover:text-white/100">
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}