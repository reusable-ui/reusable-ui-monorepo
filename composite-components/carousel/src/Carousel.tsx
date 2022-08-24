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
    usesPrefixedProps,
}                           from '@cssfn/css-config'            // reads/writes css variables configuration

// reusable-ui configs:
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system

// reusable-ui utilities:
import {
    // hooks:
    useIsomorphicLayoutEffect,
    useMergeRefs,
    useMergeClasses,
}                           from '@reusable-ui/hooks'           // react helper hooks

// reusable-ui features:
import {
    // hooks:
    usesPadding,
}                           from '@reusable-ui/padding'         // padding (inner spacing) stuff of UI

// reusable-ui variants:
import {
    // hooks:
    usesResizable,
}                           from '@reusable-ui/resizable'       // size options of UI

// reusable-ui components:
import {
    // styles:
    ContentChildrenMediaOptions,
    usesContentLayout,
    usesContentVariants,
    
    
    
    // configs:
    contents,
    
    
    
    // react components:
    ContentProps,
    Content,
}                           from '@reusable-ui/content'         // a base component



// styles:

// .carousel > .items > .item > .media
const itemsElm   = ':where(.items)'; // zero specificity
const dummyElm   = '.dummy';
const itemElm    = '*';              // zero specificity
const prevBtnElm = '.prevBtn';
const nextBtnElm = '.nextBtn';
const navElm     = '.nav';



export const usesNavBtnLayout = () => {
    return style({
        // customize:
        ...usesCssProps(usesPrefixedProps(contents, 'navBtn')), // apply config's cssProps starting with navBtn***
    });
};
export const usesPrevBtnLayout = () => {
    return style({
        // layouts:
        gridArea : 'prevBtn',
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(contents, 'prevBtn')), // apply config's cssProps starting with prevBtn***
    });
};
export const usesNextBtnLayout = () => {
    return style({
        // layouts:
        gridArea : 'nextBtn',
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(contents, 'nextBtn')), // apply config's cssProps starting with nextBtn***
    });
};

export const usesNavLayout = () => {
    return style({
        // layouts:
        gridArea    : 'nav',
        
        
        
        // sizes:
        justifySelf : 'center', // do not stretch the nav, just place it at the center horizontally
        
        
        
        // customize:
        ...usesCssProps(usesPrefixedProps(contents, 'nav')), // apply config's cssProps starting with nav***
    });
};

export const usesCarouselLayout = (options?: ContentChildrenMediaOptions) => {
    // dependencies:
    
    // features:
    const {paddingRule, paddingVars} = usesPadding(carousels);
    
    
    
    return style({
        ...imports([
            // layouts:
            usesContentLayout(),
            
            // features:
            paddingRule,
        ]),
        ...style({
            // layouts:
            display             : 'grid', // use css grid for layouting, so we can customize the desired area later.
            
            // explicit areas:
            gridTemplateRows    : [[
                '1fr',
                'min-content',
            ]],
            gridTemplateColumns : [['15%', '1fr', '15%']],
            gridTemplateAreas   : [[
                '"prevBtn main nextBtn"',
                '"prevBtn nav  nextBtn"',
            ]],
            
            // child default sizes:
            justifyItems        : 'stretch', // each section fills the entire area's width
            alignItems          : 'stretch', // each section fills the entire area's height
            
            
            
            // children:
            ...children(itemsElm, {
                ...imports([
                    usesCarouselItemsLayout(options),
                ]),
            }),
            ...children(dummyElm, {
                // appearances:
             // visibility : 'hidden', // causing onScroll doesn't work in Firefox
                opacity    : 0,
                position   : 'relative',
                zIndex     : -1,
            }),
            
            ...children([prevBtnElm, nextBtnElm], {
                ...imports([
                    usesNavBtnLayout(),
                ]),
            }),
            ...children(prevBtnElm, {
                ...imports([
                    usesPrevBtnLayout(),
                ]),
            }),
            ...children(nextBtnElm, {
                ...imports([
                    usesNextBtnLayout(),
                ]),
            }),
            
            ...children(navElm, {
                ...imports([
                    usesNavLayout(),
                ]),
            }),
            
            
            
            // customize:
            ...usesCssProps(carousels), // apply config's cssProps
            
            
            
            // spacings:
         // padding       : paddingVars.padding,
            paddingInline : paddingVars.paddingInline,
            paddingBlock  : paddingVars.paddingBlock,
        }),
    });
};
export const usesCarouselVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(carousels);
    
    
    
    return style({
        ...imports([
            // variants:
            usesContentVariants(),
            resizableRule,
        ]),
    });
};

