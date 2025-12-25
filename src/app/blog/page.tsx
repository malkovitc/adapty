'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, ChevronRight, Search, Loader2 } from 'lucide-react';
import { type BlogPost, type Category } from '@/data/blog';
import { getAllPosts, getAllCategories } from '@/lib/blog-service';
import { getAssetPath } from '@/lib/utils';

const POSTS_PER_PAGE = 9;

// Pagination Component
function Pagination({
  currentPage,
  totalPages,
  onPageChange
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
              currentPage === page
                ? 'bg-[#0F172A] text-white'
                : 'text-[#64748B] hover:bg-[#F5F5F7] hover:text-[#0F172A]'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-[#94A3B8]">{page}</span>
        )
      ))}
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-10 h-10 rounded-full text-[#64748B] hover:bg-[#F5F5F7] hover:text-[#0F172A] transition-all flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// Blog Card Component
function BlogCard({ post, index, showReadTime = true }: { post: BlogPost; index: number; showReadTime?: boolean }) {
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            unoptimized
            onError={(e) => { e.currentTarget.style.opacity = '0'; }}
          />
          {showReadTime && (
            <div className="absolute bottom-3 right-3 px-2 py-1 bg-[#0F172A]/80 backdrop-blur-sm text-white text-xs rounded-md">
              {post.readTime}
            </div>
          )}
        </div>
        <h3 className="text-base font-semibold text-[#0F172A] leading-snug group-hover:text-[#4F46E5] transition-colors duration-200 line-clamp-2">
          {post.title}
        </h3>
      </Link>
    </motion.article>
  );
}

