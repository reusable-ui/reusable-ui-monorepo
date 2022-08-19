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

// reusable-ui configs:
import {
    // configs:
    spacers,
}                           from '@reusable-ui/spacers'         // a spacer (gap) management system

// reusable-ui utilities:
import {
    // utilities:
    isReusableUiComponent,
}                           from '@reusable-ui/utilities'       // common utility functions
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
    defaultInlineOrientationableOptions,
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
    // react components:
    GenericProps,
    Generic,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // styles:
    usesListItemBaseLayout,
    ListBasicStyle,
    ListVariant,
    
    
    
    // react components:
    ListItem,
    ListProps,
    List,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
export const defaultOrientationableOptions = defaultInlineOrientationableOptions;



// styles:
export const usesGroupItemLayout = (options?: OrientationableOptions) => {
    // options:
    const orientationableStuff = usesOrientationable(options, defaultOrientationableOptions);
    options = orientationableStuff;
    
    
    
    return style({
        ...imports([
            // layouts:
            usesListItemBaseLayout(options),
        ]),
        ...style({
            // no layout modification needed.
            // the layout is belong to the <Button>/<Radio>/<Check> itself.
            
            
            
            // sizes:
            // just a few tweak:
            flex      : [[1, 1, 'auto']], // growable, shrinkable, initial from it's height (for variant `.block`) or width (for variant `.inline`)
            
            
            
            // customize:
            ...usesCssProps(groups), // apply config's cssProps
        }),
    });
};
export const usesGroupItemVariants = () => {
    // dependencies:
    
    // variants:
    const {resizableRule} = usesResizable(groups);
    
    
    
    return style({
        ...imports([
            // variants:
            resizableRule,
        ]),
    });
};

