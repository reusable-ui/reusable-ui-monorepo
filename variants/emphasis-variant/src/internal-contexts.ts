'use client' // Prevents `createContext()` from being invoked on server side.

// React:
import {
    // Contexts:
    createContext,
}                           from 'react'



/**
 * A React context for propagating the emphasized value across the component tree.
 */
export const EmphasisVariantContext = createContext<boolean | undefined>(/* defaultValue : */undefined);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    EmphasisVariantContext.displayName = 'EmphasisVariantContext';
} // if
