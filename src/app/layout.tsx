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
  authors: [{ name: "Adapty Tech Inc." }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Adapty - Revenue Management for In-App Purchases",
    description: "Save months on integrating subscriptions and double your app revenue with paywall management. Trusted by 15,000+ apps.",
    url: "https://adapty.io",
    siteName: "Adapty",
    images: [
      {
        url: "https://adapty.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adapty - Revenue Management Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adapty - Revenue Management for In-App Purchases",
    description: "Save months on integrating subscriptions and double your app revenue with paywall management. Trusted by 15,000+ apps.",
    images: ["https://adapty.io/twitter-image.png"],
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Adapty",
    "description": "Revenue management platform for in-app purchases",
    "url": "https://adapty.io",
    "logo": "https://adapty.io/logo.png",
    "sameAs": [
      "https://twitter.com/adapty",
      "https://www.linkedin.com/company/adapty",
      "https://github.com/adaptyteam"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "url": "https://adapty.io/contact"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#0F172A]`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-neutral-900 focus:rounded-lg focus:shadow-lg">
          Skip to main content
        </a>
        <MotionProvider>
          <div id="main-content">
            {children}
          </div>
        </MotionProvider>
        <div id="modal-root" />
      </body>
    </html>
  );
}
