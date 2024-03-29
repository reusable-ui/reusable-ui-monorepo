// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // react helper hooks:
    useIsomorphicLayoutEffect,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // a capability of UI to rotate its layout:
    OrientationableProps,
    useOrientationable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'         // a base component

// internals:
import {
    // defaults:
    defaultOrientationableOptions,
}                           from './defaults.js'



// defaults:
const _defaultMasonryResizeObserverOptions : ResizeObserverOptions = { box: 'content-box' } // get the client size
const _defaultItemResizeObserverOptions    : ResizeObserverOptions = { box: 'border-box'  } // get the offset size



// styles:
export const useMasonryStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'fiuyy1jxpx' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// utilities:
const isPartiallyResized = (oldSize: ResizeObserverSize|undefined, newSize: ResizeObserverSize, compareOrientationBlock: boolean): boolean => {
    if (!oldSize) {
        return true;
    }
    else {
        if (compareOrientationBlock) {
            if (oldSize.inlineSize !== newSize.inlineSize) { // [orientation="block"] => watch for inlineSize changes
                return true;
            } // if
        }
        else {
            if (oldSize.blockSize  !== newSize.blockSize ) { // [orientation="inline"] => watch for blockSize changes
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
    const itemsRaiseSizeCache = useRef<number|null>(null);
    const calculateItemsRaiseSize = (): number|null => {
        // conditions:
        const masonry = masonryRefInternal.current;
        if (!masonry) return null; // masonry was unmounted => nothing to do
        
        
        
        const gridAutoXString = (
            isOrientationBlock
            ?
            getComputedStyle(masonry).gridAutoRows
            :
            getComputedStyle(masonry).gridAutoColumns
        );
        if (!gridAutoXString) return null; // the cssfn is not ready => nothing to do
        
        
        
        const gridAutoXNumber = Math.round(Number.parseFloat(gridAutoXString));
        if (isNaN(gridAutoXNumber)) return null; // invalid number => nothing to do
        
        
        
        return Math.max(1, gridAutoXNumber); // limits the precision to 1px, any value less than 1px will be scaled up to 1px
    }
    useIsomorphicLayoutEffect(() => {
        // setups:
        itemsRaiseSizeCache.current = calculateItemsRaiseSize();
    }, [isOrientationBlock, props.size]); // rebuild the itemsRaiseSizeCache if [orientation] or [size] changed
    
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const masonry = masonryRefInternal.current;
        if (!masonry) return; // masonry was unmounted => nothing to do
        
        
        
        // DOM manipulation functions:
        const updateItemHeight = (item: Element) => {
            // measuring dom:
            // note: side effect of measuring dom: force_reflow
            const totalSize : number = (() => {
                const style = getComputedStyle(item);
                
                if (isOrientationBlock) {
                    return (
                        Number.parseFloat(style.marginBlockStart)
                        +
                        Number.parseFloat(style.blockSize)
                        +
                        Number.parseFloat(style.marginBlockEnd)
                    );
                }
                else {
                    return (
                        Number.parseFloat(style.marginInlineStart)
                        +
                        Number.parseFloat(style.inlineSize)
                        +
                        Number.parseFloat(style.marginInlineEnd)
                    );
                } // if
            })();
            
            
            
            // update the item's height by modifying item's inline css:
            requestAnimationFrame(() => { // delaying to modify the css, so the next_loop of `updateItemHeight` doesn't cause to force_reflow
                const style = (item as HTMLElement|SVGElement).style;
                if (itemsRaiseSizeCache.current === null) itemsRaiseSizeCache.current = calculateItemsRaiseSize();
                const spanWidth = `span ${Math.round(totalSize / (itemsRaiseSizeCache.current ?? 1))}`;
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
            try {
                overallResize = true; // mark_in
                updateFirstRowItems(); // side effect: modify item's [class] => modify some item's [margin(Inline|Block)Start]
            }
            finally {
                setTimeout(() => { // wait until all items have processed the resize event and the browser has already paint the ui
                    overallResize = false; // mark_out
                }, 0);
            } // try
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
