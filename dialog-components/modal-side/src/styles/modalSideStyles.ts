// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
    children,
    style,
    vars,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    usesPrefixedProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a responsive management system:
    ifScreenWidthAtLeast,
    
    
    
    // a typography management system:
    headings,
    usesHeadingRule,
    
    
    
    // removes browser's default stylesheet:
    stripoutFocusableElement,
    
    
    
    // border (stroke) stuff of UI:
    usesBorder,
    
    
    
    // groups a list of UIs into a single UI:
    usesGroupable,
    
    
    
    // // a capability of UI to rotate its layout:
    // usesOrientationable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // // defaults:
    // defaultOrientationableOptions as cardDefaultOrientationableOptions,
    
    
    
    // styles:
    headerElm,
    footerElm,
    bodyElm,
}                           from '@reusable-ui/card'            // a flexible and extensible content container, with optional header and footer

// internals:
import {
    // configs:
    modalSides,
    cssModalSideConfig,
}                           from './config.js'



// styles:
export const onModalSideStylesChange = watchChanges(cssModalSideConfig.onChange);

export const usesModalSideLayout = () => {
    // // const orientationableStuff = usesOrientationable(cardDefaultOrientationableOptions);
    // // const {ifOrientationInline, ifOrientationBlock} = orientationableStuff;
    
    
    
    return style({
        display : 'grid',
        
        // defines which part of <Card> REMAIN VISIBLE when sliding:
        ...rule('.inlineStart>&', {
            justifyContent : 'end',   // priority to show the RIGHT  part of <Card>, the LEFT   part may be CROPPED during collapsing
        }),
        ...rule('.inlineEnd>&', {
            justifyContent : 'start', // priority to show the LEFT   part of <Card>, the RIGHT  part may be CROPPED during collapsing
        }),
        ...rule('.blockStart>&', {
            alignContent   : 'end',   // priority to show the BOTTOM part of <Card>, the TOP    part may be CROPPED during collapsing
        }),
        ...rule('.blockEnd>&', {
            alignContent   : 'start', // priority to show the TOP    part of <Card>, the BOTTOM part may be CROPPED during collapsing
        }),
        
        
        
        // accessibilities:
        pointerEvents  : 'none', // just a wrapper <Popup> element (ghost), which the size may bigger (when the user limits the size of <Card>) than the <Card>, thus causing to BLOCK the <Backdrop> INTERACTION, so we set 'none'
        
        
        
        // children:
        ...children(['&', '*'], { // <Collapse> & <Card>
            // sizes:
            boxSizing     : 'border-box',     // the final size is including borders & paddings
            inlineSize    : 'auto',           // follows the content's width, but
            maxInlineSize : '100%',           // up to the maximum available parent's width
            blockSize     : 'auto',           // follows the content's height, but
            maxBlockSize  : '100%',           // up to the maximum available parent's height
            overflow      : 'hidden',         // force the <Card> to scroll
        }),
        ...children('*', { // <Card>
            // resets:
            ...stripoutFocusableElement(), // clear browser's default styles
            
            
            
            // layouts:
            ...style({
                // // layouts:
                // // a fix for collapsing vertically, so the <CardBody> appears sliding:
                // // ...rule(':is(.inlineStart, .blockStart)>&', {
                // //     justifyContent : 'end', // if items are not growable, the excess space (if any) placed at the beginning, and if no sufficient space available => the last item should be visible first
                // // }),
                // // ...ifOrientationInline({...rule(':is(.inlineStart, .inlineEnd)>&', {
                // //     ...children(bodyElm, {
                // //         // sizes:
                // //         flex : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height
                // //     }),
                // // })}),
                // // ...ifOrientationBlock({...rule(':is(.blockStart, .blockEnd)>&', {
                // //     ...children(bodyElm, {
                // //         // sizes:
                // //         flex : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height
                // //     }),
                // // })}),
                
                
                
                // sizes:
                // maximum height of <Card> when side-left & side-right:
                flex          : [[1, 1, '100%']], // growable, shrinkable, initial from parent's height
                
                
                
                // accessibilities:
                pointerEvents : 'auto', // cancel out *inherited* ghost layer from <Popup>, *re-enabling* mouse_event on the <Card>
                
                
                
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardItem')), // apply config's cssProps starting with cardItem***
                }),
                ...children([headerElm, footerElm], {
                    // layouts:
                    display        : 'flex',
                    flexDirection  : 'row',
                    flexWrap       : 'nowrap',  // no wrapping
                    
                    
                    
                    // children:
                    ...children('*', {
                        flex       : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's width
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardCaption')), // apply config's cssProps starting with cardCaption***
                }),
                ...children(headerElm, {
                    // layouts:
                    justifyContent : 'space-between', // separates between items as far as possible
                    alignItems     : 'center',        // center <Control> vertically
                    
                    
                    
                    // children:
                    ...children(['h1', '.h1', 'h2', '.h2', 'h3', '.h3', 'h4', '.h4', 'h5', '.h5', 'h6', '.h6', '[role="heading"]'], {
                        ...rule([':first-child:last-child', ':first-child:nth-last-child(2)'], { // when the heading is SECOND_LAST|ALONE in the <CardHeader>
                            ...usesHeadingRule(headings, '&', '&', [6]),
                            ...rule(':nth-child(n)', {
                                margin : '0px',
                            }),
                        }, { specificityWeight: 0 }),
                    }),
                    ...children(['button', '[role="button"]'], {
                        ...rule(':first-child:last-child', { // when the close_button is ALONE in the <CardHeader>
                            // spacings:
                            marginInlineStart : 'auto', // align to right
                        }, { specificityWeight: 0 }),
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardHeader')), // apply config's cssProps starting with cardHeader***
                }),
                ...children(footerElm, {
                    // layouts:
                    justifyContent : 'end',     // if <Control> is not growable, the excess space (if any) placed at the beginning, and if no sufficient space available => the last item should be visible first
                    alignItems     : 'center',  // center <Control> vertically
                    flexWrap       : 'wrap',    // wraps the list of <Button>s on narrow screen
                    
                    
                    
                    ...children(['button', '[role="button"]'], {
                        // sizes:
                        flex       : [[1, 1, '100%']], // growable, shrinkable, initial from max width
                        ...ifScreenWidthAtLeast('sm', {
                            flex   : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's width
                        }),
                        
                        
                        
                        // typos:
                        whiteSpace : 'nowrap',
                    }),
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardFooter')), // apply config's cssProps starting with cardFooter***
                }),
                ...children(bodyElm, {
                    // scrolls:
                    // prevents scrolling the content behind the <Backdrop>
                    overscrollBehavior: 'contain',
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalSides, 'cardBody')), // apply config's cssProps starting with cardBody***
                }),
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(modalSides, 'card')), // apply config's cssProps starting with card***
            }),
        }),
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(modalSides, 'collapse')), // apply config's cssProps starting with collapse***
    });
};

