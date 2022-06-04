// cssfn:
import type {
    // css values:
    CssComplexValueOf,
    
    
    
    // css known (standard) properties:
    CssKnownValueOf,
}                           from '@cssfn/css-types'     // cssfn css specific types
import {
    createCssConfig,
}                           from '@cssfn/css-config'    // reads/writes css variables configuration



//#region types
export type BorderRadius = CssComplexValueOf<CssKnownValueOf<'borderRadius'>>
//#endregion types



//#region configs
export const [radiuses, radiusValues, cssBorderRadiusConfig] = createCssConfig(() => {
    const basics = {
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
        default : basics.md  as BorderRadius,
    };
    
    return {
        ...basics,
        ...defaults,
    };
}, { prefix: 'bd-rd' });
export { radiuses as default }
//#endregion configs
