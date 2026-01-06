'use client';

import { motion } from 'framer-motion';
import { ArrowRight, FlaskConical, Palette, Target, TrendingUp, BarChart3, Send, Search, Globe, LucideIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

interface FeatureSection {
  icon: LucideIcon;
  title: string;
  description: string;
  cta?: {
    text: string;
    href: string;
  };
  image: string;
  reverse: boolean;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
}

const featureSections: FeatureSection[] = [
  {
    icon: FlaskConical,
    title: 'Easy paywall testing without the dev team',
    description: 'Run A/B tests on pricing, designs, and offers without writing code or waiting for app releases. Get statistically significant results to make data-driven decisions.',
    cta: {
      text: 'Paywall A/B testing',
      href: 'https://adapty.io/ab-test/',
    },
    image: '/images/features/paywall-ab-testing@2x.webp',
    reverse: false,
  },
  {
    icon: Palette,
    title: 'Build and deploy high-quality paywalls with no coding',
    description: 'Use the drag-and-drop Paywall Builder to create beautiful, native paywalls for iOS, Android, Flutter, and React Native. Deploy changes instantly without app updates.',
    cta: {
      text: 'Paywall Builder',
      href: 'https://adapty.io/paywall-builder/',
    },
    image: '/images/features/no-code-paywall-builder@2x.webp',
    reverse: true,
  },
  {
    icon: Target,
    title: 'Target paywalls to user segments',
    description: 'Show different paywalls to different users based on behavior, geography, device, or custom attributes. Personalize the experience to maximize conversions.',
    cta: {
      text: 'Targeting',
      href: 'https://adapty.io/targeting/',
    },
    image: '/images/role-cards/img-card-cover-paywalls@2x.webp',
    reverse: false,
  },
  {
    icon: TrendingUp,
    title: 'Stop the guesswork, get accurate LTV prediction',
    description: 'Predict customer lifetime value early in the user journey. Make informed decisions about acquisition spending and optimize your monetization strategy.',
    image: '/images/features/app-monetization-strategies@2x.webp',
    reverse: true,
    testimonial: {
      quote: '"The LTV prediction feature helped us understand user value much earlier in the funnel, allowing us to optimize our acquisition strategy significantly."',
      author: 'Sergey Lagutyonok',
      role: 'Product Manager',
      company: 'Impala Studios',
    },
  },
  {
    icon: BarChart3,
    title: 'Revenue analytics you can trust',
    description: 'Get real-time subscription analytics with 99% accuracy with store data. Track revenue, MRR, ARPU, churn, and more with a ready-to-use BI dashboard.',
    image: '/images/role-cards/img-card-cover-charts@2x.webp',
    reverse: false,
  },
  {
    icon: Send,
    title: 'Send revenue events to MMP and analytics',
    description: 'Forward subscription events to your favorite analytics and attribution tools. Connect with Amplitude, Mixpanel, AppsFlyer, Adjust, and more without writing backend code.',
    image: '/images/features/app-monetization-strategies@2x.webp',
    reverse: true,
  },
  {
    icon: Search,
    title: 'Built-in Apple Search Ads analytics',
    description: 'Track the performance of your Apple Search Ads campaigns with built-in attribution. Understand which keywords and campaigns drive the most valuable subscribers.',
    image: '/images/features/paywall-ab-testing@2x.webp',
    reverse: false,
  },
  {
    icon: Globe,
    title: 'Convenient paywall localization',
    description: 'Easily localize your paywalls for different markets. Manage translations directly in the dashboard and deploy localized versions without code changes.',
    cta: {
      text: 'Localize paywalls',
      href: 'https://adapty.io/paywall-builder/',
    },
    image: '/images/features/no-code-paywall-builder@2x.webp',
    reverse: true,
  },
];

export function FeatureSectionsMarketer() {
  return (
    <>
      {featureSections.map((feature, index) => (
        <Section
          key={feature.title}
          size="lg"
          background={index % 2 === 0 ? 'white' as const : 'gray' as const}
        >
          <Container>
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                feature.reverse ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: feature.reverse ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={feature.reverse ? 'lg:col-start-2' : ''}
              >
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-6">
                    {feature.description}
                  </p>
                  {feature.cta && (
                    <Link
                      href={feature.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors group"
                    >
                      {feature.cta.text}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>

                {/* Testimonial */}
                {feature.testimonial && (
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                    <blockquote className="text-slate-700 mb-4 italic">
                      {feature.testimonial.quote}
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                        {feature.testimonial.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-slate-900 font-medium text-sm">{feature.testimonial.author}</p>
                        <p className="text-slate-500 text-xs">{feature.testimonial.role}, {feature.testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Visual Side - Product Image */}
              <motion.div
                initial={{ opacity: 0, x: feature.reverse ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={feature.reverse ? 'lg:col-start-1' : ''}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                  <Image
                    src={getAssetPath(feature.image)}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>
      ))}
    </>
  );
}
