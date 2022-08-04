// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // css custom properties:
    CssCustomRef,
    
    
    
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
    fallbacks,
}                           from '@cssfn/css-vars'              // strongly typed of css variables

// reusable-ui variants:
import {
    // hooks:
    ifHasTheme,
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



export interface RingRules { ringRule: Factory<CssRule>, ringVars: CssVars<RingVars> }
export interface RingConfig {
    ring ?: CssCustomRef
}
/**
 * Uses ring (focus indicator) color.
 * @param config  A configuration of `ringRule`.
 * @returns A `RingRules` represents the ring rules.
 */
export const usesRing = (config?: RingConfig): RingRules => {
    // dependencies:
    const {themableVars} = usesThemable();
    
    
    
    return {
        ringRule: () => style({
            // color functions:
            ...vars({
                [ringVars.ringFn] : 'inherit', // inherit to parent theme
            }),
            ...ifHasTheme({ // only declare the function below if the <Component> has a dedicated theme:
                ...vars({
                    [ringVars.ringFn] : fallbacks(
                        themableVars.ringImpt, // first  priority
                        themableVars.ring,     // second priority
                        themableVars.ringCond, // third  priority
                        
                        config?.ring,          // default => uses config's ring
                    ),
                }),
            }),
            ...vars({ // always re-declare the final function below, so the [outlined] and/or [mild] can be toggled_on
                [ringVars.ring  ] : fallbacks(
                    // no toggle outlined nor toggle mild yet (might be added in the future)
                    
                    ringVars.ringFn,           // default => uses our `ringFn`
                ),
            }),
        }),
        ringVars,
    };
};
//#endregion ring
