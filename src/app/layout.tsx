import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/utils/cn";
import { Footer } from "@/components/footer";
import { Toaster } from "react-hot-toast";

export const dynamic = "force-static";

const pixelDemon = localFont({
  src: "./fonts/pixel-demon.ttf",
  variable: "--pixel",
});

const schrifted = localFont({
  src: [
    {
      path: "./fonts/SFTSchriftedSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SFTSchriftedSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--schrifted",
});

export const metadata: Metadata = {
  title: "We CREATE websites and webapps for the picky ones",
  description:
    "Tworzymy zaawansowane strony internetowe i aplikacje webowe dla wymagających.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={cn(pixelDemon.variable, schrifted.variable)}>
      <body className="mx-auto flex min-h-screen max-w-110 flex-col px-8 py-32 font-schrifted antialiased md:max-w-360 xl:px-24">
        <Toaster position="bottom-right" />
        <main className="flex flex-1 flex-col items-center">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
