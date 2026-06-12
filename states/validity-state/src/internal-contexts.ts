'use client' // Prevents `createContext()` from being invoked on server side.

// React:
import {
    // Contexts:
    createContext,
}                           from 'react'

// Types:
import {
    type ValidityStateProps,
}                           from './types.js'



/**
 * Defines the validity context shape.
 *
 * Provides:
 * - The cumulative validation policy (merged `enableValidation` and `validity`).
 * - A default hint for descendant components' `ValidityStateProps.enableValidation`.
 */
export interface ValidityStateContextValue
    extends
        // Bases:
        Required<Pick<ValidityStateProps, 'enableValidation' | 'validity'>>
{
    /**
     * The default enablement hint for descendant inputs.
     * 
     * - Can be overridden by a `<Dialog>`-like UI by explicitly setting to `false`,
     *   simulating the behavior of inputs outside a `<Form>`.
     * - Used by inputs as their default `enableValidation` value when not explicitly provided.
     * 
     * Defaults to `true` (simulating being inside a `<Form>`).
     */
    defaultEnableValidation : boolean
}



/**
 * A React context for propagating the **cumulative validation policy**
 * (merged enablement and validity) across the component tree.
 * 
 * Each <ValidityStateProvider> combines its own props with the nearest
 * ancestor context (if `cascadeValidation=true`), producing a cumulative
 * policy that descendant components consume.
 */
export const ValidityStateContext = createContext<ValidityStateContextValue | undefined>(/* defaultValue : */undefined);

// Sets a readable name for debugging in React DevTools:
if (process.env.NODE_ENV === 'development') {
    ValidityStateContext.displayName = 'ValidityStateContext';
} // if
