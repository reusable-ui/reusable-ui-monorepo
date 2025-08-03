// Types:
import {
    type FlowDirection,
    type FlowDirectionVariantProps,
}                           from './types.js'



/**
 * A default intermediate flow direction to apply when no `flowDirection` prop is explicitly provided.
 * 
 * This value serves as a transitional fallback before attempting context resolution.
 * 
 * - `'end'`: Corresponds to the logical end edge — commonly resolved to the bottom in vertical layouts or right (LTR) in horizontal layouts.
 *   Ideal for dropdowns, slides, and overlays that expand away from their anchor.
 */
export const semiDefaultFlowDirection  : Required<FlowDirectionVariantProps>['flowDirection'] = 'end';



/**
 * A default final flow direction to apply when no effective `flowDirection` value can be resolved.
 * 
 * - `'end'`: Corresponds to the logical end edge — commonly resolved to the bottom in vertical layouts or right (LTR) in horizontal layouts.
 *   Ideal for dropdowns, slides, and overlays that expand away from their anchor.
 */
export const finalDefaultFlowDirection : FlowDirection = 'end';
