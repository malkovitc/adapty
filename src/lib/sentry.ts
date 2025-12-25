/**
 * Sentry Integration (Stub)
 *
 * This module provides a no-op stub for Sentry integration.
 * Sentry SDK is not currently compatible with Next.js 16.
 * When Sentry adds support, install @sentry/nextjs and uncomment the real implementation.
 *
 * For now, errors are logged to console for observability.
 */

let initialized = false;

/**
 * Initialize Sentry (no-op stub)
 */
export function initSentry(): void {
  if (initialized) {
    return;
  }

  // Log that Sentry is not available
  if (process.env.NODE_ENV === 'development') {
    console.log('[Sentry] Not initialized - SDK not installed (incompatible with Next.js 16)');
  }

  initialized = true;
}

/**
 * Capture an error with additional context
 */
export function captureError(
  error: Error | unknown,
  context?: {
    action?: string;
    postSlug?: string;
    userId?: string;
    extra?: Record<string, unknown>;
  }
): void {
  // Log to console for observability
  console.error('[Error]', {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    ...context,
  });
}

/**
 * Track server action execution for observability
 */
export function trackServerAction(
  actionName: string,
  status: 'success' | 'failure',
  data?: {
    postSlug?: string;
    userId?: string;
    fieldsUpdated?: string[];
    durationMs?: number;
    error?: string;
  }
): void {
  const logData = {
    action: actionName,
    status,
    timestamp: new Date().toISOString(),
    ...data,
  };

  // Log to console for observability
  if (status === 'success') {
    console.log('[ServerAction]', JSON.stringify(logData));
  } else {
    console.error('[ServerAction]', JSON.stringify(logData));
  }
}

/**
 * Create a wrapper for server actions with automatic tracking
 */
export function withTracking<TArgs extends unknown[], TResult>(
  actionName: string,
  fn: (...args: TArgs) => Promise<TResult>
): (...args: TArgs) => Promise<TResult> {
  return async (...args: TArgs): Promise<TResult> => {
    const startTime = Date.now();

    try {
      const result = await fn(...args);

      trackServerAction(actionName, 'success', {
        durationMs: Date.now() - startTime,
      });

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);

      trackServerAction(actionName, 'failure', {
        durationMs: Date.now() - startTime,
        error: errorMessage,
      });

      throw error;
    }
  };
}
