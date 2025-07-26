// Types:
import {
    type FlowDirection,
}                           from './types.js'



/**
 * Defines the default flow direction applied when no `flowDirection` prop is explicitly provided.
 * 
 * - `'end'`: Corresponds to the logical end edge — commonly resolved to the bottom in vertical layouts or right (LTR) in horizontal layouts.
 *   Ideal for dropdowns, slides, and overlays that expand away from their anchor.
 */
export const defaultFlowDirection : FlowDirection = 'end';
