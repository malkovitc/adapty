'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn, getAssetPath } from '@/lib/utils';

/**
 * Quote Mark Icon for testimonials
 */
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

/**
 * Arrow Right Icon for links
 */
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);

export interface TestimonialAuthor {
  name: string;
  role: string;
  avatar?: string;
}

export interface Testimonial {
  companyLogo?: string;
  companyName: string;
  companyDescription?: string;
  quote: string;
  author: TestimonialAuthor;
}

export interface StackingCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  link?: { text: string; href: string };
  testimonial: Testimonial;
  imageBgColor?: string;
}

export interface StackingCardsProps {
  cards: StackingCardData[];
  className?: string;
  stickyTop?: number;
}

/**
 * Stacking Cards Component
 *
 * Cards stack on top of each other with a simple sticky scroll effect.
 * All cards stick at the same position, creating the stacking/accordion effect.
 */
export function StackingCards({ cards, className, stickyTop = 100 }: StackingCardsProps) {
  return (
    <div className={cn('w-full', className)}>
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 items-center gap-4 lg:gap-8',
            'p-5 lg:p-8 rounded-2xl',
            'sticky bg-white shadow-xl border border-slate-200'
          )}
          style={{
            top: `${stickyTop}px`,
            zIndex: index + 1,
            marginBottom: '500px'
          }}
        >
          {/* Content Side - Always Left */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            {/* Title & Description */}
            <div className="mb-4">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 leading-tight">
                {card.title}
              </h3>
              <p className="text-sm lg:text-base text-slate-600 leading-relaxed mb-3">
                {card.description}
              </p>
              {card.link && (
                <Link
                  href={card.link.href}
                  className="inline-flex items-center gap-2 text-slate-900 hover:text-slate-700 font-semibold transition-colors group text-sm"
                >
                  {card.link.text}
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>

            {/* Testimonial Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <QuoteIcon className="w-5 h-5 text-slate-300 mb-2" />
              <div className="flex items-center gap-2 mb-2">
                {card.testimonial.companyLogo ? (
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-slate-200">
                    <Image
                      src={getAssetPath(card.testimonial.companyLogo)}
                      alt={card.testimonial.companyName}
                      width={24}
                      height={24}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center text-white font-bold text-xs">
                    {card.testimonial.companyName.charAt(0)}
                  </div>
                )}
                <div>
                  <span className="font-semibold text-slate-900 text-xs block">
                    {card.testimonial.companyName}
                  </span>
                  {card.testimonial.companyDescription && (
                    <span className="text-xs text-slate-500">
                      {card.testimonial.companyDescription}
                    </span>
                  )}
                </div>
              </div>
              <blockquote className="text-slate-700 text-xs lg:text-sm leading-relaxed mb-3">
                "{card.testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-2">
                {card.testimonial.author.avatar ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={getAssetPath(card.testimonial.author.avatar)}
                      alt={card.testimonial.author.name}
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-semibold text-xs flex-shrink-0">
                    {card.testimonial.author.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                )}
                <div>
                  <p className="text-slate-900 font-medium text-xs">{card.testimonial.author.name}</p>
                  <p className="text-slate-500 text-xs">{card.testimonial.author.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side - Always Right */}
          <div
            className={cn(
              'relative overflow-hidden rounded-xl order-1 lg:order-2',
              card.imageBgColor || 'bg-slate-100'
            )}
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={getAssetPath(card.image)}
                alt={card.imageAlt || card.title}
                fill
                className="object-contain p-3 lg:p-5"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StackingCards;
