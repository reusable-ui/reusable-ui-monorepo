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
    
    
    
    // writes complex stylesheets in simpler way:
    memoizeStyle,
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
    filterActive            : any
    
    animPress               : any
    animRelease             : any
    
    animActive              : any
    animPassive             : any
    
    animActiveAsClick       : any
    animPassiveAsClick      : any
    
    
    
    altFilterActiveTg       : any
    
    altAnimPressTg          : any
    altAnimReleaseTg        : any
    
    altAnimActiveTg         : any
    altAnimPassiveTg        : any
    
    altAnimActiveAsClickTg  : any
    altAnimPassiveAsClickTg : any
}
const [activeAsClickVars] = cssVars<ActiveAsClickVars>({ prefix: 'ak', minify: false }); // shared variables: ensures the server-side & client-side have the same generated css variable names



export interface ActiveAsClickStuff { activeAsClickRule: Factory<CssRule>, activeAsClickVars: CssVars<ActiveAsClickVars> }
const createActiveAsClickRule = () => {
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
    
    
    
    const [keyframesDummyActiveRule , keyframesDummyActive ] = keyframes({ /* empty frame */ });
    const [keyframesDummyPassiveRule, keyframesDummyPassive] = keyframes({ /* empty frame */ });
    keyframesDummyActive.value  = 'dummyActive';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivatable`
    keyframesDummyPassive.value = 'dummyPassive'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivatable`
    //#endregion dummy keyframes
    
    
    
    return style({
        // animations:
        ...keyframesDummyPressRule,
        ...keyframesDummyReleaseRule,
        ...keyframesDummyActiveRule,
        ...keyframesDummyPassiveRule,
        
        
        
        // animation functions:
        ...vars({
            /*
                a <button> with [outlined=true] or [mild=true] style:
                    => uses filter `active` (the default is do nothing)
                
                a <button> with regular style:
                    => uses filter `press` (the default is darken)
            */
            // filterActive => filterPress:
            [activeAsClickVars.filterActive      ]: switchOf(
                activeAsClickVars.altFilterActiveTg,
                clickableVars.filterPress,
            ),
            
            
            
            /*
                a <button> with [outlined=true] or [mild=true] style:
                    => uses the .pressing & .releasing animations
                
                a <button> with regular style:
                    => prevents the .pressing & .releasing animations, without making `useClickable()` stalling, by using dummyPress & dummyRelease
            */
            // regular animPress   => dummy animPress:
            [activeAsClickVars.animPress         ]: switchOf(
                activeAsClickVars.altAnimPressTg,
                `1ms ${keyframesDummyPress}`, // note: do not set interval to '0ms' => some browser just simply ignored the animation of zero duration
            ),
            // regular animRelease => dummy animRelease:
            [activeAsClickVars.animRelease       ]: switchOf(
                activeAsClickVars.altAnimReleaseTg,
                `1ms ${keyframesDummyRelease}`, // note: do not set interval to '0ms' => some browser just simply ignored the animation of zero duration
            ),
            
            // regular animActive  => pressAsActive
            [activeAsClickVars.animActive        ]: switchOf(
                activeAsClickVars.altAnimActiveTg,
                clickableVars.animPressAsActive,
            ),
            // regular animPassive => releaseAsPassive
            [activeAsClickVars.animPassive       ]: switchOf(
                activeAsClickVars.altAnimPassiveTg,
                clickableVars.animReleaseAsPassive,
            ),
            
            // regular animActiveAsClick  => dummy animPress
            [activeAsClickVars.animActiveAsClick ]: switchOf(
                activeAsClickVars.altAnimActiveAsClickTg,
                `1ms ${keyframesDummyActive}`, // note: do not set interval to '0ms' => some browser just simply ignored the animation of zero duration
                /*
                    TODO: fix a minor pressing_animation_ABORT because the '.activated' state is occured BEFORE the pressing_animation_DONE
                */
            ),
            // regular animPassiveAsClick => dummy animRelease
            [activeAsClickVars.animPassiveAsClick]: switchOf(
                activeAsClickVars.altAnimPassiveAsClickTg,
                `1ms ${keyframesDummyPassive}`, // note: do not set interval to '0ms' => some browser just simply ignored the animation of zero duration
            ),
        }),
        
        
        
        // toggling functions:
        ...vars({
            // alternate filterActive => filterActive:
            [activeAsClickVars.altFilterActiveTg      ]: [[
                switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                activatableVars.filterActive,
            ]],
            
            
            
            // alternate animPress   => original animPress:
            [activeAsClickVars.altAnimPressTg         ]: [[
                switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                clickableVars.animPress,
            ]],
            // alternate animRelease => original animRelease:
            [activeAsClickVars.altAnimReleaseTg       ]: [[
                switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                clickableVars.animRelease,
            ]],
            
            // alternate animActiveAsClick  => original animActive
            [activeAsClickVars.altAnimActiveTg        ]: [[
                switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                activatableVars.animActive,
            ]],
            // alternate animPassiveAsClick => original animPassive
            [activeAsClickVars.altAnimPassiveTg       ]: [[
                switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                activatableVars.animPassive,
            ]],
            
            // alternate animActiveAsClick  => original animActive
            [activeAsClickVars.altAnimActiveAsClickTg ]: [[
                switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                activatableVars.animActive,
            ]],
            // alternate animPassiveAsClick => original animPassive
            [activeAsClickVars.altAnimPassiveAsClickTg]: [[
                switchOf(outlineableVars.outlinedPr, mildableVars.mildPr),
                activatableVars.animPassive,
            ]],
        }),
        
        
        
        // animation states:
        ...states([
            //#region activating/passivating transition -- controllable
            /*
                when on controllable activating:
                    * regular       : pressing_animation
                    * outlined/mild : activating_animation
                
                when on controllable passivating:
                    * regular       : releasing_animation
                    * outlined/mild : passivating_animation
                
                
                
                when activating after click:
                    * regular       : NO_activating_animation because the activating_state is already styled_as_pressing
                    * outlined/mild :    activating_animation
                
                when passivating after click:
                    * regular       : NO_passivating_animation because the passivating_state is already styled_as_releasing
                    * outlined/mild :    passivating_animation
            */
            ifActivating({
                // there is no clicking activity:
                [activatableVars.anim] : activeAsClickVars.animActive,
                
                // there is a clicking activity:
                ...ifPressReleasing({
                    [activatableVars.anim] : activeAsClickVars.animActiveAsClick,
                }),
            }),
            ifPassivating({
                // there is no clicking activity:
                [activatableVars.anim] : activeAsClickVars.animPassive,
                
                // there is a clicking activity:
                ...ifPressReleasing({
                    [activatableVars.anim] : activeAsClickVars.animPassiveAsClick,
                }),
            }),
            //#endregion activating/passivating transition -- controllable
            
            
            
            //#region clicking feedback
            /*
                when clicking for activating:
                    * regular       : NO_releasing_animation because the UI is already styled_as_pressed
                    * outlined/mild :    releasing_animation
                
                when clicking for passivating:
                    * regular       : NO_pressing_animation because the UI is already styled_as_pressed
                    * outlined/mild :    pressing_animation
            */
            ifPressing({
                /*
                    TODO: fix a minor pressing_animation_ABORT because the '.activated' state is occured BEFORE the pressing_animation_DONE
                */
                ...ifActivated({ // allows '.pressing' animation if the UI is still being '.activating', disallow if already been '.activated'
                    ...vars({
                        [clickableVars.anim] : activeAsClickVars.animPress,
                    }),
                }),
            }),
            ifReleasing({
                ...ifActive({ // hold '.releasing' when already '.activating'|'.activated'
                    ...vars({
                        [clickableVars.anim] : activeAsClickVars.animRelease,
                    }),
                }),
            }),
            //#endregion clicking feedback
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
    });
};
const getDefaultActiveAsClickRule = memoizeStyle(() => createActiveAsClickRule());
/**
 * Shows the UI as clicked when activated.
 * @returns A `ActiveAsClickStuff` represents an active-as-click state.
 */
export const usesActiveAsClick = (): ActiveAsClickStuff => {
    return {
        activeAsClickRule: getDefaultActiveAsClickRule,
        activeAsClickVars,
    };
};
//#endregion active-as-click
