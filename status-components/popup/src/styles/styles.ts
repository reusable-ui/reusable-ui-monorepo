// cssfn:
import {
    // writes css in javascript:
    rule,
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
    // a capability of UI to stack on top-most of another UI(s) regardless of DOM's stacking context:
    globalStacks,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ifCollapsed,
    usesCollapsible,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onBasicStylesChange,
    usesBasicLayout,
    usesBasicVariants,
}                           from '@reusable-ui/basic'           // a base component

// internals:
import {
    // configs:
    popups,
    cssPopupConfig,
}                           from './config.js'



// styles:
export const onPopupStylesChange = watchChanges(onBasicStylesChange, cssPopupConfig.onChange);

export const usesPopupLayout = memoizeStyle(() => {
    return style({
        // layouts:
        ...usesBasicLayout(),
        ...style({
            // positions:
            ...rule('.overlay', {
                zIndex: globalStacks.tooltip,
            }),
            
            
            
            // customize:
            ...usesCssProps(popups), // apply config's cssProps
        }),
    });
}, onPopupStylesChange);

export const usesPopupVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(popups);
    
    
    
    return style({
        // variants:
        ...usesBasicVariants(),
        ...resizableRule(),
    });
}, onPopupStylesChange);

export const usesPopupStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {collapsibleRule} = usesCollapsible(popups);
    
    
    
    return style({
        // states:
        ...collapsibleRule(),
        ...states([
            ifCollapsed({
                // appearances:
                display: 'none', // hide the <Popup>
            }),
        ]),
    });
}, onPopupStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesPopupLayout(),
    
    // variants:
    ...usesPopupVariants(),
    
    // states:
    ...usesPopupStates(),
}), onPopupStylesChange);
