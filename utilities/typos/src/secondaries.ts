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
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration



//#region configs
export const [secondaries, secondaryValues, cssSecondaryConfig] = cssConfig(() => {
    return {
        // appearances:
        opacity        : 0.65      as CssKnownProps['opacity'],
        
        
        
        // foregrounds:
        foreg          : 'inherit' as CssKnownProps['foreg'],
        
        
        
        // typos:
        fontSize       : 'inherit' as CssKnownProps['fontSize'],
        fontFamily     : 'inherit' as CssKnownProps['fontFamily'],
        fontWeight     : 'inherit' as CssKnownProps['fontWeight'],
        fontStyle      : 'inherit' as CssKnownProps['fontStyle'],
        textDecoration : 'inherit' as CssKnownProps['textDecoration'],
        lineHeight     : 'inherit' as CssKnownProps['lineHeight'],
    };
}, { prefix: 'sec' });
export { secondaries as default }
//#endregion configs



//#region style sheets
styleSheets([
    globalScope({
        ...rule(['small', '.txt-sec'], {
            // customize:
            ...usesCssProps(secondaries),
        }),
    }),
]);
//#endregion style sheets
