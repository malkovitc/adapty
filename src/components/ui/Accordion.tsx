'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  type ReactNode,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Types
// ============================================================================

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;
  openItems: Set<string>;
  toggleItem: (id: string) => void;
}

interface AccordionProps {
  /** Controls whether one or many items can be open at once */
  type?: AccordionType;
  /** Initially open item(s) - string for single, string[] for multiple */
  defaultOpen?: string | string[];
  /** Additional CSS classes */
  className?: string;
  /** Accordion items */
  children: ReactNode;
}

interface AccordionItemProps {
  /** Unique identifier for the item */
  id: string;
  /** The clickable trigger element (e.g., question) */
  trigger: ReactNode;
  /** The collapsible content (e.g., answer) */
  children: ReactNode;
  /** Additional CSS classes for the item container */
  className?: string;
  /** Additional CSS classes for the trigger button */
  triggerClassName?: string;
  /** Additional CSS classes for the content wrapper */
  contentClassName?: string;
  /** Whether to show the chevron icon (default: true) */
  showChevron?: boolean;
  /** Disable the item */
  disabled?: boolean;
}

// ============================================================================
// Context
// ============================================================================

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }
  return context;
}

// ============================================================================
// Animation Constants
// ============================================================================

// Cubic bezier easing for smooth animations
const easeOut: [number, number, number, number] = [0.4, 0, 0.2, 1];

// Content expand/collapse animation configuration
const contentAnimation = {
  collapsed: {
    height: 0,
    opacity: 0,
  },
  expanded: {
    height: 'auto' as const,
    opacity: 1,
  },
};

const contentTransition = {
  height: { duration: 0.3, ease: easeOut },
  opacity: { duration: 0.25, ease: easeOut },
};

const chevronVariants = {
  collapsed: { rotate: 0 },
  expanded: { rotate: 180 },
};

// ============================================================================
// Accordion Component
// ============================================================================

/**
 * Accordion Component
 *
 * A flexible accordion container that manages open/closed state for its items.
 *
 * @example
 * // Single item open at a time (default)
 * <Accordion type="single" defaultOpen="item-1">
 *   <AccordionItem id="item-1" trigger="Question 1?">
 *     Answer 1
 *   </AccordionItem>
 *   <AccordionItem id="item-2" trigger="Question 2?">
 *     Answer 2
 *   </AccordionItem>
 * </Accordion>
 *
 * @example
 * // Multiple items can be open
 * <Accordion type="multiple" defaultOpen={['item-1', 'item-2']}>
 *   <AccordionItem id="item-1" trigger="Question 1?">
 *     Answer 1
 *   </AccordionItem>
 * </Accordion>
 */
export function Accordion({
  type = 'single',
  defaultOpen,
  className,
  children,
}: AccordionProps) {
  // Initialize open items based on defaultOpen prop
  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    if (!defaultOpen) return new Set();
    if (Array.isArray(defaultOpen)) return new Set(defaultOpen);
    return new Set([defaultOpen]);
  });

  const toggleItem = useCallback(
    (id: string) => {
      setOpenItems((prev) => {
        const next = new Set(prev);

        if (next.has(id)) {
          // Close the item
          next.delete(id);
        } else {
          // Open the item
          if (type === 'single') {
            // In single mode, close all others first
            next.clear();
          }
          next.add(id);
        }

        return next;
      });
    },
    [type]
  );

  const contextValue: AccordionContextValue = {
    type,
    openItems,
    toggleItem,
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div
        className={cn('flex flex-col', className)}
        data-accordion-type={type}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ============================================================================
// AccordionItem Component
// ============================================================================

/**
 * AccordionItem Component
 *
 * An individual accordion item with a trigger and collapsible content.
 * Must be used within an Accordion component.
 *
 * @example
 * <AccordionItem
 *   id="faq-1"
 *   trigger="How does pricing work?"
 *   className="border-b border-gray-200"
 * >
 *   <p>Our pricing is based on monthly revenue...</p>
 * </AccordionItem>
 */
export function AccordionItem({
  id,
  trigger,
  children,
  className,
  triggerClassName,
  contentClassName,
  showChevron = true,
  disabled = false,
}: AccordionItemProps) {
  const { openItems, toggleItem } = useAccordionContext();
  const isOpen = openItems.has(id);

  // Generate unique IDs for accessibility
  const uniqueId = useId();
  const triggerId = `accordion-trigger-${uniqueId}`;
  const contentId = `accordion-content-${uniqueId}`;

  const handleToggle = useCallback(() => {
    if (!disabled) {
      toggleItem(id);
    }
  }, [disabled, toggleItem, id]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleToggle();
      }
    },
    [handleToggle]
  );

  return (
    <div
      className={cn('group', className)}
      data-state={isOpen ? 'open' : 'closed'}
      data-disabled={disabled || undefined}
    >
      {/* Trigger */}
      <button
        id={triggerId}
        type="button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
        disabled={disabled}
        className={cn(
          'flex w-full items-center justify-between gap-[var(--spacing-sm)]',
          'py-[var(--spacing-md)] text-left',
          'transition-colors duration-[var(--transition-base)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          triggerClassName
        )}
      >
        <span className="flex-1">{trigger}</span>

        {showChevron && (
          <motion.span
            className="flex-shrink-0 text-[var(--text-tertiary)]"
            variants={chevronVariants}
            initial={false}
            animate={isOpen ? 'expanded' : 'collapsed'}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <ChevronDown className="h-5 w-5" />
          </motion.span>
        )}
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            initial={contentAnimation.collapsed}
            animate={contentAnimation.expanded}
            exit={contentAnimation.collapsed}
            transition={contentTransition}
            className="overflow-hidden"
          >
            <div className={cn('pb-[var(--spacing-md)]', contentClassName)}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export default Accordion;
