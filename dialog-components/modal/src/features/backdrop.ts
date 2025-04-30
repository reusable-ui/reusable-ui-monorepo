// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssKnownProps,
    CssRule,
    
    
    
    // writes css in javascript:
    style,
    vars,
    
    
    
    // strongly typed of css variables:
    CssVars,
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript



// hooks:

// features:

//#region backdrop
export interface BackdropVars {
    /**
     * Backdrop's scroll top position.
     */
    scrollTop  : any
    
    /**
     * Backdrop's scroll left position.
     */
    scrollLeft : any
}
const [backdropVars] = cssVars<BackdropVars>({ prefix: 'backdrop', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface BackdropStuff { backdropRule: Factory<CssRule>, backdropVars: CssVars<BackdropVars> }
export interface BackdropConfig {
    scrollTop  ?: CssKnownProps['top' ]
    scrollLeft ?: CssKnownProps['left']
}
/**
 * Uses Modal's backdrop.
 * @param config  A configuration of `backdropRule`.
 * @returns A `BackdropStuff` represents the backdrop rules.
 */
export const usesBackdrop = (config?: BackdropConfig): BackdropStuff => {
    return {
        backdropRule: () => style({
            ...vars({
                // scrolls:
                [backdropVars.scrollTop ] : config?.scrollTop,
                [backdropVars.scrollLeft] : config?.scrollLeft,
            }),
        }),
        backdropVars,
    };
};
//#endregion backdrop
