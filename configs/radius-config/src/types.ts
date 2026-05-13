// Cssfn:
import {
    // Cssfn css specific types:
    type CssComplexValueOf,
    type CssKnownValueOf,
}                           from '@cssfn/core'          // Writes css in javascript.



// Types:
export type CssBorderRadius = CssComplexValueOf<CssKnownValueOf<'borderRadius'>>



/**
 * @deprecated Use `CssBorderRadius` instead.
 */
export type BorderRadius = CssBorderRadius
