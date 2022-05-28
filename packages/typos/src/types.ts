// cssfn:
import type {
    // css values:
    CssComplexSingleValueOf,
    CssComplexValueOf,
    
    
    
    // css known (standard) properties:
    CssKnownValueOf,
}                           from '@cssfn/css-types'     // cssfn css specific types



// types:
export type FontSize          = CssComplexValueOf      <CssKnownValueOf<'fontSize'>>
export type FontFamily        = CssComplexValueOf      <CssKnownValueOf<'fontFamily'>>
export type FontWeight        = CssComplexSingleValueOf<CssKnownValueOf<'fontWeight'>>
export type FontStyle         = CssComplexValueOf      <CssKnownValueOf<'fontStyle'>>
export type TextDecoration    = CssComplexValueOf      <CssKnownValueOf<'textDecoration'>>
export type LineHeight        = CssComplexSingleValueOf<CssKnownValueOf<'lineHeight'>>
export type OverflowWrap      = CssComplexSingleValueOf<CssKnownValueOf<'overflowWrap'>>
export type Foreground        = CssComplexSingleValueOf<CssKnownValueOf<'color'>>
export type Background        = CssComplexValueOf      <CssKnownValueOf<'background'>>
export type Opacity           = CssComplexSingleValueOf<CssKnownValueOf<'opacity'>>
export type MarginBlockStart  = CssComplexValueOf      <CssKnownValueOf<'marginBlockStart'>>
export type MarginBlockEnd    = CssComplexValueOf      <CssKnownValueOf<'marginBlockEnd'>>
export type MarginInlineStart = CssComplexValueOf      <CssKnownValueOf<'marginInlineStart'>>
export type MarginInlineEnd   = CssComplexValueOf      <CssKnownValueOf<'marginInlineEnd'>>
