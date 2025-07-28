'use client' // Prevents `createContext()` from being invoked on server side.

// React:
import {
    // Contexts:
    createContext,
}                           from 'react'

// Types:
import {
    type Orientation,
}                           from './types.js'



/**
 * A React context for propagating orientation value across the component tree.
 */
export const OrientationVariantContext = createContext<Orientation | undefined>(/* defaultValue : */undefined);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    OrientationVariantContext.displayName = 'OrientationVariantContext';
} // if
