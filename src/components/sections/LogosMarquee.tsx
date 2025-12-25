'use client';

import { memo } from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

// Logos matching original adapty.io homepage trust section
const logos = [
  { name: 'Feeld', src: '/logos/logo-feeld-gray.svg' },
  { name: 'Bumble', src: '/logos/logo-bumble-gray.svg' },
  { name: 'Weewoo', src: '/logos/weewoo.svg' },
  { name: 'AppNation', src: '/logos/appnation.webp' },
  { name: 'Almus', src: '/logos/almus.svg' },
  { name: 'Impala Studios', src: '/logos/logo-text-impala-studios-gray.svg' },
  { name: 'HUBX', src: '/logos/logo-hubx-gray.svg' },
];

export default function LogosMarquee() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      {/* Heading */}
      <div className="mb-12 px-4 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4 text-center">
          Trusted by 15,000+ apps and the world's largest app publishers
        </h2>
      </div>

      {/* Logos Container */}
      <div className="relative">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Single Row - Scroll Right */}
        <div className="overflow-hidden">
          <div className="flex gap-12 items-center animate-scroll-right">
            {/* First set of logos */}
            {logos.map((item, index) => (
              <LogoCard key={`set1-${index}`} name={item.name} src={item.src} />
            ))}
            {/* Duplicate for seamless loop */}
            {logos.map((item, index) => (
              <LogoCard key={`set2-${index}`} name={item.name} src={item.src} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const LogoCard = memo(function LogoCard({ name, src }: { name: string; src: string }) {
  return (
    <div className="flex-shrink-0 h-12 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
      <Image
        src={getAssetPath(src)}
        alt={name}
        width={120}
        height={40}
        className="h-8 w-auto object-contain"
        style={{ maxWidth: '120px' }}
        unoptimized
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
  );
});
