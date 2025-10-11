import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./_components/ui/Navbar";
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
  metadataBase: new URL(process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://getcalculation.com'),
  title: {
    default: "GetCalculation - Free Online Math Calculators",
    template: "%s | GetCalculation"
  },
  description: "Free online math calculators for geometry, algebra, trigonometry, and more. Easy to use and embed on your own website.",
  keywords: ["math calculator", "online calculator", "geometry calculator", "algebra calculator", "educational tools"],
  authors: [{ name: "GetCalculation" }],
  creator: "GetCalculation",
  publisher: "GetCalculation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/logo-icon.png", type: "image/png" },
    ],
    apple: "/logo-icon.png",
    shortcut: "/logo-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "GetCalculation - Free Online Math Calculators",
    description: "Free online math calculators for geometry, algebra, trigonometry, and more. Easy to use and embed on your own website.",
    siteName: "GetCalculation",
  },
  twitter: {
    card: "summary_large_image",
    title: "GetCalculation - Free Online Math Calculators",
    description: "Free online math calculators for geometry, algebra, trigonometry, and more. Easy to use and embed on your own website.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