export const usesModalSideVariants = () => {
    // dependencies:
    
    // features:
    const {borderVars   } = usesBorder();
    
    // capabilities:
    const {groupableVars} = usesGroupable();
    
    
    
    return style({
        ...variants([
            rule('.inlineStart>&', { // <Collapse>
                // children:
                ...children('*', { // <Card>
                    ...vars({
                        // borders:
                        // fit rounded corners on left to <backdrop>:
                        [groupableVars.borderStartStartRadius] : 'inherit', // reads parent's prop
                        [groupableVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                        [borderVars.borderStartStartRadius   ] : groupableVars.borderStartStartRadius,
                        [borderVars.borderEndStartRadius     ] : groupableVars.borderEndStartRadius,
                    }),
                }),
            }),
            rule('.inlineEnd>&', {
                // children:
                ...children('*', { // <Card>
                    ...vars({
                        // borders:
                        // fit rounded corners on right to <backdrop>:
                        [groupableVars.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                        [groupableVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                        [borderVars.borderStartEndRadius     ] : groupableVars.borderStartEndRadius,
                        [borderVars.borderEndEndRadius       ] : groupableVars.borderEndEndRadius,
                    }),
                }),
            }),
            rule('.blockStart>&', {
                // children:
                ...children('*', { // <Card>
                    ...vars({
                        // borders:
                        // fit rounded corners on top to <backdrop>:
                        [groupableVars.borderStartStartRadius] : 'inherit', // reads parent's prop
                        [groupableVars.borderStartEndRadius  ] : 'inherit', // reads parent's prop
                        [borderVars.borderStartStartRadius   ] : groupableVars.borderStartStartRadius,
                        [borderVars.borderStartEndRadius     ] : groupableVars.borderStartEndRadius,
                    }),
                }),
            }),
            rule('.blockEnd>&', {
                // children:
                ...children('*', { // <Card>
                    ...vars({
                        // borders:
                        // fit rounded corners on bottom to <backdrop>:
                        [groupableVars.borderEndStartRadius  ] : 'inherit', // reads parent's prop
                        [groupableVars.borderEndEndRadius    ] : 'inherit', // reads parent's prop
                        [borderVars.borderEndStartRadius     ] : groupableVars.borderEndStartRadius,
                        [borderVars.borderEndEndRadius       ] : groupableVars.borderEndEndRadius,
                    }),
                }),
            }),
        ]),
    });
};

export default () => style({
    // layouts:
    ...usesModalSideLayout(),
    
    // variants:
    ...usesModalSideVariants(),
});
