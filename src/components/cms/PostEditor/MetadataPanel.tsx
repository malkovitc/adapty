'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronRight, AlertCircle, Info } from 'lucide-react';
import { type BlogPost } from '@/data/blog';

interface MetadataPanelProps {
  post: BlogPost;
  onUpdate: (updates: Partial<BlogPost>) => void;
  isEditing?: boolean;
}

export function MetadataPanel({ post, onUpdate, isEditing = false }: MetadataPanelProps) {
  const [showSEOPanel, setShowSEOPanel] = useState(false);

  // Local draft state for SEO fields
  const [metaTitle, setMetaTitle] = useState(post.title);
  const [metaDescription, setMetaDescription] = useState(post.excerpt);

  // Track previous post slug to detect post switches
  const prevSlugRef = useRef<string | null>(null);

  // Sync local state when post changes (different post selected)
  useEffect(() => {
    if (post.slug !== prevSlugRef.current) {
      prevSlugRef.current = post.slug;
      setMetaTitle(post.title);
      setMetaDescription(post.excerpt);
    }
  }, [post.slug, post.title, post.excerpt]);

  // Handle meta title change - update local state and notify parent
  const handleMetaTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setMetaTitle(newValue);
    onUpdate({ title: newValue });
  };

  // Handle meta description change - update local state and notify parent
  const handleMetaDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setMetaDescription(newValue);
    onUpdate({ excerpt: newValue });
  };

  return (
    <div className="space-y-8">
      {/* SEO Settings Panel */}
      <div>
        <button
          onClick={() => setShowSEOPanel(!showSEOPanel)}
          className="flex items-center justify-between w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F8FAFC] transition-colors mb-3"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#64748B]" />
            <span className="font-semibold text-[#0F172A]">SEO Settings</span>
          </div>
          <ChevronRight className={`w-5 h-5 text-[#64748B] transition-transform ${showSEOPanel ? 'rotate-90' : ''}`} />
        </button>

        {showSEOPanel && (
          <div className="bg-white border border-[#E5E7EB] rounded-lg p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#64748B] mb-2">
                Meta Title
                <span className="text-[#94A3B8] font-normal ml-2">({metaTitle.length}/60 characters)</span>
              </label>
              <input
                type="text"
                value={metaTitle}
                onChange={handleMetaTitleChange}
                placeholder="SEO optimized title for search engines"
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
                maxLength={60}
              />
              {metaTitle.length > 60 && (
                <p className="text-xs text-[#EF4444] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Title is too long for optimal SEO
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#64748B] mb-2">
                Meta Description
                <span className="text-[#94A3B8] font-normal ml-2">({metaDescription.length}/160 characters)</span>
              </label>
              <textarea
                value={metaDescription}
                onChange={handleMetaDescriptionChange}
                placeholder="Brief description for search engine results"
                rows={3}
                className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
                maxLength={160}
              />
              {metaDescription.length > 160 && (
                <p className="text-xs text-[#EF4444] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Description is too long for optimal SEO
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#64748B] mb-2">OG Image (Social Media)</label>
              <div className="flex items-center gap-3">
                <div className="w-32 h-20 rounded-lg overflow-hidden bg-[#F5F5F7] border border-[#E5E7EB] relative">
                  <Image
                    src={post.image}
                    alt="OG Preview"
                    fill
                    className="object-cover"
                    onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#64748B] mb-2">Recommended: 1200x630px</p>
                  <button className="px-3 py-1.5 text-sm text-[#4F46E5] hover:text-[#4338CA] font-medium border border-[#4F46E5] rounded-lg hover:bg-[#4F46E5]/5 transition-colors">
                    Upload Different Image
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-start gap-2 text-sm">
                <Info className="w-4 h-4 text-[#4F46E5] mt-0.5" />
                <div className="text-[#64748B]">
                  <p className="font-medium text-[#0F172A] mb-1">SEO Preview</p>
                  <p className="text-[#4F46E5] text-base">{post.title}</p>
                  <p className="text-[#10B981] text-xs mt-0.5">https://adapty.io/blog/{post.slug}</p>
                  <p className="text-[#64748B] text-sm mt-1">{post.excerpt}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Post Settings Panel */}
      <div className="bg-white border border-[#E5E7EB] rounded-lg p-6">
        <h3 className="font-semibold text-[#0F172A] mb-4">Post Settings</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-2">URL Slug</label>
            <input
              type="text"
              value={post.slug}
              readOnly={!isEditing}
              className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-2">Category</label>
            <select
              value={post.category}
              disabled={!isEditing}
              className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
            >
              <option value="Product Updates">Product Updates</option>
              <option value="Best Practices">Best Practices</option>
              <option value="Case Studies">Case Studies</option>
              <option value="Industry Insights">Industry Insights</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-2">Read Time</label>
            <input
              type="text"
              value={post.readTime}
              readOnly={!isEditing}
              className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#64748B] mb-2">Publish Date</label>
            <input
              type="text"
              value={post.date}
              readOnly={!isEditing}
              className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
