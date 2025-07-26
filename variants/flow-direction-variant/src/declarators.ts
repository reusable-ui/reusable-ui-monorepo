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
 * A CSS selector targeting elements aligned toward the logical start edge.
 */
export const flowDirectionStartSelector : CssSelectorCollection = '.f-start';

/**
 * A CSS selector targeting elements aligned toward the logical end edge.
 */
export const flowDirectionEndSelector   : CssSelectorCollection = '.f-end';



/**
 * Applies the given `styles` to elements aligned toward the logical start edge.
 * 
 * @param styles The styles applied to elements aligned toward the logical start edge.
 * @returns A `CssRule` that applies the given `styles` for logical start edge alignment.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     display: 'flex',
 *     ...ifFlowDirectionStart({
 *         textAlign: 'start',
 *     }),
 * });
 * ```
 */
export const ifFlowDirectionStart = (styles: CssStyleCollection): CssRule => rule(flowDirectionStartSelector , styles);

/**
 * Applies the given `styles` to elements aligned toward the logical end edge.
 * 
 * @param styles The styles applied to elements aligned toward the logical end edge.
 * @returns A `CssRule` that applies the given `styles` for logical end edge alignment.
 * 
 * @example
 * ```ts
 * export const componentStyle = () => style({
 *     display: 'flex',
 *     ...ifFlowDirectionEnd({
 *         textAlign: 'end',
 *     }),
 * });
 * ```
 */
export const ifFlowDirectionEnd   = (styles: CssStyleCollection): CssRule => rule(flowDirectionEndSelector   , styles);
