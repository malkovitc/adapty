import { memo } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import type { BlogPost } from '@/data/blog';
import { getAssetPath } from '@/lib/utils';

interface PostListItemProps {
  post: BlogPost;
  isSelected: boolean;
  onSelect: (post: BlogPost) => void;
}

const PostListItem = memo(({ post, isSelected, onSelect }: PostListItemProps) => {
  return (
    <button
      onClick={() => onSelect(post)}
      className={`w-full p-4 text-left border-b border-[#E5E7EB] transition-colors ${
        isSelected
          ? 'bg-[#4F46E5]/5'
          : 'hover:bg-[#F8FAFC]'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F5F5F7] flex-shrink-0">
          <Image
            src={getAssetPath(post.image)}
            alt={post.title}
            width={48}
            height={48}
            className="w-full h-full object-cover"
            unoptimized
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-[#0F172A] line-clamp-2 mb-1">
            {post.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
            <span className="px-1.5 py-0.5 bg-[#F5F5F7] rounded text-[#64748B]">
              {post.category}
            </span>
            <span>{post.date}</span>
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-colors ${
          isSelected ? 'text-[#4F46E5]' : 'text-[#94A3B8]'
        }`} />
      </div>
    </button>
  );
});

PostListItem.displayName = 'PostListItem';

export default PostListItem;
