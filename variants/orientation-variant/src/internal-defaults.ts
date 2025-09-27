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
export const defaultDeclarativeOrientation : Required<OrientationVariantProps>['orientation'] = 'block';



/**
 * A default fallback orientation to apply when no `fallbackOrientation` option is explicitly provided and no effective orientation value can be resolved.
 * 
 * This fallback applies when `orientation` prop is set to `'inherit'` or `'invert'` but no context is available.
 * 
 * - `'block'`: represents vertical orientation by default.
 */
export const defaultFallbackOrientation    : Orientation = 'block';