export const useGroupItemStyleSheet = dynamicStyleSheet(() => ({
    ...imports([
        // layouts:
        usesGroupItemLayout(),
        
        // variants:
        usesGroupItemVariants(),
    ]),
}), { specificityWeight: 2, id: 'd2scsx4yqe' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// configs:
export const [groups, groupValues, cssGroupConfig] = cssConfig(() => {
    return {
        /* no config props yet */
    };
}, { prefix: 'grp' });



// react components:

interface GroupItemProps
{
    children : Exclude<React.ReactNode, Iterable<React.ReactNode>>
}
const GroupItem = ({children: child}: GroupItemProps): JSX.Element|number|boolean|null|undefined => {
    // jsx:
    if (!React.isValidElement(child)) return child; // unknown element or text or null|undefined
    
    return (
        <ItemWrapper>
            {child}
        </ItemWrapper>
    );
};

interface ItemWrapperProps
{
    // components:
    children : React.ReactElement
}
const ItemWrapper = ({children: component}: ItemWrapperProps): JSX.Element => {
    // styles:
    const styleSheet = useGroupItemStyleSheet();
    
    
    
    // verifies:
    const isReusableUiModalComponent : boolean = isReusableUiComponent<GenericProps<Element>>(component);
    
    
    
    // classes:
    const classes = useMergeClasses(
        // preserves the original `classes` from `component`:
        (
            isReusableUiModalComponent
            ?
            (component.props as GenericProps<Element>).classes
            :
            ((component.props as React.HTMLAttributes<HTMLElement>|React.SVGAttributes<SVGElement>).className ?? '').split(' ')
        ),
        
        
        
        // styles:
        styleSheet.main,
    );
    
    
    
    // jsx:
    return React.cloneElement(component,
        // props:
        {
            // classes:
            ...(isReusableUiModalComponent ? {
                classes   : classes,
            } : {
                className : classes.filter((c) => !!c).join(' '),
            }),
        },
    );
};



export interface GroupProps<TElement extends Element = HTMLElement>
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
const Group = <TElement extends Element = HTMLElement>(props: GroupProps<TElement>): JSX.Element|null => {
    // styles:
    const styleSheet             = useGroupStyleSheet();
    
    
    
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
    const groupRefInternal = useRef<TElement|null>(null);
    const mergedElmRef       = useMergeRefs(
        // preserves the original `elmRef`:
        elmRef,
        
        
        
        groupRefInternal,
    );
    
    
    
    // dom effects:
    const itemsRaiseSizeCache = useRef<number>(1);
    useIsomorphicLayoutEffect(() => {
        // conditions:
        const group = groupRefInternal.current;
        if (!group) return; // group was unloaded => nothing to do
        
        
        
        // setups:
        const cancelRequest = requestAnimationFrame(() => { // wait until the cssfn is fully loaded
            itemsRaiseSizeCache.current = Math.max(1, // limits the precision to 1px, any value less than 1px will be scaled up to 1px
                Number.parseInt(
                    isOrientationBlock
                    ?
                    getComputedStyle(group).gridAutoRows
                    :
                    getComputedStyle(group).gridAutoColumns
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
        const group = groupRefInternal.current;
        if (!group) return; // group was unloaded => nothing to do
        
        
        
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
                    style.gridColumnEnd = ''; // clear from residual effect from <Group orientation="inline"> (if was)
                }
                else {
                    style.gridRowEnd    = ''; // clear from residual effect from <Group orientation="block"> (if was)
                    style.gridColumnEnd = spanWidth;
                } // if
            });
        };
        
        let firstRowItems: Element[] = [];
        const updateFirstRowItems = () => {
            const newFirstRowItems = (() => {
                const items = Array.from(group.children);
                let selectionIndex = -1;
                let prevPos = -1;
                for (const item of items) {
                    const { left, top, width, height } = item.getBoundingClientRect();
                    
                    
                    
                    /*
                        select the items in the first_group_row by comparing the left/top to the prev one.
                        if equal/greater than prev => the item is still in the same row,
                        otherwise => the item in the next row
                     */
                    const currentPos = (isOrientationBlock ? left : top);
                    if (currentPos < prevPos) break;
                    
                    
                    
                    prevPos = currentPos + (isOrientationBlock ? width : height);
                    selectionIndex++;
                } // for
                
                
                
                // here the items in the first_group_row:
                return items.slice(0, selectionIndex + 1); // select the first_item to the last_item in the first_group_row
            })();
            
            
            
            // diffing the newFirstRowItems vs firstRowItems:
            const removedItems =    firstRowItems.filter((item) => !newFirstRowItems.includes(item)); // old_items are not exist   in new_items
            const addedItems   = newFirstRowItems.filter((item) =>    !firstRowItems.includes(item)); // new_items are not already in old_items
            
            removedItems.forEach((removedItem) => removedItem.classList.remove('firstRow'));
            addedItems.forEach((addedItem)     =>   addedItem.classList.add('firstRow'));
            
            firstRowItems = newFirstRowItems; // update newFirstRowItems => (old)firstRowItems
        };
        
        
        
        // setups:
        let oldGroupSize : ResizeObserverSize|undefined = undefined;
        const groupResizeObserver = new ResizeObserver((entries) => {
            // conditions:
            if (!entries[0].target.parentElement) return; // the <Group> is being removed => ignore
            
            
            
            const newGroupSize = entries[0].contentBoxSize[0]; // get the client size
            if (isPartiallyResized(oldGroupSize, newGroupSize, isOrientationBlock)) {
                oldGroupSize = newGroupSize;
                
                handleGroupResize();
            } // if
        });
        
        let overallResize = true;
        const handleGroupResize = () => {
            overallResize = true;
            updateFirstRowItems(); // side effect: modify item's [class] => modify some item's [margin(Inline|Block)Start]
            
            setTimeout(() => { // wait until all items have processed the resize event and the browser has already paint the ui
                overallResize = false;
            }, 0);
        };
        
        groupResizeObserver.observe(group, _defaultGroupResizeObserverOptions);
        
        
        
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
        
        for (const item of Array.from(group.children)) {
            itemResizeObserver.observe(item, _defaultItemResizeObserverOptions);
        } // for
        
        
        
        // in case of the <Group>'s children are modified using *vanilla* way,
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
        mutationObserver.observe(group, {
            childList  : true,  // watch  for child's DOM structure changes
            subtree    : false, // ignore for grandchild's DOM structure changes
            
            attributes : false, // ignore for any attribute changes
        });
        
        
        
        // cleanups:
        return () => {
            oldGroupSize = undefined;
            groupResizeObserver.disconnect();
            
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
    Group,
    Group as default,
}
