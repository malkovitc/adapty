'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export interface PromoBannerProps {
  /** Unique ID for localStorage persistence */
  id: string;
  /** Banner text content */
  text: string;
  /** Optional link to display after the text */
  link?: {
    text: string;
    href: string;
  };
  /** Visual variant */
  variant?: 'purple' | 'gradient';
  /** Optional className for custom styling */
  className?: string;
}

const STORAGE_PREFIX = 'adapty_promo_dismissed_';

const PromoBanner = ({
  id,
  text,
  link,
  variant = 'purple',
  className = '',
}: PromoBannerProps) => {
  const [isDismissed, setIsDismissed] = useState(true); // Start hidden to prevent flash
  const [isMounted, setIsMounted] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const storageKey = `${STORAGE_PREFIX}${id}`;
    const dismissed = localStorage.getItem(storageKey) === 'true';
    setIsDismissed(dismissed);
  }, [id]);

  const handleDismiss = useCallback(() => {
    const storageKey = `${STORAGE_PREFIX}${id}`;
    localStorage.setItem(storageKey, 'true');
    setIsDismissed(true);
  }, [id]);

  // Don't render during SSR or when dismissed
  if (!isMounted || isDismissed) {
    return null;
  }

  const variantStyles = {
    purple: 'bg-[var(--accent-primary)]',
    gradient: 'bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#ec4899]',
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`w-full overflow-hidden ${className}`}
      >
        <div
          className={`${variantStyles[variant]} text-white py-2.5 px-4 relative`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 text-sm font-medium">
            {/* Banner text - truncates on mobile */}
            <span className="truncate flex-shrink min-w-0">
              {text}
            </span>

            {/* Optional link */}
            {link && (
              <Link
                href={link.href}
                className="inline-flex items-center gap-1 whitespace-nowrap text-white/90 hover:text-white transition-colors underline underline-offset-2 flex-shrink-0"
              >
                {link.text}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            {/* Dismiss button */}
            <button
              onClick={handleDismiss}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PromoBanner;
