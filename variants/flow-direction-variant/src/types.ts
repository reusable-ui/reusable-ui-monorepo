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
