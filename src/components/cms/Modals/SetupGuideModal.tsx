import Modal from '@/components/ui/Modal';
import { BookOpen, ExternalLink, CheckCircle2 } from 'lucide-react';

interface SetupGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SetupGuideModal = ({ isOpen, onClose }: SetupGuideModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Setup Guide" size="lg">
      <div className="space-y-6">
        {/* Introduction */}
        <div className="flex items-start gap-3 p-4 bg-[#EEF2FF] rounded-lg border border-[#C7D2FE]">
          <BookOpen className="w-5 h-5 text-[#4F46E5] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-[#475569]">
            <p className="font-medium text-[#0F172A] mb-1">
              Welcome to Adapty CMS
            </p>
            <p>
              Follow these steps to configure Sanity Studio for managing your
              blog content.
            </p>
          </div>
        </div>

        {/* Setup Steps */}
        <div className="space-y-4">
          <h4 className="font-semibold text-[#0F172A] flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs font-bold">
              1
            </span>
            Install Sanity CLI
          </h4>
          <div className="ml-8 space-y-2">
            <p className="text-sm text-[#64748B]">
              Install the Sanity CLI globally on your machine:
            </p>
            <div className="bg-[#0F172A] rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-[#E2E8F0] font-mono">
                npm install -g @sanity/cli
              </code>
            </div>
          </div>

          <h4 className="font-semibold text-[#0F172A] flex items-center gap-2 mt-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs font-bold">
              2
            </span>
            Initialize Sanity Project
          </h4>
          <div className="ml-8 space-y-2">
            <p className="text-sm text-[#64748B]">
              Create a new Sanity project and follow the prompts:
            </p>
            <div className="bg-[#0F172A] rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-[#E2E8F0] font-mono">
                sanity init
              </code>
            </div>
          </div>

          <h4 className="font-semibold text-[#0F172A] flex items-center gap-2 mt-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs font-bold">
              3
            </span>
            Configure Environment Variables
          </h4>
          <div className="ml-8 space-y-2">
            <p className="text-sm text-[#64748B]">
              Add these variables to your <code className="text-xs bg-[#F8FAFC] px-1.5 py-0.5 rounded border border-[#E5E7EB]">.env.local</code> file:
            </p>
            <div className="bg-[#0F172A] rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-[#E2E8F0] font-mono">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_api_token`}
              </pre>
            </div>
          </div>

          <h4 className="font-semibold text-[#0F172A] flex items-center gap-2 mt-6">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#4F46E5] text-white text-xs font-bold">
              4
            </span>
            Deploy Sanity Studio
          </h4>
          <div className="ml-8 space-y-2">
            <p className="text-sm text-[#64748B]">
              Deploy your Sanity Studio to make it accessible:
            </p>
            <div className="bg-[#0F172A] rounded-lg p-4 overflow-x-auto">
              <code className="text-sm text-[#E2E8F0] font-mono">
                sanity deploy
              </code>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="flex items-start gap-3 p-4 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0]">
          <CheckCircle2 className="w-5 h-5 text-[#16A34A] mt-0.5 flex-shrink-0" />
          <div className="text-sm text-[#475569]">
            <p className="font-medium text-[#0F172A] mb-1">
              You're all set!
            </p>
            <p>
              Once configured, you'll be able to manage your blog posts directly
              from this CMS interface.
            </p>
          </div>
        </div>

        {/* Documentation Link */}
        <div className="pt-4 border-t border-[#E5E7EB]">
          <a
            href="https://www.sanity.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors"
          >
            View Sanity Documentation
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-[#4F46E5] rounded-lg hover:bg-[#4338CA] transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SetupGuideModal;
