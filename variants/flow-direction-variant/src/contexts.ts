'use client' // Prevents `createContext()` from being invoked on server side.

// React:
import {
    // Contexts:
    createContext,
}                           from 'react'

// Types:
import {
    type FlowDirection,
}                           from './types.js'

// Defaults:
import {
    systemDefaultFlowDirection,
}                           from './internal-defaults.js'



/**
 * A React context for propagating flow direction value across the component tree.
 * 
 * Provides a system default flow direction when the component
 * is not nested within an ancestor implementing `<FlowDirectionVariantContext>`.
 */
export const FlowDirectionVariantContext = createContext<FlowDirection>(/* defaultValue : */systemDefaultFlowDirection);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    FlowDirectionVariantContext.displayName = 'FlowDirectionVariantContext';
} // if
