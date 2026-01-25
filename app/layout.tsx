import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./_components/ui/Navbar";
import Footer from "./_components/ui/Footer";
import GoogleAnalytics from "./_components/GoogleAnalytics";
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GetCalculation - Free Online Math Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GetCalculation - Free Online Math Calculators",
    description: "Free online math calculators for geometry, algebra, trigonometry, and more. Easy to use and embed on your own website.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <GoogleAnalytics />
        <Navbar />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
