'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Blog Post type definition
 * Based on the Sanity schema structure from CMS_ROADMAP.md
 */
export interface BlogPost {
  _id: string;
  _type: 'post';
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  author?: {
    name: string;
    image?: string;
  };
  publishedAt?: string;
  featured?: boolean;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
}

/**
 * Partial update type for blog posts
 */
export type BlogPostUpdate = Partial<Omit<BlogPost, '_id' | '_type' | '_createdAt'>>;

/**
 * Hook state interface
 */
interface UsePostsState {
  posts: BlogPost[];
  selectedPost: BlogPost | null;
  isLoading: boolean;
  isSaving: boolean;
  isConnected: boolean;
  isDemoMode: boolean;
  error: string | null;
}

/**
 * Hook return type
 */
interface UsePostsReturn extends UsePostsState {
  loadPosts: () => Promise<void>;
  selectPost: (slug: string | null) => void;
  updatePost: (slug: string, updates: BlogPostUpdate) => Promise<void>;
  deletePost: (slug: string) => Promise<void>;
  searchPosts: (query: string) => BlogPost[];
  createPost: (post: Omit<BlogPost, '_id' | '_type' | '_createdAt' | '_updatedAt'>) => Promise<void>;
}

/**
 * Demo mode data - fallback when Sanity is not connected
 */
const DEMO_POSTS: BlogPost[] = [
  {
    _id: 'demo-1',
    _type: 'post',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: 'Getting Started with Adapty',
    slug: 'getting-started',
    excerpt: 'Learn how to integrate Adapty into your mobile app',
    body: 'This is a demo post. Connect to Sanity to manage real content.',
    category: 'Tutorial',
    tags: ['getting-started', 'mobile'],
    featured: true,
    publishedAt: new Date().toISOString(),
  },
  {
    _id: 'demo-2',
    _type: 'post',
    _createdAt: new Date().toISOString(),
    _updatedAt: new Date().toISOString(),
    title: 'Understanding Subscription Analytics',
    slug: 'subscription-analytics',
    excerpt: 'Deep dive into subscription metrics and analytics',
    body: 'This is a demo post. Connect to Sanity to manage real content.',
    category: 'Analytics',
    tags: ['analytics', 'subscriptions'],
    featured: false,
    publishedAt: new Date().toISOString(),
  },
];

