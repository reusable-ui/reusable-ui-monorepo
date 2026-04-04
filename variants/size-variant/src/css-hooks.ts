// Cssfn:
import {
    // Writes css in javascript:
    variants,
    style,
    
    
    
    // Reads/writes css variables configuration:
    type CssConfigProps,
    type Refs,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type BasicSize,
    type CssSizeVariantOptions,
    type CssSizeVariant,
}                           from './types.js'

// Defaults:
import {
    defaultSupportedSizes,
}                           from './internal-defaults.js'

// CSS Selectors:
import {
    ifSize,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that activate size-specific properties of component’s configuration based on the currently active size.
 * 
 * Automatically maps suffixed properties (e.g. `fontSizeSm`, `paddingMd`, `borderRadiusLg`) to their base counterparts (`--comp-fontSize`, `--comp-padding`, etc.),
 * depending on the currently active size.
 * 
 * @template {string} [TSize=BasicSize] — commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param configVars - A CSS configuration that may includes properties suffixed by size identifiers (e.g., `'Sm'`, `'Md'`, `'Lg'`) to define size-specific values.
 * @param options - A required configuration specifying supported size values.
 * @returns A CSS API for enabling size-aware component configuration.
 */
export function usesSizeVariant<TSize extends string = BasicSize, TCssConfigProps extends CssConfigProps = CssConfigProps>(configVars: Refs<TCssConfigProps>, options: CssSizeVariantOptions<TSize>): CssSizeVariant;

/**
 * Generates CSS rules that activate size-specific properties of component’s configuration based on the currently active size.
 * 
 * Automatically maps suffixed properties (e.g. `fontSizeSm`, `paddingMd`, `borderRadiusLg`) to their base counterparts (`--comp-fontSize`, `--comp-padding`, etc.),
 * depending on the currently active size.
 * 
 * @param configVars - A CSS configuration that may includes properties suffixed by size identifiers (e.g., `'Sm'`, `'Md'`, `'Lg'`) to define size-specific values.
 * @returns A CSS API for enabling size-aware component configuration.
 */
export function usesSizeVariant<TCssConfigProps extends CssConfigProps = CssConfigProps>(configVars: Refs<TCssConfigProps>): CssSizeVariant;

export function usesSizeVariant<TSize extends string = BasicSize, TCssConfigProps extends CssConfigProps = CssConfigProps>(configVars: Refs<TCssConfigProps>, options?: CssSizeVariantOptions<TSize>): CssSizeVariant {
    // Extract options and assign defaults:
    const {
        supportedSizes = defaultSupportedSizes as TSize[],
    } = options ?? {};
    
    
    
    return {
        sizeVariantRule : () => style(
            variants(
                supportedSizes
                
                // Iterate over all supported size tokens:
                .map((size) =>
                    // Create a scoped rule for the current size (e.g. `.s-sm`):
                    ifSize(size,
                        // Within the scope, override general CSS variables with size-specific ones:
                        // e.g., `--comp-fontSize: var(--comp-fontSizeSm)`
                        overwriteProps(configVars, usesSuffixedProps(configVars, size)),
                    )
                )
            ),
        ),
    } satisfies CssSizeVariant;
};
