// cssfn:
import type {
    // css custom properties:
    CssCustomRef,
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
import type {
    FontSize,
    FontFamily,
    FontWeight,
    FontStyle,
    TextDecoration,
    LineHeight,
    Foreground,
    Margin,
}                           from './types.js'
import {
    typos,
}                           from './typos.js'
import {
    paragraphs as pargs,
}                           from './paragraphs.js'



//#region configs
const [leads, leadValues, cssLeadConfig] = createCssConfig(() => {
    return {
        fontSize       : typos.fontSizeMd      as FontSize       | CssCustomRef,
        fontFamily     : pargs.fontFamily      as FontFamily     | CssCustomRef,
        fontWeight     : typos.fontWeightLight as FontWeight     | CssCustomRef,
        fontStyle      : pargs.fontStyle       as FontStyle      | CssCustomRef,
        textDecoration : pargs.textDecoration  as TextDecoration | CssCustomRef,
        lineHeight     : pargs.lineHeight      as LineHeight     | CssCustomRef,
        
        foreg          : pargs.foreg           as Foreground     | CssCustomRef,
        
        margin         : pargs.margin          as Margin         | CssCustomRef,
    };
}, { prefix: 'lead' });
export {
    leads,
    leads as cssProps,
    leads as default,
}
export {
    leadValues,
    leadValues as cssVals,
}
export {
    cssLeadConfig,
    cssLeadConfig as cssConfig,
}
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...rule('.lead', {
            // layouts:
            display : 'block',
            
            
            
            // spacings:
            ...ifFirstChild({
                marginBlockStart : 0, // kill the top_margin at the first lead
            }),
            ...ifLastChild({
                marginBlockEnd   : 0, // kill the bottom_margin at the last lead
            }),
            
            
            
            // customize:
            ...usesCssProps(leads),
        }),
    }),
]);
//#endregion style sheets
