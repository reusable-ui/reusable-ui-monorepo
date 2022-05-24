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



//#region general types
export type BorderWidth = CssKnownValueOf<'borderWidth'>
export type BorderColor = CssKnownValueOf<'borderColor'>
export type BorderStyle = CssKnownValueOf<'borderStyle'>
export type Border      = CssComplexValueOf<CssKnownValueOf<'border'>>
//#endregion general types



//#region configs
const [borders, borderValues, cssConfig] = createCssConfig(() => {
    const widths = {
        none  : '0px'          as BorderWidth,
        hair  : '1px'          as BorderWidth,
        thin  : '2px'          as BorderWidth,
        bold  : '4px'          as BorderWidth,
    };
    
    const styles = {
        color : 'currentColor' as BorderColor,
        style : 'solid'        as BorderStyle,
    };
    
    const defaults = {
        defaultWidth : widths.hair                                 as BorderWidth,
        default      : [[styles.style, widths.hair, styles.color]] as Border,
    };
    
    return {
        ...widths,
        ...styles,
        ...defaults,
    };
}, { prefix: 'bd' });
export {
    borders,
    borders as default,
}
export {
    borderValues,
    cssConfig,
}
//#endregion configs
