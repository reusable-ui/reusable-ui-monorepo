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
    
    
    
    // a capability of UI to be focused:
    usesFocusable,
    
    
    
    // adds an interactive feel to a UI:
    usesInteractable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// configs:
export const [controls, controlValues, cssControlConfig] = cssConfig(() => {
    // dependencies:
    
    const {animationRegistry : {boxShadows, filters       }} = usesAnimation();
    const {focusableVars     : {boxShadow : boxShadowFocus}} = usesFocusable();
    const {interactableVars  : {filter    : filterArrive  }} = usesInteractable();
    
    
    
    //#region keyframes
    const frameBlurred  = style({
        boxShadow : [
            ...boxShadows.filter((b) => (b !== boxShadowFocus)), // the rest boxShadow(s)
        ],
    });
    const frameFocused = style({
        boxShadow : [
            ...boxShadows.filter((b) => (b !== boxShadowFocus)), // the rest boxShadow(s)
            boxShadowFocus, // the interpolating boxShadow
        ],
    });
    const [keyframesFocusRule, keyframesFocus] = keyframes({
        from : frameBlurred,
        to   : frameFocused,
    });
    keyframesFocus.value = 'focus'; // the @keyframes name should contain 'focus' in order to be recognized by `useFocusable`
    const [keyframesBlurRule , keyframesBlur ] = keyframes({
        from : frameFocused,
        to   : frameBlurred,
    });
    keyframesBlur.value  = 'blur';  // the @keyframes name should contain 'blur'  in order to be recognized by `useFocusable`
    
    
    
    const frameLeft = style({
        filter : [[
            ...filters.filter((f) => (f !== filterArrive)), // the rest filter(s)
        ]],
    });
    const frameArrived  = style({
        filter : [[
            ...filters.filter((f) => (f !== filterArrive)), // the rest filter(s)
            filterArrive, // the interpolating filter
        ]],
    });
    const [keyframesArriveRule, keyframesArrive] = keyframes({
        from : frameLeft,
        to   : frameArrived,
    });
    keyframesArrive.value = 'arrive'; // the @keyframes name should contain 'arrive' in order to be recognized by `useInteractable`
    const [keyframesLeaveRule , keyframesLeave ] = keyframes({
        from : frameArrived,
        to   : frameLeft,
    });
    keyframesLeave.value  = 'leave';  // the @keyframes name should contain 'leave'  in order to be recognized by `useInteractable`
    //#endregion keyframes
    
    
    
    return {
        // accessibilities:
        cursorDisable  : 'not-allowed'  as CssKnownProps['cursor'],
        
        
        
        // animations:
        boxShadowFocus : [
            [0, 0, 0, '0.25rem'],
        ]                               as CssKnownProps['boxShadow'],
        filterArrive   : [[
            'brightness(85%)',
            'drop-shadow(0 0 0.01px rgba(0,0,0,0.4))',
        ]]                              as CssKnownProps['filter'],
        
        ...keyframesFocusRule,
        ...keyframesBlurRule,
        ...keyframesArriveRule,
        ...keyframesLeaveRule,
        animFocus      : [
            ['150ms', 'ease-out', 'both', keyframesFocus ],
        ]                               as CssKnownProps['animation'],
        animBlur       : [
            ['300ms', 'ease-out', 'both', keyframesBlur  ],
        ]                               as CssKnownProps['animation'],
        animArrive     : [
            ['150ms', 'ease-out', 'both', keyframesArrive],
        ]                               as CssKnownProps['animation'],
        animLeave      : [
            ['300ms', 'ease-out', 'both', keyframesLeave ],
        ]                               as CssKnownProps['animation'],
    };
}, { prefix: 'ctrl' });
