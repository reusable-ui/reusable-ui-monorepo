// Types:
import {
    type BasicSize,
    type SizeVariantProps,
}                           from './types.js'



/**
 * A default declarative size to apply when neither `size` prop nor `defaultSize` option is explicitly provided.
 * 
 * This fallback represents an inherited size by default,
 * allowing components to adapt to their surrounding context unless a specific size is set.
 * 
 * - `'inherit'`: inherits size from a parent context.
 */
export const declarativeDefaultSize : Required<SizeVariantProps<BasicSize>>['size'] = 'inherit';



/**
 * A default effective size to apply when no effective `size` value can be resolved.
 * 
 * This fallback applies when `size` prop is set to `'inherit'` but no context is available, or
 * when the inherited size is not included in the supported sizes list.
 * 
 * - `'md'`: represents medium size by default.
 */
export const effectiveDefaultSize   : BasicSize = 'md';

/**
 * A default list of supported size variants when no `supportedSizes` option is explicitly provided.
 * 
 * This fallback includes common size tokens, ensuring components can adapt to typical size variations.
 * 
 * - `'sm'` : small size
 * - `'md'` : medium size
 * - `'lg'` : large size
 */
export const defaultSupportedSizes  : BasicSize[] = ['sm', 'md', 'lg'];
