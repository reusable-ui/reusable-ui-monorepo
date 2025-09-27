// Types:
import {
    type EmphasisVariantProps,
}                           from './types.js'



/**
 * A default declarative emphasis appearance to apply when neither `emphasized` prop nor `defaultEmphasized` option is explicitly provided.
 * 
 * This fallback represents an inherited emphasis appearance by default,
 * allowing components to adapt to their surrounding context unless explicitly set.
 * 
 * - `'inherit'`: inherits emphasis appearance from a parent context.
 */
export const defaultDeclarativeEmphasized : Required<EmphasisVariantProps>['emphasized'] = 'inherit';



/**
 * A default effective emphasis appearance to apply when no effective `emphasized` value can be resolved.
 * 
 * This fallback applies when `emphasized` prop is set to `'inherit'` or `'invert'` but no context is available.
 * 
 * - `false`: represents a non-emphasized appearance by default.
 */
export const defaultEffectiveEmphasized   : boolean = false;
