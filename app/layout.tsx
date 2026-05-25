import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/layout/header";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Rasoi — Ghar ka khana from your kitchen",
  description:
    "Enter what you have at home and get realistic homemade Indian dish recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} min-h-screen antialiased`}>
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-10">
          {children}
        </main>
      </body>
    </html>
  );
}
