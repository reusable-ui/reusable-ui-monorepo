// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssRule,
    
    
    
    // writes css in javascript:
    style,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                          // writes css in javascript



// hooks:

// features:

//#region collapse
export interface CollapseVars {
    /**
     * The last known inline size (width) of `<Collapse>`.
     */
    lastKnownInlineSize : any
    /**
     * The last known block size (height) of `<Collapse>`.
     */
    lastKnownBlockSize  : any
}
const [collapseVars] = cssVars<CollapseVars>({ prefix: 'clpp', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface CollapseStuff { collapseRule: Factory<CssRule>, collapseVars: CssVars<CollapseVars> }
export interface CollapseConfig {
    /* not implemented yet */
}
/**
 * Uses Collapse variables.
 * @param config  A configuration of `collapseRule`.
 * @returns A `CollapseStuff` represents the Collapse variable rules.
 */
export const usesCollapse = (config?: CollapseConfig): CollapseStuff => {
    return {
        collapseRule: () => style({
            /* not implemented yet */
        }),
        collapseVars,
    };
};
//#endregion collapse
