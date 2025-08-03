// Types:
import {
    type BasicSize,
    type SizeVariantProps,
}                           from './types.js'



/**
 * A default intermediate size to apply when no `size` prop is explicitly provided.
 * 
 * This value serves as a transitional fallback before attempting context resolution.
 * 
 * - `'inherit'`: inherits size from a parent context.
 */
export const semiDefaultSize       : Required<SizeVariantProps<BasicSize>>['size'] = 'inherit';



/**
 * A default final size to apply when no effective `size` value can be resolved.
 * 
 * - `'md'`: medium — commonly used as the regular or baseline size.
 */
export const finalDefaultSize      : BasicSize = 'md';

/**
 * The default list of supported size variants used across the system.
 * 
 * Components may override this list via `SizeVariantOptions.supportedSizes`
 * to restrict or extend their accepted size values.
 */
export const defaultSupportedSizes : BasicSize[] = ['sm', 'md', 'lg'];
