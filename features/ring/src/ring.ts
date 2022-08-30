// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // styles:
    style,
    vars,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // utilities:
    CssVars,
    cssVars,
    switchOf,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

// reusable-ui variants:
import {
    // hooks:
    usesThemable,
}                           from '@reusable-ui/themable'        // color options of UI



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
const [ringVars] = cssVars<RingVars>();



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
    const {themableVars} = usesThemable();
    
    
    
    return {
        ringRule: () => style({
            // color functions:
            ...vars({
                // conditional color functions:
                [ringVars.ringFn] : switchOf(
                    themableVars.ringCond, // first  priority
                    themableVars.ring,     // second priority
                    
                    config?.ring,          // default => uses config's ring
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
