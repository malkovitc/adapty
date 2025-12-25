import type { Metadata } from "next";
import { posts } from "@/data/blog";

interface BlogPostLayoutProps {
  params: Promise<{
    slug: string;
  }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found - Adapty",
    };
  }

  const postUrl = `https://adapty.io/blog/${post.slug}`;
  const ogImage = post.image || "https://adapty.io/blog-og-image.png";

  return {
    title: `${post.title} - Adapty Blog`,
    description: post.excerpt,
    keywords: [post.category.toLowerCase(), "mobile app", "monetization", "in-app purchases"],
    authors: [{ name: "Adapty Tech Inc." }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Adapty",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: ["Adapty Tech Inc."],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return <>{children}</>;
}
