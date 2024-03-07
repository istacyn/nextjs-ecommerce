import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "./SessionProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zuri",
  description: "Timeless Treasures, Modern Elegance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main className="m-auto min-w-[300px] max-w-7xl p-4">{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
