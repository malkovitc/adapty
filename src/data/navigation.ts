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
    name: 'Product',
    href: '#features',
    dropdown: [
      { name: 'Paywalls', href: 'https://adapty.io/paywalls/', description: 'Build and test paywalls without coding' },
      { name: 'A/B Testing', href: 'https://adapty.io/ab-testing/', description: 'Optimize pricing and offers' },
      { name: 'Analytics', href: 'https://adapty.io/analytics/', description: 'Subscription analytics and insights' },
      { name: 'Integrations', href: '#integrations', description: 'Connect with your stack' },
    ]
  },
  {
    name: 'Cases',
    href: '#testimonials',
    dropdown: [
      { name: 'Case Studies', href: 'https://adapty.io/case-studies/', description: 'Success stories from our customers' },
      { name: 'Testimonials', href: '#testimonials', description: 'What customers say about us' },
    ]
  },
  {
    name: 'Resources',
    href: '#',
    dropdown: [
      { name: 'Blog', href: '/blog', description: 'Articles about app monetization' },
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
  { name: 'Blog', href: '/blog' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'web2app', href: 'https://adapty.io/web2app/', highlight: true },
];
