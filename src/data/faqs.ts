export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

// General FAQs (displayed on homepage)
export const faqs: FAQ[] = [
  {
    id: 'integration-time',
    question: 'How long does integration take?',
    answer: "Most apps integrate Adapty SDK in under an hour. Our comprehensive documentation and quick-start guides make it easy to get up and running. You can have your first paywall live in production the same day. Plus, our support team is always available to help if you need it.",
    category: 'getting-started',
  },
  {
    id: 'platforms',
    question: 'What platforms do you support?',
    answer: "iOS, Android, React Native, Flutter, Unity, and Web. Our SDK provides a consistent API across all platforms, making it easy to implement subscriptions once and deploy everywhere. We support both native and cross-platform frameworks.",
    category: 'getting-started',
  },
  {
    id: 'pricing-overview',
    question: 'How does pricing work?',
    answer: "We offer a free tier for indie developers. Paid plans start at $99/month and scale based on your monthly tracked revenue. All features are included in every plan - no feature gates. Volume discounts are available for high-growth apps.",
    category: 'pricing',
  },
  {
    id: 'migration',
    question: 'Can I migrate from RevenueCat?',
    answer: "Yes, we provide a seamless migration path from RevenueCat and other platforms. Our team will help you migrate your existing subscribers, historical data, and configurations. Most migrations complete in less than a week with zero downtime.",
    category: 'migration',
  },
  {
    id: 'analytics',
    question: 'Do you support subscription analytics?',
    answer: "Yes, we track 50+ metrics including MRR, ARR, churn, LTV, conversion rates, trial performance, and more. Our real-time dashboards give you instant insights into your subscription business. Export data to your own analytics tools via our API.",
    category: 'features',
  },
  {
    id: 'free-trial',
    question: 'Is there a free trial?',
    answer: "Yes, all features are available free up to $10K monthly revenue. This means you can use Adapty completely free while you're growing. No credit card required to get started. When you exceed the free tier, you'll be notified before any charges.",
    category: 'pricing',
  },
  {
    id: 'payment-processors',
    question: 'What payment processors do you support?',
    answer: "App Store, Google Play, Stripe, and more. We handle receipt validation, server-side verification, and subscription status updates automatically. Support for additional payment processors like Paddle and PayPal is coming soon.",
    category: 'features',
  },
  {
    id: 'support',
    question: 'Do you offer technical support?',
    answer: "Yes, all plans include email support with response times under 24 hours. Premium plans include dedicated Slack channels and priority support. We also have extensive documentation, video tutorials, and an active community forum.",
    category: 'support',
  },
];

// Pricing-specific FAQs (displayed on pricing page)
export const pricingFaqs: FAQ[] = [
  {
    id: 'what-is-mtr',
    question: 'What is MTR?',
    answer: 'MTR (Monthly Tracked Revenue) is the total revenue from in-app purchases and subscriptions that Adapty tracks for your app each month. This includes new purchases, renewals, and any other subscription-related revenue processed through our SDK.',
    category: 'pricing',
  },
  {
    id: 'mtr-over-limit',
    question: 'What if my MTR goes over $10K on a Free plan?',
    answer: "If your MTR exceeds $10K while on the Free plan, you'll need to upgrade to a paid plan (Pro or Pro+) to continue using Adapty. We'll notify you as you approach this limit so you have time to choose the right plan for your needs.",
    category: 'pricing',
  },
  {
    id: 'replace-payment',
    question: 'Do you replace Apple or Google payment?',
    answer: "No, Adapty doesn't replace Apple App Store or Google Play payment systems. We work alongside them to provide analytics, paywall management, A/B testing, and subscription infrastructure. All payments still go through the official app store payment systems.",
    category: 'pricing',
  },
  {
    id: 'billing-issue',
    question: 'Ooops, I have a billing issue with my card, will you cancel our SDK?',
    answer: "Don't worry! We understand billing issues happen. We'll reach out to help resolve any payment problems before taking any action. Your SDK will continue working while we sort things out together. We're here to help, not to cause disruption to your app.",
    category: 'billing',
  },
];

// Helper to get FAQs by category
export const getFaqsByCategory = (category: string): FAQ[] => {
  return faqs.filter((faq) => faq.category === category);
};

// All FAQs combined
export const allFaqs = [...faqs, ...pricingFaqs];

// FAQ categories
export const faqCategories = [
  'getting-started',
  'pricing',
  'features',
  'migration',
  'support',
  'billing',
] as const;

export type FAQCategory = typeof faqCategories[number];
