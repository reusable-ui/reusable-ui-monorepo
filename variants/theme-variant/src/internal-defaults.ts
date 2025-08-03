// Types:
import {
    type BasicTheme,
    type ThemeVariantProps,
}                           from './types.js'



/**
 * A default intermediate theme to apply when no `theme` prop is explicitly provided.
 * 
 * This value serves as a transitional fallback before attempting context resolution.
 * 
 * - `'inherit'`: inherits theme from a parent context.
 */
export const semiDefaultTheme  : Required<ThemeVariantProps<BasicTheme>>['theme'] = 'inherit';



/**
 * A default final theme to apply when no effective `theme` value can be resolved.
 * 
 * - `'primary'`: Typically used as the baseline or main theme style.
 */
export const finalDefaultTheme : BasicTheme = 'primary';
