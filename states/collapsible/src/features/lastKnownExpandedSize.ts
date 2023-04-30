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

//#region lastKnownExpandedSize
export interface LastKnownExpandedSizeVars {
    /**
     * The last known inline size (width) of `<LastKnownExpandedSize>`.
     */
    inlineSize : any
    /**
     * The last known block size (height) of `<LastKnownExpandedSize>`.
     */
    blockSize  : any
}
const [lastKnownExpandedSizeVars] = cssVars<LastKnownExpandedSizeVars>({ prefix: 'lkes', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface LastKnownExpandedSizeStuff { lastKnownExpandedSizeRule: Factory<CssRule>, lastKnownExpandedSizeVars: CssVars<LastKnownExpandedSizeVars> }
export interface LastKnownExpandedSizeConfig {
    /* not implemented yet */
}
/**
 * Uses LastKnownExpandedSize variables.
 * @param config  A configuration of `lastKnownExpandedSizeRule`.
 * @returns A `LastKnownExpandedSizeStuff` represents the LastKnownExpandedSize variable rules.
 */
export const usesLastKnownExpandedSize = (config?: LastKnownExpandedSizeConfig): LastKnownExpandedSizeStuff => {
    return {
        lastKnownExpandedSizeRule: () => style({
            /* not implemented yet */
        }),
        lastKnownExpandedSizeVars,
    };
};
//#endregion lastKnownExpandedSize
