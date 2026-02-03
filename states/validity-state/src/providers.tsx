'use client' // The exported `<ValidityStateProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
    
    
    
    // Hooks:
    use,
    useMemo,
}                           from 'react'

// Types:
import {
    type ValidityStateProps,
}                           from './types.js'

// Defaults:
import {
    defaultProviderEnableValidation,
    defaultDeclarativeValidity,
    defaultCascadeValidation,
}                           from './internal-defaults.js'

// Contexts:
import {
    // Types:
    type ValidityStateContextValue,
    
    
    
    // Contexts:
    ValidityStateContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<ValidityStateProvider>`.
 * 
 * Specifies how a group of inputs should follow a consistent validation policy
 * (enabled/disabled, valid/invalid, or automatic), and whether that policy
 * should be inherited from the nearest ancestor or defined independently.
 */
export interface ValidityStateProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ValidityStateProps, 'enableValidation' | 'validity' | 'cascadeValidation'>>,
        Partial<Pick<ValidityStateContextValue, 'defaultEnableValidation'>>
{
}

/**
 * Controls a validation policy for its children.
 * 
 * Wraps a group of inputs so they follow a consistent validation policy
 * (enabled/disabled, valid/invalid, or automatic), and whether that policy
 * should be inherited from the nearest ancestor or defined independently.
 * 
 * - `enableValidation` → whether validation is active in this scope.
 * - `validity` → the intended validity state (valid, invalid, unvalidated, or auto).
 * - `cascadeValidation` → whether this provider should inherit the nearest
 *   ancestor's policy (`true`), or create an isolated policy (`false`).
 * 
 * Typical usage:
 * - Enable or disable validation for all inputs in a section.
 * - Force a group of inputs to be valid or invalid.
 * - Break inheritance with `cascadeValidation = false` to isolate a subsection.
 * 
 * @example Enable or disable validation for all inputs in a section:
 * ```tsx
 * <ValidityStateProvider enableValidation={true}>
 *     <Input />
 *     <Input />
 *     <Input />
 * </ValidityStateProvider>
 * ```
 *
 * @example Force a group of inputs to be valid or invalid:
 * ```tsx
 * <ValidityStateProvider validity={false}>
 *     <Input />
 *     <Input />
 * </ValidityStateProvider>
 *
 * <ValidityStateProvider validity={true}>
 *     <Input />
 *     <Input />
 * </ValidityStateProvider>
 * ```
 *
 * @example Break inheritance with `cascadeValidation={false}`:
 * ```tsx
 * <ValidityStateProvider validity={false}>
 *     <Input /> // invalid by parent
 *     
 *     <ValidityStateProvider cascadeValidation={false} validity="auto">
 *         <Input /> // independent, resolves validity on its own
 *     </ValidityStateProvider>
 * </ValidityStateProvider>
 * ```
 *
 * @example Simulate a standalone `<Dialog>` with validation disabled:
 * ```tsx
 * <Dialog>
 *     <ValidityStateProvider defaultEnableValidation={false}>
 *         <Input /> // disabled by default
 *         <Input enableValidation={true} /> // explicit opt-in
 *     </ValidityStateProvider>
 * </Dialog>
 * ```
 */
const ValidityStateProvider = (props: ValidityStateProviderProps): ReactElement | null => {
    // Extract props and assign defaults:
    const {
        enableValidation        = defaultProviderEnableValidation,
        validity                = defaultDeclarativeValidity,
        cascadeValidation       = defaultCascadeValidation,
        defaultEnableValidation = true, // Defaults to `true` (simulating being inside a `<Form>`).
        children,
    } = props;
    
    
    
    // Optionally read the nearest ancestor policy:
    // - Contains the cumulative validation policy (enablement + validity).
    // - `undefined` if inheritance is disabled or no ancestor exists.
    const parentValidationPolicy = (
        cascadeValidation
        ? use(ValidityStateContext)
        : undefined
    );
    
    
    
    // Resolve enablement cumulatively (AND logic):
    // - Both ancestor and local must allow validation.
    const cumulativeEnableValidation = (
        parentValidationPolicy
        ? parentValidationPolicy.enableValidation && enableValidation
        : enableValidation
    );
    
    
    
    // Resolve validity with nearest-wins logic:
    // - If local validity is explicit (true, false, or null), it wins outright.
    // - If local validity is 'auto', inherit ancestor validity if explicit.
    // - If both local and ancestor are 'auto', defer resolution to the consuming component.
    const cumulativeValidity = (() => {
        if (validity !== 'auto') return validity;
        
        const parentValidity = parentValidationPolicy?.validity;
        if ((parentValidity !== undefined) && (parentValidity !== 'auto')) return parentValidity;
        
        return validity;
    })();
    
    
    
    // Memoize the cumulative policy object:
    // - Provides a stable reference to prevent unnecessary re-renders.
    const cumulativeValidationPolicy = useMemo((): ValidityStateContextValue => ({
        enableValidation : cumulativeEnableValidation,
        validity         : cumulativeValidity,
        defaultEnableValidation,
    }), [cumulativeEnableValidation, cumulativeValidity, defaultEnableValidation]);
    
    
    
    // Provide the cumulative validation policy to descendants:
    // - Serves as the `parentValidationPolicy` for direct nested providers.
    // - Nested providers can refine it further (or isolate it, depending on inheritance setting).
    // - Inputs can consume it directly to resolve their own validation state.
    return (
        <ValidityStateContext value={cumulativeValidationPolicy}>
            {children}
        </ValidityStateContext>
    );
};

export {
    ValidityStateProvider,            // Named export for readability.
    ValidityStateProvider as default, // Default export to support React.lazy.
}
