'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { type BlogPost, posts as staticPosts, categories as staticCategories } from '@/data/blog';
import { getAllPosts, getAllCategories, isCMSConfigured } from '@/lib/blog-service';
import {
  CmsLayout,
  CmsHeader,
  PostList,
  PostEditor,
  DeletePostModal,
} from '@/components/cms';

// Lazy load modals for better performance
const SetupGuideModal = dynamic(
  () => import('@/components/cms/Modals/SetupGuideModal'),
  { ssr: false }
);

const ShortcutsModal = dynamic(
  () => import('@/components/cms/Modals/ShortcutsModal'),
  { ssr: false }
);

export default function CMSPage() {
  // Data state
  const [posts, setPosts] = useState<BlogPost[]>(staticPosts);
  const [_categories, setCategories] = useState(staticCategories);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cmsConnected, setCmsConnected] = useState(false);

  // Editor state
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  // Modal state
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);

  // Fetch data from CMS on mount
  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        if (!cancelled) {
          setCmsConnected(isCMSConfigured());
        }

        const [fetchedPosts, fetchedCategories] = await Promise.all([
          getAllPosts(),
          getAllCategories(),
        ]);

        if (!cancelled) {
          setPosts(fetchedPosts);
          setCategories(fetchedCategories);

          if (fetchedPosts.length > 0) {
            setSelectedPost(fetchedPosts[0]);
          }
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to fetch CMS data:', error);
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

  // Handle save (demo mode - local updates only)
  const handleSave = useCallback(async (updates: Partial<BlogPost>) => {
    if (!selectedPost) return;

    setSaving(true);
    setSaveError(null);

    // Update locally
    const updatedPost = { ...selectedPost, ...updates };
    setSelectedPost(updatedPost);
    setPosts((prev) => prev.map((p) => (p.slug === selectedPost.slug ? updatedPost : p)));

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Success
    setShowSavedMessage(true);
    setLastSaved(new Date());
    setTimeout(() => setShowSavedMessage(false), 2000);
    setSaving(false);
  }, [selectedPost]);

  const handleSelectPost = useCallback((post: BlogPost) => {
    setSelectedPost(post);
    setSaveError(null);
  }, []);

  const handleDeletePost = useCallback(() => {
    if (!selectedPost) return;
    setPostToDelete(selectedPost);
    setShowDeleteModal(true);
  }, [selectedPost]);

  const confirmDelete = useCallback(async () => {
    if (!postToDelete) return;

    setSaving(true);
    setShowDeleteModal(false);

    // Simulate delete delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newPosts = posts.filter((p) => p.slug !== postToDelete.slug);
    setPosts(newPosts);
    if (newPosts.length > 0) {
      handleSelectPost(newPosts[0]);
    } else {
      setSelectedPost(null);
    }
    setPostToDelete(null);
    setSaving(false);
  }, [postToDelete, posts, handleSelectPost]);

  const handlePreview = useCallback(() => {
    if (selectedPost) {
      window.open(`/blog/${selectedPost.slug}`, '_blank');
    }
  }, [selectedPost]);

  // Render
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#64748B]">Loading CMS...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <CmsLayout
        isConnected={cmsConnected}
        isDemoMode={true}
        onSetupClick={() => setShowSetupModal(true)}
        header={
          <CmsHeader
            isConnected={cmsConnected}
            isDemoMode={true}
            lastSaved={lastSaved}
            isSaving={saving}
            onSave={() => {}} // Save is now handled in PostEditor
            onHelp={() => setShowKeyboardShortcuts(true)}
            onPreview={handlePreview}
          />
        }
        sidebar={
          <div className="w-64 bg-white border-r border-[#E5E7EB] min-h-[calc(100vh-64px)]">
            <div className="p-4">
              {/* Demo mode banner */}
              {(
                <div data-testid="demo-mode-banner" className="mb-4 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs text-amber-700 font-medium">Demo Mode</p>
                  <p className="text-xs text-amber-600">Changes are not persisted</p>
                </div>
              )}
              <nav className="space-y-1">
                <div className="flex items-center gap-3 px-3 py-2 text-sm bg-[#4F46E5]/10 text-[#4F46E5] rounded-lg">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Posts
                  <span className="ml-auto text-xs bg-[#4F46E5] text-white px-2 py-0.5 rounded-full">
                    {posts.length}
                  </span>
                </div>
              </nav>
            </div>
          </div>
        }
        editor={
          <div className="flex flex-1 min-h-[calc(100vh-64px)]">
            <PostList
              posts={posts}
              selectedSlug={selectedPost?.slug || null}
              onSelectPost={handleSelectPost}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
            <div className="flex-1 overflow-y-auto">
              <PostEditor
                post={selectedPost}
                onUpdate={handleSave}
                onDelete={handleDeletePost}
                isSaving={saving}
              />
            </div>
          </div>
        }
      />

      {/* Success Message */}
      {showSavedMessage && (
        <div className="fixed top-20 right-6 px-4 py-3 bg-[#10B981] text-white rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-up">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Changes saved successfully
        </div>
      )}

      {/* Error Message */}
      {saveError && (
        <div className="fixed top-20 right-6 px-4 py-3 bg-[#EF4444] text-white rounded-lg shadow-lg flex items-center gap-2 z-50 animate-fade-in-up">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {saveError}
          <button
            onClick={() => setSaveError(null)}
            className="ml-2 hover:bg-white/20 p-1 rounded"
          >
            ×
          </button>
        </div>
      )}

      {/* Modals */}
      <DeletePostModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setPostToDelete(null);
        }}
        onConfirm={confirmDelete}
        postTitle={postToDelete?.title || ''}
      />

      {showSetupModal && (
        <SetupGuideModal
          isOpen={showSetupModal}
          onClose={() => setShowSetupModal(false)}
        />
      )}

      {showKeyboardShortcuts && (
        <ShortcutsModal
          isOpen={showKeyboardShortcuts}
          onClose={() => setShowKeyboardShortcuts(false)}
        />
      )}
    </>
  );
}
