/**
 * Properties that define validation-related attributes for controlling validity state and cascading behavior.
 */
export interface ValidationProps {
    /**
     * Controls whether validation is enabled for this component.
     * 
     * If set to `false`, validation is disabled entirely — the component is treated as unvalidated
     * (`isValid = null`) regardless of its own or inherited state.
     * 
     * Defaults to:
     * - `true` when nested within a `<ValidationProvider>`.
     * - `false` when not nested within a `<ValidationProvider>`.
     */
    enableValidation  ?: boolean
    
    /**
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
    
    
    
    /**
     * Controls how the component's `enableValidation` value is influenced by an ancestor `<ValidationProvider>`.
     * 
     * - If `true` (default), the component inherits the ancestor’s `enableValidation` state.  
     *   ```ts
     *   computedEnableValidation = ancestorEnableValidation && enableValidation;
     *   ```
     *   This allows parent components (like `<Form>`) to disable validation for entire subtrees.
     * 
     * - If `false`, the component uses its own `enableValidation` independently:
     *   ```ts
     *   computedEnableValidation = enableValidation;
     *   ```
     */
    cascadeValidation ?: boolean
}

/**
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
