// Types:
import {
    type Orientation,
    type OrientationVariantProps,
}                           from './types.js'



/**
 * A default intermediate orientation to apply when no `orientation` prop is explicitly provided.
 * 
 * This value serves as a transitional fallback before attempting context resolution.
 * 
 * - `'block'`: vertical orientation, aligns along the block axis — commonly used for stacking elements top-to-bottom.
 */
export const semiDefaultOrientation  : Required<OrientationVariantProps>['orientation'] = 'block';



/**
 * A default final orientation to apply when no effective `orientation` value can be resolved.
 * 
 * - `'block'`: vertical orientation, aligns along the block axis — commonly used for stacking elements top-to-bottom.
 *   Ideal for vertical layouts such as form fields, lists, or column-based arrangements.
 */
export const finalDefaultOrientation : Orientation = 'block';
