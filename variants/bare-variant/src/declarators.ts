// Cssfn:
import {
    // Writes css in javascript:
    rules,
    variants,
    style,
    vars,
    startsCapitalized,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type CssBareVariantOptions,
    type CssBareVariant,
}                           from './types.js'

// CSS Variables:
import {
    bareVariantVars,
}                           from './css-variables.js'

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
export function usesBareVariant<TBare extends true | string = true>(options: CssBareVariantOptions<TBare>): CssBareVariant<TBare>;

/**
 * Generates CSS rules that toggle bare-related CSS variables based on the current bare mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on bare mode.
 */
export function usesBareVariant(): CssBareVariant;

export function usesBareVariant<TBare extends true | string = true>(options?: CssBareVariantOptions<TBare>): CssBareVariant<TBare> {
    // Extract options and assign defaults:
    const {
        supportedBareValues = [true] as TBare[],
    } = options ?? {};
    
    
    
    return {
        bareVariantRule : () => style({
            // Reset to poisoned to all bare variables:
            ...vars({
                [bareVariantVars.notBare] : 'unset',
            }),
            
            // Iterate over all supported bare tokens:
            ...rules(
                supportedBareValues
                .map((supportedBareValue) =>
                    vars({
                        [
                            (supportedBareValue === true)
                                ? bareVariantVars.isBare
                                : bareVariantVars[`is${startsCapitalized(supportedBareValue)}`]
                        ] : 'unset',
                    })
                )
            ),
            
            
            
            // Set to valid to matching bare variables:
            ...variants([
                ifNotBare(
                    vars({
                        [bareVariantVars.notBare] : '',
                    })
                ),
                
                // Iterate over all supported bare tokens:
                ...supportedBareValues
                .map((supportedBareValue) =>
                    ifBareOf(supportedBareValue,
                        vars({
                            [
                                (supportedBareValue === true)
                                    ? bareVariantVars.isBare
                                    : bareVariantVars[`is${startsCapitalized(supportedBareValue)}`]
                            ] : '',
                        })
                    )
                ),
            ]),
        }),
        
        bareVariantVars,
    } satisfies CssBareVariant<TBare>;
};
