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

//#region modalCard
export interface ModalCardVars {
    /**
     * The horizontal alignment of the <Card>.
     */
    horzAlign : any
    /**
     * The vertical alignment of the <Card>.
     */
    vertAlign : any
}
const [modalCardVars] = cssVars<ModalCardVars>({ prefix: 'modalCard', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface ModalCardStuff { modalCardRule: Factory<CssRule>, modalCardVars: CssVars<ModalCardVars> }
export interface ModalCardConfig {
    horzAlign ?: CssKnownProps['justifyItems']
    vertAlign ?: CssKnownProps['alignItems'  ]
}
/**
 * Uses modalCard variables.
 * @param config  A configuration of `modalCardRule`.
 * @returns A `ModalCardStuff` represents the modalCard rules.
 */
export const usesModalCard = (config?: ModalCardConfig): ModalCardStuff => {
    return {
        modalCardRule: () => style({
            ...vars({
                // positions:
                [modalCardVars.horzAlign] : config?.horzAlign,
                [modalCardVars.vertAlign] : config?.vertAlign,
            }),
        }),
        modalCardVars,
    };
};
//#endregion modalCard
