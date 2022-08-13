// cssfn:
import type {
    // css values:
    CssComplexValueOf,
    
    
    
    // css known (standard) properties:
    CssKnownValueOf,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    cssConfig,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration



//#region types
export type CssLength = CssComplexValueOf<CssKnownValueOf<'gap'>>
//#endregion types



//#region configs
export const [spacers, spacerValues, cssSpacerConfig] = cssConfig(() => {
    const basics = {
        none    : '0rem'    as CssLength,
        md      : '1rem'    as CssLength,
    };
    
    const defaults = {
        default : basics.md as CssLength,
    };
    
    return {
        ...basics,
        ...defaults,
        
        xxs     : [['calc(', basics.md, '/', 8  , ')']] as CssLength,
        xs      : [['calc(', basics.md, '/', 4  , ')']] as CssLength,
        sm      : [['calc(', basics.md, '/', 2  , ')']] as CssLength,
        
        lg      : [['calc(', basics.md, '*', 1.5, ')']] as CssLength,
        xl      : [['calc(', basics.md, '*', 3  , ')']] as CssLength,
    };
}, { prefix: 'spc' });
export { spacers as default }
//#endregion configs
