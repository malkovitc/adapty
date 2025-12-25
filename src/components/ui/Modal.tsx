'use client';

import { useEffect, useCallback, useRef, useId, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  /** Optional ref to the element that triggered the modal (for focus restoration) */
  triggerRef?: React.RefObject<HTMLElement | null>;
  /** Optional description for aria-describedby (only rendered if provided) */
  description?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  triggerRef,
  description,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();
  const titleId = `modal-title-${uniqueId}`;
  const descriptionId = `modal-description-${uniqueId}`;

  // Track if we're mounted (for SSR safety with portal)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use focus trap hook with optional trigger ref for focus restoration
  useFocusTrap(modalRef, isOpen, triggerRef);

  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEscape, onClose]
  );

  // Add/remove escape listener and body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscape]);

  // Don't render anything during SSR or when closed
  if (!isMounted || !isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm min-w-[320px]',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  // Only include aria-describedby if we have a description
  const ariaDescribedBy = description ? descriptionId : undefined;

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={closeOnOverlayClick ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} mx-4 animate-scale-in`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={ariaDescribedBy}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            {title && (
              <h2
                id={titleId}
                className="text-lg font-semibold text-[#0F172A]"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-lg transition-colors ml-auto"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-4">
          {description && (
            <p id={descriptionId} className="sr-only">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </div>
  );

  // Use portal to render to modal-root if it exists, otherwise render to body
  const portalTarget = document.getElementById('modal-root') || document.body;

  return createPortal(modalContent, portalTarget);
};

export default Modal;
