'use client' // Prevents `createContext()` from being invoked on server side.

// React:
import {
    // Contexts:
    createContext,
}                           from 'react'

// Types:
import {
    type BasicTheme,
}                           from './types.js'



/**
 * A React context for propagating the theme value across the component tree.
 */
export const ThemeVariantContext = createContext<BasicTheme | (string & {}) | undefined>(/* defaultValue : */undefined);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    ThemeVariantContext.displayName = 'ThemeVariantContext';
} // if
