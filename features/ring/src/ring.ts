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
    switchOf,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui variants:
import {
    // hooks:
    usesThemeable,
}                           from '@reusable-ui/themeable'       // color options of UI



// hooks:

// features:

//#region ring
export interface RingVars {
    /**
     * functional ring color.
     */
    ringFn : any
    /**
     * final ring color.
     */
    ring   : any
}
const [ringVars] = cssVars<RingVars>({ prefix: 'ri', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface RingStuff { ringRule: Factory<CssRule>, ringVars: CssVars<RingVars> }
export interface RingConfig {
    ring ?: CssKnownProps['color']
}
/**
 * Uses ring (focus indicator) color.
 * @param config  A configuration of `ringRule`.
 * @returns A `RingStuff` represents the ring rules.
 */
export const usesRing = (config?: RingConfig): RingStuff => {
    // dependencies:
    const {themeableVars} = usesThemeable();
    
    
    
    return {
        ringRule: () => style({
            // color functions:
            ...vars({
                // adaptive color functions:
                [ringVars.ringFn] : switchOf(
                    themeableVars.ringCond, // first  priority
                    themeableVars.ring,     // second priority
                    
                    config?.ring,           // default => uses config's ring
                ),
                
                
                
                // final color functions:
                [ringVars.ring  ] : switchOf(
                    // no toggle outlined nor toggle mild yet (might be added in the future)
                    
                    ringVars.ringFn,           // default => uses our `ringFn`
                ),
            }),
        }),
        ringVars,
    };
};
//#endregion ring
