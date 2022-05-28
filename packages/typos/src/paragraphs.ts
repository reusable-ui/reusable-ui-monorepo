// cssfn:
import {
    // rules:
    rule,
    ifFirstChild,
    ifLastChild,
    
    
    
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

// internals:
import type {
    FontSize,
    FontFamily,
    FontWeight,
    FontStyle,
    TextDecoration,
    LineHeight,
    Foreground,
    MarginBlockStart,
    MarginBlockEnd,
    MarginInlineStart,
    MarginInlineEnd,
}                           from './types.js'



//#region configs
const [paragraphs, paragraphValues, cssParagraphConfig] = createCssConfig(() => {
    return {
        fontSize          : 'inherit' as FontSize,
        fontFamily        : 'inherit' as FontFamily,
        fontWeight        : 'inherit' as FontWeight,
        fontStyle         : 'inherit' as FontStyle,
        textDecoration    : 'inherit' as TextDecoration,
        lineHeight        : 'inherit' as LineHeight,
        
        foreg             : 'inherit' as Foreground,
        
        marginBlockStart  : '1em'     as MarginBlockStart,
        marginBlockEnd    : '1em'     as MarginBlockEnd,
        marginInlineStart : 0         as MarginInlineStart,
        marginInlineEnd   : 0         as MarginInlineEnd,
    };
}, { prefix: 'p' });
export {
    paragraphs,
    paragraphs as cssProps,
    paragraphs as default,
}
export {
    paragraphValues,
    paragraphValues as cssVals,
}
export {
    cssParagraphConfig,
    cssParagraphConfig as cssConfig,
}
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...rule(['p', '.p'], {
            // layouts:
            display : 'block',
            
            
            
            // spacings:
            ...ifFirstChild({
                marginBlockStart : 0, // kill the top_margin at the first paragraph
            }),
            ...ifLastChild({
                marginBlockEnd   : 0, // kill the bottom_margin at the last paragraph
            }),
            
            
            
            // customize:
            ...usesCssProps(paragraphs),
        }),
    }),
]);
//#endregion style sheets
