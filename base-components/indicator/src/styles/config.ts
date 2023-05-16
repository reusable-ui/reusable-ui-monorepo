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
    
    
    
    // a capability of UI to be disabled:
    usesDisableable,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    usesActivatable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [indicators, indicatorValues, cssIndicatorConfig] = cssConfig(() => {
    // dependencies:
    
    const {animationRegistry : {filters}              } = usesAnimation();
    const {disableableVars   : {filter: filterDisable}} = usesDisableable();
    const {activatableVars   : {filter: filterActive }} = usesActivatable();
    
    
    
    //#region keyframes
    const frameEnabled  = style({
        filter : [[
            ...filters.filter((f) => (f !== filterDisable)), // the rest filter(s)
        ]],
    });
    const frameDisabled = style({
        filter : [[
            ...filters.filter((f) => (f !== filterDisable)), // the rest filter(s)
            filterDisable, // the interpolating filter
        ]],
    });
    const [keyframesDisableRule, keyframesDisable] = keyframes({
        from : frameEnabled,
        to   : frameDisabled,
    });
    keyframesDisable.value = 'disable'; // the @keyframes name should contain 'disable' in order to be recognized by `useDisableable`
    const [keyframesEnableRule , keyframesEnable ] = keyframes({
        from : frameDisabled,
        to   : frameEnabled,
    });
    keyframesEnable.value  = 'enable';  // the @keyframes name should contain 'enable'  in order to be recognized by `useDisableable`
    
    
    
    const framePassivated = style({
        filter : [[
            ...filters.filter((f) => (f !== filterActive)), // the rest filter(s)
        ]],
    });
    const frameActivated  = style({
        filter : [[
            ...filters.filter((f) => (f !== filterActive)), // the rest filter(s)
            filterActive, // the interpolating filter
        ]],
    });
    const [keyframesActiveRule , keyframesActive ] = keyframes({
        from : framePassivated,
        to   : frameActivated,
    });
    keyframesActive.value  = 'active';  // the @keyframes name should contain 'active'  in order to be recognized by `useActivatable`
    const [keyframesPassiveRule, keyframesPassive] = keyframes({
        from : frameActivated,
        to   : framePassivated,
    });
    keyframesPassive.value = 'passive'; // the @keyframes name should contain 'passive' in order to be recognized by `useActivatable`
    //#endregion keyframes
    
    
    
    return {
        // animations:
        filterDisable : [[
            'grayscale(50%)',
            'contrast(50%)',
        ]]                          as CssKnownProps['filter'   ],
        filterActive  : [[
            'brightness(100%)',
        ]]                          as CssKnownProps['filter'   ],
        
        ...keyframesDisableRule,
        ...keyframesEnableRule,
        ...keyframesActiveRule,
        ...keyframesPassiveRule,
        animEnable    : [
            ['300ms', 'ease-out', 'both', keyframesEnable ],
        ]                           as CssKnownProps['animation'],
        animDisable   : [
            ['300ms', 'ease-out', 'both', keyframesDisable],
        ]                           as CssKnownProps['animation'],
        animActive    : [
            ['150ms', 'ease-out', 'both', keyframesActive ],
        ]                           as CssKnownProps['animation'],
        animPassive   : [
            ['300ms', 'ease-out', 'both', keyframesPassive],
        ]                           as CssKnownProps['animation'],
    };
}, { prefix: 'indi' });
