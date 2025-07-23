// Types:
import {
    type AxisOrientation,
    type DirectionalOrientation,
}                           from './types.js'



/**
 * Defines the default axis orientation used when no orientation is explicitly specified.
 * 
 * - `'block'`: vertical axis — suitable for stacking elements top-to-bottom.
 */
export const defaultAxisOrientation        : AxisOrientation        = 'block';

/**
 * Defines the default directional orientation used when no orientation is explicitly specified.
 * 
 * - `'block-end'`: aligns elements toward the bottom edge of the vertical axis — 
 *   typically used for dropdowns or anchored overlays.
 */
export const defaultDirectionalOrientation : DirectionalOrientation = 'block-end';
