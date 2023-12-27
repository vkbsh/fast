import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { PAGES } from "config";

import logoSrc from "public/logo.svg";

import "styles/globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="app-container">
          <Link href={PAGES.HOME}>
            <Image src={logoSrc} alt="Fastned-logo" className="w-[182px] h-6" />
          </Link>
          {children}
        </div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Fastned - The Charging Game",
  description: "Find the route to charge your car as fast as possible.",
};
