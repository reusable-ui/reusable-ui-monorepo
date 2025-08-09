// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
    rules,
    variants,
    style,
    vars,
    startsCapitalized,
    
    
    
    // Strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'          // Writes css in javascript.

// Types:
import {
    type BareVariantVars,
    type CssBareVariantOptions,
    type CssBareVariant,
}                           from './types.js'



/**
 * A CSS selector targeting non-bare elements.
 */
export const isNotBareSelector : CssSelectorCollection = '.not-bare';

/**
 * A CSS selector targeting bare elements.
 */
export const isBareSelector    : CssSelectorCollection = '.is-bare';

/**
 * A CSS selector targeting elements with a specific bare mode.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 * @param specificBare - A specific bare mode to target (e.g. `'flat'`, `'flush'`, `'joined'`), or `true` to target bare elements.
 * @returns A `CssSelectorCollection` string for use in conditional styling rules.
 */
export const isBareOfSelector  = <TBare extends string | true>(specificBare: TBare): CssSelectorCollection => (specificBare === true) ? isBareSelector : `.is-${specificBare}`;



/**
 * Applies the given `styles` to bare elements.
 * 
 * @param styles - The styles applied to bare elements.
 * @returns A `CssRule` that applies the given `styles` for bare elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBare({
 *         padding: 0,
 *         border: 'none',
 *     }),
 * });
 * ```
 */
export const ifBare    = (styles: CssStyleCollection): CssRule => rule(isBareSelector    , styles);

/**
 * Applies the given `styles` to non-bare elements.
 * 
 * @param styles - The styles applied to non-bare elements.
 * @returns A `CssRule` that applies the given `styles` for non-bare elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotBare({
 *         padding: '1rem',
 *         border: 'solid 1px black',
 *     }),
 * });
 * ```
 */
export const ifNotBare = (styles: CssStyleCollection): CssRule => rule(isNotBareSelector , styles);

/**
 * Applies the given `styles` to elements with a specific bare mode.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 * @param specificBare - A specific bare mode to target (e.g. `'flat'`, `'flush'`, `'joined'`), or `true` to target bare elements.
 * @param styles - The styles applied to elements with a specific bare mode.
 * @returns A `CssRule` that applies the given `styles` for elements with a specific bare mode.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifBareOf('flat', {
 *         border: 'none',
 *         borderRadius: 0,
 *     }),
 * });
 * ```
 */
export const ifBareOf  = <TBare extends string | true>(specificBare: TBare, styles: CssStyleCollection): CssRule => rule(isBareOfSelector(specificBare), styles);



/**
 * A strongly typed global mapping of bare-related CSS variables for conditional styling.
 * 
 * These variables are shared across server and client environments to ensure
 * consistent CSS variable names during SSR and hydration.
 */
const [bareVariantVars] = cssVars<BareVariantVars<true | string>>({ minify: false });

/**
 * Generates CSS rules that toggle bare-related CSS variables based on the current bare mode,
 * and exposes those variables for conditional styling.
 * 
 * @template TBare - The extended type of the `bare` prop, allowing `true` or custom string-based modes.
 * 
 * @returns A CSS API for enabling conditional styling based on bare mode.
 */
export function usesBareVariant<TBare extends true | string = true>(options: CssBareVariantOptions<TBare>): CssBareVariant<TBare>;

/**
 * Generates CSS rules that toggle bare-related CSS variables based on the current bare mode,
 * and exposes those variables for conditional styling.
 * 
 * @returns A CSS API for enabling conditional styling based on bare mode.
 */
export function usesBareVariant(options?: CssBareVariantOptions): CssBareVariant;

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
