// cssfn:
import {
    // writes css in javascript:
    states,
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
    
    
    
    // a capability of UI to be disabled:
    usesDisableable,
    
    
    
    // a capability of UI to be highlighted/selected/activated:
    ifActive,
    usesActivatable,
    markActive,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    cssBasicConfig,
    
    
    
    // styles:
    usesBasicLayout,
    usesBasicVariants,
}                           from '@reusable-ui/basic'           // a base component

// internals:
import {
    // configs:
    indicators,
    cssIndicatorConfig,
}                           from './config.js'



// styles:
export const usesIndicatorLayout = memoizeStyle(() => {
    return style({
        // layouts:
        ...usesBasicLayout(),
        ...style({
            // customize:
            ...usesCssProps(indicators), // apply config's cssProps
        }),
    });
}, [cssBasicConfig.onChange, cssIndicatorConfig.onChange]);

export const usesIndicatorVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(indicators);
    
    
    
    return style({
        // variants:
        ...usesBasicVariants(),
        ...resizableRule(),
    });
}, [cssBasicConfig.onChange, cssIndicatorConfig.onChange]);

export const usesIndicatorStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {disableableRule} = usesDisableable(indicators);
    const {activatableRule} = usesActivatable(indicators);
    
    
    
    return style({
        // states:
        ...disableableRule(),
        ...activatableRule(),
        ...states([
            ifActive(markActive()),
        ]),
    });
}, [cssBasicConfig.onChange, cssIndicatorConfig.onChange]);

export default memoizeStyle(() => style({
    // layouts:
    ...usesIndicatorLayout(),
    
    // variants:
    ...usesIndicatorVariants(),
    
    // states:
    ...usesIndicatorStates(),
}), [cssBasicConfig.onChange, cssIndicatorConfig.onChange]);
