import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'cms_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Check if CMS authentication is configured
 */
export function isCMSAuthConfigured(): boolean {
  return Boolean(process.env.CMS_PASSWORD && process.env.CMS_SESSION_SECRET);
}

/**
 * Verify password using timing-safe comparison
 */
export function verifyPassword(password: string): boolean {
  const storedPassword = process.env.CMS_PASSWORD;

  if (!storedPassword) {
    // If no password configured, auth is disabled
    return true;
  }

  // Ensure both strings are the same length for timing-safe comparison
  const passwordBuffer = Buffer.from(password);
  const storedBuffer = Buffer.from(storedPassword);

  if (passwordBuffer.length !== storedBuffer.length) {
    return false;
  }

  return timingSafeEqual(passwordBuffer, storedBuffer);
}

/**
 * Create a signed session token
 */
export function createSessionToken(): string {
  const secret = process.env.CMS_SESSION_SECRET;

  if (!secret) {
    throw new Error('CMS_SESSION_SECRET is not configured');
  }

  const payload = {
    exp: Date.now() + SESSION_DURATION_MS,
    iat: Date.now(),
  };

  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = createHmac('sha256', secret)
    .update(payloadBase64)
    .digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify and decode a session token
 */
export function verifySessionToken(token: string): { valid: boolean; expired: boolean } {
  const secret = process.env.CMS_SESSION_SECRET;

  if (!secret) {
    return { valid: false, expired: false };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, expired: false };
  }

  const [payloadBase64, signature] = parts;

  // Verify signature
  const expectedSignature = createHmac('sha256', secret)
    .update(payloadBase64)
    .digest('base64url');

  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedBuffer.length) {
    return { valid: false, expired: false };
  }

  if (!timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return { valid: false, expired: false };
  }

  // Decode and check expiration
  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString());

    if (typeof payload.exp !== 'number') {
      return { valid: false, expired: false };
    }

    if (Date.now() > payload.exp) {
      return { valid: false, expired: true };
    }

    return { valid: true, expired: false };
  } catch {
    return { valid: false, expired: false };
  }
}

/**
 * Check if current request is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  // If auth is not configured, allow access
  if (!isCMSAuthConfigured()) {
    return true;
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);

  if (!sessionCookie?.value) {
    return false;
  }

  const { valid } = verifySessionToken(sessionCookie.value);
  return valid;
}

/**
 * Set session cookie
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION_MS / 1000, // Convert to seconds
  });
}

/**
 * Clear session cookie
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Require authentication - throws if not authenticated
 */
export async function requireAuth(): Promise<void> {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    throw new Error('Authentication required');
  }
}
