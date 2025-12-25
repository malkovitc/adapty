'use client';

import { memo, ReactNode } from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';

interface CmsLayoutProps {
  sidebar: ReactNode;
  editor: ReactNode;
  header: ReactNode;
  isConnected?: boolean;
  isDemoMode?: boolean;
  onSetupClick?: () => void;
}

const CmsLayout = memo(({
  sidebar,
  editor,
  header,
  isConnected = false,
  isDemoMode = false,
  onSetupClick
}: CmsLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      {header}

      {/* Connection Status Banner */}
      {!isConnected && isDemoMode && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-900">
                    Demo Mode: Changes will not be saved
                  </p>
                  <p className="text-xs text-amber-700">
                    Connect to Sanity CMS to enable full editing capabilities
                  </p>
                </div>
              </div>
              {onSetupClick && (
                <button
                  onClick={onSetupClick}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-900 bg-white hover:bg-amber-50 rounded-lg border border-amber-200 transition-colors"
                >
                  Setup Guide
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area - Three Column Layout */}
      <div className="flex">
        {/* Left Sidebar - Navigation & Post List */}
        <aside className="flex-shrink-0">
          {sidebar}
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 min-w-0">
          {editor}
        </main>
      </div>
    </div>
  );
});

CmsLayout.displayName = 'CmsLayout';

export default CmsLayout;
