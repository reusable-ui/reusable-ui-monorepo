// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks
import type {
    // types:
    Role,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // hooks:
    OrientationName,
    OrientationVariant,
}                           from '@reusable-ui/basic'           // a base component
import {
    // types:
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
    
    
    
    // react components:
    DropdownCloseType,
    DropdownActiveChangeEvent,
    
    DropdownProps,
    Dropdown,
    
    DropdownComponentProps,
}                           from '@reusable-ui/dropdown'        // a base component
import {
    // types:
    ListStyle,
    ListVariant,
    
    
    
    // hooks:
    defaultOrientationRuleOptions as defaultListOrientationRuleOptions,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
    
    ListProps,
    List,
    
    ListComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
const _defaultTabIndex   : number  = -1   // make the <List> programatically focusable
const _defaultActionCtrl : boolean = true // the default for <ListItem>(s) is clickable



// utilities:
export const calculateSemanticRole = <TElement extends Element = HTMLElement>(props: ListProps<TElement>): Role|null => {
    if (props.role) return null; // pre defined role => no need to determine the role automatically
    
    
    
    const listItems         = props.children;
    const defaultActionCtrl = props.actionCtrl ?? true;
    if (React.Children.toArray(listItems).some((listItem) => {
        if (!React.isValidElement<ListItemProps<Element>>(listItem)) {
            return !defaultActionCtrl;                                // if the default is not an actionCtrl => not a menu item => role='dialog'
        }
        else {
            return !(listItem.props.actionCtrl ?? defaultActionCtrl); // if <ListItem>  is not an actionCtrl => not a menu item => role='dialog'
        } // if
    })) return 'dialog'; // one/some <ListItem>s are [actionCtrl=false] => role='dialog'
    
    
    
    return 'menu'; // all <ListItem>s are [actionCtrl=true] => role='menu'
};



// react components:

// ListItem => DropdownListItem
export type {
    ListItemProps,
    ListItemProps as DropdownListItemProps,
    ListItemProps as ItemProps,
}
export {
    ListItem,
    ListItem as DropdownListItem,
    ListItem as Item,
}



// ListSeparatorItem => DropdownListSeparatorItem
export type {
    ListSeparatorItemProps,
    ListSeparatorItemProps as DropdownListSeparatorItemProps,
    ListSeparatorItemProps as SeparatorItemProps,
}
export {
    ListSeparatorItem,
    ListSeparatorItem as DropdownListSeparatorItem,
    ListSeparatorItem as SeparatorItem,
}



export type DropdownListCloseType = DropdownCloseType|number
export interface DropdownListActiveChangeEvent extends DropdownActiveChangeEvent {
    closeType : DropdownListCloseType
}

export interface DropdownListProps<TElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
        // bases:
        Omit<DropdownProps<TElement, TDropdownListActiveChangeEvent>,
            // children:
            |'children' // we redefined `children` prop as <ListItem>(s)
        >,
        
        // components:
        Omit<ListComponentProps<Element>,
            // children:
            |'listItems' // we redefined `children` prop as <ListItem>(s)
        >,
        DropdownComponentProps<Element>
{
    // children:
    children ?: ListComponentProps<Element>['listItems']
}
const DropdownList = <TElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>(props: DropdownListProps<TElement, TDropdownListActiveChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        // onActiveChange, // do not steal `onActiveChange` from `props`, otherwise the [esc] key and blur event will not handled by <Dropdown>
        
        
        
        // components:
        listRef,
        listOrientation,
        listComponent         = (<List<Element> /> as React.ReactComponentElement<any, ListProps<Element>>),
        children              : listItems,
        
        dropdownRef,
        dropdownOrientation,
        dropdownComponent     = (<Dropdown<Element> >{listComponent}</Dropdown> as React.ReactComponentElement<any, DropdownProps<Element>>),
    ...restDropdownProps} = props;
    const onActiveChange = props.onActiveChange; // copy the `onActiveChange` instead of steal it from `props`
    
    
    
    // variants:
    const isListOrientationBlock = ((listOrientation ?? defaultListOrientationRuleOptions.defaultOrientation) === 'block');
    
    
    
    // refs:
    const mergedListRef = useMergeRefs(
        // preserves the original `elmRef` from `listComponent`:
        listComponent.props.elmRef,
        
        
        
        // preserves the original `listRef` from `props`:
        listRef,
    );
    const mergedDropdownRef = useMergeRefs(
        // preserves the original `outerRef` from `dropdownComponent`:
        dropdownComponent.props.outerRef,
        
        
        
        // preserves the original `dropdownRef` from `props`:
        dropdownRef,
        // preserves the original `outerRef` from `props`:
        props.outerRef,
    );
    
    
    
    // handlers:
    const handleKeyDownInternal = useEvent<React.KeyboardEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // functions:
        let allPossibleFocusableElementsCache : Element[]|undefined = undefined;
        const sortByTabIndex = (a: Element|undefined, b: Element|undefined) => {
            if (!a || !b) return 0;
            return ((a as HTMLElement|SVGElement).tabIndex ?? 0) - ((b as HTMLElement|SVGElement).tabIndex ?? 0);
        };
        const getAllPossibleFocusableElements = (): Element[] => {
            if (allPossibleFocusableElementsCache) return allPossibleFocusableElementsCache;
            
            
            
            return allPossibleFocusableElementsCache = (
                Array.from(event.currentTarget.children)
                .flatMap((liElement) => {
                    const focusableElements = (
                        Array.from(liElement.querySelectorAll(
`:is(
    a,
    button,
    textarea,
    select,
    details,
    input:not([type="hidden"]),
    [tabindex]:not([tabindex^="-"])
):not(
    :is(
        [disabled]:not([disabled="false"]),
        [aria-disabled]:not([aria-disabled="false"])
    )
)`                      ))
                        .sort(sortByTabIndex)
                    );
                    return {
                        primary : focusableElements.at(0),
                        items   : focusableElements,
                    };
                })
                .sort((x, y) => sortByTabIndex(x.primary, y.primary))
                .flatMap((item) => item.items)
            );
        };
        
        const setFocus = (index: number, fallback?: number) => {
            // find the element:
            let element = getAllPossibleFocusableElements().at(index);
            if (!element && (fallback !== undefined)) {
                element = getAllPossibleFocusableElements().at(fallback);
            } // if
            
            
            
            // set focus:
            (element as HTMLElement|SVGElement|undefined)?.focus?.();
        };
        
        const focusPrev  = () => {
            let focusedElement = document.activeElement;
            // filter only for focusable elements inside the <List>:
            if (focusedElement && !getAllPossibleFocusableElements().includes(focusedElement)) focusedElement = null;
            
            if (!focusedElement) {
                setFocus(-1); // the last focusable element
            }
            else {
                setFocus(
                    getAllPossibleFocusableElements().indexOf(focusedElement) - 1,
                    -1
                );
            } // if
        };
        const focusNext  = () => {
            let focusedElement = document.activeElement;
            // filter only for focusable elements inside the <List>:
            if (focusedElement && !getAllPossibleFocusableElements().includes(focusedElement)) focusedElement = null;
            
            if (!focusedElement) {
                setFocus(0); // the first focusable element
            }
            else {
                setFocus(
                    getAllPossibleFocusableElements().indexOf(focusedElement) + 1,
                    0
                );
            } // if
        };
        const focusFirst = () => {
            setFocus(0); // the first focusable element
        };
        const focusLast  = () => {
            setFocus(-1); // the last focusable element
        };
        
        
        
        if (((): boolean => {
            const isKeyOf = (key: string): boolean => {
                return ((event.key.toLowerCase() === key) || (event.code.toLowerCase() === key));
            };
            const isRtl = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (                                     isKeyOf('tab'       )) focusNext();
            else if (                                     isKeyOf('pagedown'  )) focusNext();
            else if (                                     isKeyOf('pageup'    )) focusPrev();
            
            else if (                                     isKeyOf('home'      )) focusFirst();
            else if (                                     isKeyOf('end'       )) focusLast();
            
            else if ( isListOrientationBlock &&           isKeyOf('arrowdown' )) focusNext();
            else if ( isListOrientationBlock &&           isKeyOf('arrowup'   )) focusPrev();
            
            else if (!isListOrientationBlock && !isRtl && isKeyOf('arrowleft' )) focusNext();
            else if (!isListOrientationBlock && !isRtl && isKeyOf('arrowright')) focusPrev();
            
            else if (!isListOrientationBlock &&  isRtl && isKeyOf('arrowright')) focusNext();
            else if (!isListOrientationBlock &&  isRtl && isKeyOf('arrowleft' )) focusPrev();
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    }, [isListOrientationBlock]);
    const handleKeyDown         = useMergeEvents(
        // preserves the original `onKeyDown` from `listComponent`:
        listComponent.props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    
    
    
    // jsx:
    /* <Dropdown> */
    return React.cloneElement<DropdownProps<Element>>(dropdownComponent,
        // props:
        {
            // other props:
            ...restDropdownProps as DropdownProps<Element>,
            
            
            
            // refs:
            outerRef     : mergedDropdownRef,
            
            
            
            // semantics:
            semanticRole : dropdownComponent.props.semanticRole ?? props.semanticRole ?? calculateSemanticRole(props),
            
            
            
            // layouts:
            orientation  : dropdownComponent.props.orientation ?? dropdownOrientation ?? props.orientation,
        },
        
        
        
        // children:
        /* <List> */
        ((dropdownComponent.props.children !== listComponent) ? dropdownComponent.props.children : React.cloneElement<ListProps<Element>>(listComponent,
            // props:
            {
                // refs:
                elmRef      : mergedListRef,
                
                
                
                // layouts:
                orientation : listComponent.props.orientation ?? listOrientation,
                
                
                
                // accessibilities:
                tabIndex    : listComponent.props.tabIndex    ?? _defaultTabIndex,
                
                
                
                // behaviors:
                actionCtrl  : listComponent.props.actionCtrl  ?? _defaultActionCtrl,
                
                
                
                // handlers:
                onKeyDown   : handleKeyDown,
            },
            
            
            
            // children:
            React.Children.map(listComponent.props.children ?? listItems, (listItem, index) => {
                // conditions:
                if (!onActiveChange)                                                                      return listItem; // [onActiveChange] was not set  => ignore
                if (!React.isValidElement<ListItemProps<Element>>(listItem))                              return listItem; // not a <ListItem>              => ignore
                if (!(listItem.props.actionCtrl ?? listComponent.props.actionCtrl ?? _defaultActionCtrl)) return listItem; // <ListItem actionCtrl={false}> => ignore
                // if <Dropdown> or <List> or <ListItem> is disabled => the <AccessibilityProvider> will take care for us
                
                
                
                // jsx:
                return (
                    <ListItemWithActiveHandler<TDropdownListActiveChangeEvent>
                        // accessibilities:
                        onActiveChange={onActiveChange}
                        
                        
                        
                        // components:
                        listIndex={index}
                        listItemComponent={listItem}
                    />
                );
            }),
        )),
    );
};
export {
    DropdownList,
    DropdownList as default,
}

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy, PopupPosition, PopupSide }

export type { ListStyle, ListVariant }



interface ListItemWithActiveHandlerProps<TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
    // bases:
        ListItemProps<Element>
{
    // accessibilities:
    onActiveChange    : EventHandler<TDropdownListActiveChangeEvent>
    
    
    
    // components:
    listIndex         : number
    listItemComponent : React.ReactElement<ListItemProps<Element>>
}
const ListItemWithActiveHandler = <TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>(props: ListItemWithActiveHandlerProps<TDropdownListActiveChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        onActiveChange,
        
        
        
        // components:
        listIndex,
        listItemComponent,
    ...restListItemProps} = props;
    
    
    
    // handlers:
    const handleActiveChange  = onActiveChange;
    const handleClickInternal = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // a <ListItem> was clicked => close the <DropdownList>:
        handleActiveChange?.({ newActive: false, closeType: listIndex } as TDropdownListActiveChangeEvent);
        event.preventDefault(); // mark as handled
    }, [handleActiveChange, listIndex]);
    const handleClick         = useMergeEvents(
        // preserves the original `onClick` from `listItemComponent`:
        listItemComponent.props.onClick,
        
        
        
        // handlers:
        handleClickInternal,
    );
    
    
    
    // jsx:
    /* <ListItem> */
    return React.cloneElement<ListItemProps<Element>>(listItemComponent,
        // props:
        {
            // other props:
            ...restListItemProps,
            
            
            
            // handlers:
            onClick : handleClick,
        },
    );
};
