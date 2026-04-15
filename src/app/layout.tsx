import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { MainProvider } from "./providers";
import { getUser } from "@/entities/user/get-user";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CarryMe — Professional Gaming Boost Services",
  description:
    "Professional gaming boost services for CS2, Dota 2, and Valorant. Fast, safe, and affordable rank boosting.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <MainProvider initialUser={user}>{children}</MainProvider>
        <Analytics />
      </body>
    </html>
  );
}
