'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useId,
  type ReactNode,
  type KeyboardEvent,
} from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ============================================
// Types
// ============================================

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  registerTab: (value: string) => void;
  unregisterTab: (value: string) => void;
  tabsId: string;
  tabs: string[];
}

interface TabsProps {
  /** Initially active tab (uncontrolled mode) */
  defaultValue: string;
  /** Currently active tab (controlled mode) */
  value?: string;
  /** Callback when active tab changes */
  onChange?: (value: string) => void;
  /** Tab content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

interface TabListProps {
  /** Tab buttons */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Tab list label for accessibility */
  'aria-label'?: string;
}

interface TabProps {
  /** Unique identifier for this tab */
  value: string;
  /** Tab button content */
  children: ReactNode;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
}

interface TabPanelProps {
  /** Matches the Tab value this panel belongs to */
  value: string;
  /** Panel content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

// ============================================
// Context
// ============================================

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(componentName: string): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(`<${componentName}> must be used within a <Tabs> component`);
  }
  return context;
}

// ============================================
// Tabs (Root Component)
// ============================================

/**
 * Tabs Component
 *
 * A compound component for creating accessible tabbed interfaces.
 * Supports both controlled and uncontrolled modes.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabList>
 *     <Tab value="tab1">First Tab</Tab>
 *     <Tab value="tab2">Second Tab</Tab>
 *   </TabList>
 *   <TabPanel value="tab1">Content 1</TabPanel>
 *   <TabPanel value="tab2">Content 2</TabPanel>
 * </Tabs>
 * ```
 */
export function Tabs({
  defaultValue,
  value,
  onChange,
  children,
  className,
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [tabs, setTabs] = useState<string[]>([]);
  const tabsId = useId();

  // Controlled vs uncontrolled mode
  const isControlled = value !== undefined;
  const activeTab = isControlled ? value : internalValue;

  const setActiveTab = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  const registerTab = useCallback((tabValue: string) => {
    setTabs((prev) => {
      if (prev.includes(tabValue)) return prev;
      return [...prev, tabValue];
    });
  }, []);

  const unregisterTab = useCallback((tabValue: string) => {
    setTabs((prev) => prev.filter((t) => t !== tabValue));
  }, []);

  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        registerTab,
        unregisterTab,
        tabsId,
        tabs,
      }}
    >
      <div className={twMerge('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

// ============================================
// TabList
// ============================================

/**
 * Container for Tab buttons with keyboard navigation
 */
export function TabList({
  children,
  className,
  'aria-label': ariaLabel,
}: TabListProps) {
  const { activeTab, setActiveTab, tabs } = useTabsContext('TabList');
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex === -1) return;

      let newIndex: number | null = null;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          break;
        case 'ArrowRight':
          event.preventDefault();
          newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      if (newIndex !== null) {
        const newTab = tabs[newIndex];
        setActiveTab(newTab);

        // Focus the new tab button
        const tabListElement = tabListRef.current;
        if (tabListElement) {
          const buttons = tabListElement.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]:not([disabled])'
          );
          buttons[newIndex]?.focus();
        }
      }
    },
    [activeTab, setActiveTab, tabs]
  );

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={twMerge(
        'flex',
        'border-b border-[var(--border-default)]',
        'gap-1',
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================
// Tab
// ============================================

/**
 * Individual tab button
 */
export function Tab({ value, children, disabled = false, className }: TabProps) {
  const { activeTab, setActiveTab, registerTab, unregisterTab, tabsId } =
    useTabsContext('Tab');
  const isActive = activeTab === value;

  // Register/unregister tab on mount/unmount
  useState(() => {
    registerTab(value);
    return () => unregisterTab(value);
  });

  const handleClick = useCallback(() => {
    if (!disabled) {
      setActiveTab(value);
    }
  }, [disabled, setActiveTab, value]);

  return (
    <button
      type="button"
      role="tab"
      id={`${tabsId}-tab-${value}`}
      aria-controls={`${tabsId}-panel-${value}`}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      className={twMerge(
        clsx(
          // Base styles
          'relative',
          'px-4 py-2.5',
          'text-sm font-medium',
          'transition-all duration-[var(--transition-fast)]',
          'outline-none',
          'cursor-pointer',

          // Focus styles
          'focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2',

          // Default state
          'text-[var(--text-secondary)]',
          'hover:text-[var(--text-primary)]',

          // Active state with underline indicator
          isActive && [
            'text-[var(--text-primary)]',
            // Underline indicator
            'after:absolute',
            'after:bottom-0',
            'after:left-0',
            'after:right-0',
            'after:h-0.5',
            'after:bg-[var(--accent-primary)]',
            'after:rounded-full',
          ],

          // Disabled state
          disabled && [
            'opacity-50',
            'cursor-not-allowed',
            'hover:text-[var(--text-secondary)]',
          ]
        ),
        className
      )}
    >
      {children}
    </button>
  );
}

// ============================================
// TabPanel
// ============================================

/**
 * Content panel that corresponds to a Tab
 */
export function TabPanel({ value, children, className }: TabPanelProps) {
  const { activeTab, tabsId } = useTabsContext('TabPanel');
  const isActive = activeTab === value;

  return (
    <div
      role="tabpanel"
      id={`${tabsId}-panel-${value}`}
      aria-labelledby={`${tabsId}-tab-${value}`}
      hidden={!isActive}
      tabIndex={0}
      className={twMerge(
        clsx(
          'outline-none',
          'focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2',
          // Animation for panel switching
          isActive && [
            'animate-in fade-in-0 duration-200',
          ],
          // Default padding
          'pt-4'
        ),
        className
      )}
    >
      {isActive ? children : null}
    </div>
  );
}

// ============================================
// Variant: Filled Tabs (Alternative Style)
// ============================================

/**
 * TabList variant with filled/pill-style tabs
 * Use className override on TabList and Tab for this style
 */
export function TabListFilled({
  children,
  className,
  'aria-label': ariaLabel,
}: TabListProps) {
  const { activeTab, setActiveTab, tabs } = useTabsContext('TabListFilled');
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = tabs.indexOf(activeTab);
      if (currentIndex === -1) return;

      let newIndex: number | null = null;

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
          break;
        case 'ArrowRight':
          event.preventDefault();
          newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          event.preventDefault();
          newIndex = 0;
          break;
        case 'End':
          event.preventDefault();
          newIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      if (newIndex !== null) {
        const newTab = tabs[newIndex];
        setActiveTab(newTab);

        const tabListElement = tabListRef.current;
        if (tabListElement) {
          const buttons = tabListElement.querySelectorAll<HTMLButtonElement>(
            '[role="tab"]:not([disabled])'
          );
          buttons[newIndex]?.focus();
        }
      }
    },
    [activeTab, setActiveTab, tabs]
  );

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className={twMerge(
        'inline-flex',
        'p-1',
        'bg-[var(--bg-muted)]',
        'rounded-lg',
        'gap-1',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Tab variant with filled/pill style for use with TabListFilled
 */
export function TabFilled({
  value,
  children,
  disabled = false,
  className,
}: TabProps) {
  const { activeTab, setActiveTab, registerTab, unregisterTab, tabsId } =
    useTabsContext('TabFilled');
  const isActive = activeTab === value;

  useState(() => {
    registerTab(value);
    return () => unregisterTab(value);
  });

  const handleClick = useCallback(() => {
    if (!disabled) {
      setActiveTab(value);
    }
  }, [disabled, setActiveTab, value]);

  return (
    <button
      type="button"
      role="tab"
      id={`${tabsId}-tab-${value}`}
      aria-controls={`${tabsId}-panel-${value}`}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      className={twMerge(
        clsx(
          // Base styles
          'px-4 py-2',
          'text-sm font-medium',
          'rounded-md',
          'transition-all duration-[var(--transition-fast)]',
          'outline-none',
          'cursor-pointer',

          // Focus styles
          'focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:ring-offset-2',

          // Default state
          'text-[var(--text-secondary)]',
          'hover:text-[var(--text-primary)]',

          // Active state with filled background
          isActive && [
            'bg-white',
            'text-[var(--text-primary)]',
            'shadow-sm',
          ],

          // Disabled state
          disabled && [
            'opacity-50',
            'cursor-not-allowed',
            'hover:text-[var(--text-secondary)]',
          ]
        ),
        className
      )}
    >
      {children}
    </button>
  );
}

// ============================================
// Default Export (for convenience)
// ============================================

export default Tabs;
