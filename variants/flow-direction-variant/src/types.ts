/**
 * Represents the logical flow direction of a component's expansion or alignment,
 * relative to its layout context and inline axis.
 * 
 * This abstraction enables placement and animation behavior to be defined
 * independently from physical coordinates, adapting to `writing-mode` and `direction`.
 * 
 * - `'start'` : The inline-start edge, determined by `writing-mode` and `direction`.
 * - `'end'`   : The inline-end   edge, similarly resolved based on layout semantics.
 * 
 * ### Logical Edge Resolution Matrix:
 * 
 * | Writing Mode    | Direction | 'start' resolves to | 'end' resolves to |
 * |-----------------|-----------|---------------------|-------------------|
 * | `horizontal-tb` | `ltr`     | left                | right             |
 * | `horizontal-tb` | `rtl`     | right               | left              |
 * | `vertical-rl`   | `ltr`     | top                 | bottom            |
 * | `vertical-rl`   | `rtl`     | bottom              | top               |
 * | `vertical-lr`   | `ltr`     | top                 | bottom            |
 * | `vertical-lr`   | `rtl`     | bottom              | top               |
 * 
 * Commonly used in dropdown placement, tooltip anchoring, sliding flows,
 * and any directional alignment that responds to writing systems.
 */
export type FlowDirection =
    | 'start'
    | 'end'



/**
 * Props for specifying the flow direction of the component.
 * 
 * Accepts an optional `flowDirection`, falling back to a default when not provided.
 */
export interface FlowDirectionVariantProps {
    /**
     * Specifies the desired flow direction of the component:
     * - `'start'`  : aligns to the logical start edge (e.g. left in LTR, top in top-down modes)
     * - `'end'`    : aligns to the logical end edge (e.g. right in LTR, bottom in top-down modes)
     * - `'inherit'`: inherits flow direction from a parent context
     * - `'invert'` : flips the inherited flow direction (`'start'` ⇄ `'end'`)
     */
    flowDirection          ?: FlowDirection | 'inherit' | 'invert'
}

/**
 * Optional configuration options for specifying the default flow direction.
 * 
 * Applied when the component does not explicitly provide the `flowDirection` prop.
 */
export interface FlowDirectionVariantOptions {
    /**
     * The default flow direction to apply when no `flowDirection` prop is explicitly provided.
     */
    defaultFlowDirection   ?: FlowDirection
}

/**
 * Represents the final resolved flow direction for the component, along with its associated CSS class name.
 */
export interface ResolvedFlowDirectionVariant {
    /**
     * The resolved flow direction value.
     * 
     * Example values:
     * - `'start'`: aligns to the logical start edge (e.g. left in LTR, top in top-down modes)
     * - `'end'`  : aligns to the logical end edge (e.g. right in LTR, bottom in top-down modes)
     */
    flowDirection           : FlowDirection
    
    /**
     * CSS class name corresponding to the resolved flow direction.
     * 
     * Example values:
     * - `'f-start'`
     * - `'f-end'`
     */
    flowDirectionClassname  : `f-${FlowDirection}`
}
