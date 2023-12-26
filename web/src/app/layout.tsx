import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import Header from "components/layout/Header";

import "styles/globals.css";

const font = Plus_Jakarta_Sans({ subsets: ["latin"] });

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={font.className}>
        <div className="container-app">
          <Header />
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "Fastned - The Charging Game",
  description: "Find the route to charge your car as fast as possible.",
};
