// Cssfn:
import {
    // Cssfn properties:
    type CssRule,
    type CssStyleCollection,
    
    
    
    // Writes css in javascript:
    rule,
    neverRule,
}                           from '@cssfn/core'          // Writes css in javascript.



/**
 * Applies the specified `styles` when the current element **follows** the given `selector`.
 *
 * ### **Usage Example**
 * ```ts
 * const myStyle = style({
 *     ............
 *     ...ifFollows('.something', {
 *         opacity: 0.5, // Applies opacity if the current element follows `.something`.
 *     }),
 * });
 * ```
 *
 * @param selector - The target selector to check.
 * @param styles - CSS styles to apply when the condition is met.
 * @returns A `CssRule` object for conditional styling.
 */
export const ifFollows = (selector: string, styles: CssStyleCollection): CssRule => {
    if (!selector) return neverRule(); // No selector → Never apply the styles.
    
    
    
    return rule(`:where(${selector})+&`, styles); // Uses `:where()` for **zero specificity** to allow easy overrides.
};

/**
 * Applies the specified `styles` when the current element **precedes** the given `selector`.
 *
 * ### **Usage Example**
 * ```ts
 * const myStyle = style({
 *     ............
 *     ...ifPrecedes('.something', {
 *         opacity: 0.5, // Applies opacity if the current element precedes `.something`.
 *     }),
 * });
 * ```
 *
 * @param selector - The target selector to check.
 * @param styles - CSS styles to apply when the condition is met.
 * @returns A `CssRule` object for conditional styling.
 */
export const ifPrecedes = (selector: string, styles: CssStyleCollection): CssRule => {
    if (!selector) return neverRule(); // No selector → Never apply the styles.
    
    
    
    return rule(`&:has(+:where(${selector}))`, styles); // Uses `:where()` for **zero specificity** to allow easy overrides.
};
