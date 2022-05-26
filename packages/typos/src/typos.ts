// cssfn:
import type {
    // css values:
    CssComplexValueOf,
    
    
    
    // css known (standard) properties:
    CssKnownValueOf,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    // rules:
    atRoot,
    
    
    
    // scopes:
    globalScope,
    
    
    
    // style sheets:
    styleSheets,
}                           from '@cssfn/cssfn'         // writes css in javascript
import {
    createCssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration

// reusable-ui:
import {
    colors,
}                           from '@reusable-ui/colors'  // reads/writes css variables configuration



//#region types
export type FontSize       = CssComplexValueOf<CssKnownValueOf<'fontSize'>>
export type FontFamily     = CssComplexValueOf<CssKnownValueOf<'fontFamily'>>
export type FontWeight     = CssKnownValueOf<'fontWeight'>
export type FontStyle      = CssKnownValueOf<'fontStyle'>
export type TextDecoration = CssKnownValueOf<'textDecoration'>
export type LineHeight     = CssKnownValueOf<'lineHeight'>
export type OverflowWrap   = CssKnownValueOf<'overflowWrap'>
export type Foreground     = CssKnownValueOf<'color'>
export type Background     = CssComplexValueOf<CssKnownValueOf<'background'>>
//#endregion types



//#region configs
const [typos, typoValues, cssTypoConfig] = createCssConfig(() => {
    const basics = {
        fontSizeNm           : '1rem'       as FontSize,
        
        fontFamilySansSerief : [
            'system-ui',
            '-apple-system',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Noto Sans"',
            '"Liberation Sans"',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ]                                    as FontFamily,
        fontFamilyMonospace  : [
            'SFMono-Regular',
            'Menlo', 'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace',
        ]                                    as FontFamily,
        
        fontWeightLighter    : 'lighter'    as FontWeight,
        fontWeightLight      : 300          as FontWeight,
        fontWeightNormal     : 400          as FontWeight,
        fontWeightBold       : 700          as FontWeight,
        fontWeightBolder     : 'bolder'     as FontWeight,
        
        fontStyle            : 'normal'     as FontStyle,
        textDecoration       : 'none'       as TextDecoration,
        
        lineHeightSm         : 1.25         as LineHeight,
        lineHeightNm         : 1.50         as LineHeight,
        lineHeightLg         : 2.00         as LineHeight,
        
        overflowWrap         : 'break-word' as OverflowWrap,
        
        foreg                : colors.foreg as Foreground,
        /**
         * Default is a solid color of `colors.backg`.  
         * It can be an image or gradient with the average color of `colors.backg`.
         */
        backg                : colors.backg as Background,
    };
    
    return {
        ...basics,
        
        fontSize             : basics.fontSizeNm                                as FontSize,
        fontSizeXs           : [['calc(', basics.fontSizeNm, '*', 0.50  , ')']] as FontSize,
        fontSizeSm           : [['calc(', basics.fontSizeNm, '*', 0.75  , ')']] as FontSize,
        fontSizeMd           : [['calc(', basics.fontSizeNm, '*', 1.25  , ')']] as FontSize,
        fontSizeLg           : [['calc(', basics.fontSizeNm, '*', 1.50  , ')']] as FontSize,
        fontSizeXl           : [['calc(', basics.fontSizeNm, '*', 1.75  , ')']] as FontSize,
        fontSizeXxl          : [['calc(', basics.fontSizeNm, '*', 2.00  , ')']] as FontSize,
        fontSizeXxxl         : [['calc(', basics.fontSizeNm, '*', 2.25  , ')']] as FontSize,
        
        fontFamily           : basics.fontFamilySansSerief                      as FontFamily,
        
        fontWeight           : basics.fontWeightNormal                          as FontWeight,
        
        lineHeight           : basics.lineHeightNm                              as LineHeight,
    };
}, { prefix: '' });
export {
    typos,
    typos as cssProps,
    typos as default,
}
export {
    typoValues,
    typoValues as cssVals,
}
export {
    cssTypoConfig,
    cssTypoConfig as cssConfig,
}
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...atRoot({
            // customize:
            ...usesCssProps(typos),
        }),
    })
])
//#endregion style sheets
