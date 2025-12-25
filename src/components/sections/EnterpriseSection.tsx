'use client';

import { motion } from 'framer-motion';
import { Shield, Server, Headphones, Check, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const enterpriseFeatures = [
  {
    icon: Shield,
    title: 'Secure',
    features: ['SOC2 verified', 'Encrypted', '24/7 global fraud monitoring'],
  },
  {
    icon: Server,
    title: 'Reliable',
    features: [
      { text: '99.9% SLA', link: 'https://status.adapty.io/' },
      'Over $500M/year of in-app purchases processed',
    ],
  },
  {
    icon: Headphones,
    title: 'Responsive',
    features: [
      'Dedicated customer success manager',
      'Direct communication via Slack',
      'Live chat on the website',
      'Four ways to reach us',
    ],
  },
];

const g2Awards = [
  { title: 'Best Results', subtitle: 'Winter 2025', image: '/images/g2/g2-best_results-winter_2025.svg' },
  { title: 'High Performer', subtitle: 'Winter 2025', image: '/images/g2/g2-high_performer-winter_2025.svg' },
  { title: 'Best Usability', subtitle: 'Winter 2025', image: '/images/g2/g2-best_usability-winter_2025.svg' },
  { title: 'Best Relationship', subtitle: 'Winter 2025', image: '/images/g2/g2-best_relationship-winter_2025.svg' },
  { title: 'Most Implementable', subtitle: 'Winter 2025', image: '/images/g2/g2-most_implementable-winter_2025.svg' },
];

export default function EnterpriseSection() {
  return (
    <>
      {/* Enterprise Features */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Enterprise-grade platform
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {enterpriseFeatures.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{category.title}</h3>
                <ul className="space-y-3">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      {typeof feature === 'string' ? (
                        <span>{feature}</span>
                      ) : (
                        <Link
                          href={feature.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-violet-600 hover:text-violet-700 transition-colors"
                        >
                          {feature.text}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* G2 Awards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trusted for usability and customer service
            </h2>
            <Link
              href="https://www.g2.com/products/adapty-io/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              Based on 500+ reviews
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {g2Awards.map((award, index) => (
              <motion.a
                key={award.title}
                href="https://www.g2.com/products/adapty-io/reviews"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center hover:scale-105 transition-transform"
              >
                <Image
                  src={award.image}
                  alt={`G2 Award: ${award.title}, ${award.subtitle}`}
                  width={100}
                  height={140}
                  className="w-24 h-auto sm:w-28"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
