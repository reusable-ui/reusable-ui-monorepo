'use client' // Prevents `createContext()` from being invoked on server side.

// React:
import {
    // Contexts:
    createContext,
}                           from 'react'

// Types:
import {
    type ValidationProps,
}                           from './types.js'

// Defaults:
import {
    DEFAULT_ENABLE_VALIDATION,
}                           from './defaults.js'



/**
 * Represents the resolved validation state shared via context.
 * 
 * Provides downstream components with normalized values
 * after applying cascading and local resolution logic.
 */
export interface ValidationContextValue
    extends
        // Bases:
        Required<Pick<ValidationProps, 'enableValidation' | 'isValid'>>
{
    /**
     * The resolved validation result to provide to descendants.
     * 
     * - `true`   → explicitly valid.
     * - `false`  → explicitly invalid.
     * - `null`   → explicitly unvalidated.
     * 
     * Note: This narrows the `isValid` type by excluding `'auto'` and `'inherit'`.
     */
    isValid             : boolean | null
    
    /**
     * Indicates whether this component is nested within a `<ValidationProvider>`.
     * Used to determine default values for props like `enableValidation`.
     */
    hasParentValidation : boolean
}

/**
 * A React context for distributing validation state throughout the component tree.
 * 
 * Provides default values when no ancestor `<ValidationProvider>` is present.
 */
export const ValidationContext = createContext<ValidationContextValue>(/* defaultValue: */ {
    hasParentValidation : false, // Indicates absence of a parent <ValidationProvider>.
    
    enableValidation    : DEFAULT_ENABLE_VALIDATION,
    isValid             : null,
});

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    ValidationContext.displayName = 'ValidationContext';
} // if
