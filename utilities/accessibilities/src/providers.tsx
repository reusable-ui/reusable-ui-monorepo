'use client' // The exported `<AccessibilityProvider>` component is client side only.

// React:
import {
    // React:
    default as React,
    
    
    
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
    DEFAULT_ENABLED,
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
 * Accepts optional `enabled`, `readOnly`, and `active` states,
 * along with children to receive the propagated accessibility state.
 */
export interface AccessibilityProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<AccessibilityProps, 'enabled' | 'readOnly' | 'active'>>
{
}

/**
 * Provides accessibility context to descendant components,
 * enabling cascading resolution of `enabled`, `readOnly`, and `active` states.
 * 
 * Should wrap components that rely on `useResolvedAccessibilityState()`.
 * 
 * @example
 * ```ts
 * // The child will inherit `enabled = false`:
 * <AccessibilityProvider enabled={false}>
 *     <ToggleButton />
 * </AccessibilityProvider>
 * ```
 */
const AccessibilityProvider = (props: AccessibilityProviderProps): ReactElement | null => {
    // Extract props and assign defaults:
    const {
        enabled  = DEFAULT_ENABLED,
        readOnly = DEFAULT_READ_ONLY,
        active   = DEFAULT_ACTIVE,
        children,
    } = props;
    
    
    
    // Memoize context value to prevent unnecessary re-renders:
    const accessibilityContextValue = useMemo(() => ({
        enabled,
        readOnly,
        active,
    } satisfies AccessibilityContextValue), [
        enabled,
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
