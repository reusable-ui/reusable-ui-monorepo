'use client' // The exported `<AccessibilityProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
    
    
    
    // Hooks:
    useMemo,
}                           from 'react'

// Types:
import {
    type AccessibilityProps,
}                           from './types.js'

// Defaults:
import {
    DEFAULT_DISABLED,
    DEFAULT_READ_ONLY,
    DEFAULT_ACTIVE,
}                           from './defaults.js'

// Contexts:
import {
    type AccessibilityContextValue,
    AccessibilityContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<AccessibilityProvider>`.
 * 
 * Accepts optional `disabled`, `readOnly`, and `active` states,
 * along with children to receive the propagated accessibility state.
 */
export interface AccessibilityProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<AccessibilityProps, 'disabled' | 'readOnly' | 'active'>>
{
}

/**
 * Provides accessibility context to descendant components,
 * enables cascading resolution of `disabled`, `readOnly`, and `active` states.
 * 
 * Should wrap components that rely on `useResolvedAccessibilityState()`.
 * 
 * @example
 * ```ts
 * // The child will inherit `disabled = true`:
 * <AccessibilityProvider disabled={true}>
 *     <ToggleButton />
 * </AccessibilityProvider>
 * ```
 */
const AccessibilityProvider = (props: AccessibilityProviderProps): ReactElement | null => {
    // Extract props and assign defaults:
    const {
        disabled = DEFAULT_DISABLED,
        readOnly = DEFAULT_READ_ONLY,
        active   = DEFAULT_ACTIVE,
        children,
    } = props;
    
    
    
    // Memoize context value to prevent unnecessary re-renders:
    const accessibilityContextValue = useMemo(() => ({
        disabled,
        readOnly,
        active,
    } satisfies AccessibilityContextValue), [
        disabled,
        readOnly,
        active,
    ]);
    
    
    
    // React elements:
    return (
        <AccessibilityContext value={accessibilityContextValue}>
            {children}
        </AccessibilityContext>
    );
};

export {
    AccessibilityProvider,            // Named export for readability.
    AccessibilityProvider as default, // Default export to support React.lazy.
}
