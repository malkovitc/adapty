'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAssetPath } from '@/lib/utils';

export interface EventTypesSectionProps {
  title?: string;
  description?: string;
  events?: string[];
  image?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  background?: 'white' | 'gray';
}

const defaultEvents = [
  'Subscription started',
  'Subscription renewed',
  'Trial started',
  'Trial converted',
  'Trial cancelled',
  'Subscription cancelled',
  'Subscription expired',
  'Billing issue detected',
  'Billing issue resolved',
  'Grace period started',
  'Refund requested',
  'Offer redeemed',
];

export default function EventTypesSection({
  title = 'Send any subscription event',
  description = 'Adapty tracks all subscription lifecycle events and sends them to your integrations in real-time. Use this data to trigger automations, personalize campaigns, and optimize your monetization strategy.',
  events = defaultEvents,
  image = {
    src: '/images/features/subscription-analytics@2x.webp',
    alt: 'Subscription events dashboard',
    width: 600,
    height: 400,
  },
  background = 'gray',
}: EventTypesSectionProps) {
  return (
    <Section size="lg" background={background}>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">{title}</h2>
            {description && <p className="text-lg text-slate-500 mb-8">{description}</p>}
            <div className="grid grid-cols-2 gap-3">
              {events.map((event, index) => (
                <motion.div
                  key={event}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-2 text-slate-700"
                >
                  <div className="w-2 h-2 rounded-full bg-violet-500" />
                  <span className="text-sm">{event}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
              <Image
                src={getAssetPath(image.src)}
                alt={image.alt}
                width={image.width ?? 600}
                height={image.height ?? 400}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
