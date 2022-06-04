// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'     // cssfn css specific types
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
import {
    // configs:
    typos,
}                           from './typos.js'



//#region configs
export const [blockquotes, blockquoteValues, cssBlockquoteConfig] = createCssConfig(() => {
    return {
        // foregrounds:
        foreg             : 'inherit'        as CssKnownProps['foreg'],
        
        
        
        // spacings:
        marginInlineStart : '0em'            as CssKnownProps['marginInlineStart'],
        marginInlineEnd   : '0em'            as CssKnownProps['marginInlineEnd'],
        marginBlockStart  : '1em'            as CssKnownProps['marginBlockStart'],
        marginBlockEnd    : '1em'            as CssKnownProps['marginBlockEnd'],
        
        
        
        // typos:
        fontSize          : typos.fontSizeMd as CssKnownProps['fontSize'],
        fontFamily        : 'inherit'        as CssKnownProps['fontFamily'],
        fontWeight        : 'inherit'        as CssKnownProps['fontWeight'],
        fontStyle         : 'inherit'        as CssKnownProps['fontStyle'],
        textDecoration    : 'inherit'        as CssKnownProps['textDecoration'],
        lineHeight        : 'inherit'        as CssKnownProps['lineHeight'],
    };
}, { prefix: 'bq' });
export { blockquotes as default }
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
