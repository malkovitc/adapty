'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Webhook, Code2, Settings, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

const integrations = [
  { name: 'Amplitude', icon: '/logos/amplitude.svg', href: 'https://adapty.io/integrations/amplitude/' },
  { name: 'Mixpanel', icon: '/logos/mixpanel.svg', href: 'https://adapty.io/integrations/mixpanel/' },
  { name: 'Firebase', icon: '/logos/firebase.svg', href: 'https://adapty.io/integrations/google-analytics-firebase/' },
  { name: 'AppsFlyer', icon: '/logos/appsflyer.svg', href: 'https://adapty.io/integrations/appsflyer/' },
  { name: 'Adjust', icon: '/logos/adjust.svg', href: 'https://adapty.io/integrations/adjust/' },
  { name: 'Branch', icon: '/logos/branch.svg', href: 'https://adapty.io/integrations/branch/' },
  { name: 'Braze', icon: '/logos/braze.svg', href: 'https://adapty.io/integrations/braze/' },
  { name: 'Segment', icon: '/logos/segment.svg', href: 'https://adapty.io/integrations/segment/' },
];

export function IntegrationsSection() {
  return (
    <Section size="lg" background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Simple 3rd-party integrations
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Connect Adapty with your favorite analytics, attribution, and marketing tools.
              Forward subscription events without writing any backend code.
            </p>
            <Link
              href="https://adapty.io/integrations/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors group"
            >
              Explore all integrations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-4 gap-4">
              {integrations.map((integration, index) => (
                <motion.a
                  key={integration.name}
                  href={integration.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-center p-4 bg-slate-50 hover:bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all duration-300"
                >
                  <Image
                    src={getAssetPath(integration.icon)}
                    alt={integration.name}
                    width={40}
                    height={40}
                    className="object-contain"
                    unoptimized
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

export function PaywallArchitecture() {
  return (
    <Section size="lg" background="gray">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-violet-50 rounded-xl border border-violet-100">
                  <div className="w-10 h-10 rounded-lg bg-violet-500 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Remote Config</p>
                    <p className="text-sm text-slate-500">Update paywalls without app updates</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Fallback Paywalls</p>
                    <p className="text-sm text-slate-500">Built-in offline support</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">A/B Testing</p>
                    <p className="text-sm text-slate-500">Test variations without code changes</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Flexible paywall management architecture
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Our SDK architecture separates paywall configuration from your app code.
              Update pricing, designs, and experiments through the dashboard - changes go live
              instantly without app store reviews.
            </p>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

export function RawDataExport() {
  return (
    <Section size="lg" background="white">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
              Raw data export
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Export all your subscription data via webhooks or batch exports.
              Build custom analytics, sync with your data warehouse, or feed into your own ML models.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Webhook className="w-4 h-4 text-violet-600" />
                </div>
                <span className="text-slate-700">Real-time webhooks for all events</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Webhook className="w-4 h-4 text-violet-600" />
                </div>
                <span className="text-slate-700">S3 exports for batch processing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
                  <Webhook className="w-4 h-4 text-violet-600" />
                </div>
                <span className="text-slate-700">Full API access to all data</span>
              </div>
            </div>
            <Link
              href="https://docs.adapty.io/docs/webhooks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-violet-600 hover:text-violet-700 font-medium transition-colors group"
            >
              View webhook documentation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-slate-900 rounded-2xl p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-slate-400">
                <Webhook className="w-4 h-4" />
                <span>webhook_payload.json</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto">
{`{
  "event_type": "subscription_renewed",
  "profile_id": "user_123",
  "product_id": "premium_monthly",
  "price": 9.99,
  "currency": "USD",
  "transaction_id": "txn_abc123",
  "expires_at": "2025-02-15T00:00:00Z",
  "is_sandbox": false,
  "store": "app_store"
}`}
              </pre>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

export function MigrationSection() {
  return (
    <Section size="lg" background="gray">
      <Container size="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Using another or in-house solution for subscriptions?
          </h2>
          <p className="text-lg text-slate-500 mb-8">
            We have a proven migration process that ensures zero downtime and data loss.
            Our team will help you every step of the way.
          </p>
          <Link
            href="https://adapty.io/schedule-demo/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors group"
          >
            Schedule a call to learn more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </Container>
    </Section>
  );
}

export function TeamLinks() {
  const links = [
    {
      title: 'For marketers',
      description: 'A/B testing, no-code paywall builder, and targeting',
      href: '/for-marketers',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'For app owners',
      description: 'Revenue analytics, LTV predictions, and business insights',
      href: '/for-app-owners',
      gradient: 'from-blue-500 to-cyan-500',
    },
  ];

  return (
    <Section size="lg" background="white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            We&apos;re here for your team
          </h2>
          <p className="text-lg text-slate-500">
            Explore how Adapty helps different roles in your organization.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {links.map((link, index) => (
            <motion.div
              key={link.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={link.href}
                className="group block p-6 bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center mb-4`}>
                  <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {link.title}
                </h3>
                <p className="text-slate-500">{link.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
