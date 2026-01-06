'use client';

import { memo } from 'react';
import Image from 'next/image';
import { getAssetPath } from '@/lib/utils';

// Logos matching the trusted companies section
const logos = [
  { name: 'Feeld', src: '/logos/logo-feeld-gray.svg', width: 80 },
  { name: 'Bumble', src: '/logos/logo-bumble-gray.svg', width: 100 },
  { name: 'Weewoo', src: '/logos/weewoo.svg', width: 90 },
  { name: 'AppNation', src: '/logos/appnation.webp', width: 110 },
  { name: 'Almus', src: '/logos/almus.svg', width: 80 },
  { name: 'Impala Studios', src: '/logos/logo-text-impala-studios-gray.svg', width: 120 },
  { name: 'HUBX', src: '/logos/logo-hubx-gray.svg', width: 80 },
];

export default function PricingLogos() {
  return (
    <section className="w-full py-12 sm:py-16 bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 text-center mb-8 sm:mb-10">
          Trusted by 15,000+ apps and the world&apos;s largest app publishers
        </h2>

        {/* Logos Row */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <LogoItem
              key={logo.name}
              name={logo.name}
              src={logo.src}
              width={logo.width}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface LogoItemProps {
  name: string;
  src: string;
  width: number;
  delay: number;
}

const LogoItem = memo(function LogoItem({ name, src, width, delay }: LogoItemProps) {
  return (
    <div
      className="flex-shrink-0 h-10 sm:h-12 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 animate-fade-in-up"
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'both'
      }}
    >
      <Image
        src={getAssetPath(src)}
        alt={name}
        width={width}
        height={40}
        className="h-6 sm:h-8 w-auto object-contain"
        style={{ maxWidth: `${width}px` }}
        unoptimized
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
    </div>
  );
});
