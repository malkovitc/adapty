export interface CaseStudy {
  id: string;
  company: string;
  category: string;
  metric: string;
  description: string;
  logo: string;
  href: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'productivity-app',
    company: 'Productivity App',
    category: 'Productivity',
    metric: '+50% in total revenue',
    description: "How pricing tests unlocked app's potential",
    logo: '/images/case-studies/app-icon-productivity-app@4x.webp',
    href: 'https://adapty.io/case-studies/productivity-app-and-autopilot/',
  },
  {
    id: 'text-on-pic',
    company: 'Text on Pic',
    category: 'Photo & Video',
    metric: 'Over 30% MRR growth',
    description: 'How to boost revenue with the right experiments',
    logo: '/images/case-studies/app-icon-text-on-pic@3x.webp',
    href: 'https://adapty.io/case-studies/photo-editing-app-and-autopilot/',
  },
  {
    id: 'trip-planning',
    company: 'Trip Planning',
    category: 'Travel',
    metric: '+102% ARPU growth',
    description: 'New onboarding and pricing strategy doubled revenue per user',
    logo: '/images/case-studies/logo-secret-app@3x.webp',
    href: 'https://adapty.io/case-studies/travel-app/',
  },
  {
    id: 'going-merry',
    company: 'Going Merry',
    category: 'App publisher',
    metric: '5x MRR growth',
    description: 'How to scale subscription revenue with Paywall Builder',
    logo: '/images/case-studies/going-merry-app-logo.webp',
    href: 'https://adapty.io/case-studies/going-merry/',
  },
  {
    id: 'shmoody',
    company: 'Shmoody',
    category: 'Mental health',
    metric: 'ARR scaled from $0 to $2M',
    description: 'How to grow from a free app to $2M ARR with Adapty',
    logo: '/images/case-studies/app-logo-shmoody.webp',
    href: 'https://adapty.io/case-studies/shmoody/',
  },
  {
    id: 'lively',
    company: 'Lively',
    category: 'Health & Fitness',
    metric: 'Refund rate dropped by 83%',
    description: 'Saved 82% of potentially lost revenue',
    logo: '/images/case-studies/app-logo-lively@2x.png',
    href: 'https://adapty.io/case-studies/lively/',
  },
  {
    id: 'glam-ai',
    company: 'Glam AI',
    category: 'Makeup & Beauty',
    metric: 'ROAS from Adapty - 108%',
    description: 'How to scale to $1.2M ARR in 3 months',
    logo: '/images/case-studies/app-logo-glam-ai.webp',
    href: 'https://adapty.io/case-studies/glam-ai/',
  },
  {
    id: 'pepapp',
    company: 'Pepapp',
    category: 'Health & Fitness',
    metric: '400% ROI on Adapty',
    description: 'How to make Adapty free with Refund Saver',
    logo: '/images/case-studies/Pepapp-icon@2x.webp',
    href: 'https://adapty.io/case-studies/pepapp/',
  },
  {
    id: 'fotorama',
    company: 'Fotorama',
    category: 'Photo & Video',
    metric: 'Refund rate dropped 40%',
    description: 'How to decrease the refund rate with Adapty',
    logo: '/images/case-studies/app-icon-fotorama-original.webp',
    href: 'https://adapty.io/case-studies/fotorama/',
  },
];

// Export case studies organized by category
export const caseStudiesByCategory = caseStudies.reduce((acc, study) => {
  const category = study.category;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(study);
  return acc;
}, {} as Record<string, CaseStudy[]>);
