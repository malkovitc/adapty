'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, User, Twitter, Linkedin, Facebook, Link as LinkIcon, ChevronRight } from 'lucide-react';
import { posts, type BlogPost } from '@/data/blog';
import { getAssetPath } from '@/lib/utils';

function TableOfContents() {
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'key-concepts', title: 'Key Concepts' },
    { id: 'implementation', title: 'Implementation Details' },
    { id: 'best-practices', title: 'Best Practices' },
    { id: 'common-pitfalls', title: 'Common Pitfalls' },
    { id: 'conclusion', title: 'Conclusion' },
  ];

  return (
    <div className="sticky top-24 hidden lg:block">
      <div className="bg-[#F8FAFC] rounded-xl p-6 border border-[#E5E7EB]">
        <h3 className="text-sm font-semibold text-[#0F172A] mb-4 uppercase tracking-wide">Table of Contents</h3>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="block text-sm text-[#64748B] hover:text-[#6366F1] transition-colors py-1.5">{section.title}</a>
          ))}
        </nav>
      </div>
    </div>
  );
}

function ShareButtons() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#64748B]">Share:</span>
      <div className="flex items-center gap-2">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F5F5F7] hover:bg-[#6366F1] text-[#64748B] hover:text-white transition-all" aria-label="Share on Twitter"><Twitter className="w-4 h-4" /></button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F5F5F7] hover:bg-[#0077B5] text-[#64748B] hover:text-white transition-all" aria-label="Share on LinkedIn"><Linkedin className="w-4 h-4" /></button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F5F5F7] hover:bg-[#1877F2] text-[#64748B] hover:text-white transition-all" aria-label="Share on Facebook"><Facebook className="w-4 h-4" /></button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#F5F5F7] hover:bg-[#0F172A] text-[#64748B] hover:text-white transition-all" aria-label="Copy link"><LinkIcon className="w-4 h-4" /></button>
      </div>
    </div>
  );
}

function AuthorInfo() {
  return (
    <div className="flex items-center gap-4 py-6 border-y border-[#E5E7EB]">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center text-white text-xl font-bold">AT</div>
      <div className="flex-1">
        <h3 className="text-base font-semibold text-[#0F172A]">Adapty Team</h3>
        <p className="text-sm text-[#64748B] mt-1">Expert insights on mobile app monetization and growth strategies</p>
      </div>
    </div>
  );
}

