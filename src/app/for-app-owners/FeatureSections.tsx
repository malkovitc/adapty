'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

interface FeatureSection {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition: 'left' | 'right';
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    photo: string;
    logo: string;
  };
}

const features: FeatureSection[] = [
  {
    title: 'Increase your marketing speed',
    description: "Iterate over paywalls and subscription pricing fast. Get the most out of your app with Paywall A/B testing, Paywall Targeting, and more. You can't avoid mistakes, but with Adapty you can make mistakes faster and move forward to maximize your profit.",
    image: '/images/for-app-owners/img-speed-marketing@2x.webp',
    imageAlt: 'Marketing Speed Dashboard',
    imagePosition: 'right',
  },
  {
    title: 'Save your dev team efforts',
    description: 'Focus your development team on building products and features, not infrastructure and operation. Adapty helps you delegate your revenue ops and forget about it.',
    image: '/images/for-app-owners/img-save-dev-forts@2x.webp',
    imageAlt: 'Developer Tools',
    imagePosition: 'left',
  },
  {
    title: 'Clear and transparent subscription reporting',
    description: 'Track both high- and low-level revenue metrics in the Adapty dashboard easily right from your mobile phone. Analyze revenue growth, retention, and cohorts. Segment by traffic sources and control LTV. Receive daily, weekly, and monthly email reports.',
    image: '/images/for-app-owners/img-clear-transparent-subscription@2x.webp',
    imageAlt: 'Subscription Reporting Dashboard',
    imagePosition: 'right',
  },
  {
    title: 'Predict revenue for the next 4 quarters',
    description: "With Adapty's machine learning technology, we accurately predict your app revenue and LTV for the next 4 quarters. Never run out of cash again and plan your earnings well ahead.",
    image: '/images/for-app-owners/img-predict-revenue-4quartes@2x.webp',
    imageAlt: 'Revenue Prediction Charts',
    imagePosition: 'left',
    testimonial: {
      quote: "Adapty's analytics platform has become an invaluable asset for optimizing our app's monetization strategy. The detailed subscription metrics and LTV prediction tools provide us with real insights to drive our revenue growth.",
      author: 'Burak Berber',
      role: 'Marketing Team Lead at Appnation',
      photo: '/images/for-app-owners/burak.png',
      logo: '/images/for-app-owners/appnation-black.svg',
    },
  },
  {
    title: 'Access rights',
    description: 'Control user permission in one or many of your apps. Keep your app secure from data leaks and 3rd party access.',
    image: '/images/for-app-owners/img-access-rights@2x.png',
    imageAlt: 'Access Rights Management',
    imagePosition: 'right',
  },
];

export default function FeatureSections() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div className="space-y-24 md:space-y-32">
          {features.map((feature) => (
            <FeatureBlock key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({ feature }: { feature: FeatureSection }) {
  const isImageLeft = feature.imagePosition === 'left';

  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isImageLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={isImageLeft ? 'lg:order-1' : 'lg:order-2'}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100">
          <Image
            src={getAssetPath(feature.image)}
            alt={feature.imageAlt}
            width={600}
            height={400}
            className="w-full h-auto"
            unoptimized
          />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={isImageLeft ? 'lg:order-2' : 'lg:order-1'}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
          {feature.title}
        </h2>
        <p className="text-lg text-slate-600 leading-relaxed">
          {feature.description}
        </p>

        {/* Testimonial Block (for LTV prediction section) */}
        {feature.testimonial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100"
          >
            <div className="flex items-start gap-4 mb-4">
              <Image
                src={getAssetPath(feature.testimonial.logo)}
                alt="Appnation"
                width={120}
                height={32}
                className="h-6 w-auto object-contain"
                unoptimized
              />
            </div>
            <blockquote className="text-slate-700 italic mb-4">
              &ldquo;{feature.testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-3">
              <Image
                src={getAssetPath(feature.testimonial.photo)}
                alt={feature.testimonial.author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
                unoptimized
              />
              <div>
                <p className="font-semibold text-slate-900">{feature.testimonial.author}</p>
                <p className="text-sm text-slate-500">{feature.testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
