import { useEffect, useRef } from 'react';

/**
 * Focus trap hook for managing focus within modals and dialogs.
 * Handles SSR safely and properly cleans up on unmount/deactivation.
 *
 * @param containerRef - Ref to the container element
 * @param isActive - Whether the focus trap is active
 * @param triggerRef - Optional ref to the element that triggered the modal (for focus restoration)
 */
export function useFocusTrap(
  containerRef: React.RefObject<HTMLElement | null>,
  isActive: boolean,
  triggerRef?: React.RefObject<HTMLElement | null>
): void {
  // Store the element that was focused when trap activated (outside the modal)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // SSR guard - only run on client
    if (typeof window === 'undefined') {
      return;
    }

    if (!isActive) {
      // When deactivating, restore focus - prioritize triggerRef
      if (triggerRef?.current && document.body.contains(triggerRef.current)) {
        triggerRef.current.focus();
      } else if (
        previouslyFocusedElement.current &&
        document.body.contains(previouslyFocusedElement.current)
      ) {
        previouslyFocusedElement.current.focus();
      }
      previouslyFocusedElement.current = null;
      return;
    }

    if (!containerRef.current) {
      return;
    }

    const container = containerRef.current;

    // Store the currently focused element to restore later (only when activating)
    // But only if it's outside the modal container
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && !container.contains(activeElement)) {
      previouslyFocusedElement.current = activeElement;
    }

    /**
     * Check if an element is visible.
     * Uses getClientRects() to handle position:fixed elements correctly
     * (offsetParent is null for fixed elements even when visible)
     */
    const isElementVisible = (element: HTMLElement): boolean => {
      // Check if element has rendered dimensions
      if (element.getClientRects().length === 0) {
        return false;
      }

      // Check computed styles
      const style = window.getComputedStyle(element);
      return style.display !== 'none' && style.visibility !== 'hidden';
    };

    /**
     * Get all focusable elements within the container
     */
    const getFocusableElements = (): HTMLElement[] => {
      const focusableSelectors = [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]',
      ].join(', ');

      const elements = Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors)
      );

      return elements.filter(isElementVisible);
    };

    /**
     * Focus the first focusable element
     */
    const focusFirstElement = () => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    };

    /**
     * Handle Tab and Shift+Tab to cycle focus within container
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const focusableElements = getFocusableElements();

      // Handle edge case: no focusable elements
      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab: moving backwards
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab: moving forwards
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Focus the first element when the trap is activated
    focusFirstElement();

    // Add keyboard event listener
    container.addEventListener('keydown', handleKeyDown);

    // Handle dynamic content changes with MutationObserver
    const observer = new MutationObserver(() => {
      const focusableElements = getFocusableElements();

      // If the currently focused element is no longer in the container or is not focusable,
      // focus the first focusable element
      if (
        !container.contains(document.activeElement) ||
        !focusableElements.includes(document.activeElement as HTMLElement)
      ) {
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    });

    // Observe the container for changes
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled', 'tabindex', 'href'],
    });

    // Cleanup function - runs when isActive changes or component unmounts
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, [isActive, containerRef, triggerRef]);
}