function RelatedPosts({ currentSlug, category }: { currentSlug: string; category: string }) {
  const relatedPosts = posts.filter(post => post.slug !== currentSlug).filter(post => post.category === category).slice(0, 3);
  if (relatedPosts.length < 3) {
    const additionalPosts = posts.filter(post => post.slug !== currentSlug && !relatedPosts.includes(post)).slice(0, 3 - relatedPosts.length);
    relatedPosts.push(...additionalPosts);
  }
  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-[#E5E7EB]">
      <h2 className="text-2xl font-bold text-[#0F172A] mb-8">Related Articles</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-[#F5F5F7] mb-4">
              <Image src={getAssetPath(post.image)} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
            </div>
            <div className="space-y-2">
              <span className="inline-block px-2.5 py-1 text-xs font-medium bg-[#F5F5F7] text-[#64748B] rounded-full">{post.category}</span>
              <h3 className="text-base font-semibold text-[#0F172A] leading-snug group-hover:text-[#6366F1] transition-colors">{post.title}</h3>
              <p className="text-sm text-[#64748B] line-clamp-2">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/blog" className="flex items-center gap-2 text-[#0F172A] hover:text-[#6366F1] transition-colors">
              <ArrowLeft className="w-5 h-5" /><span className="font-semibold">Back to Blog</span>
            </Link>
            <Link href="/" className="font-semibold text-xl tracking-tight text-[#0F172A]">adapty</Link>
          </div>
        </div>
      </header>

      <section className="pt-12 pb-8 bg-gradient-to-b from-[#F8FAFC] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <span className="px-3 py-1.5 text-sm font-medium bg-[#6366F1]/10 text-[#6366F1] rounded-full">{post.category}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#64748B]">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{post.date}</span></div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{post.readTime}</span></div>
              <div className="flex items-center gap-2"><User className="w-4 h-4" /><span>Adapty Team</span></div>
            </div>
            <div className="lg:hidden"><ShareButtons /></div>
          </motion.div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#F5F5F7]">
            <Image src={getAssetPath(post.image)} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 896px" unoptimized />
          </motion.div>
        </div>
      </section>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            <div className="max-w-4xl">
              <AuthorInfo />
              <article className="prose prose-lg max-w-none mt-8">
                <div className="space-y-6 text-[#0F172A]">
                  <div id="introduction" className="scroll-mt-24"><p className="text-lg leading-relaxed text-[#64748B]">{post.excerpt}</p></div>
                  <p className="leading-relaxed text-[#475569]">In today's competitive mobile app landscape, understanding the nuances of this topic is crucial for success.</p>
                  <div id="key-concepts" className="scroll-mt-24 pt-8">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Key Concepts</h2>
                    <p className="leading-relaxed text-[#475569]">Before diving deep into implementation details, it's essential to understand the fundamental concepts.</p>
                    <ul className="space-y-3 my-6">
                      <li className="flex gap-3"><span className="text-[#6366F1] mt-1.5">•</span><span className="text-[#475569]">Understanding user behavior patterns</span></li>
                      <li className="flex gap-3"><span className="text-[#6366F1] mt-1.5">•</span><span className="text-[#475569]">Implementing data-driven decisions</span></li>
                      <li className="flex gap-3"><span className="text-[#6366F1] mt-1.5">•</span><span className="text-[#475569]">Balancing UX with business objectives</span></li>
                    </ul>
                  </div>
                  <div id="implementation" className="scroll-mt-24 pt-8">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Implementation Details</h2>
                    <div className="bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl p-6 my-6">
                      <h3 className="text-xl font-semibold text-[#0F172A] mb-3">Step 1: Initial Setup</h3>
                      <p className="text-[#475569]">Begin by establishing a solid foundation.</p>
                    </div>
                  </div>
                  <div id="best-practices" className="scroll-mt-24 pt-8">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Best Practices</h2>
                    <div className="grid md:grid-cols-2 gap-4 my-6">
                      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5"><h4 className="font-semibold text-[#0F172A] mb-2">Monitor Metrics</h4><p className="text-sm text-[#64748B]">Track what matters most.</p></div>
                      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5"><h4 className="font-semibold text-[#0F172A] mb-2">Iterate Continuously</h4><p className="text-sm text-[#64748B]">Regular optimization is key.</p></div>
                    </div>
                  </div>
                  <div id="common-pitfalls" className="scroll-mt-24 pt-8">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Common Pitfalls</h2>
                    <div className="flex gap-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                      <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm font-bold">!</div>
                      <div><h4 className="font-semibold text-[#0F172A] mb-1">Ignoring Guidelines</h4><p className="text-sm text-[#64748B]">This can lead to rejection.</p></div>
                    </div>
                  </div>
                  <div id="conclusion" className="scroll-mt-24 pt-8">
                    <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Conclusion</h2>
                    <p className="leading-relaxed text-[#475569]">Success requires technical expertise and continuous optimization.</p>
                  </div>
                  <div className="mt-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-2xl p-8 text-white">
                    <h3 className="text-2xl font-bold mb-3">Ready to take your app to the next level?</h3>
                    <p className="text-white/90 mb-6">Adapty helps developers optimize monetization.</p>
                    <Link href="/#signup" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#6366F1] font-semibold rounded-lg hover:bg-gray-100 transition-colors">Start for free<ChevronRight className="w-5 h-5" /></Link>
                  </div>
                </div>
              </article>
              <div className="hidden lg:block mt-12 pt-8 border-t border-[#E5E7EB]"><ShareButtons /></div>
              <RelatedPosts currentSlug={post.slug} category={post.category} />
            </div>
            <aside className="hidden lg:block"><TableOfContents /></aside>
          </div>
        </div>
      </main>

      <section className="py-16 bg-[#0F172A] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">Subscribe to our newsletter</h2>
            <p className="text-[#94A3B8] mb-8">Get the latest insights on mobile app monetization.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#6366F1]" />
              <button type="submit" className="px-6 py-3 bg-[#6366F1] text-white font-medium rounded-lg hover:bg-[#4F46E5] transition-colors">Subscribe</button>
            </form>
          </motion.div>
        </div>
      </section>

      <footer className="py-8 bg-[#0F172A] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#94A3B8]">&copy; 2025 Adapty Tech Inc.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="text-sm text-[#94A3B8] hover:text-white transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
