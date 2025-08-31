import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from '@/lib/dark-mode-context';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OpsCompanion - AI Observability Platform",
  description: "Advanced AI-powered observability platform for DevOps automation and monitoring",
  keywords: ["AI observability", "DevOps", "monitoring", "automation", "platform"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <DarkModeProvider forceMode="dark">
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
