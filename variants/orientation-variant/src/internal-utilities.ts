// Types:
import {
    type AxisOrientation,
    type DirectionalOrientation,
}                           from './types.js'



/**
 * Maps each axis orientation to its corresponding CSS class name.
 */
export const axisOrientationClassnameMap        : Record<AxisOrientation, `o-${AxisOrientation}`> = {
    'inline'        : 'o-inline',
    'block'         : 'o-block',
};

/**
 * Maps each directional orientation to its corresponding CSS class name.
 */
export const directionalOrientationClassnameMap : Record<DirectionalOrientation, `o-${DirectionalOrientation}`> = {
    'inline-start'  : 'o-inline-start',
    'inline-end'    : 'o-inline-end',
    'block-start'   : 'o-block-start',
    'block-end'     : 'o-block-end',
};
