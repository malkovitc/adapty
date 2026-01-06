export interface NavigationDropdownItem {
  name: string;
  href: string;
  description?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  dropdown?: NavigationDropdownItem[];
  highlight?: boolean;
}

export const navigation: NavigationItem[] = [
  {
    name: 'Products',
    href: '#features',
    dropdown: [
      { name: 'Paywall Builder', href: '/paywall-builder', description: 'Create stunning paywalls without code' },
      { name: 'A/B Testing', href: '/paywall-ab-testing', description: 'Optimize pricing and offers' },
      { name: 'Onboarding Builder', href: '/onboarding-builder', description: 'Build converting user flows' },
      { name: 'Analytics', href: 'https://adapty.io/analytics/', description: 'Subscription analytics and insights' },
    ]
  },
  {
    name: 'Solutions',
    href: '#',
    dropdown: [
      { name: 'For Marketers', href: '/for-marketers', description: 'Maximize conversions with targeted paywalls' },
      { name: 'For Developers', href: '/for-developers', description: 'Integrate subscriptions in 30 minutes' },
      { name: 'For App Owners', href: '/for-app-owners', description: 'Accelerate your subscription revenue' },
    ]
  },
  {
    name: 'Resources',
    href: '#',
    dropdown: [
      { name: 'Blog', href: '/blog', description: 'Articles about app monetization' },
      { name: 'Case Studies', href: 'https://adapty.io/case-studies/', description: 'Success stories from our customers' },
      { name: 'Guides', href: 'https://adapty.io/guides/', description: 'In-depth tutorials' },
      { name: 'Webinars', href: 'https://adapty.io/webinars/', description: 'Live and on-demand sessions' },
      { name: 'Podcast', href: 'https://adapty.io/podcast/', description: 'Sub Club podcast' },
    ]
  },
  {
    name: 'Docs',
    href: 'https://docs.adapty.io/',
    dropdown: [
      { name: 'Documentation', href: 'https://docs.adapty.io/', description: 'Technical documentation' },
      { name: 'SDK Reference', href: 'https://docs.adapty.io/docs/sdk', description: 'SDK integration guides' },
      { name: 'API Reference', href: 'https://docs.adapty.io/api', description: 'REST API documentation' },
    ]
  },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Schedule Demo', href: '/demo', highlight: true },
];
