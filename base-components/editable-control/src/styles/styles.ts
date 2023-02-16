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
    // size options of UI:
    usesResizable,
    
    
    
    // a possibility of UI having an invalid state:
    ifValid,
    ifInvalid,
    usesInvalidable,
    markValid,
    markInvalid,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onControlStylesChange,
    usesControlLayout,
    usesControlVariants,
    usesControlStates,
}                           from '@reusable-ui/control'         // a base component

// internals:
import {
    // configs:
    editableControls,
    cssEditableControlConfig,
}                           from './config.js'



// styles:
export const onEditableControlStylesChange = watchChanges(onControlStylesChange, cssEditableControlConfig.onChange);

export const usesEditableControlLayout = memoizeStyle(() => {
    return style({
        // layouts:
        ...usesControlLayout(),
        ...style({
            // customize:
            ...usesCssProps(editableControls), // apply config's cssProps
        }),
    });
}, onEditableControlStylesChange);

export const usesEditableControlVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(editableControls);
    
    
    
    return style({
        // variants:
        ...usesControlVariants(),
        ...resizableRule(),
    });
}, onEditableControlStylesChange);

export const usesEditableControlStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {invalidableRule} = usesInvalidable(editableControls);
    
    
    
    return style({
        // states:
        ...usesControlStates(),
        ...invalidableRule(),
        ...states([
            ifValid(markValid),
            ifInvalid(markInvalid),
        ]),
    });
}, onEditableControlStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesEditableControlLayout(),
    
    // variants:
    ...usesEditableControlVariants(),
    
    // states:
    ...usesEditableControlStates(),
}), onEditableControlStylesChange);
