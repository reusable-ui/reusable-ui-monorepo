// cssfn:
import {
    // writes css in javascript:
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to be clicked:
    usesClickable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    cssBasicConfig,
}                           from '@reusable-ui/basic'           // a base component
import {
    // configs:
    cssIndicatorConfig,
}                           from '@reusable-ui/indicator'       // a base component
import {
    // configs:
    cssControlConfig,
    
    
    
    // styles:
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
}                           from '@reusable-ui/control'         // a base component

// internals:
import {
    // configs:
    actionControls,
    cssActionControlConfig,
}                           from './config.js'



// styles:
export const usesActionControlLayout = memoizeStyle(() => {
    return style({
        // layouts:
        ...usesControlLayout(),
        ...style({
            // accessibilities:
            userSelect              : 'none',         // disable selecting text (double clicking not causing selecting text)
            touchAction             : 'manipulation', // all gestures are preserved except a double click, to make clicking faster
            WebkitTapHighlightColor : 'transparent',  // no tap_&_hold highlight
            
            
            
            // customize:
            ...usesCssProps(actionControls), // apply config's cssProps
        }),
    });
}, [cssBasicConfig.onChange, cssIndicatorConfig.onChange, cssControlConfig.onChange, cssActionControlConfig.onChange]);

export const usesActionControlVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(actionControls);
    
    
    
    return style({
        // variants:
        ...usesControlVariants(),
        ...resizableRule(),
    });
}, [cssBasicConfig.onChange, cssIndicatorConfig.onChange, cssControlConfig.onChange, cssActionControlConfig.onChange]);

export const usesActionControlStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {clickableRule} = usesClickable(actionControls);
    
    
    
    return style({
        // states:
        ...usesControlStates(),
        ...clickableRule(),
    });
}, [cssBasicConfig.onChange, cssIndicatorConfig.onChange, cssControlConfig.onChange, cssActionControlConfig.onChange]);

export default memoizeStyle(() => style({
    // layouts:
    ...usesActionControlLayout(),
    
    // variants:
    ...usesActionControlVariants(),
    
    // states:
    ...usesActionControlStates(),
}), [cssBasicConfig.onChange, cssIndicatorConfig.onChange, cssControlConfig.onChange, cssActionControlConfig.onChange]);
