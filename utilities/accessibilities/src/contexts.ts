'use client' // Prevents `createContext()` from being invoked on server side.

// React:
import {
    // Contexts:
    createContext,
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



/**
 * Represents the resolved accessibility state shared via context.
 * 
 * Provides normalized values for `disabled`, `readOnly`, and `active`,
 * after applying both local props and cascading context resolution.
 */
export interface AccessibilityContextValue
    extends
        // Bases:
        Required<Pick<AccessibilityProps, 'disabled' | 'readOnly' | 'active'>>
{
}

/**
 * A React context for propagating accessibility state across the component tree.
 * 
 * Provides default values for `disabled`, `readOnly`, and `active` when the component
 * is not nested within an ancestor implementing `<AccessibilityProvider>`.
 */
export const AccessibilityContext = createContext<AccessibilityContextValue>(/* defaultValue : */{
    disabled : DEFAULT_DISABLED,
    readOnly : DEFAULT_READ_ONLY,
    active   : DEFAULT_ACTIVE,
});

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    AccessibilityContext.displayName = 'AccessibilityContext';
} // if
