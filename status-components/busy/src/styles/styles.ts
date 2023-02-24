// cssfn:
import {
    // writes css in javascript:
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onBadgeStylesChange,
    usesBadgeLayout,
    usesBadgeVariants,
    usesBadgeStates,
}                           from '@reusable-ui/badge'           // a base component

// internals:
import {
    // configs:
    busies,
    cssBusyConfig,
}                           from './config.js'



// styles:
export const onBusyStylesChange = watchChanges(onBadgeStylesChange, cssBusyConfig.onChange);

export const usesBusyLayout = () => {
    return style({
        // layouts:
        ...usesBadgeLayout(),
        ...style({
            // customize:
            ...usesCssProps(busies), // apply config's cssProps
        }),
    });
};

export const usesBusyVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(busies);
    
    
    
    return style({
        // variants:
        ...usesBadgeVariants(),
        ...resizableRule(),
    });
};

export const usesBusyStates = usesBadgeStates;

export default () => style({
    // layouts:
    ...usesBusyLayout(),
    
    // variants:
    ...usesBusyVariants(),
    
    // states:
    ...usesBusyStates(),
});
