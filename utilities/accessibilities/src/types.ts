/**
 * Properties that define accessibility-related attributes for controlling user interaction, editability, and active state awareness.
 * Supports optional cascading from ancestor accessibility context.
 */
export interface AccessibilityProps {
    /**
     * Controls whether the component is enabled (responds to user interactions) or disabled (ignores them).
     * Defaults to `true`.
     */
    enabled          ?: boolean
    
    /**
     * Controls whether the component is read-only (prevents user editing) or editable.
     * Defaults to `false`.
     */
    readOnly         ?: boolean
    
    /**
     * Controls whether the component is in the active state (e.g., checked, selected, toggled, or chosen).
     * Defaults to `false`.
     */
    active           ?: boolean
    
    
    
    /**
     * Controls how the component's `enabled` value is influenced by an ancestor `<AccessibilityProvider>`.
     * 
     * - If `true` (default), the component inherits the ancestor’s `enabled` state.
     *   ```ts
     *   computedEnabled = ancestorEnabled && enabled;
     *   ```
     * - If `false`, the component uses its own `enabled` independently:
     *   ```ts
     *   computedEnabled = enabled;
     *   ```
     */
    cascadeEnabled   ?: boolean
    
    /**
     * Controls how the component's `readOnly` value is influenced by an ancestor `<AccessibilityProvider>`.
     * 
     * - If `true` (default), the component inherits the ancestor’s `readOnly` state.
     *   ```ts
     *   computedReadOnly = ancestorReadOnly || readOnly;
     *   ```
     * - If `false`, the component uses its own `readOnly` independently:
     *   ```ts
     *   computedReadOnly = readOnly;
     *   ```
     */
    cascadeReadOnly  ?: boolean
    
    /**
     * Controls how the component's `active` value is influenced by an ancestor `<AccessibilityProvider>`.
     * 
     * - If `true`, the component inherits the ancestor’s `active` state.
     *   ```ts
     *   computedActive = ancestorActive || active;
     *   ```
     * - If `false` (default), the component uses its own `active` independently:
     *   ```ts
     *   computedActive = active;
     *   ```
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
