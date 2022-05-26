// cssfn:
import type {
    // css values:
    CssComplexValueOf,
    
    
    
    // css known (standard) properties:
    CssKnownValueOf,
}                           from '@cssfn/css-types'     // cssfn css specific types



// types:
export type FontSize       = CssComplexValueOf<CssKnownValueOf<'fontSize'>>
export type FontFamily     = CssComplexValueOf<CssKnownValueOf<'fontFamily'>>
export type FontWeight     = CssKnownValueOf<'fontWeight'>
export type FontStyle      = CssComplexValueOf<CssKnownValueOf<'fontStyle'>>
export type TextDecoration = CssComplexValueOf<CssKnownValueOf<'textDecoration'>>
export type LineHeight     = CssKnownValueOf<'lineHeight'>
export type OverflowWrap   = CssKnownValueOf<'overflowWrap'>
export type Foreground     = CssKnownValueOf<'color'>
export type Background     = CssComplexValueOf<CssKnownValueOf<'background'>>
export type Opacity        = CssKnownValueOf<'opacity'>
