'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CalendlyEmbedProps {
  url?: string;
  minWidth?: string;
  height?: string;
}

export default function CalendlyEmbed({
  url = 'https://calendly.com/adapty/demo',
  minWidth = '320px',
  height = '700px',
}: CalendlyEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide skeleton after iframe should be loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full" style={{ minWidth, minHeight: height }}>
      {/* Loading skeleton */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden"
        >
          <div className="p-6 space-y-4 animate-pulse">
            {/* Header skeleton */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-slate-200 rounded-full" />
              <div className="space-y-2 flex-1">
                <div className="h-5 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            </div>

            {/* Calendar grid skeleton */}
            <div className="pt-4">
              <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 35 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-slate-100 rounded"
                  />
                ))}
              </div>
            </div>

            {/* Time slots skeleton */}
            <div className="pt-4 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-1/4" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-12 bg-slate-100 rounded-lg"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Calendly iframe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <iframe
          src={url}
          width="100%"
          height={height}
          frameBorder="0"
          title="Schedule a demo with Adapty"
          className="rounded-2xl border border-slate-200 shadow-xl bg-white"
          style={{ minWidth, minHeight: height }}
          onLoad={() => setIsLoading(false)}
        />
      </motion.div>
    </div>
  );
}
