// cssfn:
import {
    // writes css in javascript:
    states,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
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
    cssFormConfig,
}                           from './config.js'



// styles:
export const onFormStylesChange = watchChanges(onContentStylesChange, cssFormConfig.onChange);

export const usesFormLayout = () => {
    return style({
        // layouts:
        ...usesContentLayout(),
        ...style({
            // customize:
            ...usesCssProps(forms), // apply config's cssProps
        }),
    });
};

export const usesFormVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(forms);
    
    
    
    return style({
        // variants:
        ...usesContentVariants(),
        ...resizableRule(),
    });
};

export const usesFormStates = () => {
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
};

export default () => style({
    // layouts:
    ...usesFormLayout(),
    
    // variants:
    ...usesFormVariants(),
    
    // states:
    ...usesFormStates(),
});