export const useCarouselStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesCarouselLayout(),
        
        // variants:
        usesCarouselVariants(),
    ]),
}), { id: 'v35mas3qt6' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



export interface CarouselVariant {
    infiniteLoop ?: boolean
}
export const useCarouselVariant = (props: CarouselVariant) => {
    return {
        infiniteLoop: props.infiniteLoop ?? false,
    };
};



// configs:
export const [carousels, carouselValues, cssCarouselConfig] = cssConfig(() => {
    return {
        // borders:
        navBtnBorderRadius  : '0px'                     as CssKnownProps['borderRadius'],
        
        
        
        // spacings:
        paddingInline       : '0px'                     as CssKnownProps['paddingInline'],
        paddingBlock        : '0px'                     as CssKnownProps['paddingBlock' ],
        
        navMarginBlockEnd   : contents.paddingBlock     as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndSm : contents.paddingBlockSm   as CssKnownProps['marginBlockEnd'],
        navMarginBlockEndLg : contents.paddingBlockLg   as CssKnownProps['marginBlockEnd'],
    };
}, { prefix: 'crsl' });



// react components:
export interface CarouselProps<TElement extends Element = HTMLElement>
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
const Carousel = <TElement extends Element = HTMLElement>(props: CarouselProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet             = useCarouselStyleSheet();
    
    
    
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
    const carouselRefInternal = useRef<TElement|null>(null);
    const mergedElmRef       = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        carouselRefInternal,
    );
    
    
    
    // dom effects:
    const itemsRaiseSizeCache = useRef<number>(1);
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const carousel = carouselRefInternal.current;
        if (!carousel) return; // carousel was unloaded => nothing to do
        
        
        
        // setups:
        const cancelRequest = requestAnimationFrame(() => { // wait until the cssfn is fully loaded
            itemsRaiseSizeCache.current = Math.max(1, // limits the precision to 1px, any value less than 1px will be scaled up to 1px
                Number.parseInt(
                    isOrientationBlock
                    ?
                    getComputedStyle(carousel).gridAutoRows
                    :
                    getComputedStyle(carousel).gridAutoColumns
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
        const carousel = carouselRefInternal.current;
        if (!carousel) return; // carousel was unloaded => nothing to do
        
        
        
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
                    style.gridColumnEnd = ''; // clear from residual effect from <Carousel orientation="inline"> (if was)
                }
                else {
                    style.gridRowEnd    = ''; // clear from residual effect from <Carousel orientation="block"> (if was)
                    style.gridColumnEnd = spanWidth;
                } // if
            });
        };
        
        let firstRowItems: Element[] = [];
        const updateFirstRowItems = () => {
            const newFirstRowItems = (() => {
                const items = Array.from(carousel.children);
                let selectionIndex = -1;
                let prevPos = -1;
                for (const item of items) {
                    const { left, top, width, height } = item.getBoundingClientRect();
                    
                    
                    
                    /*
                        select the items in the first_carousel_row by comparing the left/top to the prev one.
                        if equal/greater than prev => the item is still in the same row,
                        otherwise => the item in the next row
                     */
                    const currentPos = (isOrientationBlock ? left : top);
                    if (currentPos < prevPos) break;
                    
                    
                    
                    prevPos = currentPos + (isOrientationBlock ? width : height);
                    selectionIndex++;
                } // for
                
                
                
                // here the items in the first_carousel_row:
                return items.slice(0, selectionIndex + 1); // select the first_item to the last_item in the first_carousel_row
            })();
            
            
            
            // diffing the newFirstRowItems vs firstRowItems:
            const removedItems =    firstRowItems.filter((item) => !newFirstRowItems.includes(item)); // old_items are not exist   in new_items
            const addedItems   = newFirstRowItems.filter((item) =>    !firstRowItems.includes(item)); // new_items are not already in old_items
            
            removedItems.forEach((removedItem) => removedItem.classList.remove('firstRow'));
            addedItems.forEach((addedItem)     =>   addedItem.classList.add('firstRow'));
            
            firstRowItems = newFirstRowItems; // update newFirstRowItems => (old)firstRowItems
        };
        
        
        
        // setups:
        let oldCarouselSize : ResizeObserverSize|undefined = undefined;
        const carouselResizeObserver = new ResizeObserver((entries) => {
            // conditions:
            if (!entries[0].target.parentElement) return; // the <Carousel> is being removed => ignore
            
            
            
            const newCarouselSize = entries[0].contentBoxSize[0]; // get the client size
            if (isPartiallyResized(oldCarouselSize, newCarouselSize, isOrientationBlock)) {
                oldCarouselSize = newCarouselSize;
                
                handleCarouselResize();
            } // if
        });
        
        let overallResize = true;
        const handleCarouselResize = () => {
            overallResize = true;
            updateFirstRowItems(); // side effect: modify item's [class] => modify some item's [margin(Inline|Block)Start]
            
            setTimeout(() => { // wait until all items have processed the resize event and the browser has already paint the ui
                overallResize = false;
            }, 0);
        };
        
        carouselResizeObserver.observe(carousel, _defaultCarouselResizeObserverOptions);
        
        
        
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
        
        for (const item of Array.from(carousel.children)) {
            itemResizeObserver.observe(item, _defaultItemResizeObserverOptions);
        } // for
        
        
        
        // in case of the <Carousel>'s children are modified using *vanilla* way,
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
        mutationObserver.observe(carousel, {
            childList  : true,  // watch  for child's DOM structure changes
            subtree    : false, // ignore for grandchild's DOM structure changes
            
            attributes : false, // ignore for any attribute changes
        });
        
        
        
        // cleanups:
        return () => {
            oldCarouselSize = undefined;
            carouselResizeObserver.disconnect();
            
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
    Carousel,
    Carousel as default,
}
