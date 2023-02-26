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
    // foreground (text color) stuff of UI:
    usesForeground,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // gradient variant of UI:
    usesGradientable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onBasicStylesChange,
    usesBasicVariants,
}                           from '@reusable-ui/basic'           // a base component
import {
    // styles:
    onListStylesChange,
    usesListLayout,
    usesListBasicVariants,
}                           from '@reusable-ui/list'            // represents a series of content

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // features:
    usesProgressBackground,
}                           from '../features/progressBackground.js'
import {
    // configs:
    progresses,
    cssProgressConfig,
}                           from './config.js'



// styles:
export const onProgressStylesChange = watchChanges(onBasicStylesChange, onListStylesChange, cssProgressConfig.onChange);

export const usesProgressLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    options = orientationableStuff;
    
    
    
    // dependencies:
    
    // features:
    const {backgroundRule, backgroundVars} = usesProgressBackground();
    const {foregroundRule, foregroundVars} = usesForeground();
    
    
    
    return style({
        // features:
        ...backgroundRule(),
        ...foregroundRule(),
        
        
        
        // layouts:
        ...usesListLayout(options),
        ...style({
            // layouts:
            ...ifOrientationInline({ // inline
                display    : 'flex',        // use block flexbox, so it takes the entire parent's width
            }),
            ...ifOrientationBlock({  // block
                display    : 'inline-flex', // use inline flexbox, so it takes the width & height as needed
            }),
            justifyContent : 'start',       // if wrappers are not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first wrapper should be visible first
            
            
            
            // backgrounds:
            backg          : backgroundVars.altBackg, // the remaining area should lighter than the <ProgressBar>
            
            
            
            // foregrounds:
            foreg          : foregroundVars.foreg,
            
            
            
            // customize:
            ...usesCssProps(progresses), // apply config's cssProps
            ...ifOrientationInline({ // inline
                // overwrites propName = propName{Inline}:
                ...overwriteProps(progresses, usesSuffixedProps(progresses, 'inline')),
            }),
            ...ifOrientationBlock({  // block
                // overwrites propName = propName{Block}:
                ...overwriteProps(progresses, usesSuffixedProps(progresses, 'block')),
            }),
        }),
    });
};

export const usesProgressVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule   } = usesResizable(progresses);
    const {gradientableRule} = usesGradientable(progresses);
    
    
    
    return style({
        // variants:
        
        /* the most general variants: */
        ...usesListBasicVariants(),
        
        /* the king variants: */
        ...usesBasicVariants(),
        ...resizableRule(),
        ...gradientableRule(),
    });
};

export default () => style({
    // layouts:
    ...usesProgressLayout(),
    
    // variants:
    ...usesProgressVariants(),
});
