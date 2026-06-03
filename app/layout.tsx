import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Rasoi - Ghar ka khana from your kitchen",
    template: "%s | Rasoi",
  },
  description:
    "Enter what you have at home and get realistic homemade Indian dish recommendations. Discover authentic Indian recipes based on ingredients you have in your pantry.",
  keywords: [
    "Indian recipes",
    "cooking recipes",
    "homemade Indian food",
    "recipe recommendations",
    "Indian cuisine",
    "cooking ingredients",
    "pantry recipes",
    "Indian cooking",
    "authentic Indian dishes",
    "recipe finder",
    "Indian food recipes",
    "home cooking",
    "kitchen recipes",
    "cooking tips",
  ],
  authors: [{ name: "Jishnu" }],
  creator: "Jishnudeep Borah",
  publisher: "Rasoi",
  metadataBase: new URL("https://rasoi-ready.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rasoi-ready.vercel.app",
    title: "Rasoi - Ghar ka khana from your kitchen",
    description:
      "Enter what you have at home and get realistic homemade Indian dish recommendations. Discover authentic Indian recipes based on ingredients you have in your pantry.",
    siteName: "Rasoi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rasoi - Ghar ka khana from your kitchen",
    description:
      "Enter what you have at home and get realistic homemade Indian dish recommendations. Discover authentic Indian recipes based on ingredients you have in your pantry.",
    creator: "@JishnudeepBorah",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const themeScript = `
    try {
      const stored = localStorage.getItem("rasoi:theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (stored === "dark" || (!stored && prefersDark)) {
        document.documentElement.classList.add("dark");
      }
    } catch {}
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.GOOGLE_SITE_VERIFICATION && (
          <meta
            name="google-site-verification"
            content={process.env.GOOGLE_SITE_VERIFICATION}
          />
        )}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen antialiased">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
