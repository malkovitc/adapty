'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight, Search, Loader2 } from 'lucide-react';
import { type BlogPost, type Category } from '@/data/blog';
import { getAllPosts, getAllCategories } from '@/lib/blog-service';
import { getAssetPath } from '@/lib/utils';

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#F5F5F7] mb-4">
          <Image
            src={getAssetPath(post.image)}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 text-xs font-medium bg-[#F5F5F7] text-[#64748B] rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-[#0F172A] leading-snug group-hover:text-[#4F46E5] transition-colors duration-200">
            {post.title}
          </h3>
          <p className="text-sm text-[#64748B] leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center text-sm font-medium text-[#4F46E5] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Read article
            <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#F5F5F7]">
          <Image
            src={getAssetPath(post.image)}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            unoptimized
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 text-sm font-medium bg-[#4F46E5]/10 text-[#4F46E5] rounded-full">
              Featured
            </span>
            <span className="px-3 py-1.5 text-sm font-medium bg-[#F5F5F7] text-[#64748B] rounded-full">
              {post.category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] leading-tight group-hover:text-[#4F46E5] transition-colors duration-200">
            {post.title}
          </h2>
          <p className="text-base text-[#64748B] leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
            <span>{post.date}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
          <div className="flex items-center text-base font-semibold text-[#4F46E5]">
            Read article
            <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Fetch posts and categories from blog-service (Sanity or static fallback)
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const [fetchedPosts, fetchedCategories] = await Promise.all([
          getAllPosts(),
          getAllCategories()
        ]);

        if (!cancelled) {
          setPosts(fetchedPosts);
          setCategories(fetchedCategories);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to fetch blog data:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = !activeCategory || post.category.toLowerCase().replace(/\s+/g, '-') === activeCategory;
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);
  const visiblePosts = searchQuery ? filteredPosts : remainingPosts.slice(0, visibleCount);

  // Load more articles handler
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 12);
  };

  // Newsletter form handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
      return;
    }

    setNewsletterStatus('loading');

    // Simulate API call (replace with actual newsletter service)
    try {
      // In production, replace this with actual newsletter API call
      // e.g., await fetch('/api/newsletter', { method: 'POST', body: JSON.stringify({ email }) })
      await new Promise(resolve => setTimeout(resolve, 1000));

      setNewsletterStatus('success');
      setEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    } catch (error) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#0F172A] hover:text-[#4F46E5] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold text-xl tracking-tight">adapty</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/#product" className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors">Product</Link>
              <Link href="/#pricing" className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors">Pricing</Link>
              <Link href="/blog" className="text-sm font-medium text-[#0F172A]">Blog</Link>
              <Link href="/#docs" className="text-sm text-[#64748B] hover:text-[#0F172A] transition-colors">Docs</Link>
            </nav>
            <div className="flex items-center gap-4">
              <Link
                href="#login"
                className="text-sm font-medium text-[#64748B] hover:text-[#0F172A] transition-colors"
              >
                Log in
              </Link>
              <Link
                href="#signup"
                className="px-4 py-2 text-sm font-medium text-white bg-[#0F172A] rounded-lg hover:bg-[#1E293B] transition-colors"
              >
                Start for free
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-12 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4"
            >
              Adapty Blog
            </motion.h1>
            <p className="text-lg text-[#64748B]" style={{ maxWidth: '640px', margin: '0 auto' }}>
              Insights, tutorials, and best practices for mobile app monetization
            </p>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-8 mx-auto px-4"
            style={{ maxWidth: '36rem', width: '100%' }}
          >
            <div className="relative" style={{ width: '100%' }}>
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5] transition-all"
                style={{ width: '100%' }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-[#E5E7EB] bg-white sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {loading ? (
              // Loading skeleton for categories
              <>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="px-4 py-2 bg-[#F5F5F7] rounded-full animate-pulse" style={{ width: '120px', height: '36px' }} />
                ))}
              </>
            ) : (
              categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setActiveCategory(category.slug)}
                  className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                    activeCategory === category.slug
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-[#F5F5F7] text-[#64748B] hover:bg-[#E5E7EB] hover:text-[#0F172A]'
                  }`}
                >
                  {category.name}
                  <span className="ml-1.5 text-xs opacity-60">({category.count})</span>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            // Loading skeleton for posts
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-[#4F46E5] animate-spin mb-4" />
              <p className="text-[#64748B]">Loading articles...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-[#64748B]">No articles found matching your criteria.</p>
              <button
                onClick={() => { setActiveCategory(''); setSearchQuery(''); }}
                className="mt-4 text-[#4F46E5] font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featuredPost && !searchQuery && (
                <div className="mb-16">
                  <FeaturedPost post={featuredPost} />
                </div>
              )}

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visiblePosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>

              {/* Load more */}
              {!searchQuery && visibleCount < remainingPosts.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={handleLoadMore}
                    className="px-6 py-3 text-sm font-medium text-[#0F172A] bg-[#F5F5F7] rounded-lg hover:bg-[#E5E7EB] transition-colors"
                  >
                    Load more articles
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Newsletter */}
      <section className="py-16 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mx-auto"
            style={{ maxWidth: '42rem' }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Subscribe to our newsletter
            </h2>
            <p className="text-[#94A3B8] mb-8" style={{ maxWidth: '100%' }}>
              Get the latest insights on mobile app monetization delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full" style={{ maxWidth: '28rem', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={newsletterStatus === 'loading'}
                className="flex-1 min-w-0 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent disabled:opacity-50"
                style={{ width: '100%' }}
              />
              <button
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {newsletterStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-green-400 text-sm"
              >
                Thank you for subscribing!
              </motion.p>
            )}
            {newsletterStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-red-400 text-sm"
              >
                Please enter a valid email address.
              </motion.p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0F172A] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#94A3B8]">
              &copy; 2025 Adapty Tech Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
