import { client } from './client'
import type {
  SanityPostWithRefs,
  SanityCategoryWithCount,
} from '@/types/sanity'

// GROQ query for fetching all posts
const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readTime,
  featured,
  category->{
    _id,
    name,
    slug,
    color
  }
}`

// GROQ query for fetching a single post by slug
const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage,
  publishedAt,
  readTime,
  body,
  category->{
    _id,
    name,
    slug,
    color
  },
  author->{
    _id,
    name,
    image
  }
}`

// GROQ query for fetching all categories with post counts
const allCategoriesQuery = `*[_type == "category"] | order(name asc) {
  _id,
  name,
  slug,
  description,
  color,
  "count": count(*[_type == "post" && references(^._id)])
}`

/**
 * Fetch all blog posts ordered by published date (newest first)
 * @returns Array of posts with basic information
 */
export async function getAllPosts(): Promise<SanityPostWithRefs[]> {
  try {
    const posts = await client.fetch<SanityPostWithRefs[]>(allPostsQuery)
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

/**
 * Fetch a single post by its slug
 * @param slug - The post slug (e.g., 'my-blog-post')
 * @returns Single post with full content or null if not found
 */
export async function getPostBySlug(slug: string): Promise<SanityPostWithRefs | null> {
  try {
    const post = await client.fetch<SanityPostWithRefs>(postBySlugQuery, { slug })
    return post
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch all categories with post counts
 * @returns Array of categories ordered by name
 */
export async function getAllCategories(): Promise<SanityCategoryWithCount[]> {
  try {
    const categories = await client.fetch<SanityCategoryWithCount[]>(allCategoriesQuery)
    return categories
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

// Export raw queries for advanced usage
export const queries = {
  allPosts: allPostsQuery,
  postBySlug: postBySlugQuery,
  allCategories: allCategoriesQuery,
} as const
