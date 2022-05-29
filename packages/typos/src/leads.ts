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
import {
    // configs:
    paragraphs as pargs,
}                           from './paragraphs.js'



//#region configs
const [leads, leadValues, cssLeadConfig] = createCssConfig(() => {
    return {
        // foregrounds:
        foreg             : pargs.foreg             as CssKnownProps['foreg'],
        
        
        
        // spacings:
        marginInlineStart : pargs.marginInlineStart as CssKnownProps['marginInlineStart'],
        marginInlineEnd   : pargs.marginInlineEnd   as CssKnownProps['marginInlineEnd'],
        marginBlockStart  : pargs.marginBlockStart  as CssKnownProps['marginBlockStart'],
        marginBlockEnd    : pargs.marginBlockEnd    as CssKnownProps['marginBlockEnd'],
        
        
        
        // typos:
        fontSize          : typos.fontSizeMd        as CssKnownProps['fontSize'],
        fontFamily        : pargs.fontFamily        as CssKnownProps['fontFamily'],
        fontWeight        : typos.fontWeightLight   as CssKnownProps['fontWeight'],
        fontStyle         : pargs.fontStyle         as CssKnownProps['fontStyle'],
        textDecoration    : pargs.textDecoration    as CssKnownProps['textDecoration'],
        lineHeight        : pargs.lineHeight        as CssKnownProps['lineHeight'],
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
