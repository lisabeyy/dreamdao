import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: "Dream DAO - Empowering Women in STEM",
  description: "Join Dream DAO, a community-driven initiative empowering women in STEM through decentralized governance and education.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
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
