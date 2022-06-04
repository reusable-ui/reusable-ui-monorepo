// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
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
    // configs:
    colors,
}                           from '@reusable-ui/colors'  // a color management system



//#region configs
export const [typos, typoValues, cssTypoConfig] = createCssConfig(() => {
    const basics = {
        // backgrounds:
        /**
         * The default is a solid color of `colors.backg`.  
         * It can be an image or gradient with the average color of `colors.backg`.
         */
        backg                : colors.backg as CssKnownProps['backg'],
        
        
        
        // foregrounds:
        foreg                : colors.foreg as CssKnownProps['foreg'],
        
        
        
        // typos:
        fontSizeNm           : '1rem'       as CssKnownProps['fontSize'],
        
        fontFamilySansSerief : [
            'system-ui',
            '-apple-system',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            '"Noto Sans"',
            '"Liberation Sans"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
            '"Noto Color Emoji"',
        ]                                   as CssKnownProps['fontFamily'],
        fontFamilyMonospace  : [
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            '"Liberation Mono"',
            '"Courier New"',
            'monospace',
        ]                                   as CssKnownProps['fontFamily'],
        
        fontWeightLighter    : 'lighter'    as CssKnownProps['fontWeight'],
        fontWeightLight      : 300          as CssKnownProps['fontWeight'],
        fontWeightNormal     : 400          as CssKnownProps['fontWeight'],
        fontWeightSemibold   : 600          as CssKnownProps['fontWeight'],
        fontWeightBold       : 700          as CssKnownProps['fontWeight'],
        fontWeightBolder     : 'bolder'     as CssKnownProps['fontWeight'],
        
        fontStyle            : 'normal'     as CssKnownProps['fontStyle'],
        textDecoration       : 'none'       as CssKnownProps['textDecoration'],
        
        lineHeightSm         : 1.25         as CssKnownProps['lineHeight'],
        lineHeightNm         : 1.50         as CssKnownProps['lineHeight'],
        lineHeightLg         : 2.00         as CssKnownProps['lineHeight'],
        
        overflowWrap         : 'break-word' as CssKnownProps['overflowWrap'],
    };
    
    return {
        ...basics,
        
        
        
        // typos:
        fontSizeXs           : [['calc(', basics.fontSizeNm, '*', 0.50  , ')']] as CssKnownProps['fontSize'],
        fontSizeSm           : [['calc(', basics.fontSizeNm, '*', 0.75  , ')']] as CssKnownProps['fontSize'],
        fontSize             :            basics.fontSizeNm                     as CssKnownProps['fontSize'],
        fontSizeMd           : [['calc(', basics.fontSizeNm, '*', 1.25  , ')']] as CssKnownProps['fontSize'],
        fontSizeLg           : [['calc(', basics.fontSizeNm, '*', 1.50  , ')']] as CssKnownProps['fontSize'],
        fontSizeXl           : [['calc(', basics.fontSizeNm, '*', 1.75  , ')']] as CssKnownProps['fontSize'],
        fontSizeXxl          : [['calc(', basics.fontSizeNm, '*', 2.00  , ')']] as CssKnownProps['fontSize'],
        fontSizeXxxl         : [['calc(', basics.fontSizeNm, '*', 2.25  , ')']] as CssKnownProps['fontSize'],
        
        fontFamily           : basics.fontFamilySansSerief                      as CssKnownProps['fontFamily'],
        
        fontWeight           : basics.fontWeightNormal                          as CssKnownProps['fontWeight'],
        
        lineHeight           : basics.lineHeightNm                              as CssKnownProps['lineHeight'],
    };
}, { prefix: '' });
export { typos as default }
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...atRoot({
            // customize:
            ...usesCssProps(typos),
        }),
    }),
]);
//#endregion style sheets
