// cssfn:
import type {
    // types:
    Factory,
}                           from '@cssfn/types'                 // cssfn general types
import type {
    // cssfn properties:
    CssRule,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rules,
    states,
    keyframes,
    
    
    
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
    usesOutlineable,
}                           from '@reusable-ui/outlineable'     // outlined (background-less) variant of UI
import {
    // hooks:
    usesMildable,
}                           from '@reusable-ui/mildable'        // mild (soft color) variant of UI

// reusable-ui states:
import {
    // hooks:
    ifActivated,
    ifActivating,
    ifPassivating,
    ifActive,
    usesActivatable,
}                           from '@reusable-ui/activatable'     // a capability of UI to be highlighted/selected/activated
import {
    // hooks:
    ifPressing,
    ifReleasing,
    ifPress,
    usesClickable,
}                           from '@reusable-ui/clickable'       // a capability of UI to be clicked



// hooks:

// states:

//#region active-as-click
export interface ActiveAsClickVars {
    filterActive      : any
    
    animActive        : any
    animPassive       : any
    
    
    
    altFilterActiveTg : any
    
    altAnimActiveTg   : any
    altAnimPassiveTg  : any
}
const [activeAsClickVars] = cssVars<ActiveAsClickVars>();



export interface ActiveAsClickStuff { activeAsClickRule: Factory<CssRule>, activeAsClickVars: CssVars<ActiveAsClickVars> }
/**
 * Shows the UI as clicked when activated.
 * @returns A `ActiveAsClickStuff` represents an active-as-click state.
 */
export const usesActiveAsClick = (): ActiveAsClickStuff => {
    // dependencies:
    
    // variants:
    const {outlineableVars} = usesOutlineable();
    const {mildableVars   } = usesMildable();
    
    // states:
    const {activatableVars} = usesActivatable();
    const {clickableVars  } = usesClickable();
    
    
    
    //#region dummy keyframes
    const [keyframesDummyPressRule  , keyframesDummyPress  ] = keyframes({ /* empty frame */ });
    const [keyframesDummyReleaseRule, keyframesDummyRelease] = keyframes({ /* empty frame */ });
    keyframesDummyPress.value   = 'dummyPress';   // the @keyframes name should contain 'press'   in order to be recognized by `useClickable`
    keyframesDummyRelease.value = 'dummyRelease'; // the @keyframes name should contain 'release' in order to be recognized by `useClickable`
    //#endregion dummy keyframes
    
    
    
    return {
        activeAsClickRule: () => style({
            // animations:
            ...keyframesDummyPressRule,
            ...keyframesDummyReleaseRule,
            
            
            
            // animation functions:
            ...vars({
                // filterActive => filterPress:
                [activeAsClickVars.filterActive]: switchOf(
                    activeAsClickVars.altFilterActiveTg,
                    clickableVars.filterPress,
                ),
                
                // animActive => animPress:
                [activeAsClickVars.animActive  ]: switchOf(
                    activeAsClickVars.altAnimActiveTg,
                    `1ms ${keyframesDummyPress}`, // note: do not set interval to '0ms' => some browser just simply ignored the animation of zero duration
                ),
                // animPassive => animRelease:
                [activeAsClickVars.animPassive ]: switchOf(
                    activeAsClickVars.altAnimPassiveTg,
                    `1ms ${keyframesDummyRelease}`, // note: do not set interval to '0ms' => some browser just simply ignored the animation of zero duration
                ),
            }),
            
            
            
            // toggling functions:
            ...vars({
                // alternate filterActive => filterActive:
                [activeAsClickVars.altFilterActiveTg]: [[
                    switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                    'brightness(100%)',
                ]],
                
                // alternate animActive => animActive:
                [activeAsClickVars.altAnimActiveTg  ]: [[
                    switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                    clickableVars.animPress,
                ]],
                // alternate animPassive => animPassive:
                [activeAsClickVars.altAnimPassiveTg ]: [[
                    switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                    clickableVars.animRelease,
                ]],
            }),
            
            
            
            // animation states:
            ...states([
                /*
                    when in activating/activated state =>
                    prevents the pressing & releasing state to animate & toggle the filter
                    without making `useClickable()` stalling
                */
                ifPressing({
                    ...rules([
                        ifActive({
                            ...vars({
                                [clickableVars.filter] : activeAsClickVars.filterActive,
                                [clickableVars.anim  ] : activeAsClickVars.animActive,
                            }),
                        }),
                    ], { specificityWeight: 0 }), // do not increase the .pressing state specificity, so it can be overriden by the .(activating|releasing) state
                }),
                ifPress({
                    ...rules([
                        ifActive({
                            ...vars({
                                // outlined/mild mode:
                                [clickableVars.filter] : clickableVars.filterPress,
                            }),
                        }),
                    ], { specificityWeight: 0 }), // do not increase the .pressing state specificity, so it can be overriden by the .(activating|releasing) state
                }),
                ifReleasing({
                    ...rules([
                        ifActive({
                            ...vars({
                                [clickableVars.anim  ] : activeAsClickVars.animPassive,
                            }),
                        }),
                    ], { specificityWeight: 0 }), // do not increase the .releasing state specificity, so it can be overriden by the .(activating|releasing) state
                    ...vars({
                        // outlined/mild mode:
                        [clickableVars.filter] : clickableVars.filterPress,
                    }),
                }),
            ], { specificityWeight: 4 }),
            ...states([
                ifActivated({
                    ...vars({
                        [clickableVars.filter] : activeAsClickVars.filterActive,
                    }),
                }),
                ifActivating({
                    ...vars({
                        [clickableVars.filter] : activeAsClickVars.filterActive,
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [clickableVars.filter] : activeAsClickVars.filterActive,
                    }),
                }),
            ]),
        }),
        activeAsClickVars,
    };
};
//#endregion active-as-click
