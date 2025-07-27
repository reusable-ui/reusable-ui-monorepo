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

// Defaults:
import {
    systemDefaultTheme,
}                           from './internal-defaults.js'



/**
 * A React context for propagating theme value across the component tree.
 * 
 * Provides a system default theme when the component
 * is not nested within an ancestor implementing `<ThemeVariantContext>`.
 */
export const ThemeVariantContext = createContext<BasicTheme | (string & {})>(/* defaultValue : */systemDefaultTheme);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    ThemeVariantContext.displayName = 'ThemeVariantContext';
} // if
