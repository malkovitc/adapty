'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import Card from './Card';

/**
 * Quote Mark Icon SVG
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
 * Author information interface
 */
export interface TestimonialAuthor {
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  companyLogo?: string;
}

/**
 * Testimonial component props
 */
export interface TestimonialProps {
  /** Display variant */
  variant?: 'inline' | 'card' | 'featured';
  /** The testimonial quote text */
  quote: string;
  /** Author information */
  author: TestimonialAuthor;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Avatar component for testimonials
 */
const Avatar = ({
  src,
  alt,
  size = 'md',
}: {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  const sizePx = {
    sm: 32,
    md: 40,
    lg: 64,
  };

  if (src) {
    return (
      <div className={cn('relative rounded-full overflow-hidden flex-shrink-0', sizeClasses[size])}>
        <Image
          src={src}
          alt={alt}
          width={sizePx[size]}
          height={sizePx[size]}
          className="object-cover w-full h-full"
        />
      </div>
    );
  }

  // Fallback to initials
  const initials = alt
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-full flex-shrink-0',
        'bg-[var(--primary-gradient-start)] text-white',
        'font-[var(--font-semibold)]',
        sizeClasses[size],
        size === 'sm' && 'text-[var(--text-xs)]',
        size === 'md' && 'text-[var(--text-sm)]',
        size === 'lg' && 'text-[var(--text-base)]'
      )}
    >
      {initials}
    </div>
  );
};

/**
 * Author info display component
 */
const AuthorInfo = ({
  author,
  variant,
}: {
  author: TestimonialAuthor;
  variant: 'inline' | 'card' | 'featured';
}) => {
  const avatarSize = variant === 'featured' ? 'lg' : variant === 'card' ? 'md' : 'sm';

  return (
    <div className={cn(
      'flex items-center',
      variant === 'featured' ? 'gap-[var(--spacing-md)]' : 'gap-[var(--spacing-sm)]'
    )}>
      <Avatar src={author.avatar} alt={author.name} size={avatarSize} />
      <div className="flex flex-col">
        <span
          className={cn(
            'font-[var(--font-semibold)] text-[var(--text-primary)]',
            variant === 'featured' ? 'text-[var(--text-lg)]' : 'text-[var(--text-sm)]'
          )}
        >
          {author.name}
        </span>
        <span
          className={cn(
            'text-[var(--text-secondary)]',
            variant === 'featured' ? 'text-[var(--text-base)]' : 'text-[var(--text-xs)]'
          )}
        >
          {author.role}
          {author.company && (
            <>
              <span className="mx-1">at</span>
              <span className="font-[var(--font-medium)]">{author.company}</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};

/**
 * Company logo display
 */
const CompanyLogo = ({ src, company }: { src: string; company?: string }) => (
  <div className="relative h-6 w-auto">
    <Image
      src={src}
      alt={company ? `${company} logo` : 'Company logo'}
      width={120}
      height={24}
      className="object-contain h-6 w-auto opacity-60"
    />
  </div>
);

/**
 * Inline Testimonial Variant
 * Compact quote with avatar and name inline - used in feature sections
 */
const InlineTestimonial = ({
  quote,
  author,
  className,
}: Omit<TestimonialProps, 'variant'>) => (
  <div className={cn('flex flex-col gap-[var(--spacing-sm)]', className)}>
    <div className="flex items-start gap-[var(--spacing-sm)]">
      <QuoteIcon className="w-4 h-4 text-[var(--primary-gradient-start)] flex-shrink-0 mt-1" />
      <p className="text-[var(--text-sm)] text-[var(--text-secondary)] italic leading-relaxed">
        {quote}
      </p>
    </div>
    <div className="flex items-center justify-between">
      <AuthorInfo author={author} variant="inline" />
      {author.companyLogo && (
        <CompanyLogo src={author.companyLogo} company={author.company} />
      )}
    </div>
  </div>
);

/**
 * Card Testimonial Variant
 * Boxed testimonial card with elevated styling
 */
const CardTestimonial = ({
  quote,
  author,
  className,
}: Omit<TestimonialProps, 'variant'>) => (
  <Card variant="bordered" padding="md" className={cn('flex flex-col', className)}>
    <QuoteIcon className="w-6 h-6 text-[var(--primary-gradient-start)] mb-[var(--spacing-md)]" />
    <p className="text-[var(--text-base)] text-[var(--text-secondary)] leading-relaxed mb-[var(--spacing-lg)] flex-grow">
      "{quote}"
    </p>
    <div className="flex items-center justify-between pt-[var(--spacing-md)] border-t border-[var(--border-default)]">
      <AuthorInfo author={author} variant="card" />
      {author.companyLogo && (
        <CompanyLogo src={author.companyLogo} company={author.company} />
      )}
    </div>
  </Card>
);

/**
 * Featured Testimonial Variant
 * Large featured quote with bigger text for hero/highlight sections
 */
const FeaturedTestimonial = ({
  quote,
  author,
  className,
}: Omit<TestimonialProps, 'variant'>) => (
  <div
    className={cn(
      'flex flex-col items-center text-center',
      'py-[var(--spacing-2xl)] px-[var(--spacing-lg)]',
      className
    )}
  >
    <QuoteIcon className="w-10 h-10 text-[var(--primary-gradient-start)] mb-[var(--spacing-lg)]" />
    <blockquote className="max-w-3xl mb-[var(--spacing-xl)]">
      <p className="text-[var(--text-h3)] md:text-[var(--text-h2)] font-[var(--font-medium)] text-[var(--text-primary)] leading-snug">
        "{quote}"
      </p>
    </blockquote>
    <div className="flex flex-col items-center gap-[var(--spacing-md)]">
      <AuthorInfo author={author} variant="featured" />
      {author.companyLogo && (
        <div className="mt-[var(--spacing-sm)]">
          <CompanyLogo src={author.companyLogo} company={author.company} />
        </div>
      )}
    </div>
  </div>
);

/**
 * Testimonial Component
 *
 * A versatile testimonial component with three display variants:
 * - `inline`: Compact quote with avatar - ideal for feature sections
 * - `card`: Boxed testimonial card - ideal for grids and carousels
 * - `featured`: Large featured quote - ideal for hero/highlight sections
 *
 * @example
 * // Inline variant
 * <Testimonial
 *   variant="inline"
 *   quote="This product changed how we handle subscriptions."
 *   author={{ name: "Jane Doe", role: "CTO", company: "TechCorp" }}
 * />
 *
 * @example
 * // Card variant
 * <Testimonial
 *   variant="card"
 *   quote="Amazing developer experience and support."
 *   author={{
 *     name: "John Smith",
 *     role: "Lead Developer",
 *     avatar: "/avatars/john.jpg",
 *     companyLogo: "/logos/company.svg"
 *   }}
 * />
 *
 * @example
 * // Featured variant
 * <Testimonial
 *   variant="featured"
 *   quote="Adapty helped us increase our subscription revenue by 40%."
 *   author={{ name: "Sarah Johnson", role: "CEO", company: "AppStudio" }}
 * />
 */
const Testimonial = ({
  variant = 'card',
  quote,
  author,
  className,
}: TestimonialProps) => {
  switch (variant) {
    case 'inline':
      return <InlineTestimonial quote={quote} author={author} className={className} />;
    case 'featured':
      return <FeaturedTestimonial quote={quote} author={author} className={className} />;
    case 'card':
    default:
      return <CardTestimonial quote={quote} author={author} className={className} />;
  }
};

export default Testimonial;
