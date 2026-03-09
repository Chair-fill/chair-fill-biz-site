import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#C9A84C]/18 py-[36px] px-[48px] flex items-center justify-between gap-6 flex-wrap">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-new.png"
              alt="ChairFill Logo"
              width={140}
              height={44}
              className="h-11 w-auto"
            />
          </Link>
          <p className="text-[0.78rem] text-[#777] uppercase tracking-[0.1em]">
            © {new Date().getFullYear()} ChairFill. All rights reserved.
          </p>
        </div>

        <nav className="flex items-center gap-[28px]">
          <Link
            href="/waitlist"
            className="text-[0.78rem] text-[#777] uppercase tracking-[0.1em] hover:text-[#C9A84C] transition-colors"
          >
            Join waitlist
          </Link>
          <Link
            href="/privacy"
            className="text-[0.78rem] text-[#777] uppercase tracking-[0.1em] hover:text-[#C9A84C] transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-[0.78rem] text-[#777] uppercase tracking-[0.1em] hover:text-[#C9A84C] transition-colors"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-[0.78rem] text-[#777] uppercase tracking-[0.1em] hover:text-[#C9A84C] transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
