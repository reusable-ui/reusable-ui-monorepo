'use client' // The exported `<ValidationProvider>` component is client side only.

// React:
import {
    // React:
    default as React,
    
    
    
    // Types:
    type PropsWithChildren,
    type ReactElement,
    
    
    
    // Hooks:
    useMemo,
}                           from 'react'

// Types:
import {
    type ValidationProps,
}                           from './types.js'

// Defaults:
import {
    DEFAULT_ENABLE_VALIDATION,
}                           from './defaults.js'

// Contexts:
import {
    type ValidationContextValue,
    ValidationContext,
}                           from './contexts.js'



// React components:

/**
 * Props for `<ValidationProvider>`.
 * 
 * Accepts optional `enableValidation` and `isValid` states,
 * along with children to receive the propagated validation state.
 */
export interface ValidationProviderProps
    extends
        // Bases:
        PropsWithChildren<Pick<ValidationProps, 'enableValidation' | 'isValid'>>
{
    /**
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
        enableValidation = DEFAULT_ENABLE_VALIDATION,
        isValid          = null,
        children,
    } = props;
    
    
    
    // Memoize context value to prevent unnecessary re-renders:
    const validationContextValue = useMemo(() => ({
        hasParentValidation : true, // Indicates presence of a parent <ValidationProvider>.
        
        enableValidation,
        isValid,
    } satisfies ValidationContextValue), [
        enableValidation,
        isValid,
    ]);
    
    
    
    // React elements:
    return (
        <ValidationContext value={validationContextValue}>
            {children}
        </ValidationContext>
    );
};

export {
    ValidationProvider,            // Named export for readability.
    ValidationProvider as default, // Default export to support React.lazy.
}
