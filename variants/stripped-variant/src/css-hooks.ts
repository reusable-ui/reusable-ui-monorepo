// Cssfn:
import {
    // Utilities:
    startsCapitalized,
}                           from '@cssfn/core'          // Writes css in javascript.

// Reusable-ui variants:
import {
    // Types:
    type CssSwitchVariantFlagCase,
    
    
    
    // Hooks:
    usingSwitchVariant,
}                           from '@reusable-ui/switch-variant'      // Reusable abstraction for building switch-based variants. Drives boolean-like flag variables and numeric factor variable.

// Types:
import {
    type CssStrippedVariantOptions,
    type CssStrippedVariant,
}                           from './css-types.js'

// CSS Variables:
import {
    strippedVariantVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifNotStripped,
    ifStrippedOf,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that toggle stripped-related CSS variables based on the current stripped mode,
 * and exposes those variables for conditional styling.
 * 
 * @template TStripped - The extended type of the `stripped` prop, allowing `true` or custom string-based modes.
 * 
 * @param options - A required configuration specifying supported stripped values.
 * @returns A CSS API for enabling conditional styling based on stripped mode.
 */
export function usingStrippedVariant<TStripped extends true | string = true>(options: CssStrippedVariantOptions<TStripped>): CssStrippedVariant<TStripped>;

/**
 * Generates CSS rules that toggle stripped-related CSS variables based on the current stripped mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on stripped mode.
 */
export function usingStrippedVariant(): CssStrippedVariant;

export function usingStrippedVariant<TStripped extends true | string = true>(options?: CssStrippedVariantOptions<TStripped>): CssStrippedVariant<TStripped> {
    // Extract options and assign defaults:
    const {
        supportedStrippedValues = [true] as TStripped[],
    } = options ?? {};
    
    
    
    return {
        strippedVariantRule : () => usingSwitchVariant({
            flags : (
                // Iterate over all supported stripped tokens, including `false` for non-stripped mode:
                [false, ...supportedStrippedValues]
                .map((token) => ({
                    ifVariant : (
                        (token === false)
                        
                        // Not stripped:
                        ? ifNotStripped
                        
                        // Stripped (default or custom):
                        : (styles) => ifStrippedOf(token, styles)
                    ),
                    variable  : (
                        (token === false)
                        
                        // Not stripped:
                        ? strippedVariantVars.notStripped
                        
                        // Stripped (default or custom):
                        : (
                            (token === true)
                            
                            // Default stripped mode:
                            ? strippedVariantVars.isStripped
                            
                            // Custom stripped mode:
                            // - `is${Mode}` → e.g. `isFlat`, `isFlush`, `isJoined`, etc.
                            : strippedVariantVars[`is${startsCapitalized(token)}`]
                        )
                    ),
                }) satisfies CssSwitchVariantFlagCase)
            ),
        }),
        
        strippedVariantVars,
    } satisfies CssStrippedVariant<TStripped>;
};
