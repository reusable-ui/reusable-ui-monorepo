// cssfn:
import {
    // writes css in javascript:
    states,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // removes browser's default stylesheet:
    stripoutControl,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to be disabled:
    ifDisable,
    
    
    
    // a capability of UI to be focused:
    ifBlurring,
    ifFocus,
    usesFocusable,
    
    
    
    // adds an interactive feel to a UI:
    usesInteractable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onIndicatorStylesChange,
    usesIndicatorLayout,
    usesIndicatorVariants,
    usesIndicatorStates,
}                           from '@reusable-ui/indicator'       // a base component

// internals:
import {
    // configs:
    controls,
    cssControlConfig,
}                           from './config.js'



// styles:
export const onControlStylesChange = watchChanges(onIndicatorStylesChange, cssControlConfig.onChange);

export const usesControlLayout = memoizeStyle(() => {
    return style({
        // resets:
        ...stripoutControl(), // clear browser's default styles
        
        
        
        // layouts:
        ...usesIndicatorLayout(),
        ...style({
            // positions:
            position: 'relative', // supports for boxShadowFocus, prevents boxShadowFocus from clipping
            
            
            
            // customize:
            ...usesCssProps(controls), // apply config's cssProps
        }),
    });
}, onControlStylesChange);

export const usesControlVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(controls);
    
    
    
    return style({
        // variants:
        ...usesIndicatorVariants(),
        ...resizableRule(),
    });
}, onControlStylesChange);

export const usesControlStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {focusableRule   } = usesFocusable(controls);
    const {interactableRule} = usesInteractable(controls);
    
    
    
    return style({
        // states:
        ...usesIndicatorStates(),
        ...focusableRule(),
        ...interactableRule(),
        ...states([
            ifDisable({
                // accessibilities:
                cursor : controls.cursorDisable,
            }),
            
            ifFocus({
                // positions:
                zIndex: 2, // prevents boxShadowFocus from clipping
            }),
            ifBlurring({
                // positions:
                zIndex: 1, // prevents boxShadowFocus from clipping but below the active one
            }),
        ]),
    });
}, onControlStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesControlLayout(),
    
    // variants:
    ...usesControlVariants(),
    
    // states:
    ...usesControlStates(),
}), onControlStylesChange);
