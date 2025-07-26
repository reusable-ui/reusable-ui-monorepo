// Types:
import {
    type Orientation,
}                           from './types.js'



/**
 * Maps each orientation to its corresponding CSS class name.
 */
export const orientationClassnameMap : Record<Orientation, `o-${Orientation}`> = {
    'inline' : 'o-inline',
    'block'  : 'o-block',
};
