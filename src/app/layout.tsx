import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/widgets/Header/Header";
import { Footer } from "@/widgets/Footer/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BoostPro — Professional Gaming Boost Services",
  description:
    "Professional gaming boost services for CS2, Dota 2, and Valorant. Fast, safe, and affordable rank boosting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-[var(--header-height)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
