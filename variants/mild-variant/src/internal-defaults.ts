// Types:
import {
    type MildVariantProps,
}                           from './types.js'



/**
 * A default declarative mild appearance to apply when neither `mild` prop nor `defaultMild` option is explicitly provided.
 * 
 * This fallback represents an inherited mild appearance by default,
 * allowing components to adapt to their surrounding context unless explicitly set.
 * 
 * - `'inherit'`: inherits mild appearance from a parent context.
 */
export const defaultDeclarativeMild : Required<MildVariantProps>['mild'] = 'inherit';



/**
 * A default fallback mild appearance to apply when no `fallbackMild` option is explicitly provided and no effective mild value can be resolved.
 * 
 * This fallback applies when `mild` prop is set to `'inherit'` or `'invert'` but no context is available.
 * 
 * - `false`: represents a non-mild appearance by default.
 */
export const defaultFallbackMild    : boolean = false;
