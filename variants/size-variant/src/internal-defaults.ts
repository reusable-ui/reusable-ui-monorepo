// Types:
import {
    type BasicSize,
}                           from './types.js'



/**
 * The default component size to apply when no `size` prop is explicitly provided.
 * 
 * - `'md'`: medium — commonly used as the regular or baseline size.
 */
export const defaultSize : BasicSize = 'md';

/**
 * The default list of supported size variants used across the system.
 * 
 * Components may override this list via `SizeVariantOptions.supportedSizes`
 * to restrict or extend their accepted size values.
 */
export const defaultSupportedSizes : BasicSize[] = ['sm', 'md', 'lg'];
