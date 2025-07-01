import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/providers/providers";
import Appbar from "@/layouts/appbar";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Content society",
  description: "Made by Amar Prasad",
  openGraph: {
    title: "Content society",
    description: "Made by Amar Prasad",
    url: "https://content-society.vercel.app/",
    siteName: "Content society",
    images: [
      {
        url: "https://content-society.vercel.app/og-img.png",
        width: 1200,
        height: 630,
        alt: "Content society preview image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Content society",
    description: "Made by Amar Prasad",
    images: ["https://content-society.vercel.app/og-img.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen relative`}
      >
        <Provider>
          <Appbar />
          <Suspense fallback={<div>Loading...</div>}>
            <main className="">
              {children}
            </main>
            <Toaster />
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
