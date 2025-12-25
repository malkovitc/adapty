import React from 'react';

// ============================================================================
// Async State Management
// ============================================================================

/**
 * Discriminated union for async state management
 * Provides type-safe state handling for asynchronous operations
 */
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };

/**
 * Simple loading state type for components
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// ============================================================================
// Base Component Props
// ============================================================================

/**
 * Base props for most components
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

/**
 * Props for components with loading state
 */
export interface WithLoadingProps {
  isLoading?: boolean;
}

/**
 * Props for components with error handling
 */
export interface WithErrorProps {
  error?: Error | null;
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Extract component props from a React component type
 * Usage: PropsOf<typeof MyComponent>
 */
export type PropsOf<T extends React.ComponentType<any>> =
  React.ComponentPropsWithoutRef<T>;

/**
 * Make specific properties required
 * Usage: RequireFields<MyType, 'field1' | 'field2'>
 */
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Make specific properties optional
 * Usage: PartialFields<MyType, 'field1' | 'field2'>
 */
export type PartialFields<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// ============================================================================
// Polymorphic Component Types
// ============================================================================

/**
 * Props for polymorphic 'as' prop
 */
export type AsProp<C extends React.ElementType> = {
  as?: C;
};

/**
 * Polymorphic component props with proper type inference
 * Allows components to be rendered as different HTML elements
 *
 * Usage:
 * type ButtonProps<C extends React.ElementType> = PolymorphicComponentProps<C, {
 *   variant?: 'primary' | 'secondary';
 * }>;
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = Props &
  AsProp<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof Props | 'as'>;

/**
 * Polymorphic component props with ref support
 */
export type PolymorphicComponentPropsWithRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProps<C, Props> & {
  ref?: React.ComponentPropsWithRef<C>['ref'];
};

// ============================================================================
// Common Component Prop Types
// ============================================================================

/**
 * Size variants commonly used across components
 */
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Color variants commonly used across components
 */
export type ColorVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

/**
 * Common variant types for buttons and similar components
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'link';

// ============================================================================
// Form & Input Types
// ============================================================================

/**
 * Props for form input components
 */
export interface InputProps extends BaseComponentProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  label?: string;
  name?: string;
  id?: string;
}

/**
 * Generic form field value type
 */
export type FormFieldValue = string | number | boolean | null | undefined;

/**
 * Form validation error type
 */
export interface FormError {
  field: string;
  message: string;
}

// ============================================================================
// API & Data Types
// ============================================================================

/**
 * Generic API response type
 */
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

/**
 * Paginated response type
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ============================================================================
// Event Handler Types
// ============================================================================

/**
 * Generic event handler type
 */
export type EventHandler<T = void> = (event: React.SyntheticEvent) => T;

/**
 * Click handler type
 */
export type ClickHandler = (event: React.MouseEvent) => void;

/**
 * Change handler type
 */
export type ChangeHandler<T = string> = (value: T) => void;

/**
 * Submit handler type
 */
export type SubmitHandler = (event: React.FormEvent) => void;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Type guard for checking AsyncState status
 */
export function isAsyncStateSuccess<T>(
  state: AsyncState<T>
): state is { status: 'success'; data: T } {
  return state.status === 'success';
}

/**
 * Type guard for checking AsyncState error
 */
export function isAsyncStateError<T>(
  state: AsyncState<T>
): state is { status: 'error'; error: Error } {
  return state.status === 'error';
}

/**
 * Type guard for checking AsyncState loading
 */
export function isAsyncStateLoading<T>(
  state: AsyncState<T>
): state is { status: 'loading' } {
  return state.status === 'loading';
}
