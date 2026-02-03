'use client' // The exported `<ValidationProvider>` component is client side only.

// React:
import React, {
    // Types:
    type PropsWithChildren,
    type ReactElement,
}                           from 'react'

// Types:
import {
    type ValidationProps,
}                           from './types.js'

// Reusable-ui states:
import {
    // Types:
    type ValidityStateProviderProps,
    
    
    
    // Contexts:
    ValidityStateProvider,
}                           from '@reusable-ui/validity-state'      // Lifecycle-aware validation state with transition animations and semantic styling hooks for UI components.



// React components:

/**
 * @deprecated
 * Use {@link ValidityStateProviderProps} instead.
 * 
 * Props for `<ValidationProvider>`.
 * 
 * Accepts optional `enableValidation` and `isValid` states,
 * along with children to receive the propagated validation state.
 */
export interface ValidationProviderProps
    extends
        // Bases:
        PropsWithChildren<ValidityStateProviderProps>,
        Pick<ValidationProps, 'isValid'>
{
    /**
     * @deprecated
     * Use {@link ValidityStateProviderProps.validity} instead.
     * 
     * Aliased to `ValidityStateProviderProps.validity`
     * 
     * The resolved validation result to provide to descendants.
     * 
     * - `true`   → explicitly valid.
     * - `false`  → explicitly invalid.
     * - `null`   → explicitly unvalidated.
     * 
     * Note: This narrows the `isValid` type by excluding `'auto'` and `'inherit'`.
     */
    isValid ?: boolean | null
}

/**
 * @deprecated
 * Use {@link ValidityStateProvider} instead.
 * 
 * Provides validation context to descendant components,
 * enabling cascading resolution of `enableValidation` and `isValid` states.
 * 
 * Should wrap components that rely on `useResolvedValidationState()`.
 * 
 * @example
 * ```ts
 * // The child will inherit `enableValidation = false`:
 * <ValidationProvider enableValidation={false}>
 *     <PasswordField />
 * </ValidationProvider>
 * ```
 */
const ValidationProvider = (props: ValidationProviderProps): ReactElement | null => {
    // Extract props and assign defaults:
    const {
        enableValidation,
        isValid,
        validity = isValid,
        cascadeValidation,
        defaultEnableValidation,
        children,
    } = props;
    
    
    
    // React elements:
    return (
        <ValidityStateProvider enableValidation={enableValidation} validity={validity} cascadeValidation={cascadeValidation} defaultEnableValidation={defaultEnableValidation}>
            {children}
        </ValidityStateProvider>
    );
};

export {
    ValidationProvider,            // Named export for readability.
    ValidationProvider as default, // Default export to support React.lazy.
}
