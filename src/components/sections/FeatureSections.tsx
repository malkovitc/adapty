'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, LineChart, Palette, Globe } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

const features = [
  {
    icon: TrendingUp,
    title: 'Increase subscription revenue without app releases',
    description: 'Manage, target, localize and personalize paywalls without leaving your browser.',
    cta: 'Increase app revenue',
    href: '#paywall',
    image: '/images/features/paywall-ab-testing@2x.webp',
    testimonial: {
      logo: 'Smartist',
      quote: '"Whether it\'s A/B testing paywalls, predicting LTV, or analyzing subscription metrics, Adapty is the ultimate toolkit for app success."',
      author: 'Ilgar Tali',
      role: 'Founder & Chief Vision Officer',
    },
    reverse: false,
  },
  {
    icon: Shield,
    title: 'Cut refund rate by 40%',
    description: 'Stop losing revenue on refunds – Adapty automatically shares user activity data with Apple for refund requests and reduces it.',
    cta: 'Set up Refund Saver',
    href: '#refund',
    image: '/images/features/refund-rate@2x-1024x768.webp',
    testimonial: {
      logo: 'Fotorama',
      quote: '"I never thought that doing something about refunds could make such a difference. We just flipped the switch, set it up, and suddenly, it felt like we stopped letting money slip away."',
      author: 'Berk Çağatay Albayrak',
      role: 'Sr. Product Manager',
    },
    reverse: true,
  },
  {
    icon: LineChart,
    title: 'Know your subscription numbers at any moment',
    description: 'Measure your in-app economy from trials to refunds with a ready-to-go, real-time subscription BI.',
    cta: 'See subscription BI',
    href: '#analytics',
    image: '/images/features/app-monetization-strategies@2x.webp',
    testimonial: {
      logo: 'Moonly',
      quote: '"Adapty\'s analytics provides invaluable insights into our app\'s performance. With detailed real-time metrics like revenue, ARPU, and churn rate, we make informed decisions to optimize our monetization strategy."',
      author: 'Nikolay Chebotarev',
      role: 'Head of UA at Moonly.app',
    },
    reverse: false,
  },
  {
    icon: Palette,
    title: 'No-code paywall builder',
    description: 'Build beautiful native paywalls for iOS, Android, Flutter, and React Native without a dev team.',
    cta: 'Create paywalls within minutes',
    href: '#builder',
    image: '/images/features/no-code-paywall-builder@2x.webp',
    testimonial: {
      logo: 'Moodworks Inc',
      quote: '"Adapty\'s Paywall Builder and A/B testing tools paired together are a game changer for anyone trying to do high-velocity testing and find quick wins."',
      author: 'Mike McSweeney',
      role: 'Chief Product Officer',
    },
    reverse: true,
  },
  {
    icon: Globe,
    title: 'Sync subscription data with analytics services',
    description: 'Forward subscription events to analytics and attribution services without coding. Seamlessly integrate with Amplitude, Mixpanel, Firebase, and more.',
    cta: 'Explore integrations',
    href: '#integrations',
    image: '/images/features/app-monetization-strategies@2x.webp',
    testimonial: {
      logo: 'Bickster',
      quote: '"They have a great external API that makes it easy to pass related events to other analytics tools such as Amplitude and Mixpanel."',
      author: 'Chris Bick',
      role: 'Founder and CEO',
    },
    reverse: false,
  },
];

export default function FeatureSections() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="space-y-24">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                feature.reverse ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content Side */}
              <div className={feature.reverse ? 'lg:col-start-2' : ''}>
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-slate-600 mb-6">
                    {feature.description}
                  </p>
                  <Link
                    href={feature.href}
                    className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors group"
                  >
                    {feature.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Testimonial */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {feature.testimonial.logo.charAt(0)}
                    </div>
                    <span className="text-slate-600 text-sm font-medium">{feature.testimonial.logo}</span>
                  </div>
                  <blockquote className="text-slate-700 mb-4">
                    {feature.testimonial.quote}
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-sm">
                      {feature.testimonial.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-slate-900 font-medium text-sm">{feature.testimonial.author}</p>
                      <p className="text-slate-500 text-xs">{feature.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Side - Product Image */}
              <div className={feature.reverse ? 'lg:col-start-1' : ''}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={getAssetPath(feature.image)}
                    alt={feature.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
