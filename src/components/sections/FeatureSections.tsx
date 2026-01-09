'use client';

import { StackingCards, StackingCardData } from '@/components/ui/stacking-cards';

const featureCards: StackingCardData[] = [
  {
    id: 'paywall',
    title: 'Increase subscription revenue without app releases',
    description: 'Manage, target, localize and personalize paywalls without leaving your browser.',
    image: '/images/features/paywall-ab-testing@2x.webp',
    link: { text: 'Increase app revenue', href: '/paywall-builder' },
    imageBgColor: 'bg-emerald-700',
    testimonial: {
      companyLogo: '/logos/smartist.png',
      companyName: 'Smartist',
      quote: "Whether it's A/B testing paywalls, predicting LTV, or analyzing subscription metrics, Adapty is the ultimate toolkit for app success.",
      author: {
        name: 'Ilgar Tali',
        role: 'Founder & Chief Vision Officer',
      },
    },
  },
  {
    id: 'refund',
    title: 'Cut refund rate by 40%',
    description: 'Stop losing revenue on refunds – Adapty automatically shares user activity data with Apple for refund requests and reduces it.',
    image: '/images/features/refund-rate@2x-1024x768.webp',
    link: { text: 'Set up Refund Saver', href: '/refund-saver' },
    imageBgColor: 'bg-emerald-50',
    testimonial: {
      companyLogo: '/logos/fotorama.webp',
      companyName: 'Fotorama',
      companyDescription: 'Photo and video',
      quote: "I never thought that doing something about refunds could make such a difference. We just flipped the switch, set it up, and suddenly, it felt like we stopped letting money slip away.",
      author: {
        name: 'Berk Cagataу Albayrak',
        role: 'Sr. Product Manager',
      },
    },
  },
  {
    id: 'analytics',
    title: 'Know your subscription numbers at any moment',
    description: 'Measure your in-app economy from trials to refunds with a ready-to-go, real-time subscription BI.',
    image: '/images/features/app-monetization-strategies@2x.webp',
    link: { text: 'See subscription BI', href: '/revenue-analytics' },
    imageBgColor: 'bg-violet-100',
    testimonial: {
      companyLogo: '/logos/moonly.svg',
      companyName: 'Moonly',
      companyDescription: 'Moon calendar app',
      quote: "Adapty's analytics provides invaluable insights into our app's performance. With detailed real-time metrics like revenue, ARPU, and churn rate, we make informed decisions to optimize our monetization strategy.",
      author: {
        name: 'Nikolay Chebotarev',
        role: 'Head of UA at Moonly.app',
      },
    },
  },
];

export default function FeatureSections() {
  return (
    <section className="py-12 lg:py-20 bg-[#FAFAFA]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <StackingCards cards={featureCards} />
      </div>
    </section>
  );
}
