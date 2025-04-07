import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Dream DAO - Empowering Women in STEM",
  description: "Join Dream DAO, a decentralized autonomous organization focused on empowering women in STEM through education, events, and resources.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} font-sans bg-white dark:bg-[#0A0A0A] text-gray-900 dark:text-white transition-colors duration-200`}>
        {children}
      </body>
    </html>
  );
}
