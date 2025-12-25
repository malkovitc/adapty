/**
 * Sanity CMS TypeScript Type Definitions
 *
 * These types define the structure of documents in Sanity CMS
 * and ensure type safety when fetching and transforming data.
 */

// ============================================================================
// Base Sanity Types
// ============================================================================

/**
 * Sanity image asset type
 */
export interface SanityImageAsset {
  _id?: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
    };
  };
}

/**
 * Sanity image with asset reference
 */
export interface SanityImage {
  asset?: SanityImageAsset;
  hotspot?: {
    x: number;
    y: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

/**
 * Sanity slug type
 */
export interface SanitySlug {
  current: string;
  _type?: 'slug';
}

// ============================================================================
// Document Types
// ============================================================================

/**
 * Sanity blog post document
 */
export interface SanityPost {
  _id: string;
  _type?: 'post';
  _createdAt: string;
  _updatedAt?: string;
  title: string;
  slug: SanitySlug | string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt?: string;
  readTime?: number | string;
  featured?: boolean;
  category?: SanityCategory | string;
  body?: any; // Portable Text
  author?: SanityAuthor;
}

/**
 * Sanity category document
 */
export interface SanityCategory {
  _id: string;
  _type?: 'category';
  name: string;
  slug: SanitySlug | string;
  description?: string;
  color?: string;
  count?: number;
}

/**
 * Sanity author document
 */
export interface SanityAuthor {
  _id: string;
  _type?: 'author';
  name: string;
  slug?: SanitySlug | string;
  image?: SanityImage;
  bio?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Extract slug string from Sanity slug object or string
 */
export type SlugValue<T> = T extends SanitySlug
  ? string
  : T extends string
  ? string
  : never;

/**
 * Helper to get the current value of a slug (handles both object and string)
 */
export function getSlugValue(slug: SanitySlug | string | undefined): string {
  if (!slug) return '';
  if (typeof slug === 'string') return slug;
  return slug.current || '';
}

/**
 * Helper to get image URL from Sanity image
 */
export function getImageUrl(image: SanityImage | undefined): string | undefined {
  return image?.asset?.url;
}

// ============================================================================
// Query Result Types
// ============================================================================

/**
 * Type for posts fetched from Sanity with populated references
 */
export interface SanityPostWithRefs extends Omit<SanityPost, 'category' | 'author'> {
  category?: SanityCategory;
  author?: SanityAuthor;
}

/**
 * Type for categories fetched from Sanity with post counts
 */
export interface SanityCategoryWithCount extends SanityCategory {
  count: number;
}
