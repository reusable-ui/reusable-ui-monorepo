// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    // scopes:
    globalScope,
    
    
    
    // style sheets:
    styleSheets,
}                           from '@cssfn/cssfn'         // writes css in javascript
import {
    cssConfig,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration

// internals:
import {
    // configs:
    typos,
}                           from './typos.js'
import {
    // configs:
    headings as heads,
    
    
    
    // styles:
    usesHeadingRule,
}                           from './headings.js'



//#region configs
export const [displays, displayValues, cssDisplayConfig] = cssConfig(() => {
    return {
        // appearances:
        subOpacity        : heads.subOpacity        as CssKnownProps['opacity'],
        
        
        
        // foregrounds:
        foreg             : heads.foreg             as CssKnownProps['foreg'],
        
        
        
        // spacings:
        marginInlineStart : heads.marginInlineStart as CssKnownProps['marginInlineStart'],
        marginInlineEnd   : heads.marginInlineEnd   as CssKnownProps['marginInlineEnd'],
        marginBlockStart  : heads.marginBlockStart  as CssKnownProps['marginBlockStart'],
        marginBlockEnd    : heads.marginBlockEnd    as CssKnownProps['marginBlockEnd'],
        
        
        
        // typos:
        fontSize          : 'unset'                                    as CssKnownProps['fontSize'],
        fontSize1         : [['calc(', 5.0, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize2         : [['calc(', 4.5, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize3         : [['calc(', 4.0, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize4         : [['calc(', 3.5, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize5         : [['calc(', 3.0, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        fontSize6         : [['calc(', 2.5, '*', typos.fontSize, ')']] as CssKnownProps['fontSize'],
        
        fontFamily        : heads.fontFamily        as CssKnownProps['fontFamily'],
        fontWeight        : 300                     as CssKnownProps['fontWeight'],
        fontStyle         : heads.fontStyle         as CssKnownProps['fontStyle'],
        textDecoration    : heads.textDecoration    as CssKnownProps['textDecoration'],
        lineHeight        : heads.lineHeight        as CssKnownProps['lineHeight'],
    };
}, { prefix: 'd' });
export { displays as default }
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...usesHeadingRule(displays, ['.display-']),
    }),
]);
//#endregion style sheets
