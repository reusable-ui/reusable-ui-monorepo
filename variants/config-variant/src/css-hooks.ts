// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssConfigProps,
    
    
    
    // Writes css in javascript:
    variants,
    style,
    usesSuffixedProps,
    overwriteProps,
}                           from '@cssfn/core'                      // Writes css in javascript.

// Types:
import {
    type CssConfigVariantBehavior,
}                           from './css-types.js'



/**
 * Overrides base CSS configuration variables with their variant-specific counterparts for the currently active variant.
 * 
 * Useful for config-driven variants (e.g. size-variant, featured-variant, density-variant).
 * 
 * @template TToken String literal union representing the supported variant tokens (e.g. 'sm', 'md', 'lg').
 * @template TCssConfigProps The shape of the CSS configuration props.
 * 
 * @param variantBehavior A configuration describing the supported variant tokens, CSS configuration, and how to apply overrides for each token.
 * @returns A `CssRule` that overrides base CSS configuration variables with their variant-specific counterparts for the currently active variant.
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
export const usingConfigVariant = <TToken extends string, TCssConfigProps extends CssConfigProps = CssConfigProps>(variantBehavior: CssConfigVariantBehavior<TToken, TCssConfigProps>): CssRule => {
    // Extract variant behavior:
    const {
        supportedTokens,
        configVars,
        ifVariantOf,
    } = variantBehavior;
    
    
    
    // Build composite style from variant behavior:
    return style(
        variants(
            supportedTokens
            
            // Iterate over all supported tokens:
            .map((token) =>
                // Create a scoped rule for the current token (e.g. `.s-sm`, `.s-lg`):
                ifVariantOf(token,
                    // Within the scope, override base CSS configuration variables with variant-specific suffixed ones:
                    // e.g., `.s-sm { --comp-fontSize: var(--comp-fontSizeSm); }`
                    overwriteProps(configVars, usesSuffixedProps(configVars, token)),
                )
            )
        ),
    );
};
