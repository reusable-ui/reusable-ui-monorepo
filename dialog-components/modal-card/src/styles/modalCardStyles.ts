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
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'start',   // if <Popup> is not growable, the excess space (if any) placed at the end, and if no sufficient space available => the first item should be visible first
        alignItems     : 'center',  // center <Popup> horizontally
        flexWrap       : 'nowrap',  // no wrapping
        
        
        
        // animations:
        // a fix to overwrite <Popup>'s filter:
        filter         : modals.modalUiFilter,
        
        
        
        // children:
        ...children('*', { // <Card>
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
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(modalCards, 'cardCaption')), // apply config's cssProps starting with cardCaption***
            }),
            ...children(headerElm, {
                justifyContent : 'space-between', // separates between items as far as possible
                alignItems     : 'center',        // center <Control> vertically
                
                
                
                // children:
                ...children(['button', '[role="button"]'], {
                    ...rule(':first-child:last-child', {
                        // spacings:
                        marginInlineStart : 'auto', // align to right
                    }),
                }),
                
                
                
                // customize:
                ...usesCssProps(usesPrefixedProps(modalCards, 'cardHeader')), // apply config's cssProps starting with cardHeader***
            }),
            ...children(footerElm, {
                justifyContent : 'end',     // if <Control> is not growable, the excess space (if any) placed at the beginning, and if no sufficient space available => the last item should be visible first
                alignItems     : 'center',  // center <Control> vertically
                
                
                
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
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(modalCards, 'popup')), // apply config's cssProps starting with popup***
    });
};

export const usesModalCardVariants = () => {
    return style({
        ...variants([
            rule(':not(.scrollable)>&', {
                // sizes:
                flex          : [[0, 0, 'auto']], // ungrowable, unshrinkable, initial from it's height
                
                boxSizing     : 'content-box',    // the final size is excluding borders & paddings
                inlineSize    : 'max-content',    // forcing the <Card>'s width follows the <Card>'s items width
                blockSize     : 'max-content',    // forcing the <Card>'s height follows the <Card>'s items height
            }),
            rule('.scrollable>&', {
                // children:
                ...children(['&', '*'], { // <Popup> & <Card>
                    // sizes:
                    boxSizing     : 'border-box',     // the final size is including borders & paddings
                    inlineSize    : 'auto',           // follows the content's width, but
                    maxInlineSize : '100%',           // up to the maximum available parent's width
                    blockSize     : 'auto',           // follows the content's height, but
                    maxBlockSize  : '100%',           // up to the maximum available parent's height
                    overflow      : 'hidden',         // force the <Card> to scroll
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
