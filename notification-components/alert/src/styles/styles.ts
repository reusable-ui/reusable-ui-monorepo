// cssfn:
import {
    // writes css in javascript:
    children,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
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
    onPopupStylesChange,
    usesPopupLayout,
    usesPopupVariants,
    usesPopupStates,
}                           from '@reusable-ui/popup'           // a base component
import {
    // styles:
    onContentStylesChange,
    usesContentLayout,
    usesContentVariants,
}                           from '@reusable-ui/content'         // a base component

// internals:
import {
    // elements:
    iconElm,
    bodyElm,
    controlElm,
}                           from './elements.js'
import {
    // configs:
    alerts,
    cssAlertConfig,
}                           from './config.js'



// styles:
export const onAlertStylesChange = watchChanges(onContentStylesChange, onPopupStylesChange, cssAlertConfig.onChange);

export const usesAlertLayout = () => {
    return style({
        // layouts:
        ...usesPopupLayout(),
        ...usesContentLayout(),
        ...style({
            // layouts:
            display          : 'grid',        // use css grid for layouting, so we can customize the desired area later.
            
            // explicit areas:
            /*
                just one explicit area: `body`
                `icon` & `control` rely on implicit area
            */
            gridTemplate     : [[
                '"body" auto', // fluid height
                '/',
                ' auto'        // fluid width
            ]],
            
            // implicit areas:
            gridAutoFlow     : 'column',      // if child's gridArea was not specified => place it automatically at horz direction
            gridAutoRows     : 'min-content', // other areas than `body` should take the minimum required height
            gridAutoColumns  : 'min-content', // other areas than `body` should take the minimum required width
            // the gridArea's size configured as *minimum* content's size required => no free space left to distribute => so (justify|algin)Content is *not required*
            
            // child default sizes:
            justifyItems     : 'stretch',     // each section fills the entire area's width
            alignItems       : 'stretch',     // each section fills the entire area's height
            
            
            
            // children:
            ...children(iconElm, {
                // layouts:
                gridArea     : '1 / -3', // the first row / the third column starting from the last
                
                
                
                // sizes:
                justifySelf  : 'center', // align horizontally to center
                alignSelf    : 'start',  // align vertically   to top
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(alerts, 'icon')), // apply config's cssProps starting with icon***
            }),
            ...children(bodyElm, {
                // layouts:
                gridArea     : 'body',
                
                
                
                // scrolls:
                overflow     : 'hidden',     // force to overflowWrap
                overflowWrap : 'break-word', // break long word to the next line
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(alerts, 'body')), // apply config's cssProps starting with body***
            }),
            ...children(controlElm, {
                // layouts:
                gridArea     : '1 / 2',  // the first row / the second column
                
                
                
                // sizes:
                justifySelf  : 'center', // align horizontally to center
                alignSelf    : 'start',  // align vertically   to top
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(alerts, 'control')), // apply config's cssProps starting with control***
            }),
            
            
            
            // customize:
            ...usesCssProps(alerts), // apply config's cssProps
        }),
    });
};

export const usesAlertVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(alerts);
    
    
    
    return style({
        // variants:
        ...usesPopupVariants(),
        ...usesContentVariants(),
        ...resizableRule(),
    });
};

export const usesAlertStates = usesPopupStates;

export default () => style({
    // layouts:
    ...usesAlertLayout(),
    
    // variants:
    ...usesAlertVariants(),
    
    // states:
    ...usesAlertStates(),
});
