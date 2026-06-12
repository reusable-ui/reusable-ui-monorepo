'use client' // Prevents `createContext()` from being invoked on server side.

// React:
import {
    // Contexts:
    createContext,
}                           from 'react'



/**
 * A React context for propagating the active value across the component tree.
 */
export const ActiveStateContext = createContext<boolean | undefined>(/* defaultValue : */undefined);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    ActiveStateContext.displayName = 'ActiveStateContext';
} // if
