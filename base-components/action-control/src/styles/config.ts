// cssfn:
import {
    // cssfn css specific types:
    CssKnownProps,
    
    
    
    // writes css in javascript:
    keyframes,
    style,
    
    
    
    // reads/writes css variables configuration:
    cssConfig,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // a capability of UI to be clicked:
    usesClickable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [actionControls, actionControlValues, cssActionControlConfig] = cssConfig(() => {
    // dependencies:
    
    const {animationRegistry : {filters            }} = usesAnimation();
    const {clickableVars     : {filter: filterPress}} = usesClickable();
    
    
    
    //#region keyframes
    const frameReleased = style({
        filter : [[
            ...filters.filter((f) => (f !== filterPress)), // the rest filter(s)
        ]],
    });
    const framePressed  = style({
        filter : [[
            ...filters.filter((f) => (f !== filterPress)), // the rest filter(s)
            filterPress, // the interpolating filter
        ]],
    });
    const [keyframesPressRule  , keyframesPress  ] = keyframes({
        from : frameReleased,
        to   : framePressed,
    });
    keyframesPress.value   = 'press';   // the @keyframes name should contain 'press'   in order to be recognized by `useClickable`
    const [keyframesReleaseRule, keyframesRelease] = keyframes({
        from : framePressed,
        to   : frameReleased,
    });
    keyframesRelease.value = 'release'; // the @keyframes name should contain 'release' in order to be recognized by `useClickable`
    
    
    
    // supports for `usesActiveAsClick()`:
    const [keyframesPressAsActiveRule  , keyframesPressAsActive  ] = keyframes({
        from : frameReleased,
        to   : framePressed,
    });
    keyframesPressAsActive.value   = `${keyframesPress.value}as-active`;     // the @keyframes name should contain 'active'  in order to be recognized by `useActivatable`
    const [keyframesReleaseAsPassiveRule, keyframesReleaseAsPassive] = keyframes({
        from : framePressed,
        to   : frameReleased,
    });
    keyframesReleaseAsPassive.value = `${keyframesRelease.value}as-passive`; // the @keyframes name should contain 'passive' in order to be recognized by `useActivatable`
    //#endregion keyframes
    
    
    
    return {
        // accessibilities:
        cursor      : 'pointer' as CssKnownProps['cursor'],
        
        
        
        // animations:
        filterPress : [[
            'brightness(65%)',
            'contrast(150%)',
        ]]                      as CssKnownProps['filter'],
        
        ...keyframesPressRule,
        ...keyframesReleaseRule,
        animPress   : [
            ['150ms', 'ease-out', 'both', keyframesPress ],
        ]                       as CssKnownProps['animation'],
        animRelease : [
            ['300ms', 'ease-out', 'both', keyframesRelease],
        ]                       as CssKnownProps['animation'],
        
        // supports for `usesActiveAsClick()`:
        ...keyframesPressAsActiveRule,
        ...keyframesReleaseAsPassiveRule,
        animPressAsActive   : [
            ['150ms', 'ease-out', 'both', keyframesPressAsActive   ],
        ]                       as CssKnownProps['animation'],
        animReleaseAsPassive : [
            ['300ms', 'ease-out', 'both', keyframesReleaseAsPassive],
        ]                       as CssKnownProps['animation'],
    };
}, { prefix: 'act' });
