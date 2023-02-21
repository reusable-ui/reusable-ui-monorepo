// cssfn:
import {
    // writes css in javascript:
    children,
    style,
    vars,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
    memoizeStyle,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a border (stroke) management system:
    borderRadiuses,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    checks,
    
    
    
    // styles:
    inputElm,
    
    onCheckStylesChange,
    
    usesCheckLayout,
    usesCheckVariants,
    usesCheckStates,
}                           from '@reusable-ui/check'           // a base component

// internals:
import {
    // configs:
    radios,
    cssRadioConfig,
}                           from './config.js'



// styles:
export const onRadioStylesChange = watchChanges(onCheckStylesChange, cssRadioConfig.onChange);

export const usesRadioLayout = memoizeStyle(() => {
    // dependencies:
    
    // features:
    const {borderVars} = usesBorder();
    
    
    
    return style({
        // layouts:
        ...usesCheckLayout(),
        ...style({
            // children:
            ...children(inputElm, {
                // borders:
                // circle corners on top:
                [borderVars.borderStartStartRadius] : borderRadiuses.pill,
                [borderVars.borderStartEndRadius  ] : borderRadiuses.pill,
                // circle corners on bottom:
                [borderVars.borderEndStartRadius  ] : borderRadiuses.pill,
                [borderVars.borderEndEndRadius    ] : borderRadiuses.pill,
                
                
                
                // customize:
                ...usesCssProps(radios), // apply config's cssProps
            }),
        }),
        
        
        
        // configs:
        ...vars({
            // overwrite <Check>'s selected indicator:
            [checks.indicator] : radios.indicator,
        }),
    });
}, onRadioStylesChange);

export const usesRadioVariants = memoizeStyle(() => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(radios);
    
    
    
    return style({
        // variants:
        ...usesCheckVariants(),
        ...resizableRule(),
    });
}, onRadioStylesChange);

export const usesRadioStates = usesCheckStates;

export default memoizeStyle(() => style({
    // layouts:
    ...usesRadioLayout(),
    
    // variants:
    ...usesRadioVariants(),
    
    // states:
    ...usesRadioStates(),
}), onRadioStylesChange);
