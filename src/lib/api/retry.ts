/**
 * Retry utilities with exponential backoff for API calls
 */

export type CMSErrorCode =
  | 'NETWORK_ERROR'
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'RATE_LIMITED'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR';

export class CMSError extends Error {
  readonly code: CMSErrorCode;
  readonly statusCode?: number;
  readonly retryable: boolean;

  constructor(
    message: string,
    code: CMSErrorCode,
    options?: { statusCode?: number; retryable?: boolean; cause?: unknown }
  ) {
    super(message);
    this.name = 'CMSError';
    this.code = code;
    this.statusCode = options?.statusCode;
    this.retryable = options?.retryable ?? this.isRetryableCode(code);
    if (options?.cause) {
      this.cause = options.cause;
    }
  }

  private isRetryableCode(code: CMSErrorCode): boolean {
    return ['NETWORK_ERROR', 'RATE_LIMITED', 'SERVER_ERROR'].includes(code);
  }

  static fromError(error: unknown): CMSError {
    if (error instanceof CMSError) {
      return error;
    }

    if (error instanceof Error) {
      // Network errors
      if (error.message.includes('fetch') || error.message.includes('network')) {
        return new CMSError('Network error occurred', 'NETWORK_ERROR', {
          retryable: true,
          cause: error,
        });
      }

      return new CMSError(error.message, 'UNKNOWN_ERROR', { cause: error });
    }

    return new CMSError('An unknown error occurred', 'UNKNOWN_ERROR', {
      cause: error,
    });
  }

  static fromStatus(statusCode: number, message?: string): CMSError {
    const defaultMessages: Record<number, [string, CMSErrorCode]> = {
      400: ['Invalid request data', 'VALIDATION_ERROR'],
      401: ['Authentication required', 'UNAUTHORIZED'],
      403: ['Access denied', 'FORBIDDEN'],
      404: ['Resource not found', 'NOT_FOUND'],
      429: ['Too many requests', 'RATE_LIMITED'],
      500: ['Server error', 'SERVER_ERROR'],
      502: ['Server temporarily unavailable', 'SERVER_ERROR'],
      503: ['Service unavailable', 'SERVER_ERROR'],
      504: ['Gateway timeout', 'SERVER_ERROR'],
    };

    const [defaultMessage, code] = defaultMessages[statusCode] ?? [
      'Request failed',
      'UNKNOWN_ERROR',
    ];

    return new CMSError(message ?? defaultMessage, code, { statusCode });
  }
}

interface RetryOptions {
  maxAttempts?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  factor?: number;
  onRetry?: (error: CMSError, attempt: number, delayMs: number) => void;
}

const DEFAULT_OPTIONS: Required<Omit<RetryOptions, 'onRetry'>> = {
  maxAttempts: 3,
  baseDelayMs: 1000,
  maxDelayMs: 10000,
  factor: 2,
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function calculateDelay(attempt: number, options: Required<Omit<RetryOptions, 'onRetry'>>): number {
  const delay = options.baseDelayMs * Math.pow(options.factor, attempt - 1);
  // Add jitter (±10%)
  const jitter = delay * 0.1 * (Math.random() * 2 - 1);
  return Math.min(delay + jitter, options.maxDelayMs);
}

/**
 * Execute an async function with exponential backoff retry
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  let lastError: CMSError | null = null;

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = CMSError.fromError(error);

      // Don't retry non-retryable errors
      if (!lastError.retryable) {
        throw lastError;
      }

      // Don't retry on last attempt
      if (attempt === opts.maxAttempts) {
        throw lastError;
      }

      const delayMs = calculateDelay(attempt, opts);

      if (options?.onRetry) {
        options.onRetry(lastError, attempt, delayMs);
      }

      await sleep(delayMs);
    }
  }

  // Should never reach here, but TypeScript needs this
  throw lastError ?? new CMSError('Retry failed', 'UNKNOWN_ERROR');
}

/**
 * Create a retryable version of any async function
 */
export function makeRetryable<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  options?: RetryOptions
): (...args: TArgs) => Promise<TResult> {
  return (...args: TArgs) => withRetry(() => fn(...args), options);
}
