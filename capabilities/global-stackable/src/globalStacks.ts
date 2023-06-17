// cssfn:
import type {
    // cssfn css specific types:
    CssKnownProps,
}                           from '@cssfn/core'                  // writes css in javascript



export type GlobalStacks = {
    dropdown      : CssKnownProps['zIndex'],
    
    sticky        : CssKnownProps['zIndex'],
    fixed         : CssKnownProps['zIndex'],
    
    modalBackdrop : CssKnownProps['zIndex'],
    modalDialog   : CssKnownProps['zIndex'],
    
    tooltip       : CssKnownProps['zIndex'],
}
export const globalStacks : GlobalStacks = {
    dropdown      : 1000,
    
    sticky        : 1020,
    fixed         : 1030,
    
    modalBackdrop : 1050,
    modalDialog   : 1055,
    
    tooltip       : 1080,
};
