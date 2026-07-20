// Types:
import {
    type FlowDirection,
}                           from './types.js'



/**
 * Maps each flow direction to its corresponding CSS classname.
 */
export const flowDirectionClassnameMap : Record<FlowDirection, `f-${FlowDirection}`> = {
    'start' : 'f-start',
    'end'   : 'f-end',
};
