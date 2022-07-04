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
}                           from '@cssfn/css-types'                 // cssfn css specific types
import {
    // rules:
    rule,
    
    
    
    // combinators:
    children,
    
    
    
    // styles:
    style,
    imports,
}                           from '@cssfn/cssfn'                     // writes css in javascript
import {
    // style sheets:
    createUseStyleSheet,
}                           from '@cssfn/cssfn-react'               // writes css in react hook
import {
    cssConfig,
    
    
    
    // utilities:
    usesCssProps,
}                           from '@cssfn/css-config'                // reads/writes css variables configuration

// reusable-ui:
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'             // a spacer (gap) management system
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'               // react helper hooks
import {
    // hooks:
    usesSizeVariant,
    OrientationName,
    OrientationVariantOptions,
    defaultBlockOrientationVariantOptions,
    normalizeOrientationVariantOptions,
    usesOrientationVariant,
    OrientationVariant,
    useOrientationVariant,
}                           from '@reusable-ui/basic'               // a base component
import {
    // styles:
    usesContentLayout,
    usesContentVariants,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'             // a base component



// defaults:
const _defaultItemResizeObserverOptions : ResizeObserverOptions = { box: 'border-box'  }



// hooks:

// layouts:

//#region orientation
export const defaultOrientationRuleOptions = defaultBlockOrientationVariantOptions;
//#endregion orientation



// styles:
export const usesMasonryLayout = (options?: OrientationVariantOptions) => {
    // options:
    options = normalizeOrientationVariantOptions(options, defaultOrientationRuleOptions);
    const [orientationInlineSelector, orientationBlockSelector] = usesOrientationVariant(options);
    const parentOrientationInlineSelector = `${orientationInlineSelector}&`;
    const parentOrientationBlockSelector  = `${orientationBlockSelector }&`;
    
    
    
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
        ]),
        ...style({
            // layouts:
            ...rule(orientationInlineSelector, { // inline
                // layouts:
                display             : 'inline-grid', // use css inline grid for layouting, the core of our Masonry layout
                gridAutoFlow        : 'column',      // items direction is to block & masonry's direction is to inline
                gridAutoColumns     : masonries.itemsRaiseRowHeight,
                gridTemplateRows    : `repeat(auto-fill, minmax(${masonries.itemsMinColumnWidth}, 1fr))`,
                
                // item default sizes:
                alignItems          : 'stretch',     // each item fills the entire Masonry's column height
             // justifyItems        : 'stretch',     // distorting the item's width a bit for consistent multiplies of `itemsRaiseRowHeight` // causing the ResizeObserver doesn't work
                justifyItems        : 'start',       // let's the item to resize so the esizeObserver will work
            }),
            ...rule(orientationBlockSelector , { // block
                // layouts:
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
            ...rule(orientationInlineSelector, { // inline
                gapInline           : [0, '!important'], // strip out the `gapInline` because it will conflict with programatically_adjust_height_and_gap
            }),
            ...rule(orientationBlockSelector , { // block
                gapBlock            : [0, '!important'], // strip out the `gapBlock`  because it will conflict with programatically_adjust_height_and_gap
            }),
            ...children('*', {
                ...rule(':not(.firstRow)', {
                    ...rule(parentOrientationInlineSelector, { // inline
                        /*
                        * we use `marginInlineStart` as the replacement of the stripped out `gapInline`
                        * we use `marginInlineStart` instead of `marginInlineEnd`
                        * because looping grid's items at the first_masonry_row is much faster than at the last_masonry_row
                        * (we don't need to count the number of grid's item)
                        */
                        marginInlineStart : masonries.gapInline,
                    }),
                    ...rule(parentOrientationBlockSelector , { // block
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
                ...rule(parentOrientationInlineSelector, { // inline
                    gridRowEnd    : ['unset', '!important'], // clear from residual effect from <Masonry orientation="block"> (if was)
                }),
                ...rule(parentOrientationBlockSelector , { // block
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
    
    // layouts:
    const [sizeVariantRule] = usesSizeVariant(masonries);
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            
            // layouts:
            sizeVariantRule,
        ]),
    });
};

export const useMasonryStyleSheet = createUseStyleSheet(() => ({
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
        itemsRaiseRowHeight   : '3px'               as CssKnownProps['blockSize'],
        itemsRaiseRowHeightSm : '2px'               as CssKnownProps['blockSize'],
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
        
        // layouts:
        OrientationVariant
{
    // children:
    children        ?: React.ReactNode
}
const Masonry = <TElement extends Element = HTMLElement>(props: MasonryProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet        = useMasonryStyleSheet();
    
    
    
    // variants:
    const orientationVariant = useOrientationVariant(props);
    const isOrientationBlock = ((orientationVariant.class || defaultOrientationRuleOptions.defaultOrientation) === 'block');
    
    
    
    // rest props:
    const {
        // remove props:
        
        // layouts:
        orientation : _orientation,
        
        
        
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
        const updateItemHeight = (item: HTMLElement) => {
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
                const spanWidth = `span ${Math.round(totalSize / itemsRaiseSizeCache.current)}`;
                if (isOrientationBlock) {
                    item.style.gridRowEnd    = spanWidth;
                    item.style.gridColumnEnd = ''; // clear from residual effect from <Masonry orientation="inline"> (if was)
                }
                else {
                    item.style.gridRowEnd    = ''; // clear from residual effect from <Masonry orientation="block"> (if was)
                    item.style.gridColumnEnd = spanWidth;
                } // if
                console.log('item fully updated');
            });
        };
        
        let firstRowItems: HTMLElement[] = [];
        const updateFirstRowItems = () => {
            const newFirstRowItems = (() => {
                const items = (Array.from(masonry.children) as HTMLElement[]);
                let selectionIndex = -1;
                let prevPos = -1;
                for (const item of items) {
                    /*
                        select the items in the first_masonry_row by comparing the offsetLeft/offsetTop to the prev one.
                        if equal/greater than prev => the item is still in the same row,
                        otherwise => the item in the next row
                     */
                    const currentPos = (isOrientationBlock ? item.offsetLeft : item.offsetTop);
                    if (currentPos < prevPos) break;
                    
                    
                    
                    prevPos = currentPos + (isOrientationBlock ? item.offsetWidth : item.offsetHeight);
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
        let subsequentResize = false;
        const resizeObserver = new ResizeObserver((entries) => {
            for (const { target: item } of entries) {
                // conditions:
                if (!(item instanceof HTMLElement)) continue; // ignores svg element
                
                
                
                if (item.parentElement === (masonry as Element)) {
                    // setups:
                    if (subsequentResize) updateFirstRowItems(); // side effect: modify item's [class] => modify some item's [margin(Inline|Block)Start]
                    updateItemHeight(item);                      // side effect: dynamically compute css => force_reflow at the first_loop
                    console.log('item being update, subsequent: ', subsequentResize);
                }
                // else {
                //     // cleanups:
                // } // if
            } // for
        });
        
        // initial setup:
        updateFirstRowItems(); // side effect: modify item's [class] => modify some item's [margin(Inline|Block)Start]
        for (const item of (Array.from(masonry.children) as HTMLElement[])) {
            resizeObserver.observe(item, _defaultItemResizeObserverOptions);
        } // for
        
        // subsequent setup:
        setTimeout(() => { // make sure the ResizeObserver first event has already fired
            subsequentResize = true;
            console.log('subsequent!!!');
        }, 0);
        
        
        
        // cleanups:
        return () => {
            resizeObserver.disconnect();
        };
    }, [isOrientationBlock]);
    
    
    
    // classes:
    const variantClasses = useMergeClasses(
        // preserves the original `variantClasses`:
        props.variantClasses,
        
        
        
        // variants:
        orientationVariant.class,
    );
    
    
    
    // jsx:
    return (
        <Content<TElement>
            // other props:
            {...restContentProps}
            
            
            
            // refs:
            elmRef={mergedElmRef}
            
            
            
            // semantics:
            aria-orientation={props['aria-orientation'] ?? (isOrientationBlock ? 'vertical' : 'horizontal')}
            
            
            
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

export type { OrientationName, OrientationVariant }
