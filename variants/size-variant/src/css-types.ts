// Cssfn:
import {
    // Lazies:
    type Lazy,
    
    
    
    // Cssfn css specific types:
    type CssRule,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type BasicSize,
}                           from './types.js'



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
