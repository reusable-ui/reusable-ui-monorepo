// cssfn:
import {
    // writes css in javascript:
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesSuffixedProps,
    overwriteProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // defaults:
    listDefaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // configs:
    dropdownLists,
    cssDropdownListConfig,
}                           from './config.js'



// styles:
export const onDropdownListStylesChange = watchChanges(cssDropdownListConfig.onChange);

export const usesDropdownListLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, listDefaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    
    
    
    return style({
        // scrolls:
        overflow : 'auto',
        
        
        
        // customize:
        ...usesCssProps(dropdownLists), // apply config's cssProps
        ...ifOrientationInline({ // inline
            // overwrites propName = propName{Inline}:
            ...overwriteProps(dropdownLists, usesSuffixedProps(dropdownLists, 'inline')),
        }),
        ...ifOrientationBlock({  // block
            // overwrites propName = propName{Block}:
            ...overwriteProps(dropdownLists, usesSuffixedProps(dropdownLists, 'block')),
        }),
    });
};

export default style({
    // layouts:
    ...usesDropdownListLayout(),
});
