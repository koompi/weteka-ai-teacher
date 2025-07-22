import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weteka AI ជំនួយការ",
  description: "ជំនួយការអប់រំ និងកិច្ចការរដ្ឋបាលដ៏ទូលំទូលាយសម្រាប់កម្ពុជា",
  icons: {
    icon: '/weteka-logo.png',
    shortcut: '/weteka-logo.png',
    apple: '/weteka-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="km">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
