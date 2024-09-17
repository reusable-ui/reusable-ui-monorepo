// cssfn:
import {
    // writes css in javascript:
    rule,
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
    // hacks:
    const positiveMarginTop   = `calc(min(${alerts.iconMargin}, ${alerts.controlMargin}))`;
    const positiveMarginLeft  = alerts.iconMargin;
    const positiveMarginRight = alerts.controlMargin;
    
    const negativeMarginTop   = `calc(0px - ${positiveMarginTop})`;
    const negativeMarginLeft  = `calc(0px - ${positiveMarginLeft})`;
    const negativeMarginRight = `calc(0px - ${positiveMarginRight})`;
    
    return style({
        // layouts:
        ...usesPopupLayout(),
        ...usesContentLayout(),
        ...style({
            // layouts:
            display      : 'block',
            
            
            
            // typos:
            overflow     : 'hidden',     // force to overflowWrap
            overflowWrap : 'break-word', // break long word to the next line
            
            
            
            // children:
            ...children('.wrapper', {
                // hacks:
                marginBlockStart  : negativeMarginTop,
                marginInlineStart : negativeMarginLeft,
                marginInlineEnd   : negativeMarginRight,
                
                
                
                ...children(iconElm, {
                    // positions:
                    float            : 'inline-start',
                    position         : 'relative',
                    // insetBlockStart  : `calc(0px - ${alerts.iconMargin})`, // kill top margin  // DOESN'T WORK for the shape of surrounding text
                    // insetInlineStart : `calc(0px - ${alerts.iconMargin})`, // kill left margin // DOESN'T WORK for the shape of surrounding text
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(alerts, 'icon')), // apply config's cssProps starting with icon***
                }),
                ...children(controlElm, {
                    // positions:
                    float            : 'inline-end',
                    position         : 'relative',
                    // insetBlockStart  : `calc(0px - ${alerts.controlMargin})`, // kill top margin   // DOESN'T WORK for the shape of surrounding text
                    // insetInlineEnd   : `calc(0px - ${alerts.controlMargin})`, // kill right margin // DOESN'T WORK for the shape of surrounding text
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(alerts, 'control')), // apply config's cssProps starting with control***
                }),
                ...children('.content', {
                    // hacks:
                    paddingBlockStart  : positiveMarginTop,
                    paddingInlineStart : positiveMarginLeft,
                    paddingInlineEnd   : positiveMarginRight,
                    
                    
                    
                    // children:
                    // kill top margin for the first paragraph/heading:
                    ...children(['p', '.p', 'h1', '.h1', 'h2', '.h2', 'h3', '.h3', 'h4', '.h4', 'h5', '.h5', 'h6', '.h6'], {
                        ...rule(':first-child', {
                            marginBlockStart : '0px',
                        }),
                    }),
                }),
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
