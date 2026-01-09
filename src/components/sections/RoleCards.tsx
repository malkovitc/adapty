'use client';

import { Gallery6, type GalleryItem } from '@/components/ui/gallery6';

const roles: GalleryItem[] = [
  {
    id: 'developers',
    title: 'For developers',
    summary: 'Subscriptions SDK, Refund Saver, Remote config, Fallback paywalls',
    url: '/for-developers/',
    image: '/images/role-cards/img-card-cover-sdk-install@2x.webp',
  },
  {
    id: 'app-owners',
    title: 'For app owners',
    summary: 'Revenue analytics, LTV analytics, AI LTV and revenue predictions',
    url: '/for-app-owners/',
    image: '/images/role-cards/img-card-cover-charts@2x.webp',
  },
  {
    id: 'marketers',
    title: 'For marketers',
    summary: 'A/B testing, No-code Builder, Localizations, Targeting',
    url: '/for-marketers/',
    image: '/images/role-cards/img-card-cover-paywalls@2x.webp',
  },
];

export default function RoleCards() {
  return (
    <Gallery6
      heading="The complete mobile revenue infrastructure"
      items={roles}
    />
  );
}
