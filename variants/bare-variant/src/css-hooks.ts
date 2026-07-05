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
    type CssBareVariantOptions,
    type CssBareVariant,
}                           from './css-types.js'

// CSS Variables:
import {
    bareVariantVars,
}                           from './css-internal-variables.js'

// CSS Selectors:
import {
    ifNotBare,
    ifBareOf,
}                           from './css-selectors.js'



/**
 * Generates CSS rules that toggle bare-related CSS variables based on the current bare mode,
 * and exposes those variables for conditional styling.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 * 
 * @param options - A required configuration specifying supported bare values.
 * @returns A CSS API for enabling conditional styling based on bare mode.
 */
export function usingBareVariant<TBare extends true | string = true>(options: CssBareVariantOptions<TBare>): CssBareVariant<TBare>;

/**
 * Generates CSS rules that toggle bare-related CSS variables based on the current bare mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on bare mode.
 */
export function usingBareVariant(): CssBareVariant;

export function usingBareVariant<TBare extends true | string = true>(options?: CssBareVariantOptions<TBare>): CssBareVariant<TBare> {
    // Extract options and assign defaults:
    const {
        supportedBareValues = [true] as TBare[],
    } = options ?? {};
    
    
    
    return {
        bareVariantRule : () => usingSwitchVariant({
            flags : (
                // Iterate over all supported bare tokens, including `false` for non-bare mode:
                [false, ...supportedBareValues]
                .map((token) => ({
                    ifVariant : (
                        (token === false)
                        
                        // Not in bare mode:
                        ? ifNotBare
                        
                        // In bare mode (default or custom):
                        : (styles) => ifBareOf(token, styles)
                    ),
                    variable  : (
                        (token === false)
                        
                        // Not in bare mode:
                        ? bareVariantVars.notBare
                        
                        // In bare mode (default or custom):
                        : (
                            (token === true)
                            
                            // Default bare mode:
                            ? bareVariantVars.isBare
                            
                            // Custom bare mode:
                            // - `is${Mode}` → e.g. `isFlat`, `isFlush`, `isJoined`, etc.
                            : bareVariantVars[`is${startsCapitalized(token)}`]
                        )
                    ),
                }) satisfies CssSwitchVariantFlagCase)
            ),
        }),
        
        bareVariantVars,
    } satisfies CssBareVariant<TBare>;
};
