// cssfn:
import {
    // writes css in javascript:
    rule,
    variants,
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
    // a responsive management system:
    ifScreenWidthAtLeast,
    
    
    
    // a typography management system:
    headings,
    usesHeadingRule,
    
    
    
    // removes browser's default stylesheet:
    stripoutFocusableElement,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // configs:
    modals,
    cssModalConfig,
}                           from '@reusable-ui/modal'           // a base component
import {
    // styles:
    headerElm,
    footerElm,
    bodyElm,
}                           from '@reusable-ui/card'            // a flexible and extensible content container, with optional header and footer

// internals:
import {
    // configs:
    modalCards,
    cssModalCardConfig,
}                           from './config.js'



// styles:
export const onModalCardStylesChange = watchChanges(cssModalConfig.onChange, cssModalCardConfig.onChange);

export const usesModalCardLayout = () => {
    return style({
        // layouts:
        display      : 'grid',
        gridTemplate : [[ // LIMITS the <Card> to NOT OVERSIZING outside the `card` area, when `horzAlign|vertAlign='start|end|center'`
            '"card" 1fr',
            '/',
            '1fr'
        ]],
        
        
        
        // accessibilities:
        pointerEvents  : 'none', // just a wrapper <Popup> element (ghost), which the size may bigger (when the `(horz|vert)Align=stretch` and the user limits the size of <Card>) than the <Card>, thus causing to BLOCK the <Backdrop> INTERACTION, so we set 'none'
        
        
        
        // animations:
        // a fix to overwrite <Popup>'s filter:
        filter         : modals.modalUiFilter, // fix the drop shadow that has been overwritten by <Popup>, so the <Card> appears floating on top of document
        
        
        
        // children:
        ...children('*', { // <Card>
            // resets:
            ...stripoutFocusableElement(), // clear browser's default styles
            
            
            
            // layouts:
            ...style({
                // positions:
                gridArea: 'card',
                
                
                
                // accessibilities:
                pointerEvents : 'auto', // cancel out *inherited* ghost layer from <Popup>, *re-enabling* mouse_event on the <Card>
                
                
                
                // children:
                ...children([headerElm, footerElm, bodyElm], {
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardItem')), // apply config's cssProps starting with cardItem***
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
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardCaption')), // apply config's cssProps starting with cardCaption***
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
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardHeader')), // apply config's cssProps starting with cardHeader***
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
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardFooter')), // apply config's cssProps starting with cardFooter***
                }),
                ...children(bodyElm, {
                    // scrolls:
                    // prevents scrolling the content behind the <Backdrop>
                    overscrollBehavior: 'contain',
                    
                    
                    
                    // customize:
                    ...usesCssProps(usesPrefixedProps(modalCards, 'cardBody')), // apply config's cssProps starting with cardBody***
                }),
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(modalCards, 'card')), // apply config's cssProps starting with card***
            }),
        }),
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(modalCards, 'popup')), // apply config's cssProps starting with popup***
    });
};

export const usesModalCardVariants = () => {
    return style({
        ...variants([
            rule(':not(.scrollable)>&', {
                // sizes:
                boxSizing     : 'content-box',    // the final size is excluding borders & paddings
                inlineSize    : 'max-content',    // follows content's width  even if overflowing the <Backdrop>'s client width
                blockSize     : 'max-content',    // follows content's height even if overflowing the <Backdrop>'s client height
                
                
                
                // children:
                ...children('*', { // <Card>
                    minInlineSize: 'fit-content', // do not limit the width of <Card>
                    ...children('.body', { // <CardBody>
                        overflow: 'visible',      // do not shrink the <CardBody> (prevents from having scrollbars)
                    }, { specificityWeight: 0 }),
                }),
            }),
            rule(':not(.scrollable).horzStretch>&', {
                // children:
                inlineSize    : '100%',           // follows <Backdrop>'s width
            }),
            rule(':not(.scrollable).vertStretch>&', {
                // children:
                blockSize     : '100%',           // follows <Backdrop>'s height
            }),
            
            rule('.scrollable>&', {
                // sizes:
                boxSizing     : 'border-box',     // the final size is including borders & paddings
                maxInlineSize : '100%',           // the <Popup>'s size is|may `fit-content` but up to the maximum available <Backdrop>'s width
                maxBlockSize  : '100%',           // the <Popup>'s size is|may `fit-content` but up to the maximum available <Backdrop>'s height
                inlineSize    : 'fit-content',    // follows content's width  but up to `maxInlineSize`
                blockSize     : 'fit-content',    // follows content's height but up to `maxBlockSize`
                
                
                
                // children:
                ...children(['&', '*'], { // <Popup> & <Card>
                    // sizes:
                    overflow  : 'hidden',         // when both <Popup> and <Card> are `overflow: 'hidden'` => forces the <CardBody> to scroll
                }),
            }),
            rule('.scrollable.horzStretch>&', {
                // children:
                ...children(['&', '*'], { // <Popup> & <Card>
                    inlineSize    : '100%',
                }),
            }),
            rule('.scrollable.vertStretch>&', {
                // children:
                ...children(['&', '*'], { // <Popup> & <Card>
                    blockSize     : '100%',
                }),
            }),
        ]),
    });
};

export default () => style({
    // layouts:
    ...usesModalCardLayout(),
    
    // variants:
    ...usesModalCardVariants(),
});
