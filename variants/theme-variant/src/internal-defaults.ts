// Types:
import {
    type BasicTheme,
    type ThemeVariantProps,
}                           from './types.js'



/**
 * A default declarative theme to apply when neither `theme` prop nor `defaultTheme` option is explicitly provided.
 * 
 * This fallback represents an inherited theme by default,
 * allowing components to adapt to their surrounding context unless a specific theme is set.
 * 
 * - `'inherit'`: inherits theme from a parent context.
 */
export const defaultDeclarativeTheme : Required<ThemeVariantProps<BasicTheme>>['theme'] = 'inherit';



/**
 * A default effective theme to apply when no effective `theme` value can be resolved.
 * 
 * This fallback applies when `theme` prop is set to `'inherit'` but no context is available.
 * 
 * - `'primary'`: represents the primary theme by default.
 */
export const defaultEffectiveTheme   : BasicTheme = 'primary';
