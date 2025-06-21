'use client' // The exported `AccessibilityProvider` component is client side only.

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
    AccessibilityContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<AccessibilityProvider>`.
 * 
 * Accepts optional `enabled`, `readOnly`, and `active` states,
 * along with child components to propagate context to.
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
 * Should wrap components that rely on `useResolvedAccessibilityState`.
 * 
 * @example
 * ```ts
 * // Will inherit disabled state:
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
    } = props;
    
    
    
    // Create a stable value reference:
    const accessibilityContextValue = useMemo(() => ({
        enabled,
        readOnly,
        active,
    } satisfies Required<Pick<AccessibilityProps, 'enabled' | 'readOnly' | 'active'>>), [
        enabled,
        readOnly,
        active,
    ]);
    
    
    
    // React elements:
    return (
        <AccessibilityContext.Provider value={accessibilityContextValue}>
            {props.children}
        </AccessibilityContext.Provider>
    );
};

export {
    AccessibilityProvider,            // Named export for readability.
    AccessibilityProvider as default, // Default export to support React.lazy.
}
