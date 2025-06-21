/**
 * Properties that define accessibility-related attributes for controlling user interaction, editability, and active state awareness.
 * Supports optional cascading from ancestor accessibility context.
 */
export interface AccessibilityProps {
    /**
     * Whether the component is enabled (responds to user interactions) or disabled (ignores them).
     * Defaults to `true`.
     */
    enabled          ?: boolean
    
    /**
     * Whether the component is read-only (prevents user editing) or editable.
     * Defaults to `false`.
     */
    readOnly         ?: boolean
    
    /**
     * Whether the component is in the active state (e.g., checked, selected, toggled, or chosen).
     * Defaults to `false`.
     */
    active           ?: boolean
    
    
    
    /**
     * Whether to cascade the `enabled` state from an ancestor context.
     * Defaults to `true`.
     */
    cascadeEnabled   ?: boolean
    
    /**
     * Whether to cascade the `readOnly` state from an ancestor context.
     * Defaults to `true`.
     */
    cascadeReadOnly  ?: boolean
    
    /**
     * Whether to cascade the `active` state from an ancestor context.
     * Defaults to `false`.
     */
    cascadeActive    ?: boolean
}

/**
 * Represents the final resolved accessibility states for a component.
 * 
 * These values reflect the computed `enabled`, `readOnly`, and `active` states
 * after evaluating local props in combination with cascading context constraints.
 */
export interface ResolvedAccessibilityState {
    /**
     * Indicates whether the component is enabled and responsive to user interaction.
     */
    enabled  : boolean
    
    /**
     * Indicates whether the component is read-only and not editable.
     */
    readOnly : boolean
    
    /**
     * Indicates whether the component is in an active state (e.g., checked, selected, toggled, or chosen).
     */
    active   : boolean
}
