export type IntegrationCategory = 'analytics' | 'attribution' | 'marketing' | 'storage' | 'payment' | 'other';

export interface Integration {
  id: string;
  name: string;
  logo: string;
  href: string;
  category: IntegrationCategory;
}

export const integrations: Integration[] = [
  // Payment
  {
    id: 'stripe',
    name: 'Stripe',
    logo: '/logos/icon-stripe-logo.svg',
    href: 'https://adapty.io/integrations/stripe/',
    category: 'payment',
  },

  // Attribution
  {
    id: 'apple-ads',
    name: 'Apple Ads',
    logo: '/logos/icon-apple-ads-text.svg',
    href: 'https://adapty.io/integrations/apple-search-ads/',
    category: 'attribution',
  },
  {
    id: 'branch',
    name: 'Branch',
    logo: '/logos/logo-branch.svg',
    href: 'https://adapty.io/integrations/branch/',
    category: 'attribution',
  },
  {
    id: 'airbridge',
    name: 'Airbridge',
    logo: '/logos/logo-airbridge.svg',
    href: 'https://adapty.io/integrations/airbridge/',
    category: 'attribution',
  },
  {
    id: 'appsflyer',
    name: 'AppsFlyer',
    logo: '/logos/logo-appsflyer.svg',
    href: 'https://adapty.io/integrations/appsflyer/',
    category: 'attribution',
  },
  {
    id: 'adjust',
    name: 'Adjust',
    logo: '/logos/logo-adjust.svg',
    href: 'https://adapty.io/integrations/adjust/',
    category: 'attribution',
  },

  // Analytics
  {
    id: 'posthog',
    name: 'PostHog',
    logo: '/logos/posthog-logo-colorfull.svg',
    href: 'https://adapty.io/integrations/posthog/',
    category: 'analytics',
  },
  {
    id: 'firebase',
    name: 'Firebase',
    logo: '/logos/logo-firebase-and-ga.svg',
    href: 'https://adapty.io/integrations/google-analytics-firebase/',
    category: 'analytics',
  },
  {
    id: 'mixpanel',
    name: 'Mixpanel',
    logo: '/logos/logo-mixpanel.svg',
    href: 'https://adapty.io/integrations/mixpanel/',
    category: 'analytics',
  },

  // Marketing
  {
    id: 'braze',
    name: 'Braze',
    logo: '/logos/logo-braze.svg',
    href: 'https://adapty.io/integrations/braze/',
    category: 'marketing',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    logo: '/logos/logo-facebook-blue-text.svg',
    href: 'https://adapty.io/integrations/facebook-ads/',
    category: 'marketing',
  },

  // Storage
  {
    id: 'amazon-s3',
    name: 'Amazon S3',
    logo: '/logos/logo-amazon-s3.svg',
    href: 'https://adapty.io/integrations/amazon-s3/',
    category: 'storage',
  },
];

// Helper to get integrations by category
export const getIntegrationsByCategory = (category: IntegrationCategory): Integration[] => {
  return integrations.filter((integration) => integration.category === category);
};

// Organized by category for display
export const integrationsByCategory: Record<IntegrationCategory, Integration[]> = {
  analytics: getIntegrationsByCategory('analytics'),
  attribution: getIntegrationsByCategory('attribution'),
  marketing: getIntegrationsByCategory('marketing'),
  storage: getIntegrationsByCategory('storage'),
  payment: getIntegrationsByCategory('payment'),
  other: getIntegrationsByCategory('other'),
};

// Total count (12 currently shown on homepage, but can be extended)
export const totalIntegrationsCount = integrations.length;
