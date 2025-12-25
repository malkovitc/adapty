'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.onError?.(error, errorInfo);
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const { fallback } = this.props;

      if (typeof fallback === 'function') {
        return fallback(this.state.error, this.reset);
      }

      return fallback ?? <DefaultErrorFallback error={this.state.error} onRetry={this.reset} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, onRetry }: { error: Error; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 mb-4 rounded-full bg-red-100 flex items-center justify-center">
        <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-[#0F172A] mb-2">Something went wrong</h3>
      <p className="text-sm text-[#64748B] mb-4 max-w-md">
        {error.message || 'An unexpected error occurred'}
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-[#6366F1] text-white rounded-lg hover:bg-[#4F46E5] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

export function SectionErrorBoundary({ children, sectionName }: { children: ReactNode; sectionName?: string }) {
  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <section className="py-16 bg-[#FAFAFA]">
          <div className="max-w-7xl mx-auto px-4">
            <DefaultErrorFallback error={error} onRetry={reset} />
          </div>
        </section>
      )}
      onError={(error) => console.error(`Error in section ${sectionName}:`, error)}
    >
      {children}
    </ErrorBoundary>
  );
}
