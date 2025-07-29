/**
 * Represents the logical orientation of the component:
 * - `'inline'`: horizontal orientation, aligns along the inline axis (e.g., left-to-right or right-to-left)
 * - `'block'` : vertical orientation, aligns along the block axis (e.g., top-to-bottom)
 * 
 * Orientation semantics adapt to writing modes, making them direction-agnostic.
 */
export type Orientation =
    | 'inline'
    | 'block'



/**
 * Props for specifying the orientation of the component.
 * 
 * Accepts an optional `orientation`, falling back to a default when not provided.
 */
export interface OrientationVariantProps {
    /**
     * Specifies the desired orientation of the component:
     * - `'inline'` : horizontal orientation, aligns along the inline axis (e.g., left-to-right or right-to-left)
     * - `'block'`  : vertical orientation, aligns along the block axis (e.g., top-to-bottom)
     * - `'inherit'`: inherits orientation from a parent context
     * - `'invert'` : flips the inherited orientation (`'inline'` ⇄ `'block'`)
     */
    orientation          ?: Orientation | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default orientation.
 * 
 * Applied when the component does not explicitly provide the `orientation` prop.
 */
export interface OrientationVariantOptions {
    /**
     * The default orientation to apply when no `orientation` prop is explicitly provided.
     */
    defaultOrientation   ?: Orientation
}

/**
 * Represents the final resolved orientation for the component, along with its associated CSS class name and accessibility metadata.
 */
export interface ResolvedOrientationVariant {
    /**
     * The resolved orientation value.
     * 
     * Possible values:
     * - `'inline'`: horizontal orientation, aligns along the inline axis (e.g., left-to-right or right-to-left)
     * - `'block'` : vertical orientation, aligns along the block axis (e.g., top-to-bottom)
     */
    orientation           : Orientation
    
    /**
     * CSS class name corresponding to the resolved orientation.
     * 
     * Possible values:
     * - `'o-inline'`
     * - `'o-block'`
     */
    orientationClassname  : `o-${Orientation}`
    
    /**
     * Indicates whether the resolved orientation is horizontal (inline).
     */
    isOrientationInline   : boolean
    
    /**
     * Indicates whether the resolved orientation is vertical (block).
     */
    isOrientationBlock    : boolean
    
    /**
     * ARIA-compatible orientation attribute:
     * `'horizontal'` for inline, `'vertical'` for block.
     */
    ariaOrientation       : 'horizontal' | 'vertical'
}
