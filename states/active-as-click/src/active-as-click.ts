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
                    clickableVars.animPress,
                ),
                // animPassive => animRelease:
                [activeAsClickVars.animPassive ]: switchOf(
                    activeAsClickVars.altAnimPassiveTg,
                    clickableVars.animRelease,
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
                    `1ms ${keyframesDummyPress}`, // note: do not set interval to '0ms' => some browser just simply ignored the animation of zero duration
                ]],
                // alternate animPassive => animPassive:
                [activeAsClickVars.altAnimPassiveTg ]: [[
                    switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                    `1ms ${keyframesDummyRelease}`, // note: do not set interval to '0ms' => some browser just simply ignored the animation of zero duration
                ]],
            }),
            
            
            
            // animation states:
            ...states([
                /*
                    when in activating/activated state =>
                    prevents the pressing & releasing state to animate & toggle the filter
                    without making `useClickable()` stalling
                */
                ifPress({
                    ...rules([
                        ifActive({
                            ...vars({
                                [clickableVars.filter] : activeAsClickVars.filterActive,
                                [clickableVars.anim  ] : `1ms ${keyframesDummyPress}`, // prevents a pressing animation when the <button> is already pressed
                                
                                // outlined/mild mode:
                                [clickableVars.filter] : clickableVars.filterPress,
                                // already been pressed by `usesClickable()` => no need to re-play the pressing animation => causing blinky:
                                [clickableVars.anim  ] : null,
                            }),
                        }),
                    ], { specificityWeight: 0 }), // do not increase the .pressing state specificity, so it can be overriden by the .(activating|releasing) state
                }),
                ifReleasing({
                    ...rules([
                        ifActive({
                            ...vars({
                                // bold mode:
                                // holds the pressed state:
                                [clickableVars.filter] : activeAsClickVars.filterActive,
                                // prevents the releasing animation:
                                [clickableVars.anim  ] : `1ms ${keyframesDummyRelease}`, // prevents a releasing animation when the <button> is still pressed
                                
                                // outlined/mild mode:
                                // preserves the releasing animation, so the pressing animation cancel out smoothly:
                                [clickableVars.filter] : clickableVars.filterPress,
                                [clickableVars.anim  ] : null,
                            }),
                        }),
                    ], { specificityWeight: 0 }), // do not increase the .releasing state specificity, so it can be overriden by the .(activating|releasing) state
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
                        // bold mode:
                        // holds the pressed state:
                        [clickableVars.filter] : activeAsClickVars.filterActive,
                        // already been pressed by `usesClickable()` => no need to re-play the pressing animation => causing blinky:
                        // [clickableVars.anim  ] : activeAsClickVars.animActive, // pressing animation -or- pressing dummy
                        
                        // outlined/mild mode:
                        [clickableVars.filter] : clickableVars.filterPress, // overrides the above
                    }),
                }),
                ifPassivating({
                    ...vars({
                        [clickableVars.filter] : activeAsClickVars.filterActive,
                        [clickableVars.anim  ] : activeAsClickVars.animPassive, // releasing animation -or- releasing dummy
                        
                        // outlined/mild mode:
                        [clickableVars.anim  ] : null,
                    }),
                }),
            ]),
        }),
        activeAsClickVars,
    };
};
//#endregion active-as-click
