'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { WarningIcon, InfoIcon, RefreshIcon, HomeIcon } from '@/components/icons';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error boundary caught:', error);
  }, [error]);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-purple" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float-blue" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-2xl w-full"
      >
        {/* Glass card */}
        <div className="glass-dark rounded-2xl p-8 md:p-12">
          {/* Error icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/50">
              <WarningIcon className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Error title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
          >
            Something went wrong
          </motion.h1>

          {/* Error description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-400 text-center mb-8 text-lg"
          >
            We encountered an unexpected error. Don't worry, you can try again or go back to the homepage.
          </motion.p>

          {/* Development mode error details */}
          {isDev && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ delay: 0.5 }}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-slate-900/50 border border-red-500/30 rounded-xl p-4 md:p-6">
                <h2 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                  <InfoIcon className="w-5 h-5" />
                  Development Error Details
                </h2>
                <div className="space-y-2">
                  <p className="text-red-300 font-mono text-sm break-all">
                    <span className="text-slate-400">Message:</span> {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-red-300 font-mono text-sm">
                      <span className="text-slate-400">Digest:</span> {error.digest}
                    </p>
                  )}
                  {error.stack && (
                    <details className="mt-4">
                      <summary className="text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">
                        View stack trace
                      </summary>
                      <pre className="mt-2 text-xs text-red-300 overflow-x-auto scrollbar-thin p-3 bg-slate-950/50 rounded-lg">
                        {error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={reset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/50 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RefreshIcon className="w-5 h-5" />
              Try again
            </motion.button>

            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-purple-600 text-purple-400 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HomeIcon className="w-5 h-5" />
              Go home
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
