// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'     // cssfn css specific types



// backgrounds:
export type Background        = CssKnownProps['background']

// foregrounds:
export type Foreground        = CssKnownProps['color']

// appearances:
export type Opacity           = CssKnownProps['opacity']

// spacings:
export type MarginInlineStart = CssKnownProps['marginInlineStart']
export type MarginInlineEnd   = CssKnownProps['marginInlineEnd']
export type MarginBlockStart  = CssKnownProps['marginBlockStart']
export type MarginBlockEnd    = CssKnownProps['marginBlockEnd']

export type PaddingInline     = CssKnownProps['paddingInline']
export type PaddingBlock      = CssKnownProps['paddingBlock']

// typos:
export type FontSize          = CssKnownProps['fontSize']
export type FontFamily        = CssKnownProps['fontFamily']
export type FontWeight        = CssKnownProps['fontWeight']
export type FontStyle         = CssKnownProps['fontStyle']
export type TextDecoration    = CssKnownProps['textDecoration']
export type LineHeight        = CssKnownProps['lineHeight']
export type OverflowWrap      = CssKnownProps['overflowWrap']
