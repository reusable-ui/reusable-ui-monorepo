/**
 * Default value for `enableValidation` when not explicitly defined.
 * 
 * Indicates that validation should be enabled by default, unless overridden.
 */
export const DEFAULT_ENABLE_VALIDATION  : boolean                             = true

/**
 * Default value for `isValid` when not explicitly defined.
 * 
 * Indicates that the component should compute its own validity internally by default, unless overridden.
 */
export const DEFAULT_IS_VALID           : boolean | null | 'inherit' | 'auto' = 'auto'



/**
 * The default cascading behavior for `enableValidation` when `cascadeValidation` is not provided.
 * 
 * Enables cascading validation behavior by default,
 * allowing ancestor validation settings to propagate down the component tree.
 */
export const DEFAULT_CASCADE_VALIDATION : boolean                             = true
