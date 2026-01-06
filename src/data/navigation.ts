import {
  LayoutGrid,
  Users,
  Code,
  Package,
  RefreshCw,
  ShieldAlert,
  DollarSign,
  Palette,
  UserPlus,
  Sparkles,
  FlaskConical,
  Bot,
  Target,
  Languages,
  Settings,
  TrendingUp,
  LineChart,
  Brain,
  ChartLine,
  Apple,
  type LucideIcon,
} from 'lucide-react';

// Simple dropdown item (for Cases, Resources, Docs)
export interface NavigationDropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
}

// Product mega-menu structure
export interface ProductCategory {
  title: string;
  items: {
    name: string;
    href: string;
    icon?: LucideIcon;
  }[];
}

export interface ProductTab {
  name: string;
  href: string;
  categories?: ProductCategory[];
  topLinks?: {
    name: string;
    href: string;
  }[];
}

export interface NavigationItem {
  name: string;
  href: string;
  dropdown?: NavigationDropdownItem[];
  productTabs?: ProductTab[];
  highlight?: boolean;
  highlightColor?: 'orange' | 'teal';
}

// Product mega-menu tabs
export const productTabs: ProductTab[] = [
  {
    name: 'Product',
    href: '#',
    topLinks: [
      { name: 'Why Adapty?', href: 'https://adapty.io/why-adapty/' },
      { name: 'Product changelog', href: 'https://adapty.io/changelog/' },
      { name: 'System status', href: 'https://status.adapty.io/' },
    ],
    categories: [
      {
        title: 'TECH',
        items: [
          { name: 'Subscriptions SDK', href: 'https://adapty.io/subscriptions-sdk/', icon: Package },
          { name: 'Subscribers sync', href: 'https://adapty.io/subscribers-sync/', icon: RefreshCw },
          { name: 'Fallback paywalls', href: 'https://adapty.io/fallback-paywalls/', icon: ShieldAlert },
          { name: 'Refund saver', href: 'https://adapty.io/refund-saver/', icon: DollarSign },
        ],
      },
      {
        title: 'PAYWALLS',
        items: [
          { name: 'Paywall builder', href: '/paywall-builder', icon: Palette },
          { name: 'Onboarding builder', href: '/onboarding-builder', icon: UserPlus },
          { name: 'AI generator', href: 'https://adapty.io/ai-generator/', icon: Sparkles },
          { name: 'A/B testing', href: '/paywall-ab-testing', icon: FlaskConical },
          { name: 'Autopilot', href: 'https://adapty.io/autopilot/', icon: Bot },
          { name: 'Targeting', href: 'https://adapty.io/targeting/', icon: Target },
          { name: 'Localizations', href: 'https://adapty.io/localizations/', icon: Languages },
          { name: 'Remote config', href: 'https://adapty.io/remote-config/', icon: Settings },
        ],
      },
      {
        title: 'ANALYTICS',
        items: [
          { name: 'Revenue analytics', href: 'https://adapty.io/analytics/', icon: TrendingUp },
          { name: 'LTV analytics', href: 'https://adapty.io/ltv-analytics/', icon: LineChart },
          { name: 'AI LTV and revenue predictions', href: 'https://adapty.io/ai-predictions/', icon: Brain },
          { name: 'LTV prediction model', href: 'https://adapty.io/ltv-prediction/', icon: ChartLine },
          { name: 'Apple ads manager', href: 'https://adapty.io/apple-ads/', icon: Apple },
        ],
      },
    ],
  },
  {
    name: 'Solution',
    href: '#',
    categories: [
      {
        title: 'BY ROLE',
        items: [
          { name: 'For Marketers', href: '/for-marketers', icon: Target },
          { name: 'For Developers', href: '/for-developers', icon: Code },
          { name: 'For App Owners', href: '/for-app-owners', icon: Users },
        ],
      },
      {
        title: 'BY INDUSTRY',
        items: [
          { name: 'Health & Fitness', href: 'https://adapty.io/health-fitness/', icon: Users },
          { name: 'Productivity', href: 'https://adapty.io/productivity/', icon: LayoutGrid },
          { name: 'Education', href: 'https://adapty.io/education/', icon: Users },
        ],
      },
    ],
  },
  {
    name: 'Adapty SDK',
    href: 'https://docs.adapty.io/docs/sdk',
    categories: [
      {
        title: 'PLATFORMS',
        items: [
          { name: 'iOS SDK', href: 'https://docs.adapty.io/docs/ios-sdk', icon: Apple },
          { name: 'Android SDK', href: 'https://docs.adapty.io/docs/android-sdk', icon: Package },
          { name: 'React Native', href: 'https://docs.adapty.io/docs/react-native', icon: Code },
          { name: 'Flutter', href: 'https://docs.adapty.io/docs/flutter', icon: Code },
          { name: 'Unity', href: 'https://docs.adapty.io/docs/unity', icon: Code },
        ],
      },
    ],
  },
  {
    name: 'Integrations',
    href: 'https://adapty.io/integrations/',
    categories: [
      {
        title: 'ANALYTICS',
        items: [
          { name: 'Amplitude', href: 'https://adapty.io/integrations/amplitude/', icon: LineChart },
          { name: 'Mixpanel', href: 'https://adapty.io/integrations/mixpanel/', icon: LineChart },
          { name: 'AppMetrica', href: 'https://adapty.io/integrations/appmetrica/', icon: LineChart },
        ],
      },
      {
        title: 'ATTRIBUTION',
        items: [
          { name: 'AppsFlyer', href: 'https://adapty.io/integrations/appsflyer/', icon: Target },
          { name: 'Adjust', href: 'https://adapty.io/integrations/adjust/', icon: Target },
          { name: 'Branch', href: 'https://adapty.io/integrations/branch/', icon: Target },
        ],
      },
    ],
  },
];

export const navigation: NavigationItem[] = [
  {
    name: 'Product',
    href: '#',
    productTabs: productTabs,
  },
  {
    name: 'Cases',
    href: '#',
    dropdown: [
      { name: 'Case Studies', href: 'https://adapty.io/case-studies/', description: 'Success stories from our customers' },
      { name: 'Customer Reviews', href: 'https://adapty.io/reviews/', description: 'What customers say about us' },
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
      { name: 'Ebooks', href: 'https://adapty.io/ebooks/', description: 'Free resources and playbooks' },
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
  { name: 'Pricing', href: '/pricing' },
  { name: 'web2app', href: 'https://web2app.io/', highlight: true, highlightColor: 'orange' },
];
