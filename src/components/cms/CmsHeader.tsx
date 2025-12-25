'use client';

import { memo } from 'react';
import { Save, Eye, HelpCircle, Wifi, WifiOff } from 'lucide-react';

interface CmsHeaderProps {
  isConnected: boolean;
  isDemoMode: boolean;
  lastSaved?: Date | null;
  isSaving: boolean;
  onSave: () => void;
  onHelp: () => void;
  onPreview: () => void;
}

const CmsHeader = memo(({
  isConnected,
  isDemoMode,
  lastSaved,
  isSaving,
  onSave,
  onHelp,
  onPreview
}: CmsHeaderProps) => {
  const formatLastSaved = (date: Date | null | undefined) => {
    if (!date) return null;

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left: Title and Status */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-[#0F172A]">
            Adapty Blog CMS
          </h1>

          {/* Connection Status Badge */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${
            isConnected
              ? 'bg-emerald-50 text-emerald-700'
              : 'bg-amber-50 text-amber-700'
          }`}>
            {isConnected ? (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span>Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Demo Mode</span>
              </>
            )}
          </div>

          {/* Last Saved Indicator */}
          {lastSaved && (
            <span className="text-xs text-[#64748B]">
              Saved {formatLastSaved(lastSaved)}
            </span>
          )}
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Help Button */}
          <button
            onClick={onHelp}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#64748B] hover:text-[#4F46E5] hover:bg-[#4F46E5]/10 rounded-lg transition-colors"
            aria-label="Show help"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Help</span>
          </button>

          {/* Preview Button */}
          <button
            onClick={onPreview}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg transition-colors border border-[#E5E7EB]"
            aria-label="Preview changes"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          {/* Save Button */}
          <button
            onClick={onSave}
            disabled={isSaving || isDemoMode}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              isSaving || isDemoMode
                ? 'bg-[#CBD5E1] text-[#94A3B8] cursor-not-allowed'
                : 'bg-[#4F46E5] text-white hover:bg-[#4338CA] active:scale-95'
            }`}
            aria-label={isSaving ? 'Saving...' : 'Save changes'}
          >
            <Save className={`w-4 h-4 ${isSaving ? 'animate-pulse' : ''}`} />
            <span>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
});

CmsHeader.displayName = 'CmsHeader';

export default CmsHeader;
