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
    // features:
    usesCollapse,
}                           from '@reusable-ui/collapse'        // a base component
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
        // layouts:
        display      : 'grid',
        gridTemplate : [[ // FORCES the <Card> to RESIZE when the <Collapse> performing BUMPY effect
            '"card" 1fr',
            '/',
            '1fr'
        ]],
        
        
        
        // sizes:
        boxSizing     : 'border-box',  // the final size is including borders & paddings
        maxInlineSize : '100%',        // the <Collapse>'s size is|may `fit-content` but up to the maximum available <Backdrop>'s width
        maxBlockSize  : '100%',        // the <Collapse>'s size is|may `fit-content` but up to the maximum available <Backdrop>'s height
        
        
        
        // accessibilities:
        pointerEvents  : 'none', // just a wrapper <Popup> element (ghost), which the size may bigger (when the user limits the size of <Card>) than the <Card>, thus causing to BLOCK the <Backdrop> INTERACTION, so we set 'none'
        
        
        
        // children:
        ...children(['&', '*'], { // <Collapse> & <Card>
            // sizes:
            overflow : 'hidden', // when both <Collapse> and <Card> are `overflow: 'hidden'` => forces the <CardBody> to scroll
        }),
        ...children('*', { // <Card>
            // resets:
            ...stripoutFocusableElement(), // clear browser's default styles
            
            
            
            // layouts:
            ...style({
                // positions:
                gridArea: 'card',
                
                
                
                // sizes:
                // the <Card>'s size follows `gridArea: 'card'`'s size
                
                
                
                // not needed `flex` anymore since we set the <Collapse> using `display: 'grid'` (see the code above)
                // // sizes:
                // // maximum height of <Card> when side-left & side-right:
                // flex          : [[1, 1, '100%']], // growable, shrinkable, initial from parent's height
                
                
                
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
    const {collapseVars } = usesCollapse();
    
    // capabilities:
    const {groupableVars} = usesGroupable();
    
    
    
    return style({
        ...variants([
            rule(['.inlineStart>&', '.inlineEnd>&'], { // <Collapse>
                // sizes:
                [collapseVars.inlineSize] : 'fit-content', // follows content's width  but up to `maxInlineSize`
                [collapseVars.blockSize ] : '100%',        // full height
            }),
            rule(['.blockStart>&', '.blockEnd>&'], {   // <Collapse>
                // sizes:
                [collapseVars.inlineSize] : '100%',        // full width
                [collapseVars.blockSize ] : 'fit-content', // follows content's height but up to `maxBlockSize`
            }),
            
            rule('.inlineStart>&', { // <Collapse>
                // layouts:
                justifyContent : 'end',   // place the <Card> on the left
                
                
                
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
            rule('.inlineEnd>&', {   // <Collapse>
                // layouts:
                justifyContent : 'start', // place the <Card> on the right
                
                
                
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
            rule('.blockStart>&', {  // <Collapse>
                // layouts:
                alignContent   : 'end',   // place the <Card> on the top
                
                
                
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
            rule('.blockEnd>&', {    // <Collapse>
                // layouts:
                alignContent   : 'start', // place the <Card> on the bottom
                
                
                
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
