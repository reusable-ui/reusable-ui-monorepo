// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    style,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript



// hooks:

// features:

//#region collapse
export interface CollapseVars {
    // sizes:
    inlineSize : any
    blockSize  : any
}
const [collapseVars] = cssVars<CollapseVars>({ prefix: 'clpp', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface CollapseStuff { collapseRule: Factory<CssRule>, collapseVars: CssVars<CollapseVars> }
export interface CollapseConfig {
    // sizes:
    inlineSize : CssKnownProps['inlineSize'],
    blockSize  : CssKnownProps['blockSize' ],
}
/**
 * Uses collapse variables.
 * @param config  A configuration of `collapseRule`.
 * @returns A `CollapseStuff` represents the collapse rules.
 */
export const usesCollapse = (config?: CollapseConfig): CollapseStuff => {
    return {
        collapseRule: () => style({
            // sizes:
            // [collapseVars.inlineSize] : `calc-size(${config?.inlineSize ?? 'fit-content'}, size)`,
            // [collapseVars.blockSize ] : `calc-size(${config?.blockSize  ?? 'fit-content'}, size)`,
            [collapseVars.inlineSize]    : config?.inlineSize ?? 'fit-content',
            [collapseVars.blockSize ]    : config?.blockSize  ?? 'fit-content',
        }),
        collapseVars,
    };
};
//#endregion collapse
