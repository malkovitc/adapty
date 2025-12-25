'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Edit3, History, Trash2, Calendar, Clock, Tag, Upload, X } from 'lucide-react';
import { type BlogPost } from '@/data/blog';
import { MetadataPanel } from './MetadataPanel';
import { getAssetPath } from '@/lib/utils';

interface PostEditorProps {
  post: BlogPost | null;
  onUpdate: (updates: Partial<BlogPost>) => void;
  onDelete: () => void;
  isSaving?: boolean;
  lastSaved?: Date;
}

export function PostEditor({
  post,
  onUpdate,
  onDelete,
  isSaving = false,
}: PostEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showRevisionHistory, setShowRevisionHistory] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Local draft state for editing
  const [editedTitle, setEditedTitle] = useState(post?.title ?? '');
  const [editedExcerpt, setEditedExcerpt] = useState(post?.excerpt ?? '');

  // Track previous post slug to detect post switches
  const prevSlugRef = useRef<string | null>(null);

  // Sync local state when post changes (different post selected)
  useEffect(() => {
    if (post?.slug !== prevSlugRef.current) {
      prevSlugRef.current = post?.slug ?? null;
      setEditedTitle(post?.title ?? '');
      setEditedExcerpt(post?.excerpt ?? '');
    }
  }, [post?.slug, post?.title, post?.excerpt]);

  // Revision history data (placeholder)
  const revisions = [
    { id: 1, date: '2 hours ago', author: 'You', changes: 'Updated title and excerpt' },
    { id: 2, date: '1 day ago', author: 'Sarah Chen', changes: 'Added new section on metrics' },
    { id: 3, date: '3 days ago', author: 'You', changes: 'Initial draft' },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // In a real implementation, handle file upload here
  };

  // Handle title change - update local state and notify parent
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEditedTitle(newValue);
    onUpdate({ title: newValue });
  };

  // Handle excerpt change - update local state and notify parent
  const handleExcerptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEditedExcerpt(newValue);
    onUpdate({ excerpt: newValue });
  };

  // Handle empty state when no post is selected
  if (!post) {
    return (
      <div className="flex-1 min-h-[calc(100vh-64px)] flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center mx-auto mb-4">
            <Edit3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-[#0F172A] mb-2">No Post Selected</h3>
          <p className="text-[#64748B]">Select a post from the sidebar to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-[calc(100vh-64px)] overflow-y-auto bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto p-8">
        {/* Editor Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                isEditing
                  ? 'bg-[#4F46E5] text-white'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F5F5F7]'
              }`}
            >
              <Edit3 className="w-4 h-4" />
              {isEditing ? 'Editing' : 'Edit'}
            </button>
            <button
              onClick={() => setShowRevisionHistory(!showRevisionHistory)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#64748B] hover:text-[#0F172A] hover:bg-[#F5F5F7] rounded-lg transition-colors"
            >
              <History className="w-4 h-4" />
              History
            </button>
            <button
              onClick={onDelete}
              disabled={isSaving}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Revision History Panel */}
        {showRevisionHistory && (
          <div className="mb-6 bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#E5E7EB] bg-[#F8FAFC]">
              <h3 className="font-semibold text-[#0F172A] flex items-center gap-2">
                <History className="w-4 h-4" />
                Revision History
              </h3>
              <button
                onClick={() => setShowRevisionHistory(false)}
                className="text-[#64748B] hover:text-[#0F172A]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-[#E5E7EB]">
              {revisions.map((revision) => (
                <div key={revision.id} className="p-4 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-[#0F172A]">{revision.changes}</p>
                      <p className="text-xs text-[#94A3B8] mt-1">
                        {revision.author} • {revision.date}
                      </p>
                    </div>
                    <button className="text-xs text-[#4F46E5] hover:text-[#4338CA] font-medium">
                      Restore
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Image with Drag & Drop */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#64748B] mb-2">Featured Image</label>
          <div
            className={`relative aspect-[16/9] rounded-xl overflow-hidden bg-[#F5F5F7] group ${
              isDragging ? 'ring-2 ring-[#4F46E5] ring-offset-2' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Image
              src={getAssetPath(post.image)}
              alt={post.title}
              fill
              className="object-cover"
              unoptimized
              onError={(e) => { e.currentTarget.style.opacity = '0'; }}
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Upload className="w-8 h-8 text-white mb-3" />
                <p className="text-white font-medium mb-1">Drop image here</p>
                <p className="text-white/70 text-sm mb-4">or click to browse</p>
                <button className="px-4 py-2 bg-white text-[#0F172A] rounded-lg font-medium text-sm hover:bg-[#F5F5F7] transition-colors">
                  Change Image
                </button>
              </div>
            )}
            {isDragging && (
              <div className="absolute inset-0 bg-[#4F46E5]/20 border-2 border-dashed border-[#4F46E5] flex items-center justify-center">
                <div className="text-center">
                  <Upload className="w-12 h-12 text-[#4F46E5] mx-auto mb-2" />
                  <p className="text-[#4F46E5] font-medium">Drop to upload</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category & Tags */}
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-[#4F46E5]/10 text-[#4F46E5] rounded-full">
            <Tag className="w-3.5 h-3.5" />
            {post.category}
          </span>
        </div>

        {/* Title - controlled input */}
        <div className="mb-4">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="w-full text-3xl font-bold text-[#0F172A] bg-transparent border-b-2 border-[#4F46E5] focus:outline-none pb-2"
              placeholder="Enter post title..."
            />
          ) : (
            <h1 className="text-3xl font-bold text-[#0F172A]">{post.title}</h1>
          )}
        </div>

        {/* Excerpt - controlled textarea */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-[#64748B] mb-2">Excerpt</label>
          {isEditing ? (
            <textarea
              value={editedExcerpt}
              onChange={handleExcerptChange}
              rows={3}
              className="w-full text-[#64748B] bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
              placeholder="Enter post excerpt..."
            />
          ) : (
            <p className="text-[#64748B] leading-relaxed">{post.excerpt}</p>
          )}
        </div>

        {/* Metadata Panel (SEO + Post Settings) */}
        <MetadataPanel
          post={post}
          onUpdate={onUpdate}
          isEditing={isEditing}
        />
      </div>
    </div>
  );
}
