export interface BlogPost {
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
}

export interface Category {
  name: string;
  count: number;
  slug: string;
}

export const categories: Category[] = [
  { name: "All categories", count: 335, slug: "" },
  { name: "Analytics", count: 26, slug: "analytics" },
  { name: "Android", count: 19, slug: "android" },
  { name: "General", count: 13, slug: "general" },
  { name: "iOS", count: 42, slug: "ios" },
  { name: "Money", count: 44, slug: "money" },
  { name: "Paywall Newsletter", count: 27, slug: "paywall-newsletter" },
  { name: "Podcast", count: 18, slug: "podcast" },
  { name: "Product-releases", count: 60, slug: "product-releases" },
  { name: "Trends-insights", count: 65, slug: "trends-insights" },
  { name: "Tutorial", count: 105, slug: "tutorial" }
];

export const posts: BlogPost[] = [
  {
    title: "Native vs hybrid apps: Key differences",
    slug: "native-vs-hybrid-apps",
    image: "/images/blog/native-vs-hybrid-apps.png",
    category: "General",
    date: "December 19, 2025",
    readTime: "8 min read",
    excerpt: "When teams choose between native and hybrid app development, they often frame the decision as a trade-off between speed and quality."
  },
  {
    title: "App pricing models: How to choose a price strategy for your app",
    slug: "app-pricing-models",
    image: "/images/blog/app-pricing-models.webp",
    category: "Money",
    date: "December 18, 2025",
    readTime: "10 min read",
    excerpt: "A comprehensive guide to choosing the right pricing strategy for your mobile app."
  },
  {
    title: "What does \"Restore purchase\" mean?",
    slug: "what-does-restore-purchase-mean",
    image: "/images/blog/what-does-restore-purchase-mean.png",
    category: "General",
    date: "December 5, 2025",
    readTime: "4 min read",
    excerpt: "Understanding the restore purchase feature in mobile apps."
  },
  {
    title: "Why 45% of users delete your app in 24 hours — and how onboarding can save you",
    slug: "why-users-delete-your-app-in-24-hours",
    image: "/images/blog/why-users-delete-your-app-in-24-hours.webp",
    category: "General",
    date: "December 1, 2025",
    readTime: "9 min read",
    excerpt: "Learn why users uninstall apps quickly and how to improve retention through better onboarding."
  },
  {
    title: "How to fix your app onboarding flow (Real A/B test data inside)",
    slug: "how-to-fix-your-onboarding-flow",
    image: "/images/blog/how-to-fix-your-onboarding-flow.webp",
    category: "General",
    date: "November 25, 2025",
    readTime: "13 min read",
    excerpt: "Real A/B test data showing how to optimize your app's onboarding flow."
  },
  {
    title: "How to build app onboarding flows that convert?",
    slug: "how-to-build-app-onboarding-flows-that-convert",
    image: "/images/blog/how-to-build-app-onboarding-flows-that-convert.webp",
    category: "General",
    date: "November 25, 2025",
    readTime: "11 min read",
    excerpt: "Best practices for building onboarding flows that convert users."
  },
  {
    title: "Mobile app analytics stack: UA, monetization & product metrics explained",
    slug: "app-analytics-stack-explained",
    image: "/images/blog/app-analytics-stack-explained.webp",
    category: "Analytics",
    date: "November 4, 2025",
    readTime: "4 min read",
    excerpt: "Understanding the key metrics for mobile app analytics."
  },
  {
    title: "Going from $10K to $100K MRR: 7 questions that unlock app growth",
    slug: "unlocking-growth-to-100k-mrr",
    image: "/images/blog/unlocking-growth-to-100k-mrr.webp",
    category: "General",
    date: "October 22, 2025",
    readTime: "9 min read",
    excerpt: "Key questions to answer when scaling your app from $10K to $100K MRR."
  },
  {
    title: "How Adapty keeps running when (almost) nothing else does",
    slug: "how-adapty-keeps-running",
    image: "/images/blog/how-adapty-keeps-running.webp",
    category: "General",
    date: "October 21, 2025",
    readTime: "4 min read",
    excerpt: "Behind the scenes of Adapty's infrastructure and reliability."
  },
  {
    title: "Paywall Newsletter #26: Smart paywalls from plant apps",
    slug: "paywall-newsletter-26",
    image: "/images/blog/paywall-newsletter-26.webp",
    category: "Paywall Newsletter",
    date: "October 1, 2025",
    readTime: "3 min read",
    excerpt: "Smart paywall strategies from plant care apps."
  },
  {
    title: "Turn tomorrow's revenue into today's growth: Introducing Adapty Finance",
    slug: "introducing-adapty-finance",
    image: "/images/blog/introducing-adapty-finance.jpg",
    category: "General",
    date: "September 18, 2025",
    readTime: "4 min read",
    excerpt: "Introducing Adapty Finance for app revenue growth."
  },
  {
    title: "Paywall Newsletter #25: Cloudy with a chance of conversions",
    slug: "paywall-newsletter-25",
    image: "/images/blog/paywall-newsletter-25.png",
    category: "Paywall Newsletter",
    date: "September 17, 2025",
    readTime: "3 min read",
    excerpt: "Weather app paywall strategies."
  },
  {
    title: "How to identify the North Star Metric for your product",
    slug: "north-star-metric",
    image: "/images/blog/north-star-metric.png",
    category: "Analytics",
    date: "2025",
    readTime: "13 min read",
    excerpt: "Guide to finding your product's North Star Metric."
  },
  {
    title: "Interstitial Ads in Mobile Apps: Best Practices and Examples",
    slug: "mobile-interstitial-ads",
    image: "/images/blog/mobile-interstitial-ads.png",
    category: "Analytics",
    date: "2025",
    readTime: "9 min read",
    excerpt: "Best practices for using interstitial ads in mobile apps."
  },
  {
    title: "Growth loops: How to use cohort analysis for subscriptions",
    slug: "growth-loops",
    image: "/images/blog/growth-loops.png",
    category: "Analytics",
    date: "2025",
    readTime: "15 min read",
    excerpt: "Using cohort analysis to optimize subscription growth."
  },
  {
    title: "How to add Android in-app purchases to your app in 10 minutes",
    slug: "add-android-in-app-purchases-to-your-app",
    image: "/images/blog/add-android-in-app-purchases-to-your-app.webp",
    category: "Android",
    date: "2025",
    readTime: "17 min read",
    excerpt: "Quick guide to implementing Android in-app purchases."
  },
  {
    title: "Android vs iOS app development: benefits and challenges",
    slug: "android-vs-ios-development",
    image: "/images/blog/android-vs-ios-development.png",
    category: "Android",
    date: "2025",
    readTime: "15 min read",
    excerpt: "Comparing Android and iOS development approaches."
  },
  {
    title: "How to analyze and optimize Apple Search Ads in 2025?",
    slug: "how-to-analyze-and-optimize-apple-ads",
    image: "/images/blog/how-to-analyze-and-optimize-apple-ads.webp",
    category: "iOS",
    date: "2025",
    readTime: "11 min read",
    excerpt: "Guide to optimizing Apple Search Ads campaigns."
  },
  {
    title: "Apple Search Ads guide for 2025: Best practices from beginner to expert",
    slug: "apple-ads-best-practices",
    image: "/images/blog/apple-ads-best-practices.webp",
    category: "iOS",
    date: "2025",
    readTime: "9 min read",
    excerpt: "Complete Apple Search Ads guide for all skill levels."
  },
  {
    title: "Is Apple's new EU in-app purchase fee system more complex than ever?",
    slug: "apple-eu-in-app-purchase-fee-system-2025",
    image: "/images/blog/apple-eu-in-app-purchase-fee-system-2025.webp",
    category: "iOS",
    date: "2025",
    readTime: "10 min read",
    excerpt: "Analysis of Apple's EU in-app purchase fee changes."
  },
  {
    title: "Top 9 ways to monetize your app in 2025 and beyond",
    slug: "mobile-app-monetization-strategies",
    image: "/images/blog/mobile-app-monetization-strategies.png",
    category: "Money",
    date: "2025",
    readTime: "21 min read",
    excerpt: "Comprehensive guide to app monetization strategies."
  },
  {
    title: "How do free apps make money?",
    slug: "how-do-free-apps-make-money",
    image: "/images/blog/how-do-free-apps-make-money.png",
    category: "Money",
    date: "2025",
    readTime: "15 min read",
    excerpt: "Understanding freemium and free app business models."
  },
  {
    title: "7 monetization models for mobile games",
    slug: "mobile-game-monetization",
    image: "/images/blog/mobile-game-monetization.png",
    category: "Money",
    date: "2025",
    readTime: "15 min read",
    excerpt: "Monetization strategies specifically for mobile games."
  }
];
