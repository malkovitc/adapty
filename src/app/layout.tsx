import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/LazyMotion";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Adapty - Revenue Management for In-App Purchases",
  description: "Save months on integrating subscriptions and double your app revenue with paywall management. Trusted by 15,000+ apps.",
  keywords: ["in-app purchases", "subscriptions", "mobile monetization", "paywall", "revenue management"],
  openGraph: {
    title: "Adapty - Revenue Management for In-App Purchases",
    description: "Save months on integrating subscriptions and double your app revenue with paywall management.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#0F172A]`}>
        <MotionProvider>
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
