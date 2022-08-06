// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// cssfn:
import type {
    // css known (standard) properties:
    CssKnownProps,
    
    
    
    // cssfn properties:
    CssStyleCollection,
}                           from '@cssfn/css-types'             // cssfn css specific types
import {
    // rules:
    rule,
    
    
    
    // combinators:
    children,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                 // writes css in javascript
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui utilities:
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui variants:
import {
    // hooks:
    OrientationableOptions,
    defaultBlockOrientationableOptions,
    usesOrientationable,
    OrientationableProps,
    useOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui components:
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'         // a base component



// defaults:
const _defaultMasonryResizeObserverOptions : ResizeObserverOptions = { box: 'content-box' } // get the client size
const _defaultItemResizeObserverOptions    : ResizeObserverOptions = { box: 'border-box'  } // get the offset size



// hooks:

// variants:

//#region orientationable
export const defaultOrientationableOptions = defaultBlockOrientationableOptions;
//#endregion orientationable



// styles:
export const usesMasonryLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    const {ifOrientationInline, ifOrientationBlock, orientationInlineSelector, orientationBlockSelector} = orientationableStuff;
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    const ifParentOrientationInline       = (styles: CssStyleCollection) => rule(parentOrientationInlineSelector, styles);
    const ifParentOrientationBlock        = (styles: CssStyleCollection) => rule(parentOrientationBlockSelector , styles);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
        ]),
        ...style({
            // layouts:
            ...ifOrientationInline({ // inline
                display             : 'inline-grid', // use css inline grid for layouting, the core of our Masonry layout
                gridAutoFlow        : 'column',      // items direction is to block & masonry's direction is to inline
                gridAutoColumns     : masonries.itemsRaiseRowHeight,
                gridTemplateRows    : `repeat(auto-fill, minmax(${masonries.itemsMinColumnWidth}, 1fr))`,
                
                // item default sizes:
                alignItems          : 'stretch',     // each item fills the entire Masonry's column height
             // justifyItems        : 'stretch',     // distorting the item's width a bit for consistent multiplies of `itemsRaiseRowHeight` // causing the ResizeObserver doesn't work
                justifyItems        : 'start',       // let's the item to resize so the esizeObserver will work
            }),
            ...ifOrientationBlock({  // block
                display             : 'grid',        // use css block grid for layouting, the core of our Masonry layout
                gridAutoFlow        : 'row',         // items direction is to inline & masonry's direction is to block
                gridAutoRows        : masonries.itemsRaiseRowHeight,
                gridTemplateColumns : `repeat(auto-fill, minmax(${masonries.itemsMinColumnWidth}, 1fr))`,
                
                // item default sizes:
                justifyItems        : 'stretch',     // each item fills the entire Masonry's column width
             // alignItems          : 'stretch',     // distorting the item's height a bit for consistent multiplies of `itemsRaiseRowHeight` // causing the ResizeObserver doesn't work
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
                }),
            }),
            
            
            
            // children:
            ...children('*', {
                // sizes:
                ...ifParentOrientationInline({ // inline
                    gridRowEnd    : ['unset', '!important'], // clear from residual effect from <Masonry orientation="block"> (if was)
                }),
                ...ifParentOrientationBlock({  // block
                    gridColumnEnd : ['unset', '!important'], // clear from residual effect from <Masonry orientation="inline"> (if was)
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
        ...imports([
            // variants:
            usesContentVariants(),
            resizableRule,
        ]),
    });
};

export const useMasonryStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesMasonryLayout(),
        
        // variants:
        usesMasonryVariants(),
    ]),
}), { id: 'fiuyy1jxpx' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [masonries, masonryValues, cssMasonryConfig] = cssConfig(() => {
    return {
        // sizes:
        itemsRaiseRowHeight   : '2px'               as CssKnownProps['blockSize'],
        itemsRaiseRowHeightSm : '1px'               as CssKnownProps['blockSize'],
        itemsRaiseRowHeightLg : '4px'               as CssKnownProps['blockSize'],
        
        itemsMinColumnWidth   : 'calc(5 * 40px)'    as CssKnownProps['columnWidth'],
        itemsMinColumnWidthSm : 'calc(3 * 40px)'    as CssKnownProps['columnWidth'],
        itemsMinColumnWidthLg : 'calc(8 * 40px)'    as CssKnownProps['columnWidth'],
        
        
        
        // spacings:
        gapInline             : spacers.sm          as CssKnownProps['gapInline'],
        gapInlineSm           : spacers.xs          as CssKnownProps['gapInline'],
        gapInlineLg           : spacers.md          as CssKnownProps['gapInline'],
        gapBlock              : spacers.sm          as CssKnownProps['gapBlock' ],
        gapBlockSm            : spacers.xs          as CssKnownProps['gapBlock' ],
        gapBlockLg            : spacers.md          as CssKnownProps['gapBlock' ],
    };
}, { prefix: 'msry' });



// utilities:
const isPartiallyResized = (oldSize: ResizeObserverSize|undefined, newSize: ResizeObserverSize, compareOrientationBlock: boolean): boolean => {
    if (!oldSize) {
        oldSize   = newSize;
        return true;
    }
    else {
        if (compareOrientationBlock) {
            if (oldSize.inlineSize !== newSize.inlineSize) { // [orientation="block"] => watch for inlineSize changes
                oldSize   = newSize;
                return true;
            } // if
        }
        else {
            if (oldSize.blockSize  !== newSize.blockSize ) { // [orientation="inline"] => watch for blockSize changes
                oldSize   = newSize;
                return true;
            } // if
        } // if
    } // if
    
    
    
    return false;
};



// react components:
export interface MasonryProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ContentProps<TElement>,
        
        // <div>:
        Omit<React.HTMLAttributes<TElement>,
            // semantics:
            |'role' // we redefined [role] in <Generic>
        >,
        
        // variants:
        OrientationableProps
{
    // children:
    children        ?: React.ReactNode
}
const Masonry = <TElement extends Element = HTMLElement>(props: MasonryProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet             = useMasonryStyleSheet();
    
    
    
    // variants:
    const orientationableVariant = useOrientationable(props, defaultOrientationableOptions);
    const isOrientationBlock     = orientationableVariant.isOrientationBlock;
    
    
    
    // rest props:
    const {
        // variants:
        orientation : _orientation, // remove
        
        
        
        // refs:
        elmRef,
    ...restContentProps} = props;
    
    
    
    // refs:
    const masonryRefInternal = useRef<TElement|null>(null);
    const mergedElmRef       = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        masonryRefInternal,
    );
    
    
    
    // dom effects:
    const itemsRaiseSizeCache = useRef<number>(1);
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const masonry = masonryRefInternal.current;
        if (!masonry) return; // masonry was unloaded => nothing to do
        
        
        
        // setups:
        const cancelRequest = requestAnimationFrame(() => { // wait until the cssfn is fully loaded
            itemsRaiseSizeCache.current = Math.max(1, // limits the precision to 1px, any value less than 1px will be scaled up to 1px
                Number.parseInt(
                    isOrientationBlock
                    ?
                    getComputedStyle(masonry).gridAutoRows
                    :
                    getComputedStyle(masonry).gridAutoColumns
                )
                ||
                1 // if parsing error (NaN) => falsy => default to 1px
            );
        });
        
        
        
        // cleanups:
        return () => {
            cancelAnimationFrame(cancelRequest);
        };
    }, [isOrientationBlock, props.size]); // rebuild the itemsRaiseSizeCache if [orientation] or [size] changed
    
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const masonry = masonryRefInternal.current;
        if (!masonry) return; // masonry was unloaded => nothing to do
        
        
        
        // DOM manipulation functions:
        const updateItemHeight = (item: Element) => {
            // measuring dom:
            // note: side effect of measuring dom: force_reflow
            const totalSize : number = (() => {
                const style = getComputedStyle(item);
                
                if (isOrientationBlock) {
                    return (
                        Number.parseInt(style.marginBlockStart)
                        +
                        Number.parseInt(style.blockSize)
                        +
                        Number.parseInt(style.marginBlockEnd)
                    );
                }
                else {
                    return (
                        Number.parseInt(style.marginInlineStart)
                        +
                        Number.parseInt(style.inlineSize)
                        +
                        Number.parseInt(style.marginInlineEnd)
                    );
                } // if
            })();
            
            
            
            // update the item's height by modifying item's inline css:
            requestAnimationFrame(() => { // delaying to modify the css, so the next_loop of `updateItemHeight` doesn't cause to force_reflow
                const style = (item as HTMLElement|SVGElement).style;
                const spanWidth = `span ${Math.round(totalSize / itemsRaiseSizeCache.current)}`;
                if (isOrientationBlock) {
                    style.gridRowEnd    = spanWidth;
                    style.gridColumnEnd = ''; // clear from residual effect from <Masonry orientation="inline"> (if was)
                }
                else {
                    style.gridRowEnd    = ''; // clear from residual effect from <Masonry orientation="block"> (if was)
                    style.gridColumnEnd = spanWidth;
                } // if
            });
        };
        
        let firstRowItems: Element[] = [];
        const updateFirstRowItems = () => {
            const newFirstRowItems = (() => {
                const items = Array.from(masonry.children);
                let selectionIndex = -1;
                let prevPos = -1;
                for (const item of items) {
                    const { left, top, width, height } = item.getBoundingClientRect();
                    
                    
                    
                    /*
                        select the items in the first_masonry_row by comparing the left/top to the prev one.
                        if equal/greater than prev => the item is still in the same row,
                        otherwise => the item in the next row
                     */
                    const currentPos = (isOrientationBlock ? left : top);
                    if (currentPos < prevPos) break;
                    
                    
                    
                    prevPos = currentPos + (isOrientationBlock ? width : height);
                    selectionIndex++;
                } // for
                
                
                
                // here the items in the first_masonry_row:
                return items.slice(0, selectionIndex + 1); // select the first_item to the last_item in the first_masonry_row
            })();
            
            
            
            // diffing the newFirstRowItems vs firstRowItems:
            const removedItems =    firstRowItems.filter((item) => !newFirstRowItems.includes(item)); // old_items are not exist   in new_items
            const addedItems   = newFirstRowItems.filter((item) =>    !firstRowItems.includes(item)); // new_items are not already in old_items
            
            removedItems.forEach((removedItem) => removedItem.classList.remove('firstRow'));
            addedItems.forEach((addedItem)     =>   addedItem.classList.add('firstRow'));
            
            firstRowItems = newFirstRowItems; // update newFirstRowItems => (old)firstRowItems
        };
        
        
        
        // setups:
        let oldMasonrySize : ResizeObserverSize|undefined = undefined;
        const masonryResizeObserver = new ResizeObserver((entries) => {
            // conditions:
            if (!entries[0].target.parentElement) return; // the <Masonry> is being removed => ignore
            
            
            
            const newMasonrySize = entries[0].contentBoxSize[0]; // get the client size
            if (isPartiallyResized(oldMasonrySize, newMasonrySize, isOrientationBlock)) {
                oldMasonrySize = newMasonrySize;
                
                handleMasonryResize();
            } // if
        });
        
        let overallResize = true;
        const handleMasonryResize = () => {
            overallResize = true;
            updateFirstRowItems(); // side effect: modify item's [class] => modify some item's [margin(Inline|Block)Start]
            
            setTimeout(() => { // wait until all items have processed the resize event and the browser has already paint the ui
                overallResize = false;
            }, 0);
        };
        
        masonryResizeObserver.observe(masonry, _defaultMasonryResizeObserverOptions);
        
        
        
        const oldItemSizes = new Map<Element, ResizeObserverSize>();
        const itemResizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                // conditions:
                const item = entry.target;
                if (!item.parentElement) continue; // the item is being removed => ignore
                
                
                
                const newItemSize = entry.borderBoxSize[0]; // get the offset size
                if (isPartiallyResized(oldItemSizes.get(item), newItemSize, !isOrientationBlock)) {
                    oldItemSizes.set(item, newItemSize);
                    
                    handleItemResize(item);
                } // if
            } // for
        });
        
        const handleItemResize = (item: Element) => {
            if (!overallResize) updateFirstRowItems(); // side effect: modify item's [class] => modify some item's [margin(Inline|Block)Start]
            updateItemHeight(item);                    // side effect: dynamically compute css => force_reflow at the first_loop
        };
        
        for (const item of Array.from(masonry.children)) {
            itemResizeObserver.observe(item, _defaultItemResizeObserverOptions);
        } // for
        
        
        
        // in case of the <Masonry>'s children are modified using *vanilla* way,
        // we detect the changes by `MutationObserver`:
        const mutationObserver = new MutationObserver((entries) => {
            updateFirstRowItems(); // side effect: modify item's [class] => modify some item's [margin(Inline|Block)Start]
            
            
            
            for (const entry of entries) {
                for (const addedItem of entry.addedNodes) {
                    if (!(addedItem instanceof Element)) continue;
                    handleItemAdded(addedItem);
                } // for
                
                
                
                for (const removedItem of entry.removedNodes) {
                    if (!(removedItem instanceof Element)) continue;
                    handleItemRemoved(removedItem);
                } // for
            } // for
        });
        
        const handleItemAdded = (item: Element) => {
            itemResizeObserver.observe(item, _defaultItemResizeObserverOptions);
        };
        const handleItemRemoved = (item: Element) => {
            itemResizeObserver.unobserve(item);
        };
        mutationObserver.observe(masonry, {
            childList  : true,  // watch  for child's DOM structure changes
            subtree    : false, // ignore for grandchild's DOM structure changes
            
            attributes : false, // ignore for any attribute changes
        });
        
        
        
        // cleanups:
        return () => {
            oldMasonrySize = undefined;
            masonryResizeObserver.disconnect();
            
            oldItemSizes.clear();
            itemResizeObserver.disconnect();
            
            mutationObserver.disconnect();
        };
    }, [isOrientationBlock]);
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationableVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restContentProps}
            
            
            
            // refs:
            elmRef={mergedElmRef}
            
            
            
            // semantics:
            aria-orientation={props['aria-orientation'] ?? orientationableVariant['aria-orientation']}
            
            
            
            // classes:
            mainClass={props.mainClass ?? styleSheet.main}
            variantClasses={variantClasses}
        />
    );
};
export {
    Masonry,
    Masonry as default,
}
