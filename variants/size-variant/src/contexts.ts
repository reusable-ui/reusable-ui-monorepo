'use client' // Prevents `createContext()` from being invoked on server side.

// React:
import {
    // Contexts:
    createContext,
}                           from 'react'

// Types:
import {
    type BasicSize,
}                           from './types.js'



/**
 * A React context for propagating the size value across the component tree.
 */
export const SizeVariantContext = createContext<BasicSize | (string & {}) | undefined>(/* defaultValue : */undefined);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    SizeVariantContext.displayName = 'SizeVariantContext';
} // if
