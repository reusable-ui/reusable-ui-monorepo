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

// Defaults:
import {
    systemDefaultOrientation,
}                           from './internal-defaults.js'



/**
 * A React context for propagating orientation value across the component tree.
 * 
 * Provides a system default orientation when the component
 * is not nested within an ancestor implementing `<OrientationVariantContext>`.
 */
export const OrientationVariantContext = createContext<Orientation>(/* defaultValue : */systemDefaultOrientation);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    OrientationVariantContext.displayName = 'OrientationVariantContext';
} // if
