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
}                           from '@cssfn/core'                      // writes css in javascript

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
}                           from '@reusable-ui/core'                // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onContentStylesChange,
    usesContentLayout,
    usesContentVariants,
}                           from '@reusable-ui/content'             // a base component

// internals:
import {
    // configs:
    forms,
    cssFormConfig
}                           from './config.js'



// styles:
export const onFormStylesChange  = watchChanges(onContentStylesChange, cssFormConfig.onChange);

export const usesFormLayout = memoizeStyle(() => {
    return style({
        // layouts:
        ...usesContentLayout(),
        ...style({
            // customize:
            ...usesCssProps(forms), // apply config's cssProps
        }),
    });
}, onFormStylesChange);

export const usesFormVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(forms);
    
    
    
    return style({
        // variants:
        ...usesContentVariants(),
        ...resizableRule(),
    });
}, onFormStylesChange);

export const usesFormStates = memoizeStyle(() => {
    // dependencies:
    
    // states:
    const {invalidableRule} = usesInvalidable(forms);
    
    
    
    return style({
        // states:
        ...invalidableRule(),
        ...states([
            ifValid(markValid()),
            ifInvalid(markInvalid()),
        ]),
    });
}, onFormStylesChange);

export default memoizeStyle(() => style({
    // layouts:
    ...usesFormLayout(),
    
    // variants:
    ...usesFormVariants(),
    
    // states:
    ...usesFormStates(),
}), onFormStylesChange);
