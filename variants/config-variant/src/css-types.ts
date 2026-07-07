// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssConfigProps,
    type Refs,
}                           from '@cssfn/core'                      // Writes css in javascript.



/**
 * Describes how config-driven variants should behave.
 * 
 * @template TToken String literal union representing the supported variant tokens (e.g. 'sm', 'md', 'lg').
 * @template TCssConfigProps The shape of the CSS configuration props.
 * 
 * @example
 * ```ts
 * const sizeVariantRule : Factory<CssRule> = () => usingConfigVariant({
 *     // Supported variant tokens:
 *     supportedTokens : ['sm', 'md', 'lg'],
 *     
 *     // The CSS configuration object containing base and variant-specific suffixed variables:
 *     configVars      : componentConfig,
 *     
 *     // Maps each token to its scoped selector and applies overrides:
 *     ifVariantOf     : (token, styles) => rule(`.is-${token}`, styles),
 * });
 * 
 * export const componentStyle = () => style({
 *     // Base styling for the component goes here:
 *     display: 'grid',
 *     
 *     
 *     
 *     // Apply the size variant rule to override base configuration variables with variant-specific ones:
 *     ...sizeVariantRule(),
 *     
 *     
 *     
 *     // Usage - size aware:
 *     fontSize : componentConfig.fontSize, // Responds to sm & lg variants.
 *     padding  : componentConfig.padding,  // Responds to lg variant only.
 *     margin   : componentConfig.margin,   // Invariant (no variant-specific alternatives).
 * });
 * ```
 */
export interface CssConfigVariantBehavior<TToken extends string, TCssConfigProps extends CssConfigProps = CssConfigProps> {
    /**
     * Specifies the list of supported variant tokens (e.g. 'sm', 'md', 'lg').
     */
    supportedTokens : TToken[]
    
    /**
     * Provides the CSS configuration object containing base and variant-specific suffixed variables.
     * Example: `fontSizeSm`, `paddingLg`, etc.
     */
    configVars      : Refs<TCssConfigProps>
    
    /**
     * Determines how variant-specific configuration overrides are applied for a given variant token.
     * 
     * @param token The variant token (e.g. 'sm', 'md', 'lg') that defines the active condition.
     * @param overrides The configuration overrides to apply when the token selector is active.
     * @returns A CSS rule that scopes and applies the overrides for the given token.
     * 
     * Common sources:
     * - Built-in conditional functions, e.g. `ifSizeOf`
     * - A custom function using `rule()`, e.g. `(token, overrides) => rule(`.is-${token}`, overrides)`
     * - Any function with signature: `(token: TToken, overrides: CssStyleCollection) => CssRule`
     */
    ifVariantOf(token: TToken, overrides: CssStyleCollection): CssRule
}
