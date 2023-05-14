// cssfn:
import {
    // cssfn css specific types:
    CssComplexValueOf,
    CssKnownValueOf,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // writes css in javascript



//#region types
export type CssLength = CssComplexValueOf<CssKnownValueOf<'gap'>>
//#endregion types



//#region configs
export const [spacers, spacerValues, cssSpacerConfig] = cssConfig(() => {
    const bases = {
        none    : '0rem'    as CssLength,
        md      : '1rem'    as CssLength,
    };
    
    const defaults = {
        default : bases.md as CssLength,
    };
    
    return {
        ...bases,
        ...defaults,
        
        xxs     : [['calc(', bases.md, '/', 8  , ')']] as CssLength,
        xs      : [['calc(', bases.md, '/', 4  , ')']] as CssLength,
        sm      : [['calc(', bases.md, '/', 2  , ')']] as CssLength,
        
        lg      : [['calc(', bases.md, '*', 1.5, ')']] as CssLength,
        xl      : [['calc(', bases.md, '*', 3  , ')']] as CssLength,
    };
}, { prefix: 'spc' });
export { spacers as default }
//#endregion configs
