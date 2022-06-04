// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    // rules:
    rule,
    
    
    
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

// internals:
import {
    // configs:
    marks,
}                           from './marks.js'
import {
    // configs:
    codes,
}                           from './codes.js'



//#region configs
export const [kbds, kbdValues, cssKbdConfig] = createCssConfig(() => {
    return {
        // backgrounds:
        backg             : colors.grayDark      as CssKnownProps['backg'],
        
        
        
        // foregrounds:
        foreg             : colors.white         as CssKnownProps['foreg'],
        
        
        
        // borders:
        border            : marks.border         as CssKnownProps['border'],
        borderRadius      : marks.borderRadius   as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline     : '0.4em'              as CssKnownProps['paddingInline'],
        paddingBlock      : '0.2em'              as CssKnownProps['paddingBlock'],
        
        
        
        // typos:
        fontSize          : codes.fontSize       as CssKnownProps['fontSize'],
        fontFamily        : codes.fontFamily     as CssKnownProps['fontFamily'],
        fontWeight        : codes.fontWeight     as CssKnownProps['fontWeight'],
        fontStyle         : codes.fontStyle      as CssKnownProps['fontStyle'],
        textDecoration    : codes.textDecoration as CssKnownProps['textDecoration'],
        lineHeight        : codes.lineHeight     as CssKnownProps['lineHeight'],
        overflowWrap      : codes.overflowWrap   as CssKnownProps['overflowWrap'],
    };
}, { prefix: 'kbd' });
export { kbds as default }
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...rule(['kbd', '.kbd'], {
            // layouts:
            display : 'inline',
            
            
            
            // customize:
            ...usesCssProps(kbds),
        }),
    }),
]);
//#endregion style sheets
