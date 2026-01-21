import Link from "next/link";

export const Footer = () => (
  <footer className="mt-12 flex w-full flex-col items-center gap-4 text-center">
    <Link
      href="/privacy-policy"
      className="text-[0.625rem] uppercase underline"
    >
      Polityka prywatności
    </Link>
    <Link href="#" className="text-[0.65rem] uppercase underline">
      Zgody cookies
    </Link>
  </footer>
);
