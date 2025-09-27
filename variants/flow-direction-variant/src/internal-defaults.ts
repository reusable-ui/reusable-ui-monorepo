// Types:
import {
    type FlowDirection,
    type FlowDirectionVariantProps,
}                           from './types.js'



/**
 * A default declarative flow direction to apply when neither `flowDirection` prop nor `defaultFlowDirection` option is explicitly provided.
 * 
 * This fallback aligns to the logical end edge by default,
 * suiting common use cases like dropdowns and overlays that expand away from their anchor.
 * 
 * - `'end'`: aligns to the logical end edge by default.
 */
export const defaultDeclarativeFlowDirection : Required<FlowDirectionVariantProps>['flowDirection'] = 'end';



/**
 * A default fallback flow direction to apply when no `fallbackFlowDirection` option is explicitly provided and no effective flow direction value can be resolved.
 * 
 * This fallback applies when `flowDirection` prop is set to `'inherit'` or `'invert'` but no context is available.
 * 
 * - `'end'`: aligns to the logical end edge by default.
 */
export const defaultFallbackFlowDirection    : FlowDirection = 'end';
