/**
 * Properties that define accessibility-related attributes for controlling user interaction, editability, and active state awareness.
 * Supports optional cascading from ancestor accessibility context.
 */
export interface AccessibilityProps {
    /**
     * Controls whether the component is disabled (non-interactive) or enabled (interactive).
     * Defaults to `false`.
     */
    disabled         ?: boolean
    
    /**
     * Controls whether the component is read-only (non-editable) or editable.
     * Defaults to `false`.
     */
    readOnly         ?: boolean
    
    /**
     * Controls whether the component is in an active state (e.g., checked, selected, toggled, or chosen).
     * Defaults to `false`.
     */
    active           ?: boolean
    
    
    
    /**
     * Controls how the component's `disabled` state is influenced by an ancestor `<AccessibilityProvider>`.
     * 
     * - If `true` (default), the component inherits the ancestor’s `disabled` state.
     *   ```ts
     *   computedDisabled = ancestorDisabled || disabled;
     *   ```
     * - If `false`, the component uses its own `disabled` state independently:
     *   ```ts
     *   computedDisabled = disabled;
     *   ```
     */
    cascadeDisabled  ?: boolean
    
    /**
     * Controls how the component's `readOnly` state is influenced by an ancestor `<AccessibilityProvider>`.
     * 
     * - If `true` (default), the component inherits the ancestor’s `readOnly` state.
     *   ```ts
     *   computedReadOnly = ancestorReadOnly || readOnly;
     *   ```
     * - If `false`, the component uses its own `readOnly` state independently:
     *   ```ts
     *   computedReadOnly = readOnly;
     *   ```
     */
    cascadeReadOnly  ?: boolean
    
    /**
     * Controls how the component's `active` state is influenced by an ancestor `<AccessibilityProvider>`.
     * 
     * - If `true`, the component inherits the ancestor’s `active` state.
     *   ```ts
     *   computedActive = ancestorActive || active;
     *   ```
     * - If `false` (default), the component uses its own `active` state independently:
     *   ```ts
     *   computedActive = active;
     *   ```
     */
    cascadeActive    ?: boolean
}

/**
 * Represents the final resolved accessibility states of a component.
 * 
 * These values reflect the computed `disabled`, `readOnly`, and `active` states
 * after evaluating local props in conjunction with any cascading accessibility context.
 */
export interface ResolvedAccessibilityState {
    /**
     * Indicates whether the component is disabled (non-interactive).
     */
    disabled : boolean
    
    /**
     * Indicates whether the component is read-only (non-editable).
     */
    readOnly : boolean
    
    /**
     * Indicates whether the component is in an active state (e.g., checked, selected, toggled, or chosen).
     */
    active   : boolean
}
