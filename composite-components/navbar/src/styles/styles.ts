// cssfn:
import {
    // writes css in javascript:
    descendants,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // padding (inner spacing) stuff of UI:
    usesPadding,
    
    
    
    // size options of UI:
    usesResizable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    usesCollapsible,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onContainerStylesChange,
    usesContainerLayout,
    usesContainerVariants,
}                           from '@reusable-ui/container'       // a base container UI of Reusable-UI components

// internals:
import {
    // elements:
    logoElm,
    togglerElm,
    listElm,
    menuElm,
}                           from './elements.js'
import {
    // configs:
    navbars,
    cssNavbarConfig,
}                           from './config.js'



// styles:
export const onNavbarStylesChange = watchChanges(onContainerStylesChange, cssNavbarConfig.onChange);

export const usesNavbarLayout = () => {
    // dependencies:
    
    // features:
    const {borderRule , borderVars } = usesBorder(navbars);
    const {paddingRule, paddingVars} = usesPadding(navbars);
    
    
    
    return style({
        // layouts:
        ...usesContainerLayout(),
        ...style({
            // children:
            ...descendants(logoElm, {
                // customize:
                ...usesCssProps(usesPrefixedProps(navbars, 'logo')), // apply config's cssProps starting with logo***
            }),
            ...descendants(togglerElm, {
                // customize:
                ...usesCssProps(usesPrefixedProps(navbars, 'toggler')), // apply config's cssProps starting with toggler***
            }),
            ...descendants(listElm, {
                // customize:
                ...usesCssProps(usesPrefixedProps(navbars, 'list')), // apply config's cssProps starting with list***
            }),
            ...descendants(menuElm, {
                // customize:
                ...usesCssProps(usesPrefixedProps(navbars, 'menu')), // apply config's cssProps starting with menu***
            }),
            
            
            
            // customize:
            ...usesCssProps(navbars), // apply config's cssProps
            
            
            
            // borders:
            border        : borderVars.border,
         // borderRadius           : borderVars.borderRadius,
            borderStartStartRadius : borderVars.borderStartStartRadius,
            borderStartEndRadius   : borderVars.borderStartEndRadius,
            borderEndStartRadius   : borderVars.borderEndStartRadius,
            borderEndEndRadius     : borderVars.borderEndEndRadius,
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
        
        
        
        // features:
        ...borderRule(),  // must be placed at the last
        ...paddingRule(), // must be placed at the last
    });
};

export const usesNavbarVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(navbars);
    
    
    
    return style({
        // variants:
        ...usesContainerVariants(),
        ...resizableRule(),
    });
};

export const usesNavbarStates = () => {
    // dependencies:
    
    // states:
    const {collapsibleRule} = usesCollapsible(navbars);
    
    
    
    return style({
        // states:
        ...collapsibleRule(),
    });
};

export default () => style({
    // layouts:
    ...usesNavbarLayout(),
    
    // variants:
    ...usesNavbarVariants(),
    
    // states:
    ...usesNavbarStates(),
});
