// Types:
import {
    type Orientation,
}                           from './types.js'



/**
 * A context-level default orientation to apply when no `orientation` prop is explicitly provided.
 * 
 * - `'block'`: vertical orientation, aligns along the block axis — commonly used for stacking elements top-to-bottom.
 *   Ideal for vertical layouts such as form fields, lists, or column-based arrangements.
 */
export const contextDefaultOrientation : Orientation = 'block';
