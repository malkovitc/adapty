import { z } from 'zod';

/**
 * Environment variable validation with graceful degradation
 */

// Sanity configuration schema
const SanityEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().optional(),
  SANITY_API_TOKEN: z.string().optional(),
});

// Auth configuration schema
const AuthEnvSchema = z.object({
  CMS_PASSWORD: z.string().optional(),
  CMS_SESSION_SECRET: z.string().min(32).optional(),
});

// Sentry configuration schema
const SentryEnvSchema = z.object({
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
});

// Combined environment schema
const EnvSchema = z.object({
  ...SanityEnvSchema.shape,
  ...AuthEnvSchema.shape,
  ...SentryEnvSchema.shape,
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type Env = z.infer<typeof EnvSchema>;

// Parse and validate environment variables
let _env: Env | null = null;

export function getEnv(): Env {
  if (_env) return _env;

  const result = EnvSchema.safeParse(process.env);

  if (!result.success) {
    // Log validation errors but don't crash
    console.warn('Environment validation warnings:', result.error.flatten().fieldErrors);
  }

  // Use parsed data or fallback to raw env
  _env = result.success ? result.data : (process.env as unknown as Env);
  return _env;
}

/**
 * Check if Sanity is properly configured
 */
export function isSanityConfigured(): boolean {
  const env = getEnv();
  return Boolean(
    env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    env.NEXT_PUBLIC_SANITY_DATASET
  );
}

/**
 * Check if Sanity write access is configured
 */
export function isSanityWriteConfigured(): boolean {
  const env = getEnv();
  return isSanityConfigured() && Boolean(env.SANITY_API_TOKEN);
}

/**
 * Check if CMS authentication is configured
 */
export function isCMSAuthConfigured(): boolean {
  const env = getEnv();
  return Boolean(env.CMS_PASSWORD && env.CMS_SESSION_SECRET);
}

/**
 * Check if Sentry is configured
 */
export function isSentryConfigured(): boolean {
  const env = getEnv();
  return Boolean(env.NEXT_PUBLIC_SENTRY_DSN);
}

/**
 * Get Sanity configuration (returns null if not configured)
 */
export function getSanityConfig(): { projectId: string; dataset: string; token?: string } | null {
  const env = getEnv();

  if (!env.NEXT_PUBLIC_SANITY_PROJECT_ID || !env.NEXT_PUBLIC_SANITY_DATASET) {
    return null;
  }

  return {
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    token: env.SANITY_API_TOKEN,
  };
}

/**
 * Log environment status (for build-time diagnostics)
 */
export function logEnvStatus(): void {
  const env = getEnv();

  console.log('\n📋 Environment Configuration:');
  console.log('─'.repeat(40));

  // Sanity status
  if (isSanityConfigured()) {
    console.log('✅ Sanity: Configured');
    if (isSanityWriteConfigured()) {
      console.log('   └─ Write access: Enabled');
    } else {
      console.log('   └─ Write access: Disabled (read-only)');
    }
  } else {
    console.log('⚠️  Sanity: Not configured (using demo data)');
  }

  // Auth status
  if (isCMSAuthConfigured()) {
    console.log('✅ CMS Auth: Configured');
  } else {
    if (env.CMS_PASSWORD && !env.CMS_SESSION_SECRET) {
      console.log('⚠️  CMS Auth: Password set but missing CMS_SESSION_SECRET');
    } else {
      console.log('ℹ️  CMS Auth: Not configured (public access)');
    }
  }

  // Sentry status
  if (isSentryConfigured()) {
    console.log('✅ Sentry: Configured');
  } else {
    console.log('ℹ️  Sentry: Not configured (no error tracking)');
  }

  console.log('─'.repeat(40) + '\n');
}

/**
 * Validate environment at build time (called from next.config.ts)
 */
export function validateEnvAtBuild(): void {
  // Only log in production build
  if (process.env.NODE_ENV === 'production') {
    logEnvStatus();
  }
}
