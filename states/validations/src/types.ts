// Reusable-ui states:
import {
    // Types:
    type ValidityStateProps,
}                           from '@reusable-ui/validity-state'      // Lifecycle-aware validation state with transition animations and semantic styling hooks for UI components.



/**
 * @deprecated
 * Use {@link ValidityStateProps} instead.
 * 
 * Properties that define validation-related attributes for controlling validity state and cascading behavior.
 */
export interface ValidationProps
    extends
        // Bases:
        Pick<ValidityStateProps, 'enableValidation' | 'cascadeValidation'>
{
    /**
     * @deprecated
     * Use {@link ValidityStateProps.validity} instead.
     * 
     * The validation state of this component.
     * 
     * Accepted values:
     * - `true`   → explicitly valid.
     * - `false`  → explicitly invalid.
     * - `null`   → explicitly unvalidated.
     * - `'inherit'` → copy `isValid` from the nearest `<ValidationProvider>` (which will always be one of `true`, `false`, or `null`).
     * - `'auto'` → compute validity internally (e.g. based on required, length, etc.).
     * 
     * If `enableValidation` is `false`, this value is ignored and treated as `null`.
     * 
     * Defaults to `'auto'`.
     */
    isValid           ?: boolean | null | 'inherit' | 'auto'
}

/**
 * @deprecated
 * Use the resolved state returned by {@link useValidityState} instead.
 * 
 * Represents the final resolved validation states for a component.
 * 
 * These values reflect the computed `enableValidation` and `isValid` states
 * after evaluating local props in combination with cascading context constraints.
 */
export interface ResolvedValidationState {
    /**
     * Indicates whether validation is currently enabled for the component,
     * after applying cascading rules from any ancestor `<ValidationProvider>`.
     */
    enableValidation   : boolean
    
    /**
     * The resolved validation result:
     * - `true`   → explicitly valid.
     * - `false`  → explicitly invalid.
     * - `null`   → explicitly unvalidated or validation is disabled.
     * - `'auto'` → internal validity should still be computed by the component.
     */
    isValid            : boolean | null | 'auto'
}
