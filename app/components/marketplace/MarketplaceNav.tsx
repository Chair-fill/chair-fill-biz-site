import Link from "next/link";
import Image from "next/image";

const APP_LOGIN_URL = "https://app.chairfill.co/login";

export default function MarketplaceNav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/barber-booth-rental" className="flex items-center">
          <Image
            src="/logo-new.png"
            alt="ChairFill"
            width={120}
            height={38}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/barbers/looking"
            className="text-[13px] text-foreground/60 hover:text-foreground transition-colors hidden sm:block"
          >
            I&apos;m looking for a chair
          </Link>
          <Link
            href="/claim"
            className="text-[13px] font-semibold px-3 py-1.5 rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-all"
          >
            Claim your shop
          </Link>
          <Link
            href={APP_LOGIN_URL}
            className="text-[13px] font-semibold px-3 py-1.5 rounded-lg bg-primary text-black hover:brightness-110 transition-all"
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}
