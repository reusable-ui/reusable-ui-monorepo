// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks
import {
    // utilities:
    setFocusFirst,
    setFocusLast,
    setFocusPrev,
    setFocusNext,
}                           from '@reusable-ui/focuses'         // focusing functions

// reusable-ui variants:
import {
    // hooks:
    useOrientationable,
}                           from '@reusable-ui/orientationable' // a capability of UI to rotate its layout

// reusable-ui components:
import type {
    // types:
    Role,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // react components:
    DropdownActionType,
    DropdownExpandedChangeEvent,
    
    DropdownProps,
    Dropdown,
    
    DropdownComponentProps,
}                           from '@reusable-ui/dropdown'        // a base component
import {
    // types:
    ListStyle,
    ListVariant,
    
    
    
    // hooks:
    defaultOrientationableOptions as listDefaultOrientationableOptions,
    
    
    
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



export type DropdownListActionType = DropdownActionType|number
export interface DropdownListExpandedChangeEvent extends DropdownExpandedChangeEvent {
    actionType : DropdownListActionType
}

export interface DropdownListProps<TElement extends Element = HTMLElement, TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent = DropdownListExpandedChangeEvent>
    extends
        // bases:
        ListProps<TElement>,
        
        // dropdowns:
        Omit<DropdownProps<Element, TDropdownListExpandedChangeEvent>,
            // refs:
            |'elmRef'|'outerRef' // all (elm|outer)Ref are for <List>
            
            // DOMs:
            |Exclude<keyof React.DOMAttributes<Element>, 'children'> // all DOM [attributes] are for <List>
            
            // children:
            |'children' // we redefined `children` prop as <ListItem>(s)
        >,
        
        // components:
        Omit<ListComponentProps<Element>,
            // children:
            |'listItems' // we redefined `children` prop as <ListItem>(s)
        >,
        DropdownComponentProps<Element, TDropdownListExpandedChangeEvent>
{
}
const DropdownList = <TElement extends Element = HTMLElement, TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent = DropdownListExpandedChangeEvent>(props: DropdownListProps<TElement, TDropdownListExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // behaviors:
        lazy,
        
        
        
        // states:
        expanded,         // take, to be handled by <Dropdown>
        onExpandedChange, // take, to be handled by <Dropdown>
        
        
        
        // floatable:
        floatingOn,
        floatingPlacement,
        floatingMiddleware,
        floatingStrategy,
        
        floatingAutoFlip,
        floatingAutoShift,
        floatingOffset,
        floatingShift,
        
        onFloatingUpdate,
        
        
        
        // components:
        listRef,
        listOrientation,
        listStyle,
        listComponent         = (<List<Element> /> as React.ReactComponentElement<any, ListProps<Element>>),
        children              : listItems,
        
        dropdownRef,
        dropdownOrientation,
        dropdownComponent     = (<Dropdown<Element, TDropdownListExpandedChangeEvent> >{listComponent}</Dropdown> as React.ReactComponentElement<any, DropdownProps<Element, TDropdownListExpandedChangeEvent>>),
    ...restListProps} = props;
    
    
    
    // variants:
    const listOrientationableVariant = useOrientationable(props, listDefaultOrientationableOptions);
    const listIsOrientationBlock     = listOrientationableVariant.isOrientationBlock;
    
    
    
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
        
        
        
        if (((): boolean => {
            const isKeyOf = (key: string): boolean => {
                return ((event.key.toLowerCase() === key) || (event.code.toLowerCase() === key));
            };
            const isRtl = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (                                     isKeyOf('tab'       )) setFocusNext(event.currentTarget);
            else if (                                     isKeyOf('pagedown'  )) setFocusNext(event.currentTarget);
            else if (                                     isKeyOf('pageup'    )) setFocusPrev(event.currentTarget);
            
            else if (                                     isKeyOf('home'      )) setFocusFirst(event.currentTarget);
            else if (                                     isKeyOf('end'       )) setFocusLast(event.currentTarget);
            
            else if ( listIsOrientationBlock &&           isKeyOf('arrowdown' )) setFocusNext(event.currentTarget);
            else if ( listIsOrientationBlock &&           isKeyOf('arrowup'   )) setFocusPrev(event.currentTarget);
            
            else if (!listIsOrientationBlock && !isRtl && isKeyOf('arrowleft' )) setFocusNext(event.currentTarget);
            else if (!listIsOrientationBlock && !isRtl && isKeyOf('arrowright')) setFocusPrev(event.currentTarget);
            
            else if (!listIsOrientationBlock &&  isRtl && isKeyOf('arrowright')) setFocusNext(event.currentTarget);
            else if (!listIsOrientationBlock &&  isRtl && isKeyOf('arrowleft' )) setFocusPrev(event.currentTarget);
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    }, [listIsOrientationBlock]);
    const handleKeyDown         = useMergeEvents(
        // preserves the original `onKeyDown` from `listComponent`:
        listComponent.props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    
    
    
    // jsx:
    /* <Dropdown> */
    return React.cloneElement<DropdownProps<Element, TDropdownListExpandedChangeEvent>>(dropdownComponent,
        // props:
        {
            // refs:
            outerRef     : mergedDropdownRef,
            
            
            
            // semantics:
            semanticRole : dropdownComponent.props.semanticRole ?? props.semanticRole ?? calculateSemanticRole(props),
            
            
            
            // variants:
            orientation  : dropdownComponent.props.orientation ?? dropdownOrientation ?? props.orientation,
            
            
            
            // behaviors:
            lazy,
            
            
            
            // states:
            expanded,
            onExpandedChange,
            
            
            
            // floatable:
            floatingOn,
            floatingPlacement,
            floatingMiddleware,
            floatingStrategy,
            
            floatingAutoFlip,
            floatingAutoShift,
            floatingOffset,
            floatingShift,
            
            onFloatingUpdate,
        },
        
        
        
        // children:
        /* <List> */
        ((dropdownComponent.props.children !== listComponent) ? dropdownComponent.props.children : React.cloneElement<ListProps<Element>>(listComponent,
            // props:
            {
                // other props:
                ...restListProps,
                
                
                
                // refs:
                elmRef      : mergedListRef,
                
                
                
                // variants:
                orientation : listComponent.props.orientation ?? listOrientation,
                listStyle   : listComponent.props.listStyle   ?? listStyle,
                
                
                
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
                if (!onExpandedChange)                                                                    return listItem; // [onExpandedChange] was not set => ignore
                if (!React.isValidElement<ListItemProps<Element>>(listItem))                              return listItem; // not a <ListItem>               => ignore
                if (!(listItem.props.actionCtrl ?? listComponent.props.actionCtrl ?? _defaultActionCtrl)) return listItem; // <ListItem actionCtrl={false}>  => ignore
                // if <Dropdown> or <List> or <ListItem> is disabled => the <AccessibilityProvider> will take care for us
                
                
                
                // jsx:
                return (
                    <ListItemWithExpandedHandler<TDropdownListExpandedChangeEvent>
                        // states:
                        onExpandedChange={onExpandedChange}
                        
                        
                        
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

export type { ListStyle, ListVariant }



interface ListItemWithExpandedHandlerProps<TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent = DropdownListExpandedChangeEvent>
    extends
        // bases:
        ListItemProps<Element>,
        Required<Pick<DropdownProps<Element, TDropdownListExpandedChangeEvent>, 'onExpandedChange'>>
{
    // components:
    listIndex         : number
    listItemComponent : React.ReactElement<ListItemProps<Element>>
}
const ListItemWithExpandedHandler = <TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent = DropdownListExpandedChangeEvent>(props: ListItemWithExpandedHandlerProps<TDropdownListExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // states:
        onExpandedChange,
        
        
        
        // components:
        listIndex,
        listItemComponent,
    ...restListItemProps} = props;
    
    
    
    // handlers:
    const handleExpandedChange = onExpandedChange;
    const handleClickInternal  = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // a <ListItem> was clicked => close the <DropdownList>:
        handleExpandedChange({ expanded: false, actionType: listIndex } as TDropdownListExpandedChangeEvent);
        event.preventDefault(); // mark as handled
    }, [handleExpandedChange, listIndex]);
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
