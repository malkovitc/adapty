// Main Sanity configuration exports
export { client, writeClient, urlFor } from './client'
export type { SanityClient, SanityWriteClient } from './client'

// Query functions
export { getAllPosts, getPostBySlug, getAllCategories, queries } from './queries'

// Export Sanity types from centralized types file
export type {
  SanityPost,
  SanityCategory,
  SanityAuthor,
  SanityPostWithRefs,
  SanityCategoryWithCount,
  SanityImage,
  SanityImageAsset,
  SanitySlug,
} from '@/types/sanity'

// Schemas
export * from './schemas'
