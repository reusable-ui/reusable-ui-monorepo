// Cssfn:
import {
    // Cssfn css specific types:
    type CssComplexValueOf,
    type CssKnownValueOf,
}                           from '@cssfn/core'          // Writes css in javascript.



// Types:
export type CssBorderWidth  = CssKnownValueOf<'borderWidth'>
export type CssBorderColor  = CssKnownValueOf<'borderColor'>
export type CssBorderStyle  = CssKnownValueOf<'borderStyle'>
export type CssBorder       = CssComplexValueOf<CssKnownValueOf<'border'>>
