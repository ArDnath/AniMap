import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: { default: "Animap — Discover Anime Online", template: "%s | Animap" },
  description:
    "Stream your favourite anime series and movies. Discover trending, popular, and top-rated anime all in one place.",
  keywords: [
    "anime",
    "watch anime",
    "anime streaming",
    "anime online",
    "trending anime",
  ],
  authors: [{ name: "Ariyaman Debnath" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Animap",
  },
  openGraph: {
    title: "Animap — Discover Anime Online",
    description: "Stream trending, popular, and top-rated anime.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Animap",
    description: "Your ultimate anime streaming destination.",
  },
};

export const viewport: Viewport = {
  themeColor: "#C4B5FD",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
             __html: `
              try {
                const theme = localStorage.getItem('animap-theme') || 'dark';
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                }
              } catch {}
            `,
          }}
        />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icon-192x192.png"
        />
      </head>
      <body
        className={`${geistMono.variable} antialiased min-h-screen flex flex-col term-bg term-text font-mono`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
