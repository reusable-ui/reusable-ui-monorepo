// cssfn:
import {
    // cssfn general types:
    Factory,
    
    
    
    // cssfn css specific types:
    CssRule,
    
    
    
    // writes css in javascript:
    states,
    keyframes,
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
    ifPressReleasing,
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
                /*
                    a <button> with [outlined=true] or [mild=true] style:
                        => uses filter `active` (the default is do nothing)
                    
                    a <button> with regular style:
                        => uses filter `press` (the default is darken)
                */
                // filterActive => filterPress:
                [activeAsClickVars.filterActive]: switchOf(
                    activeAsClickVars.altFilterActiveTg,
                    clickableVars.filterPress,
                ),
                
                
                
                /*
                    a <button> with [outlined=true] or [mild=true] style:
                        => uses the .pressing & .releasing animations
                    
                    a <button> with regular style:
                        => prevents the .pressing & .releasing animations, without making `useClickable()` stalling, by using dummyPress & dummyRelease
                */
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
                    activatableVars.filterActive,
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
                ifPressing({
                    ...ifActive({
                        ...vars({
                            [clickableVars.anim] : activeAsClickVars.animActive,
                        }),
                    }),
                }),
                ifReleasing({
                    ...ifActive({
                        ...vars({
                            [clickableVars.anim] : activeAsClickVars.animPassive,
                        }),
                    }),
                }),
            ]),
            // animation filters:
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
                
                /*
                    put at the last, so the action states (.pressing/.pressed/.releasing) always win than toggling states (.activating/.activated/.passivating)
                    the cases of a <button> with [outlined=true] or [mild=true] style:
                        * when toggling on , the mouse_up will not cause blinking effect
                        * when toggling off, the mouse_down will make pressing effect
                */
                ifPressReleasing({
                    ...vars({
                        [clickableVars.filter] : clickableVars.filterPress,
                    }),
                }),
            ]),
        }),
        activeAsClickVars,
    };
};
//#endregion active-as-click
