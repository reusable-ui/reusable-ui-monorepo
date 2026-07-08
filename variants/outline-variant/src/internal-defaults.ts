// Types:
import {
    type OutlineVariantProps,
}                           from './types.js'



/**
 * A default declarative outlined state to apply when neither `outlined` prop nor `defaultOutlined` option is explicitly provided.
 * 
 * This fallback represents an inherited outlined state by default,
 * allowing components to adapt to their surrounding context unless explicitly set.
 * 
 * - `'inherit'`: inherits outlined state from a parent context.
 */
export const defaultDeclarativeOutlined : Required<OutlineVariantProps>['outlined'] = 'inherit';



/**
 * A default fallback outlined state to apply when no `fallbackOutlined` option is explicitly provided and no effective outlined value can be resolved.
 * 
 * This fallback applies when `outlined` prop is set to `'inherit'` or `'invert'` but no context is available.
 * 
 * - `false`: represents a non-outlined appearance by default.
 */
export const defaultFallbackOutlined    : boolean = false;
