'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn, getAssetPath } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';

/**
 * Quote Mark Icon SVG for testimonials
 */
const QuoteIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

/**
 * Arrow Right Icon for ghost links
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

/**
 * Author information for testimonial
 */
export interface TestimonialAuthor {
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  companyLogo?: string;
}

/**
 * Testimonial data
 */
export interface TestimonialData {
  quote: string;
  author: TestimonialAuthor;
}

/**
 * Props for the FeatureWithQuote component
 */
export interface FeatureWithQuoteProps {
  /** Section title (H2) */
  title: string;
  /** Section description (Body Large) */
  description: string;
  /** Image source and alt text */
  image: { src: string; alt: string };
  /** Optional link with text and href */
  link?: { text: string; href: string };
  /** When true, image appears on right (default: left) */
  reverse?: boolean;
  /** Optional testimonial quote with author */
  testimonial?: TestimonialData;
  /** Background color variant */
  background?: 'white' | 'gray';
  /** Optional additional className */
  className?: string;
}

/**
 * Avatar component for testimonial author
 */
const Avatar = ({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) => {
  if (src) {
    return (
      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
        <Image
          src={getAssetPath(src)}
          alt={alt}
          width={40}
          height={40}
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
        'flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0',
        'bg-gradient-to-br from-violet-500 to-purple-600 text-white',
        'text-sm font-semibold'
      )}
    >
      {initials}
    </div>
  );
};

/**
 * Inline testimonial quote component
 */
const TestimonialQuote = ({
  quote,
  author,
}: TestimonialData) => (
  <div className="mt-8 bg-[var(--bg-subtle)] rounded-2xl p-6 border border-[var(--border-default)]">
    <div className="flex items-start gap-3 mb-4">
      <QuoteIcon className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
      <p className="text-[var(--text-secondary)] italic leading-relaxed">
        "{quote}"
      </p>
    </div>
    <div className="flex items-center gap-3">
      <Avatar src={author.avatar} alt={author.name} />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          {author.name}
        </span>
        <span className="text-xs text-[var(--text-secondary)]">
          {author.role}
          {author.company && (
            <>
              <span className="mx-1">at</span>
              <span className="font-medium">{author.company}</span>
            </>
          )}
        </span>
      </div>
      {author.companyLogo && (
        <div className="ml-auto">
          <Image
            src={getAssetPath(author.companyLogo)}
            alt={author.company ? `${author.company} logo` : 'Company logo'}
            width={80}
            height={24}
            className="object-contain h-6 w-auto opacity-60"
          />
        </div>
      )}
    </div>
  </div>
);

/**
 * Ghost link button component
 */
const GhostLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium transition-colors group"
  >
    {children}
    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
  </Link>
);

/**
 * Easing curve for smooth animations (ease-out-quart approximation)
 */
const smoothEase: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/**
 * Animation variants for scroll reveal
 */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

/**
 * FeatureWithQuote Component
 *
 * A primary section component for feature pages that displays:
 * - A screenshot/image on one side
 * - Title, description, and optional CTA link on the other side
 * - An optional testimonial quote
 *
 * The layout can be reversed with the `reverse` prop.
 *
 * @example
 * <FeatureWithQuote
 *   title="Increase subscription revenue"
 *   description="Manage, target, localize and personalize paywalls."
 *   image={{ src: "/images/feature.webp", alt: "Feature screenshot" }}
 *   link={{ text: "Learn more", href: "/features" }}
 *   testimonial={{
 *     quote: "This changed how we handle subscriptions.",
 *     author: { name: "Jane Doe", role: "CTO", company: "TechCorp" }
 *   }}
 * />
 *
 * @example
 * // Reversed layout (image on right)
 * <FeatureWithQuote
 *   title="Analytics dashboard"
 *   description="Real-time subscription metrics."
 *   image={{ src: "/images/analytics.webp", alt: "Analytics" }}
 *   reverse={true}
 *   background="gray"
 * />
 */
const FeatureWithQuote = ({
  title,
  description,
  image,
  link,
  reverse = false,
  testimonial,
  background = 'white',
  className,
}: FeatureWithQuoteProps) => {
  return (
    <Section background={background} className={cn('overflow-hidden', className)}>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className={cn(
            'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',
            reverse && 'lg:grid-flow-col-dense'
          )}
        >
          {/* Image Side */}
          <motion.div
            variants={imageVariants}
            className={cn(
              'relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl',
              reverse ? 'lg:col-start-2' : ''
            )}
          >
            <Image
              src={getAssetPath(image.src)}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          {/* Content Side */}
          <div className={reverse ? 'lg:col-start-1' : ''}>
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4"
            >
              {title}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6"
            >
              {description}
            </motion.p>

            {link && (
              <motion.div variants={itemVariants}>
                <GhostLink href={link.href}>{link.text}</GhostLink>
              </motion.div>
            )}

            {testimonial && (
              <motion.div variants={itemVariants}>
                <TestimonialQuote
                  quote={testimonial.quote}
                  author={testimonial.author}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default FeatureWithQuote;
