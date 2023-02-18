// cssfn:
import {
    // strongly typed of css variables:
    cssVars,
}                           from '@cssfn/core'                  // writes css in javascript



// variables:
export interface CondBorderVars {
    condBorderWidthTg : any
}
export const [condBorderVars] = cssVars<CondBorderVars>();
