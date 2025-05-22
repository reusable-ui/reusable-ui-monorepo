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

export type CssBorderRadius = CssComplexValueOf<CssKnownValueOf<'borderRadius'>>



/**
 * @deprecated Use `CssBorderWidth` instead.
 */
export type BorderWidth  = CssBorderWidth

/**
 * @deprecated Use `CssBorderColor` instead.
 */
export type BorderColor  = CssBorderColor

/**
 * @deprecated Use `CssBorderStyle` instead.
 */
export type BorderStyle  = CssBorderStyle

/**
 * @deprecated Use `CssBorder` instead.
 */
export type Border       = CssBorder


/**
 * @deprecated Use `CssBorderRadius` instead.
 */
export type BorderRadius = CssBorderRadius
