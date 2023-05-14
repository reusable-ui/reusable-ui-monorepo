// cssfn:
import {
    // cssfn css specific types:
    CssComplexValueOf,
    CssKnownValueOf,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'          // writes css in javascript



//#region types
export type BorderRadius = CssComplexValueOf<CssKnownValueOf<'borderRadius'>>
//#endregion types



//#region configs
export const [radiuses, radiusValues, cssBorderRadiusConfig] = cssConfig(() => {
    const bases = {
        none    : '0rem'     as BorderRadius,
        sm      : '0.25rem'  as BorderRadius,
        md      : '0.375rem' as BorderRadius,
        lg      : '0.5rem'   as BorderRadius,
        xl      : '1rem'     as BorderRadius,
        xxl     : '2rem'     as BorderRadius,
        
        pill    : '50rem'    as BorderRadius,
        circle  : '50%'      as BorderRadius,
    };
    
    const defaults = {
        default : bases.md   as BorderRadius,
    };
    
    return {
        ...bases,
        ...defaults,
    };
}, { prefix: 'bor-rd' });
export { radiuses as default }
//#endregion configs
