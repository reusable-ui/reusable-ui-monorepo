// cssfn:
import {
    // cssfn css specific types:
    CssStyleCollection,
    
    
    
    // writes css in javascript:
    rule,
    children,
    style,
    
    
    
    // reads/writes css variables configuration:
    usesCssProps,
    
    
    
    // writes complex stylesheets in simpler way:
    watchChanges,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui core:
import {
    // a capability of UI to rotate its layout:
    OrientationableOptions,
    usesOrientationable,
    
    
    
    // size options of UI:
    usesResizable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    onContentStylesChange,
    usesContentLayout,
    usesContentVariants,
}                           from '@reusable-ui/content'         // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from '../defaults.js'
import {
    // configs:
    masonries,
    cssMasonryConfig,
}                           from './config.js'



// styles:
export const onMasonryStylesChange = watchChanges(onContentStylesChange, cssMasonryConfig.onChange);

export const usesMasonryLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock, orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    const parentOrientationInlineSelector = `:where(${orientationInlineSelector})&`;
    const parentOrientationBlockSelector  = `:where(${orientationBlockSelector })&`;
    const ifParentOrientationInline       = (styles: CssStyleCollection) => rule(parentOrientationInlineSelector, styles);
    const ifParentOrientationBlock        = (styles: CssStyleCollection) => rule(parentOrientationBlockSelector , styles);
    
    
    
    return style({
        // layouts:
        ...usesContentLayout(),
        ...style({
            // layouts:
            ...ifOrientationInline({ // inline
                display             : 'inline-grid', // use css inline grid for layouting, the core of our Masonry layout
                gridAutoFlow        : 'column',      // items direction is to block & masonry's direction is to inline
                gridAutoColumns     : masonries.itemRaiseRowHeight,
                gridTemplateRows    : `repeat(auto-fill, minmax(${masonries.itemMinColumnWidth}, 1fr))`,
                
                // item default sizes:
                alignItems          : 'stretch',     // each item fills the entire Masonry's column height
             // justifyItems        : 'stretch',     // distorting the item's width a bit for consistent multiplies of `itemRaiseRowHeight` // causing the ResizeObserver doesn't work
                justifyItems        : 'start',       // let's the item to resize so the esizeObserver will work
            }),
            ...ifOrientationBlock({  // block
                display             : 'grid',        // use css block grid for layouting, the core of our Masonry layout
                gridAutoFlow        : 'row',         // items direction is to inline & masonry's direction is to block
                gridAutoRows        : masonries.itemRaiseRowHeight,
                gridTemplateColumns : `repeat(auto-fill, minmax(${masonries.itemMinColumnWidth}, 1fr))`,
                
                // item default sizes:
                justifyItems        : 'stretch',     // each item fills the entire Masonry's column width
             // alignItems          : 'stretch',     // distorting the item's height a bit for consistent multiplies of `itemRaiseRowHeight` // causing the ResizeObserver doesn't work
                alignItems          : 'start',       // let's the item to resize so the esizeObserver will work
            }),
            
            
            
            // spacings:
            ...ifOrientationInline({ // inline
                gapInline           : [0, '!important'], // strip out the `gapInline` because it will conflict with programatically_adjust_height_and_gap
            }),
            ...ifOrientationBlock({  // block
                gapBlock            : [0, '!important'], // strip out the `gapBlock`  because it will conflict with programatically_adjust_height_and_gap
            }),
            ...children('*', {
                ...rule(':not(.firstRow)', {
                    ...ifParentOrientationInline({ // inline
                        /*
                        * we use `marginInlineStart` as the replacement of the stripped out `gapInline`
                        * we use `marginInlineStart` instead of `marginInlineEnd`
                        * because looping grid's items at the first_masonry_row is much faster than at the last_masonry_row
                        * (we don't need to count the number of grid's item)
                        */
                        marginInlineStart : masonries.gapInline,
                    }),
                    ...ifParentOrientationBlock({  // block
                        /*
                        * we use `marginBlockStart` as the replacement of the stripped out `gapBlock`
                        * we use `marginBlockStart` instead of `marginBlockEnd`
                        * because looping grid's items at the first_masonry_row is much faster than at the last_masonry_row
                        * (we don't need to count the number of grid's item)
                        */
                        marginBlockStart  : masonries.gapBlock,
                    }),
                }, { specificityWeight: 0 }),
            }),
            
            
            
            // children:
            ...children('*', {
                // sizes:
                ...ifParentOrientationInline({ // inline
                    gridRowEnd    : ['unset', '!important'], // clear from residual effect from <Masonry orientation="block"> (if was)
                    blockSize     : 'unset',                 // we need to manage the <img>'s height
                }),
                ...ifParentOrientationBlock({  // block
                    gridColumnEnd : ['unset', '!important'], // clear from residual effect from <Masonry orientation="inline"> (if was)
                    inlineSize    : 'unset',                 // we need to manage the <img>'s width
                }),
            }),
            
            
            
            // customize:
            ...usesCssProps(masonries), // apply config's cssProps
        }),
    });
};

export const usesMasonryVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(masonries);
    
    
    
    return style({
        // variants:
        ...usesContentVariants(),
        ...resizableRule(),
    });
};

export default () => style({
    // layouts:
    ...usesMasonryLayout(),
    
    // variants:
    ...usesMasonryVariants(),
});
