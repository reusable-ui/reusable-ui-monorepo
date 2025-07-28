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



/**
 * A React context for propagating flow direction value across the component tree.
 */
export const FlowDirectionVariantContext = createContext<FlowDirection | undefined>(/* defaultValue : */undefined);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    FlowDirectionVariantContext.displayName = 'FlowDirectionVariantContext';
} // if