// Category Section Component
function CategorySection({
  title,
  posts,
  categorySlug
}: {
  title: string;
  posts: BlogPost[];
  categorySlug: string;
}) {
  if (posts.length === 0) return null;

  return (
    <section className="py-12 border-t border-[#E5E7EB]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#0F172A]">{title}</h2>
        <Link
          href={`https://adapty.io/blog/category/${categorySlug}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-sm font-medium text-[#0F172A] hover:text-[#4F46E5] transition-colors"
        >
          More posts
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {posts.slice(0, 4).map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </section>
  );
}

// Featured Post Component
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

// Full Footer Links Data - matches https://adapty.io/blog/ exactly
const fullFooterLinks = {
  paywallManagement: {
    title: 'Paywall management',
    links: [
      { label: 'Paywall builder', href: 'https://adapty.io/paywall-builder/' },
      { label: 'Onboarding builder', href: 'https://adapty.io/onboarding-builder/' },
      { label: 'AI generator', href: 'https://adapty.io/ai-paywall-generator/' },
      { label: 'A/B testing', href: 'https://adapty.io/paywall-ab-testing/' },
      { label: 'Autopilot', href: 'https://adapty.io/autopilot/' },
      { label: 'Targeting', href: 'https://adapty.io/paywall-targeting/' },
      { label: 'Localization', href: 'https://adapty.io/paywall-localization/' },
      { label: 'Remote config', href: 'https://adapty.io/remote-config/' },
    ],
  },
  infrastructure: {
    title: 'Infrastructure',
    links: [
      { label: 'Subscription SDK', href: 'https://adapty.io/sdk/' },
      { label: 'Subscriber sync', href: 'https://adapty.io/subscription-sync/' },
      { label: 'Fallback paywalls', href: 'https://adapty.io/fallback-paywalls/' },
      { label: 'Refund saver', href: 'https://adapty.io/refund-saver/' },
      { label: 'Integrations', href: 'https://adapty.io/integrations/' },
    ],
  },
  roles: {
    title: 'Roles',
    links: [
      { label: 'For developers', href: 'https://adapty.io/for-developers/' },
      { label: 'For marketers', href: 'https://adapty.io/for-marketers/' },
      { label: 'For app owners', href: 'https://adapty.io/for-app-owners/' },
    ],
  },
  stages: {
    title: 'Stages',
    links: [
      { label: 'Indie', href: 'https://adapty.io/for-indie/' },
      { label: 'Startups', href: 'https://adapty.io/for-startups/' },
      { label: 'Publishers', href: 'https://adapty.io/for-publishers/' },
      { label: 'Enterprise', href: 'https://adapty.io/for-enterprises/' },
    ],
  },
  cases: {
    title: 'Cases',
    links: [
      { label: 'Integrate subscriptions', href: 'https://adapty.io/subscription-integration/' },
      { label: 'Grow app revenue', href: 'https://adapty.io/revenue-growth/' },
      { label: 'Analyze performance', href: 'https://adapty.io/performance-analytics/' },
      { label: 'Read our cases', href: 'https://adapty.io/case-studies/' },
    ],
  },
  migrate: {
    title: 'Migrate from',
    links: [
      { label: 'RevenueCat', href: 'https://adapty.io/compare/revenuecat/' },
      { label: 'Purchasely', href: 'https://adapty.io/compare/purchasely/' },
      { label: 'Qonversion', href: 'https://adapty.io/compare/qonversion/' },
      { label: 'Superwall', href: 'https://adapty.io/compare/superwall/' },
    ],
  },
  sdk: {
    title: 'SDK',
    links: [
      { label: 'iOS', href: 'https://adapty.io/sdk/ios/' },
      { label: 'Android', href: 'https://adapty.io/sdk/android/' },
      { label: 'React Native', href: 'https://adapty.io/sdk/react-native/' },
      { label: 'Flutter', href: 'https://adapty.io/sdk/flutter/' },
      { label: 'FlutterFlow', href: 'https://adapty.io/sdk/flutterflow/' },
      { label: 'Kotlin Multiplatform', href: 'https://adapty.io/sdk/kmp/' },
      { label: 'Capacitor', href: 'https://adapty.io/sdk/capacitor/' },
      { label: 'Unity', href: 'https://adapty.io/sdk/unity/' },
      { label: 'Stripe', href: 'https://adapty.io/integrations/stripe/' },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Ebooks', href: 'https://adapty.io/ebooks/' },
      { label: 'Podcast', href: 'https://podcasts.apple.com/us/podcast/subhub-by-adapty-io/id1574462509' },
      { label: 'Webinars', href: 'https://adapty.io/webinars/' },
      { label: 'Events', href: 'https://adapty.io/events/' },
      { label: 'Glossary', href: 'https://adapty.io/glossary/' },
      { label: 'Documentation', href: 'https://adapty.io/docs/' },
      { label: 'Paywall library', href: 'https://adapty.io/paywall-library/' },
      { label: 'LTV prediction model', href: 'https://adapty.io/ltv-prediction-model/' },
      { label: 'Apple fiscal calendar', href: 'https://adapty.io/apple-fiscal-calendar/' },
      { label: 'Apple receipt checker', href: 'https://adapty.io/apple-receipt-checker/' },
      { label: 'Subscription calculator', href: 'https://adapty.io/subscription-app-revenue-calculator/' },
      { label: 'Refund saver calculator', href: 'https://adapty.io/refund-calculator/' },
      { label: 'In-app subscription reports', href: 'https://adapty.io/state-of-in-app-subscriptions/' },
      { label: 'Community', href: 'https://adapty.io/community/' },
    ],
  },
  analytics: {
    title: 'Analytics',
    links: [
      { label: 'Revenue analytics', href: 'https://adapty.io/revenue-analytics/' },
      { label: 'LTV analytics', href: 'https://adapty.io/ltv-analytics/' },
      { label: 'AI predictive analytics', href: 'https://adapty.io/predictive-analytics/' },
      { label: 'Apple ads manager', href: 'https://adapty.io/apple-ads-manager/' },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { label: 'About us', href: 'https://adapty.io/about-us/' },
      { label: 'Contact us', href: 'https://adapty.io/contacts/' },
      { label: 'Careers', href: 'https://adapty.io/careers/' },
      { label: 'Terms', href: 'https://adapty.io/terms/' },
      { label: 'Privacy policy', href: 'https://adapty.io/privacy/' },
      { label: 'Data protection', href: 'https://adapty.io/data-processing-agreement/' },
      { label: 'System status', href: 'https://status.adapty.io/' },
      { label: 'SOC2 compliance', href: 'https://adapty.trustshare.com/home' },
      { label: 'Become a partner', href: 'https://adapty.io/partnerships/' },
    ],
  },
};

const socialLinks = [
  { name: 'X', href: 'https://x.com/adapty', icon: '𝕏' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/adaptyio', icon: 'in' },
  { name: 'Discord', href: 'https://discord.gg/subscriptions-hub', icon: 'D' },
  { name: 'GitHub', href: 'https://github.com/adaptyteam', icon: 'GH' },
  { name: 'YouTube', href: 'https://www.youtube.com/@SubhubEn', icon: 'YT' },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
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

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = !activeCategory || post.category.toLowerCase().replace(/\s+/g, '-') === activeCategory;
      const matchesSearch = !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  // Group posts by category for bottom sections
  const postsByCategory = useMemo(() => {
    const grouped: Record<string, BlogPost[]> = {};
    posts.forEach(post => {
      const categorySlug = post.category.toLowerCase().replace(/\s+/g, '-');
      if (!grouped[categorySlug]) {
        grouped[categorySlug] = [];
      }
      grouped[categorySlug].push(post);
    });
    return grouped;
  }, [posts]);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);
  const totalPages = Math.ceil(remainingPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = searchQuery
    ? filteredPosts
    : remainingPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  // Newsletter form handler
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
      return;
    }

    setNewsletterStatus('loading');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewsletterStatus('success');
      setEmail('');
      setTimeout(() => setNewsletterStatus('idle'), 5000);
    } catch {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
    }
  };

  // Category display config - matching adapty.io/blog section order exactly
  const categoryDisplayOrder = [
    { slug: 'money', title: 'Money' },
    { slug: 'paywall-newsletter', title: 'Paywall Newsletter' },
    { slug: 'podcast', title: 'Podcast' },
    { slug: 'product-releases', title: 'Product-releases' },
    { slug: 'trends-insights', title: 'Trends-insights' },
    { slug: 'tutorial', title: 'Tutorial' },
  ];

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

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
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
              {featuredPost && !searchQuery && currentPage === 1 && (
                <div className="mb-16">
                  <FeaturedPost post={featuredPost} />
                </div>
              )}

              {/* Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} showReadTime={false} />
                ))}
              </div>

              {/* Pagination */}
              {!searchQuery && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Category Sections */}
      {!loading && !searchQuery && !activeCategory && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categoryDisplayOrder.map(({ slug, title }) => (
            <CategorySection
              key={slug}
              title={title}
              posts={postsByCategory[slug] || []}
              categorySlug={slug}
            />
          ))}
        </div>
      )}

      {/* Full Footer with CTA */}
      <footer className="bg-[#1A1A2E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CTA Section */}
          <div className="py-16 flex flex-col lg:flex-row items-center justify-between gap-8 border-b border-white/10">
            <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight" style={{ maxWidth: '32rem' }}>
              Get started today or schedule a demo for your personal onboarding
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="https://adapty.io/signup/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-sm font-semibold text-white bg-transparent border border-white rounded-lg hover:bg-white/10 transition-colors text-center uppercase tracking-wide"
              >
                Start for free
              </Link>
              <Link
                href="https://adapty.io/demo/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 text-sm font-semibold text-white bg-[#7C3AED] rounded-lg hover:bg-[#6D28D9] transition-colors text-center uppercase tracking-wide"
              >
                Schedule a demo
              </Link>
            </div>
          </div>

          {/* Logo and Social */}
          <div className="py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/10">
            <Link href="/" className="text-2xl font-bold text-white">
              adapty
            </Link>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors text-sm font-bold"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Grid */}
          <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.values(fullFooterLinks).map((column) => (
              <div key={column.title}>
                <h3 className="font-semibold text-white mb-4 text-sm">{column.title}</h3>
                <ul className="space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-slate-400 hover:text-white text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="py-12 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Subscribe to our newsletter</h3>
                <p className="text-slate-400 text-sm">Get the latest insights on mobile app monetization.</p>
              </div>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={newsletterStatus === 'loading'}
                  className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors disabled:opacity-50"
                >
                  {newsletterStatus === 'loading' ? '...' : 'Subscribe'}
                </button>
              </form>
            </div>
            {newsletterStatus === 'success' && (
              <p className="mt-4 text-green-400 text-sm">Thank you for subscribing!</p>
            )}
            {newsletterStatus === 'error' && (
              <p className="mt-4 text-red-400 text-sm">Please enter a valid email address.</p>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Adapty Tech Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <a href="https://adapty.io/privacy/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy</a>
              <a href="https://adapty.io/terms/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms</a>
              <a href="https://adapty.io/contact/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
