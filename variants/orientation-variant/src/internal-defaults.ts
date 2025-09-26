// Types:
import {
    type Orientation,
    type OrientationVariantProps,
}                           from './types.js'



/**
 * A default declarative orientation to apply when neither `orientation` prop nor `defaultOrientation` option is explicitly provided.
 * 
 * This fallback represents vertical orientation by default,
 * suiting safe stacking layouts for narrow screens.
 * 
 * - `'block'`: represents vertical orientation by default.
 */
export const declarativeDefaultOrientation  : Required<OrientationVariantProps>['orientation'] = 'block';



/**
 * A default effective orientation to apply when no effective `orientation` value can be resolved.
 * 
 * This fallback applies when `orientation` prop is set to `'inherit'` or `'invert'` but no context is available.
 * 
 * - `'block'`: represents vertical orientation by default.
 */
export const effectiveDefaultOrientation    : Orientation = 'block';
