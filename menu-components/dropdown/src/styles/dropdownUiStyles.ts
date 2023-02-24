// cssfn:
import {
    // writes css in javascript:
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // removes browser's default stylesheet:
    stripoutFocusableElement,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// internals:
import {
    // configs:
    dropdowns,
    cssDropdownConfig,
}                           from './config.js'



// styles:
export const onDropdownUiStylesChange = watchChanges(cssDropdownConfig.onChange);

export const usesDropdownUiLayout = () => {
    return style({
        // resets:
        ...stripoutFocusableElement(), // clear browser's default styles
        
        
        
        // layouts:
        ...style({
            // customize:
            ...usesCssProps(usesPrefixedProps(dropdowns, 'dropdownUi')), // apply config's cssProps starting with dropdownUi***
        }),
    });
};

export default () => style({
    // layouts:
    ...usesDropdownUiLayout(),
});
