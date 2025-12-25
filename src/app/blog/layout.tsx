import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Adapty",
  description: "Insights, tutorials, and best practices for mobile app monetization. Learn about in-app purchases, subscriptions, paywalls, and revenue optimization.",
  keywords: ["mobile app monetization", "in-app purchases", "subscriptions", "paywall optimization", "app analytics", "iOS development", "Android development"],
  openGraph: {
    title: "Blog - Adapty",
    description: "Insights, tutorials, and best practices for mobile app monetization. Learn about in-app purchases, subscriptions, paywalls, and revenue optimization.",
    url: "https://adapty.io/blog",
    siteName: "Adapty",
    images: [
      {
        url: "https://adapty.io/blog-og-image.png",
        width: 1200,
        height: 630,
        alt: "Adapty Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - Adapty",
    description: "Insights, tutorials, and best practices for mobile app monetization.",
    images: ["https://adapty.io/blog-twitter-image.png"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
