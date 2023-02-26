// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
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

//#region progressBar
export interface ProgressBarVars {
    /**
     * ProgressBar's thumb ratio.
     */
    valueRatio : any
}
const [progressBarVars] = cssVars<ProgressBarVars>({ prefix: 'progressBar', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface ProgressBarStuff { progressBarRule: Factory<CssRule>, progressBarVars: CssVars<ProgressBarVars> }
export interface ProgressBarConfig {
    valueRatio ?: number
}
/**
 * Uses progressBar variables.
 * @param config  A configuration of `progressBarRule`.
 * @returns A `ProgressBarStuff` represents the progressBar rules.
 */
export const usesProgressBar = (config?: ProgressBarConfig): ProgressBarStuff => {
    return {
        progressBarRule: () => style({
            ...vars({
                // variables:
                [progressBarVars.valueRatio] : config?.valueRatio,
            }),
        }),
        progressBarVars,
    };
};
//#endregion progressBar
