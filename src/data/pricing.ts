export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number | null;
    yearly: number | null;
    display?: string;
    note?: string;
  };
  features: string[];
  cta: { text: string; href: string };
  highlighted?: boolean;
  badge?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Free plan for apps with revenue up to $10K/month',
    price: {
      monthly: 0,
      yearly: 0,
      display: '$0',
      note: 'per month',
    },
    features: [
      'Up to $10K monthly revenue',
      'Basic analytics',
      'Paywall Builder',
      'Cross-platform SDK',
      'Email support',
    ],
    cta: { text: 'Start for free', href: '/signup' },
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    description: '1% of monthly revenue, minimum $99/month',
    price: {
      monthly: 99,
      yearly: 99,
      display: '1%',
      note: 'minimum $99/month',
    },
    features: [
      'Everything in Free',
      'Unlimited revenue',
      'A/B testing',
      'Advanced analytics',
      'Unlimited paywalls',
      'Priority support',
      'Webhooks & integrations',
    ],
    cta: { text: 'Start free trial', href: '/signup' },
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    id: 'pro-plus',
    name: 'Pro+',
    description: '1.2% of monthly revenue, minimum $499/month',
    price: {
      monthly: 499,
      yearly: 499,
      display: '1.2%',
      note: 'minimum $499/month',
    },
    features: [
      'Everything in Pro',
      'Revenue optimization',
      'Custom integrations',
      'Advanced support',
      'Dedicated CSM',
      'Custom onboarding',
      'Priority features',
    ],
    cta: { text: 'Start free trial', href: '/signup' },
    highlighted: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Custom pricing for enterprise needs',
    price: {
      monthly: null,
      yearly: null,
      display: 'Custom',
    },
    features: [
      'Everything in Pro+',
      'Unlimited revenue',
      'Dedicated support',
      'SLA guarantee',
      'Custom contracts',
      'Dedicated account manager',
      'Custom onboarding',
    ],
    cta: { text: 'Contact sales', href: '/contact' },
    highlighted: false,
  },
];

// Feature comparison table data
export type FeatureValue = boolean | string;

export interface PricingFeature {
  name: string;
  free: FeatureValue;
  pro: FeatureValue;
  proPlus: FeatureValue;
  enterprise: FeatureValue;
}

export interface PricingFeatureCategory {
  name: string;
  features: PricingFeature[];
}

export const pricingFeatureCategories: PricingFeatureCategory[] = [
  {
    name: 'Purchases Infrastructure',
    features: [
      { name: 'In-app purchase SDK', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Receipt validation', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Fallback paywalls', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Cross-platform subscriber sync', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'API', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Stripe integration', free: false, pro: true, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Integrations',
    features: [
      { name: 'Analytics integrations', free: 'Basic', pro: 'Full', proPlus: 'Full', enterprise: 'Full' },
      { name: 'Raw platform data forwarding', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Webhook', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'ETL integrations', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Paywall management',
    features: [
      { name: 'Remote paywall config', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'No-code paywall builder', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Paywall timer', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Trial toggle', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Paywall carousel widget', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Paywall video widget', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Plan tabs and view more', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Price management', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Paywall localization', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Table view for remote config', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Analytics',
    features: [
      { name: 'Basic subscription analytics', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Reporting timezone', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Overview analytics', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Regular email reports', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'CSV metric export', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Chart types', free: 'Basic', pro: 'Advanced', proPlus: 'Advanced', enterprise: 'Advanced' },
      { name: 'LTV chart', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Comparison in charts', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Advanced filters', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Grouping', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Advanced analytics', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Revenue and LTV prediction', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Advanced cohort analysis', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Monetization experiments',
    features: [
      { name: 'Paywall A/B testing', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Subscription price testing', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'Paywall targeting', free: false, pro: true, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'CRM',
    features: [
      { name: 'Customer list', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'User segments', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Subscriber event history', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Manual access level assigning', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Custom attribute management', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Security & Compliance',
    features: [
      { name: 'SOC 2 Type II compliance', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'GDPR compliance', free: true, pro: true, proPlus: true, enterprise: true },
      { name: 'Data residency (US or EU)', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Admin controls',
    features: [
      { name: 'Seats', free: '1', pro: '3', proPlus: '6', enterprise: 'Unlimited' },
      { name: 'Member roles', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'App level access', free: false, pro: false, proPlus: true, enterprise: true },
    ],
  },
  {
    name: 'Customer service',
    features: [
      { name: '24/7 support', free: 'Community', pro: 'Chat', proPlus: 'Priority chat', enterprise: 'Slack realtime' },
      { name: 'Migration assistance', free: false, pro: true, proPlus: true, enterprise: true },
      { name: 'Personal onboarding', free: false, pro: false, proPlus: true, enterprise: true },
      { name: 'App review consultation', free: false, pro: false, proPlus: false, enterprise: true },
      { name: 'Custom contract and SLA', free: false, pro: false, proPlus: false, enterprise: true },
      { name: 'Custom market reports', free: false, pro: false, proPlus: false, enterprise: true },
      { name: 'Custom pricing', free: false, pro: false, proPlus: false, enterprise: true },
    ],
  },
];

// Plan headers for comparison table
export const pricingPlans = [
  { key: 'free', name: 'Free', price: '$0', subtext: 'per month' },
  { key: 'pro', name: 'Pro', price: '1%', subtext: 'min $99/mo', highlighted: false },
  { key: 'proPlus', name: 'Pro+', price: '1.2%', subtext: 'min $499/mo', highlighted: true, badge: 'Most Popular' },
  { key: 'enterprise', name: 'Enterprise', price: 'Custom', subtext: 'contact sales' },
] as const;

// Total feature count
export const totalFeaturesCount = pricingFeatureCategories.reduce(
  (acc, category) => acc + category.features.length,
  0
);
