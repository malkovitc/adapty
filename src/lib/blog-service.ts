/**
 * Blog Service Layer
 * Abstracts data fetching - can switch between static data and Sanity CMS
 */

import { posts as staticPosts, categories as staticCategories, type BlogPost, type Category } from '@/data/blog';
import type { SanityPostWithRefs, SanityCategoryWithCount } from '@/types/sanity';

// Check if Sanity is configured
const isSanityConfigured = () => {
  return !!(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_DATASET &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.length > 0 &&
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID.startsWith('your_')
  );
};

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (isSanityConfigured()) {
    try {
      const { getAllPosts: sanityGetAllPosts } = await import('@/sanity/queries');
      const sanityPosts = await sanityGetAllPosts();
      if (sanityPosts && sanityPosts.length > 0) {
        return sanityPosts.map(transformSanityPost);
      }
    } catch (error) {
      console.error('Failed to fetch from Sanity, falling back to static data:', error);
    }
  }

  return staticPosts;
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isSanityConfigured()) {
    try {
      const { getPostBySlug: sanityGetPostBySlug } = await import('@/sanity/queries');
      const sanityPost = await sanityGetPostBySlug(slug);
      if (sanityPost) {
        return transformSanityPost(sanityPost);
      }
    } catch (error) {
      console.error('Failed to fetch from Sanity, falling back to static data:', error);
    }
  }

  return staticPosts.find(p => p.slug === slug) || null;
}

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<Category[]> {
  if (isSanityConfigured()) {
    try {
      const { getAllCategories: sanityGetAllCategories } = await import('@/sanity/queries');
      const sanityCategories = await sanityGetAllCategories();
      if (sanityCategories && sanityCategories.length > 0) {
        const totalCount = sanityCategories.reduce((acc: number, c: SanityCategoryWithCount) => acc + (c.count || 0), 0);
        return [
          { name: "All categories", count: totalCount, slug: "" },
          ...sanityCategories.map(transformSanityCategory)
        ];
      }
    } catch (error) {
      console.error('Failed to fetch from Sanity, falling back to static data:', error);
    }
  }

  return staticCategories;
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(categorySlug: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  if (!categorySlug) return allPosts;

  return allPosts.filter(post =>
    post.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );
}

/**
 * Search posts
 */
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  if (!query) return allPosts;

  const searchLower = query.toLowerCase();
  return allPosts.filter(post =>
    post.title.toLowerCase().includes(searchLower) ||
    post.excerpt.toLowerCase().includes(searchLower)
  );
}

// Transform Sanity document to BlogPost interface
function transformSanityPost(sanityPost: SanityPostWithRefs): BlogPost {
  // Extract slug value (handle both object and string)
  const slug = typeof sanityPost.slug === 'string'
    ? sanityPost.slug
    : sanityPost.slug?.current || '';

  // Extract category name (handle both object and string)
  const category = typeof sanityPost.category === 'string'
    ? sanityPost.category
    : sanityPost.category?.name || 'General';

  return {
    title: sanityPost.title || '',
    slug,
    image: sanityPost.mainImage?.asset?.url || '/images/blog/placeholder.png',
    category,
    date: formatDate(sanityPost.publishedAt || sanityPost._createdAt),
    readTime: typeof sanityPost.readTime === 'number'
      ? `${sanityPost.readTime} min read`
      : sanityPost.readTime || '5 min read',
    excerpt: sanityPost.excerpt || '',
  };
}

// Transform Sanity category to Category interface
function transformSanityCategory(sanityCategory: SanityCategoryWithCount): Category {
  // Extract slug value (handle both object and string)
  const slug = typeof sanityCategory.slug === 'string'
    ? sanityCategory.slug
    : sanityCategory.slug?.current || '';

  return {
    name: sanityCategory.name || '',
    slug,
    count: sanityCategory.count || 0,
  };
}

// Format date string
function formatDate(dateString: string): string {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

// ============ WRITE OPERATIONS (for CMS) ============
//
// SECURITY WARNING: These functions use the SANITY_API_TOKEN and should NEVER
// be called directly from client components ('use client'). Always use Server
// Actions (see src/app/actions/blog.ts) when calling these from client code.
//
// Safe to use from:
// - Server Actions ('use server')
// - API Routes (app/api/*)
// - Server Components (default in app directory)
// - getServerSideProps, getStaticProps (pages directory)
//
// DO NOT use from:
// - Client Components ('use client')
// - Browser event handlers in client components
// - Client-side useEffect hooks
//

/**
 * Create a new post
 * WARNING: Do not call this directly from client components. Use createPostAction instead.
 */
export async function createPost(post: Partial<BlogPost>): Promise<BlogPost | null> {
  if (!isSanityConfigured() || !process.env.SANITY_API_TOKEN) {
    console.warn('Sanity not configured for write operations');
    return null;
  }

  try {
    const { writeClient } = await import('@/sanity/client');
    const doc = {
      _type: 'post',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      excerpt: post.excerpt,
      readTime: post.readTime,
      publishedAt: new Date().toISOString(),
    };

    const created = await writeClient.create(doc);
    return transformSanityPost(created as SanityPostWithRefs);
  } catch (error) {
    console.error('Failed to create post:', error);
    return null;
  }
}

/**
 * Update an existing post
 * WARNING: Do not call this directly from client components. Use updatePostAction instead.
 */
export async function updatePost(slug: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  if (!isSanityConfigured() || !process.env.SANITY_API_TOKEN) {
    console.warn('Sanity not configured for write operations');
    return null;
  }

  try {
    const { client, writeClient } = await import('@/sanity/client');

    // First get the document ID
    const existingPost = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{ _id }`,
      { slug }
    );

    if (!existingPost?._id) {
      console.error('Post not found:', slug);
      return null;
    }

    const updated = await writeClient
      .patch(existingPost._id)
      .set({
        title: updates.title,
        excerpt: updates.excerpt,
        readTime: updates.readTime,
      })
      .commit();

    return transformSanityPost(updated as unknown as SanityPostWithRefs);
  } catch (error) {
    console.error('Failed to update post:', error);
    return null;
  }
}

/**
 * Delete a post
 * WARNING: Do not call this directly from client components. Use deletePostAction instead.
 */
export async function deletePost(slug: string): Promise<boolean> {
  if (!isSanityConfigured() || !process.env.SANITY_API_TOKEN) {
    console.warn('Sanity not configured for write operations');
    return false;
  }

  try {
    const { client, writeClient } = await import('@/sanity/client');

    // First get the document ID
    const existingPost = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{ _id }`,
      { slug }
    );

    if (!existingPost?._id) {
      console.error('Post not found:', slug);
      return false;
    }

    await writeClient.delete(existingPost._id);
    return true;
  } catch (error) {
    console.error('Failed to delete post:', error);
    return false;
  }
}

/**
 * Check if CMS is available for write operations
 */
export function isCMSWriteEnabled(): boolean {
  return isSanityConfigured() && !!process.env.SANITY_API_TOKEN &&
    process.env.SANITY_API_TOKEN !== 'your_write_token';
}

/**
 * Check if CMS is configured (read operations)
 */
export function isCMSConfigured(): boolean {
  return isSanityConfigured();
}
