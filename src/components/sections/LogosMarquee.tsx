'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const basePath = process.env.NODE_ENV === 'production' ? '/adapty' : '';

const logos = [
  { name: 'Feeld', logo: `${basePath}/logos/logo-feeld-gray.svg` },
  { name: 'Bumble', logo: `${basePath}/logos/logo-bumble-gray.svg` },
  { name: 'HubX', logo: `${basePath}/logos/logo-hubx-gray.svg` },
  { name: 'AppNation', logo: `${basePath}/logos/appnation.webp` },
  { name: 'Impala Studios', logo: `${basePath}/logos/logo-text-impala-studios-gray.svg` },
  { name: 'Smartist', logo: `${basePath}/logos/smartist.png` },
  { name: 'Smitten', logo: `${basePath}/logos/smitten.webp` },
  { name: 'Moonly', logo: `${basePath}/logos/moonly.svg` },
  { name: 'SocialKit', logo: `${basePath}/logos/socialkit.svg` },
  { name: 'Bickster', logo: `${basePath}/logos/bickster.png` },
  { name: 'Going Merry', logo: `${basePath}/logos/going-merry.webp` },
  { name: 'Fotorama', logo: `${basePath}/logos/fotorama.webp` },
];

export default function LogosMarquee() {
  return (
    <section className="relative w-full py-12 sm:py-16 md:py-20 bg-[#F5F5F7] overflow-hidden">
      {/* Heading */}
      <div className="mb-12 px-4 max-w-4xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#7C3AED] mb-4 text-center">
          Trusted by the best
        </p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F172A] mb-4 text-center">
          Powering 15,000+ apps worldwide
        </h2>
        <p className="text-base sm:text-lg text-[#64748B] text-center" style={{ maxWidth: '42rem', margin: '0 auto' }}>
          From startups to Fortune 500 companies, teams trust Adapty to grow their subscription revenue
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F5F5F7] to-transparent z-10 pointer-events-none" />

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F5F5F7] to-transparent z-10 pointer-events-none" />

        {/* First Row - Scroll Right */}
        <div className="mb-6 overflow-hidden">
          <div className="flex gap-6 animate-scroll-right">
            {/* First set of logos */}
            {logos.map((item, index) => (
              <LogoCard key={`row1-set1-${index}`} name={item.name} logo={item.logo} />
            ))}
            {/* Duplicate for seamless loop */}
            {logos.map((item, index) => (
              <LogoCard key={`row1-set2-${index}`} name={item.name} logo={item.logo} />
            ))}
          </div>
        </div>

        {/* Second Row - Scroll Left */}
        <div className="overflow-hidden">
          <div className="flex gap-6 animate-scroll-left">
            {/* First set of logos (reversed) */}
            {[...logos].reverse().map((item, index) => (
              <LogoCard key={`row2-set1-${index}`} name={item.name} logo={item.logo} />
            ))}
            {/* Duplicate for seamless loop */}
            {[...logos].reverse().map((item, index) => (
              <LogoCard key={`row2-set2-${index}`} name={item.name} logo={item.logo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex-shrink-0 w-[160px] sm:w-[200px] h-[70px] sm:h-[80px] bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-200/60 flex items-center justify-center transition-all duration-500 hover:shadow-[0_20px_40px_rgba(124,58,237,0.15)] hover:scale-105 hover:border-purple-200 hover:-translate-y-1 group cursor-pointer touch-manipulation p-4">
      <Image
        src={logo}
        alt={name}
        width={120}
        height={40}
        className="object-contain max-h-[40px] grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
      />
    </div>
  );
}