/**
 * Custom hook for managing blog posts state and CRUD operations
 *
 * This hook manages the state for the CMS and provides functions for:
 * - Loading posts from Sanity (or demo data as fallback)
 * - Selecting posts for editing
 * - Updating posts with auto-save debouncing
 * - Deleting posts
 * - Searching/filtering posts
 * - Creating new posts
 *
 * Dependencies (to be created):
 * - /src/lib/blog-service.ts - Service layer for blog operations
 * - /src/app/actions/blog.ts - Server actions for write operations
 * - /src/sanity/client.ts - Sanity client configuration
 *
 * @example
 * ```tsx
 * function CmsPage() {
 *   const {
 *     posts,
 *     selectedPost,
 *     isLoading,
 *     isDemoMode,
 *     loadPosts,
 *     selectPost,
 *     updatePost,
 *     deletePost,
 *     searchPosts
 *   } = usePosts();
 *
 *   useEffect(() => {
 *     loadPosts();
 *   }, []);
 *
 *   return (
 *     <div>
 *       {isDemoMode && <DemoBanner />}
 *       <PostList posts={posts} onSelect={selectPost} />
 *       {selectedPost && (
 *         <PostEditor
 *           post={selectedPost}
 *           onUpdate={(updates) => updatePost(selectedPost.slug, updates)}
 *         />
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function usePosts(): UsePostsReturn {
  // State management
  const [state, setState] = useState<UsePostsState>({
    posts: [],
    selectedPost: null,
    isLoading: false,
    isSaving: false,
    isConnected: false,
    isDemoMode: true,
    error: null,
  });

  // Debounce timer for auto-save
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // In-memory cache for demo mode
  const demoPostsRef = useRef<BlogPost[]>([...DEMO_POSTS]);

  /**
   * Check if Sanity is connected
   */
  const checkConnection = useCallback(async (): Promise<boolean> => {
    try {
      // Check if required environment variables are set
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

      if (!projectId || !dataset || projectId === 'demo') {
        return false;
      }

      // TODO: When blog-service.ts is created, check actual connection
      // const { checkSanityConnection } = await import('@/lib/blog-service');
      // return await checkSanityConnection();

      return false; // Default to demo mode until service is implemented
    } catch (error) {
      console.error('Connection check failed:', error);
      return false;
    }
  }, []);

  /**
   * Load all posts from Sanity or demo data
   */
  const loadPosts = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const isConnected = await checkConnection();

      if (isConnected) {
        // TODO: When blog-service.ts is created, use it to fetch real data
        // const { getAllPosts } = await import('@/lib/blog-service');
        // const posts = await getAllPosts();

        setState((prev) => ({
          ...prev,
          posts: [],
          isLoading: false,
          isConnected: true,
          isDemoMode: false,
        }));
      } else {
        // Use demo data
        setState((prev) => ({
          ...prev,
          posts: demoPostsRef.current,
          isLoading: false,
          isConnected: false,
          isDemoMode: true,
        }));
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
      setState((prev) => ({
        ...prev,
        posts: demoPostsRef.current,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load posts',
        isDemoMode: true,
      }));
    }
  }, [checkConnection]);

  /**
   * Select a post for editing by slug
   */
  const selectPost = useCallback((slug: string | null) => {
    setState((prev) => {
      if (!slug) {
        return { ...prev, selectedPost: null };
      }

      const post = prev.posts.find((p) => p.slug === slug);
      return {
        ...prev,
        selectedPost: post || null,
      };
    });
  }, []);

  /**
   * Update a post with debounced auto-save
   */
  const updatePost = useCallback(async (slug: string, updates: BlogPostUpdate) => {
    // Clear existing auto-save timer
    if (autoSaveTimerRef.current) {
      clearTimeout(autoSaveTimerRef.current);
    }

    // Optimistically update UI
    setState((prev) => {
      const updatedPosts = prev.posts.map((post) =>
        post.slug === slug
          ? { ...post, ...updates, _updatedAt: new Date().toISOString() }
          : post
      );

      const updatedSelectedPost =
        prev.selectedPost?.slug === slug
          ? { ...prev.selectedPost, ...updates, _updatedAt: new Date().toISOString() }
          : prev.selectedPost;

      // Update demo cache if in demo mode
      if (prev.isDemoMode) {
        demoPostsRef.current = updatedPosts;
      }

      return {
        ...prev,
        posts: updatedPosts,
        selectedPost: updatedSelectedPost,
      };
    });

    // Debounce the actual save operation (2 seconds)
    autoSaveTimerRef.current = setTimeout(async () => {
      setState((prev) => ({ ...prev, isSaving: true }));

      try {
        if (state.isConnected) {
          // TODO: When blog actions are created, use them
          // const { updatePost: updatePostAction } = await import('@/app/actions/blog');
          // await updatePostAction(slug, updates);
        }

        // For demo mode, changes are already in demoPostsRef
        setState((prev) => ({ ...prev, isSaving: false }));
      } catch (error) {
        console.error('Failed to save post:', error);
        setState((prev) => ({
          ...prev,
          isSaving: false,
          error: error instanceof Error ? error.message : 'Failed to save post',
        }));
      }
    }, 2000);
  }, [state.isConnected]);

  /**
   * Delete a post
   */
  const deletePost = useCallback(async (slug: string) => {
    setState((prev) => ({ ...prev, isSaving: true, error: null }));

    try {
      if (state.isConnected) {
        // TODO: When blog actions are created, use them
        // const { deletePost: deletePostAction } = await import('@/app/actions/blog');
        // await deletePostAction(slug);
      }

      // Update state
      setState((prev) => {
        const updatedPosts = prev.posts.filter((post) => post.slug !== slug);

        // Update demo cache if in demo mode
        if (prev.isDemoMode) {
          demoPostsRef.current = updatedPosts;
        }

        return {
          ...prev,
          posts: updatedPosts,
          selectedPost: prev.selectedPost?.slug === slug ? null : prev.selectedPost,
          isSaving: false,
        };
      });
    } catch (error) {
      console.error('Failed to delete post:', error);
      setState((prev) => ({
        ...prev,
        isSaving: false,
        error: error instanceof Error ? error.message : 'Failed to delete post',
      }));
    }
  }, [state.isConnected]);

  /**
   * Search/filter posts by query string
   * Searches in title, excerpt, body, tags, and category
   */
  const searchPosts = useCallback((query: string): BlogPost[] => {
    if (!query.trim()) {
      return state.posts;
    }

    const lowerQuery = query.toLowerCase();

    return state.posts.filter((post) => {
      const searchableText = [
        post.title,
        post.excerpt,
        post.body,
        post.category,
        ...(post.tags || []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(lowerQuery);
    });
  }, [state.posts]);

  /**
   * Create a new post
   */
  const createPost = useCallback(async (
    postData: Omit<BlogPost, '_id' | '_type' | '_createdAt' | '_updatedAt'>
  ) => {
    setState((prev) => ({ ...prev, isSaving: true, error: null }));

    try {
      const now = new Date().toISOString();
      const newPost: BlogPost = {
        ...postData,
        _id: state.isConnected ? 'temp-id' : `demo-${Date.now()}`,
        _type: 'post',
        _createdAt: now,
        _updatedAt: now,
      };

      if (state.isConnected) {
        // TODO: When blog actions are created, use them
        // const { createPost: createPostAction } = await import('@/app/actions/blog');
        // const createdPost = await createPostAction(postData);
        // newPost = createdPost;
      }

      setState((prev) => {
        const updatedPosts = [newPost, ...prev.posts];

        // Update demo cache if in demo mode
        if (prev.isDemoMode) {
          demoPostsRef.current = updatedPosts;
        }

        return {
          ...prev,
          posts: updatedPosts,
          selectedPost: newPost,
          isSaving: false,
        };
      });
    } catch (error) {
      console.error('Failed to create post:', error);
      setState((prev) => ({
        ...prev,
        isSaving: false,
        error: error instanceof Error ? error.message : 'Failed to create post',
      }));
    }
  }, [state.isConnected]);

  // Cleanup auto-save timer on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimerRef.current) {
        clearTimeout(autoSaveTimerRef.current);
      }
    };
  }, []);

  return {
    ...state,
    loadPosts,
    selectPost,
    updatePost,
    deletePost,
    searchPosts,
    createPost,
  };
}
