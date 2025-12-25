import Modal from '@/components/ui/Modal';
import { Keyboard } from 'lucide-react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Shortcut {
  keys: string[];
  description: string;
}

const shortcuts: Shortcut[] = [
  {
    keys: ['Cmd', 'S'],
    description: 'Save current post',
  },
  {
    keys: ['Cmd', 'K'],
    description: 'Open search',
  },
  {
    keys: ['Cmd', 'N'],
    description: 'Create new post',
  },
  {
    keys: ['Cmd', 'P'],
    description: 'Preview post',
  },
  {
    keys: ['Cmd', 'B'],
    description: 'Bold text',
  },
  {
    keys: ['Cmd', 'I'],
    description: 'Italic text',
  },
  {
    keys: ['Cmd', 'U'],
    description: 'Underline text',
  },
  {
    keys: ['Cmd', 'Z'],
    description: 'Undo',
  },
  {
    keys: ['Cmd', 'Shift', 'Z'],
    description: 'Redo',
  },
  {
    keys: ['Esc'],
    description: 'Close modal/dialog',
  },
  {
    keys: ['Cmd', '/'],
    description: 'Show keyboard shortcuts',
  },
  {
    keys: ['Tab'],
    description: 'Navigate between fields',
  },
];

const ShortcutsModal = ({ isOpen, onClose }: ShortcutsModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts" size="md">
      <div className="space-y-4">
        {/* Introduction */}
        <div className="flex items-start gap-3 p-4 bg-[#F8FAFC] rounded-lg border border-[#E5E7EB]">
          <Keyboard className="w-5 h-5 text-[#4F46E5] mt-0.5 flex-shrink-0" />
          <p className="text-sm text-[#64748B]">
            Use these keyboard shortcuts to navigate and edit faster. Note that{' '}
            <kbd className="px-1.5 py-0.5 text-xs font-semibold text-[#0F172A] bg-white border border-[#CBD5E1] rounded">
              Cmd
            </kbd>{' '}
            on Mac is{' '}
            <kbd className="px-1.5 py-0.5 text-xs font-semibold text-[#0F172A] bg-white border border-[#CBD5E1] rounded">
              Ctrl
            </kbd>{' '}
            on Windows/Linux.
          </p>
        </div>

        {/* Shortcuts List */}
        <div className="space-y-2">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              {/* Description */}
              <span className="text-sm text-[#0F172A]">
                {shortcut.description}
              </span>

              {/* Keys */}
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <span key={keyIndex} className="flex items-center gap-1">
                    <kbd className="min-w-[32px] px-2 py-1.5 text-xs font-semibold text-[#0F172A] bg-white border border-[#CBD5E1] rounded shadow-sm text-center">
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span className="text-xs text-[#94A3B8] font-medium">
                        +
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-[#E5E7EB]">
          <p className="text-xs text-[#94A3B8] text-center">
            Some shortcuts may not be available in all contexts
          </p>
        </div>

        {/* Close Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 text-sm font-medium text-white bg-[#4F46E5] rounded-lg hover:bg-[#4338CA] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ShortcutsModal;
