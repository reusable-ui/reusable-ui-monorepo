// Types:
import {
    type Orientation,
}                           from './types.js'



/**
 * Resolves the CSS classname for the given orientation.
 * 
 * - Returns `'o-inline'` for `'inline'`.
 * - Returns `'o-block'` for `'block'`.
 * 
 * @param orientation The orientation to resolve.
 * @returns A CSS classname reflecting the orientation.
 */
export const resolveOrientationClassname = (orientation: Orientation): `o-${Orientation}` => {
    return orientation === 'inline' ? 'o-inline' : 'o-block';
};
