/**
 * Default value for `enabled` state when not explicitly defined.
 * 
 * Indicates that the component is enabled by default, unless overridden.
 */
export const DEFAULT_ENABLED           : boolean = true

/**
 * Default value for `readOnly` state when not explicitly defined.
 * 
 * Indicates that the component is editable by default, unless overridden.
 */
export const DEFAULT_READ_ONLY         : boolean = false

/**
 * Default value for `active` state when not explicitly defined.
 * 
 * Indicates that the component is inactive by default, unless overridden.
 */
export const DEFAULT_ACTIVE            : boolean = false



/**
 * The default cascading behavior for `enabled` state when `cascadeEnabled` is not provided.
 * 
 * Enables cascading disabled state behavior by default,
 * allowing ancestor disabled state settings to propagate down the component tree.
 */
export const DEFAULT_CASCADE_ENABLED   : boolean = true

/**
 * The default cascading behavior for `readOnly` state when `cascadeReadOnly` is not provided.
 * 
 * Enables cascading read-only state (prevents user editing) behavior by default,
 * allowing ancestor read-only state settings to propagate down the component tree.
 */
export const DEFAULT_CASCADE_READ_ONLY : boolean = true

/**
 * The default cascading behavior for `active` state when `cascadeActive` is not provided.
 * 
 * Disables cascading active state (e.g., checked, selected, toggled, or chosen) behavior by default,
 * prevents ancestor active state settings to propagate down the component tree.
 */
export const DEFAULT_CASCADE_ACTIVE    : boolean = false
