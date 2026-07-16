// Cssfn:
import {
    // Types:
    type CssConfigProps,
    type Refs,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui variants:
import {
    // Hooks:
    usingConfigVariant,
}                           from '@reusable-ui/config-variant'      // Reusable abstraction for building config-driven variants. Overrides base CSS configuration variables with their variant-specific counterparts.

// Types:
import {
    type BasicSize,
}                           from './types.js'
import {
    type CssSizeVariantOptions,
    type CssSizeVariant,
}                           from './css-types.js'

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
 * @template TSize Commonly `'sm'`, `'md'`, `'lg'`
 * 
 * @param configVars - A CSS configuration that may includes properties suffixed by size identifiers (e.g., `'Sm'`, `'Md'`, `'Lg'`) to define size-specific values.
 * @param options - A required configuration specifying supported size values.
 * @returns A CSS API for enabling size-aware component configuration.
 */
export function usingSizeVariant<TSize extends string = BasicSize, TCssConfigProps extends CssConfigProps = CssConfigProps>(configVars: Refs<TCssConfigProps>, options: CssSizeVariantOptions<TSize>): CssSizeVariant;

/**
 * Generates CSS rules that activate size-specific properties of component’s configuration based on the currently active size.
 * 
 * Automatically maps suffixed properties (e.g. `fontSizeSm`, `paddingMd`, `borderRadiusLg`) to their base counterparts (`--comp-fontSize`, `--comp-padding`, etc.),
 * depending on the currently active size.
 * 
 * @param configVars - A CSS configuration that may includes properties suffixed by size identifiers (e.g., `'Sm'`, `'Md'`, `'Lg'`) to define size-specific values.
 * @returns A CSS API for enabling size-aware component configuration.
 */
export function usingSizeVariant<TCssConfigProps extends CssConfigProps = CssConfigProps>(configVars: Refs<TCssConfigProps>): CssSizeVariant;

export function usingSizeVariant<TSize extends string = BasicSize, TCssConfigProps extends CssConfigProps = CssConfigProps>(configVars: Refs<TCssConfigProps>, options?: CssSizeVariantOptions<TSize>): CssSizeVariant {
    // Extract options and assign defaults:
    const {
        supportedSizes = defaultSupportedSizes as TSize[],
    } = options ?? {};
    
    
    
    return {
        sizeVariantRule : () => usingConfigVariant({
            // Supported variant tokens:
            supportedTokens : supportedSizes,
            
            // The CSS configuration object containing base and variant-specific suffixed variables:
            configVars      : configVars,
            
            // Maps each token to its scoped selector and applies overrides:
            ifVariantOf     : ifSize,
        }),
    } satisfies CssSizeVariant;
};
