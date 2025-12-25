import { z } from 'zod';

/**
 * Zod schemas for blog post validation
 */

// Slug must be kebab-case
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const BlogPostSchema = z.object({
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(100, 'Slug must be 100 characters or less')
    .regex(slugRegex, 'Slug must be kebab-case (lowercase letters, numbers, and hyphens)'),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or less'),
  excerpt: z
    .string()
    .min(10, 'Excerpt must be at least 10 characters')
    .max(500, 'Excerpt must be 500 characters or less'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  readTime: z.string().min(1, 'Read time is required'),
  image: z.string().url('Image must be a valid URL').or(z.string().startsWith('/')),
  author: z.object({
    name: z.string().min(1, 'Author name is required'),
    avatar: z.string().optional(),
    role: z.string().optional(),
  }),
});

export const UpdatePostSchema = BlogPostSchema.partial().omit({ slug: true });

export const CreatePostSchema = BlogPostSchema;

// Schema for transforming Sanity responses
export const SanityPostSchema = z.object({
  _id: z.string(),
  _type: z.literal('post').optional(),
  slug: z.object({ current: z.string() }).transform((s) => s.current),
  title: z.string(),
  excerpt: z.string().nullable().transform((e) => e ?? ''),
  category: z.string().nullable().transform((c) => c ?? 'Uncategorized'),
  publishedAt: z.string().nullable().transform((d) => {
    if (!d) return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }),
  readTime: z.string().nullable().transform((r) => r ?? '5 min read'),
  mainImage: z.object({ asset: z.object({ url: z.string() }) }).nullable().transform((img) => img?.asset?.url ?? '/images/placeholder.jpg'),
  author: z.object({
    name: z.string(),
    image: z.object({ asset: z.object({ url: z.string() }) }).nullable().optional(),
    role: z.string().nullable().optional(),
  }).nullable().transform((a) => ({
    name: a?.name ?? 'Adapty Team',
    avatar: a?.image?.asset?.url,
    role: a?.role ?? undefined,
  })),
});

// Type exports
export type BlogPost = z.infer<typeof BlogPostSchema>;
export type UpdatePost = z.infer<typeof UpdatePostSchema>;
export type CreatePost = z.infer<typeof CreatePostSchema>;
export type SanityPost = z.input<typeof SanityPostSchema>;

// Validation helpers
export function validatePost(data: unknown): { success: true; data: BlogPost } | { success: false; error: z.ZodError } {
  const result = BlogPostSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

export function validateUpdate(data: unknown): { success: true; data: UpdatePost } | { success: false; error: z.ZodError } {
  const result = UpdatePostSchema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}

export function transformSanityPost(data: unknown): BlogPost | null {
  try {
    const result = SanityPostSchema.safeParse(data);
    if (!result.success) {
      console.error('Failed to transform Sanity post:', result.error.flatten());
      return null;
    }

    // Map transformed Sanity data to BlogPost shape
    const sanityData = result.data;
    return {
      slug: sanityData.slug,
      title: sanityData.title,
      excerpt: sanityData.excerpt,
      category: sanityData.category,
      date: sanityData.publishedAt,
      readTime: sanityData.readTime,
      image: sanityData.mainImage,
      author: sanityData.author,
    };
  } catch (error) {
    console.error('Error transforming Sanity post:', error);
    return null;
  }
}
