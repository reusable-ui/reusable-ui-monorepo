// cssfn:
import {
    // writes css in javascript:
    states,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // animation stuff of UI:
    usesAnimation,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ifCollapsed,
    usesCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // configs:
    collapses,
    cssCollapseConfig,
}                           from './config.js'



// styles:
export const onCollapseStylesChange = watchChanges(cssCollapseConfig.onChange);

export const usesCollapseLayout = memoizeStyle((options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    
    
    
    // dependencies:
    
    // features:
    const {animationRule, animationVars} = usesAnimation();
    
    
    
    return style({
        // layouts:
        ...style({
            // customize:
            ...usesCssProps(collapses), // apply config's cssProps
            ...ifOrientationInline({ // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(collapses, usesSuffixedProps(collapses, 'inline')),
            }),
            ...ifOrientationBlock({  // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(collapses, usesSuffixedProps(collapses, 'block')),
            }),
            
            
            
            // animations:
            anim : animationVars.anim,
        }),
        
        
        
        // features:
        ...animationRule(), // must be placed at the last
    });
}, onCollapseStylesChange);

export const usesCollapseStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {collapsibleRule} = usesCollapsible(collapses);
    
    
    
    return style({
        // states:
        ...collapsibleRule(),
        ...states([
            ifCollapsed({
                // appearances:
                display: 'none', // hide the <Collapse>
            }),
        ]),
    });
}, onCollapseStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesCollapseLayout(),
    
    // states:
    ...usesCollapseStates(),
}), onCollapseStylesChange);
