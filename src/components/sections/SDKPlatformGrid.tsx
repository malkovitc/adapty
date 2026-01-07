'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { ExternalLink } from 'lucide-react';
import { getAssetPath } from '@/lib/utils';

export interface SDKPlatform {
  id: string;
  name: string;
  logo: string;
  description?: string;
  href?: string;
}

export interface SDKPlatformGridProps {
  title?: string;
  subtitle?: string;
  platforms?: SDKPlatform[];
  cta?: { label: string; href: string };
  background?: 'white' | 'gray';
}

const defaultPlatforms: SDKPlatform[] = [
  { id: 'swift', name: 'Swift', logo: '/logos/logo-swift.svg', description: 'iOS native' },
  { id: 'kotlin', name: 'Kotlin', logo: '/logos/logo-kotlin.svg', description: 'Android native' },
  { id: 'react-native', name: 'React Native', logo: '/logos/logo-react-native.svg', description: 'Cross-platform' },
  { id: 'flutter', name: 'Flutter', logo: '/logos/logo-flutter.svg', description: 'Cross-platform' },
  { id: 'unity', name: 'Unity', logo: '/logos/logo-unity.svg', description: 'Game engine' },
  { id: 'capacitor', name: 'Capacitor', logo: '/logos/logo-capacitor.svg', description: 'Web apps' },
  { id: 'kmp', name: 'KMP', logo: '/logos/logo-kotlin.svg', description: 'Kotlin Multiplatform' },
  { id: 'flutterflow', name: 'FlutterFlow', logo: '/logos/logo-flutterflow.svg', description: 'No-code' },
  { id: 'web-api', name: 'Web API', logo: '/logos/logo-api.svg', description: 'REST API' },
  { id: 'stripe', name: 'Stripe', logo: '/logos/logo-stripe.svg', description: 'Web payments' },
];

export default function SDKPlatformGrid({
  title = 'SDKs for every platform',
  subtitle = 'Integrate Adapty into your app with our well-maintained SDKs. Most integrations take less than an hour.',
  platforms = defaultPlatforms,
  cta = { label: 'View SDK documentation', href: 'https://docs.adapty.io' },
  background = 'white',
}: SDKPlatformGridProps) {
  return (
    <Section size="lg" background={background}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-slate-500 max-w-3xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {platforms.map((platform, index) => (
            <motion.a
              key={platform.id}
              href={platform.href ?? `https://docs.adapty.io/docs/${platform.name.toLowerCase().replace(/\s+/g, '-')}-sdk`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group flex flex-col items-center p-6 bg-white rounded-xl border border-slate-200 hover:border-violet-300 hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 mb-4 flex items-center justify-center">
                <Image
                  src={getAssetPath(platform.logo)}
                  alt={platform.name}
                  width={56}
                  height={56}
                  className="w-12 h-12 object-contain"
                  unoptimized
                />
              </div>
              <span className="font-semibold text-slate-900 group-hover:text-violet-600 transition-colors">
                {platform.name}
              </span>
              {platform.description && <span className="text-sm text-slate-400 mt-1">{platform.description}</span>}
            </motion.a>
          ))}
        </div>

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors"
            >
              {cta.label}
              <ExternalLink className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </Container>
    </Section>
  );
}
