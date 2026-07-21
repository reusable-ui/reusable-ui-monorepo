// Types:
import {
    type FlowDirection,
}                           from './types.js'



/**
 * Resolves the CSS classname for the given flow direction.
 * 
 * - Returns `'f-start'` for `'start'`.
 * - Returns `'f-end'` for `'end'`.
 * 
 * @param flowDirection The flow direction to resolve.
 * @returns A CSS classname reflecting the flow direction.
 */
export const resolveFlowDirectionClassname = (flowDirection: FlowDirection): `f-${FlowDirection}` => {
    return flowDirection === 'start' ? 'f-start' : 'f-end';
};
