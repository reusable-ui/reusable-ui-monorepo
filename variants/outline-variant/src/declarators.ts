// Cssfn:
import {
    // Cssfn css specific types:
    type CssRule,
    type CssStyleCollection,
    type CssSelectorCollection,
    
    
    
    // Writes css in javascript:
    rule,
}                           from '@cssfn/core'          // Writes css in javascript.



/**
 * A CSS selector targeting outlined elements.
 */
export const isOutlinedSelector    : CssSelectorCollection = '.is-outlined';

/**
 * A CSS selector targeting non-outlined elements.
 */
export const isNotOutlinedSelector : CssSelectorCollection = '.not-outlined';



/**
 * Applies the given `styles` to outlined elements.
 * 
 * @param styles The styles applied to outlined elements.
 * @returns A `CssRule` that applies the given `styles` for outlined elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifOutlined({
 *         backgroundColor: 'transparent',
 *         color: 'blue',
 *     }),
 * });
 * ```
 */
export const ifOutlined    = (styles: CssStyleCollection): CssRule => rule(isOutlinedSelector    , styles);

/**
 * Applies the given `styles` to non-outlined elements.
 * 
 * @param styles The styles applied to non-outlined elements.
 * @returns A `CssRule` that applies the given `styles` for non-outlined elements.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     fontSize: '1rem',
 *     ...ifNotOutlined({
 *         backgroundColor: 'lightblue',
 *         color: 'darkblue',
 *     }),
 * });
 * ```
 */
export const ifNotOutlined = (styles: CssStyleCollection): CssRule => rule(isNotOutlinedSelector , styles);
