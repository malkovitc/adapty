import { memo } from 'react';
import { Search, Plus, FileText } from 'lucide-react';
import type { BlogPost } from '@/data/blog';
import PostListItem from './PostListItem';

interface PostListProps {
  posts: BlogPost[];
  selectedSlug: string | null;
  onSelectPost: (post: BlogPost) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const PostList = memo(({
  posts,
  selectedSlug,
  onSelectPost,
  searchQuery,
  onSearchChange
}: PostListProps) => {
  // Filter posts based on search query
  const filteredPosts = posts.filter(post =>
    searchQuery.trim() === '' ||
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-80 bg-white border-r border-[#E5E7EB] min-h-[calc(100vh-64px)]">
      {/* Search Input */}
      <div className="p-4 border-b border-[#E5E7EB]">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-[#F8FAFC] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20 focus:border-[#4F46E5]"
          />
        </div>
      </div>

      {/* Header */}
      <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between">
        <h2 className="font-semibold text-[#0F172A]">Blog Posts</h2>
        <button
          className="p-2 text-[#64748B] hover:text-[#4F46E5] hover:bg-[#4F46E5]/10 rounded-lg transition-colors"
          title="Add new post (not implemented in demo)"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Posts List */}
      <div className="overflow-y-auto max-h-[calc(100vh-192px)]">
        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <FileText className="w-12 h-12 text-[#94A3B8] mb-3" />
            <p className="text-sm font-medium text-[#0F172A] mb-1">No posts found</p>
            <p className="text-xs text-[#64748B]">
              {searchQuery.trim() !== ''
                ? 'Try adjusting your search query'
                : 'Create your first post to get started'}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostListItem
              key={post.slug}
              post={post}
              isSelected={selectedSlug === post.slug}
              onSelect={onSelectPost}
            />
          ))
        )}
      </div>
    </div>
  );
});

PostList.displayName = 'PostList';

export default PostList;
