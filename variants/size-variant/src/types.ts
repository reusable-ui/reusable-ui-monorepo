// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
}                           from '@cssfn/core'          // Writes css in javascript.



/**
 * Represents the basic sizing scale of the component.
 * 
 * Common presets:
 * - `'sm'`: small size
 * - `'md'`: medium size (default)
 * - `'lg'`: large size
 */
export type BasicSize =
    | 'sm'
    | 'md'
    | 'lg'



/**
 * Props for specifying the size of the component.
 * 
 * Accepts an optional `size`, falling back to a default when not provided.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface SizeVariantProps<TSize extends string = BasicSize> {
    /**
     * Specifies the desired size of the component:
     * - `'sm'`      : small size
     * - `'md'`      : medium size (default)
     * - `'lg'`      : large size
     * - `'inherit'` : inherits size from a parent context
     * - Or any custom size token defined by the design system
     */
    size           ?: TSize | 'inherit'
}

/**
 * Optional configuration options for resolving the effective size.
 * 
 * Used by `useSizeVariant()` to determine fallback behavior and validate
 * against supported size values.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface SizeVariantOptions<TSize extends string = BasicSize> {
    /**
     * The default size to apply when no `size` prop is explicitly provided.
     * 
     * This value is applied if the component does not define its own `size`
     * or no supported size is available in the inherited size.
     */
    defaultSize     : TSize
    
    /**
     * The list of supported size values for the component.
     * 
     * If the inherited size is not included in this list,
     * the hook will fall back to `defaultSize`.
     */
    supportedSizes  : TSize[]
}

/**
 * Represents the final resolved size of the component, along with its associated CSS class name.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface SizeVariant<TSize extends string = BasicSize> {
    /**
     * The resolved size value.
     * 
     * Possible values:
     * - `'sm'`: small size
     * - `'md'`: medium size (default)
     * - `'lg'`: large size
     * - Or any custom size token defined by the design system
     */
    size            : TSize
    
    /**
     * A CSS class name reflecting the resolved size.
     * 
     * Possible values:
     * - `'s-sm'`
     * - `'s-md'`
     * - Or any custom size class name in the format `s-${size}`
     */
    sizeClassname   : `s-${TSize}`
}



/**
 * Configuration options for enabling size-aware component configuration.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 */
export interface CssSizeVariantOptions<TSize extends string = BasicSize> {
    /**
     * The list of supported size values for the component.
     */
    supportedSizes  : TSize[]
}

/**
 * Provides a CSS API for enabling size-aware component configuration.
 */
export interface CssSizeVariant {
    /**
     * Generates CSS rules that activate size-specific properties of component’s configuration based on the currently active size.
     * 
     * Automatically maps suffixed properties (e.g. `fontSizeSm`, `paddingMd`, `borderRadiusLg`) to their base counterparts (`--comp-fontSize`, `--comp-padding`, etc.),
     * depending on the currently active size.
     * 
     * These rules are scoped per size via the `ifSize()` for activating size-specific properties.
     */
    sizeVariantRule : Lazy<CssRule>
}
