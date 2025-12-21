'use client';

import { useEffect } from 'react';
import { WarningIcon, InfoIcon, RefreshIcon, HomeIcon } from '@/components/icons';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Global error boundary caught:', error);
  }, [error]);

  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0F172A] font-sans antialiased">
        <div className="min-h-screen flex items-center justify-center p-4">
          {/* Background gradient orbs */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-float-purple" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-float-blue" />
          </div>

          <div className="relative max-w-2xl w-full">
            {/* Glass card */}
            <div className="rounded-2xl p-8 md:p-12 error-glass-card">
              {/* Error icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center error-icon-gradient">
                  <WarningIcon className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Error title */}
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Critical Application Error
              </h1>

              {/* Error description */}
              <p className="text-slate-400 text-center mb-8 text-lg">
                A critical error occurred in the application. Please refresh the page or contact support if the problem persists.
              </p>

              {/* Development mode error details */}
              {isDev && (
                <div className="mb-8">
                  <div className="rounded-xl p-4 md:p-6 error-details-container">
                    <h2 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
                      <InfoIcon className="w-5 h-5" />
                      Global Error Details
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
                          <pre className="mt-2 text-xs text-red-300 overflow-x-auto p-3 rounded-lg error-stack-trace">
                            {error.stack}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-8 py-3 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 btn-primary-gradient"
                >
                  <RefreshIcon className="w-5 h-5" />
                  Try again
                </button>

                <a
                  href="/"
                  className="px-8 py-3 border-2 border-purple-600 text-purple-400 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <HomeIcon className="w-5 h-5" />
                  Go home
                </a>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
