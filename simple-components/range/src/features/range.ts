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
}                           from '@cssfn/core'                          // writes css in javascript

// reusable-ui core:
import {
    // background stuff of UI:
    usesBackground,
}                           from '@reusable-ui/core'                    // a set of reusable-ui packages which are responsible for building any component



// hooks:

// features:

//#region range
export interface RangeVars {
    /**
     * Range's thumb ratio.
     */
    valueRatio : any
    
    /**
     * final background layers of the Range.
     */
    trackBackg : any
}
const [rangeVars] = cssVars<RangeVars>({ prefix: 'range', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface RangeStuff { rangeRule: Factory<CssRule>, rangeVars: CssVars<RangeVars> }
export interface RangeConfig {
    trackBackg ?: CssKnownProps['background']
}
/**
 * Uses Range variables.
 * @param config  A configuration of `rangeRule`.
 * @returns A `RangeStuff` represents the Range variable rules.
 */
export const usesRange = (config?: RangeConfig): RangeStuff => {
    // dependencies:
    
    // features:
    const {backgroundVars} = usesBackground();
    
    
    
    return {
        rangeRule: () => style({
            ...vars({
                [rangeVars.trackBackg] : config?.trackBackg ?? backgroundVars.backg,
            }),
        }),
        rangeVars,
    };
};
//#endregion range
