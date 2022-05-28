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
import {
    typos,
}                           from './typos.js'



//#region configs
const [blockquotes, blockquoteValues, cssBlockquoteConfig] = createCssConfig(() => {
    return {
        fontSize          : typos.fontSizeMd as FontSize,
        fontFamily        : 'inherit'        as FontFamily,
        fontWeight        : 'inherit'        as FontWeight,
        fontStyle         : 'inherit'        as FontStyle,
        textDecoration    : 'inherit'        as TextDecoration,
        lineHeight        : 'inherit'        as LineHeight,
        
        foreg             : 'inherit'        as Foreground,
        
        marginBlockStart  : '1em'            as MarginBlockStart,
        marginBlockEnd    : '1em'            as MarginBlockEnd,
        marginInlineStart : 0                as MarginInlineStart,
        marginInlineEnd   : 0                as MarginInlineEnd,
    };
}, { prefix: 'bq' });
export {
    blockquotes,
    blockquotes as cssProps,
    blockquotes as default,
}
export {
    blockquoteValues,
    blockquoteValues as cssVals,
}
export {
    cssBlockquoteConfig,
    cssBlockquoteConfig as cssConfig,
}
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...rule(['blockquote', '.blockquote'], {
            // layouts:
            display : 'block',
            
            
            
            // spacings:
            ...ifFirstChild({
                marginBlockStart : 0, // kill the top_margin at the first blockquote
            }),
            ...ifLastChild({
                marginBlockEnd   : 0, // kill the bottom_margin at the last blockquote
            }),
            
            
            
            // customize:
            ...usesCssProps(blockquotes),
        }),
    }),
]);
//#endregion style sheets
