// cssfn:
import {
    // writes css in javascript:
    rule,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a capability of UI to stack on top-most of another UI(s) regardless of DOM's stacking context:
    globalStacks,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onCollapseStylesChange,
    usesCollapseLayout,
    usesCollapseStates,
}                           from '@reusable-ui/collapse'        // a base component

// internals:
import {
    // configs:
    dropdowns,
    cssDropdownConfig,
}                           from './config.js'



// styles:
export const onDropdownStylesChange = watchChanges(onCollapseStylesChange, cssDropdownConfig.onChange);

export const usesDropdownLayout = (options?: OrientationableOptions) => {
    return style({
        // layouts:
        ...usesCollapseLayout(options),
        ...style({
            // layouts:
            display        : 'flex',   // use block flexbox, so it takes the entire parent's width
            flexDirection  : 'column', // items are stacked vertically
            justifyContent : 'center', // center items (text, icon, etc) horizontally
            alignItems     : 'center', // center items (text, icon, etc) vertically
            flexWrap       : 'wrap',   // allows the items (text, icon, etc) to wrap to the next row if no sufficient width available
            
            
            
            // positions:
            ...rule('.overlay', {
                zIndex: globalStacks.dropdown,
            }),
            
            
            
            // sizes:
            inlineSize     : 'fit-content',
            
            
            
            // customize:
            ...usesCssProps(dropdowns), // apply config's cssProps
        }),
    });
};

export const usesDropdownStates = usesCollapseStates;

export default () => style({
    // layouts:
    ...usesDropdownLayout(),
    
    // states:
    ...usesDropdownStates(),
});
