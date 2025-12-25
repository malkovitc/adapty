import Modal from '@/components/ui/Modal';
import { AlertTriangle } from 'lucide-react';

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  postTitle: string;
}

const DeletePostModal = ({
  isOpen,
  onClose,
  onConfirm,
  postTitle,
}: DeletePostModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="text-center">
        {/* Warning Icon */}
        <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
          Delete Post
        </h3>

        {/* Message */}
        <p className="text-sm text-[#64748B] mb-6">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-[#0F172A]">"{postTitle}"</span>?
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-[#0F172A] bg-white border border-[#E5E7EB] rounded-lg hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeletePostModal;
