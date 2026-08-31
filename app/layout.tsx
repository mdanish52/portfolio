import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"]
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio site"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${mono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-canvas text-inkText font-body antialiased">{children}</body>
    </html>
  );
}