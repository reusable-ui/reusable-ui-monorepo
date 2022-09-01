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
import type {
    // types:
    Role,
}                           from '@reusable-ui/semantics'       // a semantic management system for react web components
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
import {
    // react components:
    DropdownActionType,
    DropdownExpandedChangeEvent,
    
    DropdownProps,
    Dropdown,
    
    DropdownComponentProps,
}                           from '@reusable-ui/dropdown'        // a base component
import {
    // defaults:
    defaultOrientationableOptions as listDefaultOrientationableOptions,
    
    
    
    // styles:
    ListStyle,
    ListVariant,
    
    
    
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
const _defaultTabIndex   : number            = -1   // makes the <List> programatically focusable
const _defaultActionCtrl : boolean|undefined = true // the default for <ListItem>(s) is clickable



// utilities:
export const calculateSemanticRole = <TElement extends Element = HTMLElement>(props: ListProps<TElement>, defaultActionCtrl: boolean|undefined): Role|null => {
    if (props.role) return null; // pre defined role => no need to determine the role automatically
    
    
    
    const listItems         = props.children;
    if (React.Children.toArray(listItems).some((listItem) => {
        if (!React.isValidElement<ListItemProps<Element>>(listItem)) {
            return !(defaultActionCtrl ?? false);                              // if the default is not an actionCtrl => not a menu item => role='dialog'
        }
        else {
            return !(listItem.props.actionCtrl ?? defaultActionCtrl ?? false); // if <ListItem>  is not an actionCtrl => not a menu item => role='dialog'
        } // if
    })) return 'dialog'; // one/some <ListItem>s are [actionCtrl=false] => role='dialog'
    
    
    
    return 'menu'; // all <ListItem>s are [actionCtrl=true] => role='menu'
};



// react components:

export {
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
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
        
        
        
        // behaviors:
        actionCtrl            : defaultActionCtrl = listComponent.props.actionCtrl ?? _defaultActionCtrl,
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
    });
    const handleKeyDown         = useMergeEvents(
        // preserves the original `onKeyDown` from `listComponent`:
        listComponent.props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    const handleExpandedChange  = useMergeEvents(
        // preserves the original `onExpandedChange` from `dropdownComponent`:
        dropdownComponent.props.onExpandedChange,
        
        
        
        // actions:
        onExpandedChange,
    );
    const handleFloatingUpdate  = useMergeEvents(
        // preserves the original `onFloatingUpdate` from `dropdownComponent`:
        dropdownComponent.props.onFloatingUpdate,
        
        
        
        // actions:
        onFloatingUpdate,
    );
    
    
    
    // jsx:
    /* <Dropdown> */
    return React.cloneElement<DropdownProps<Element, TDropdownListExpandedChangeEvent>>(dropdownComponent,
        // props:
        {
            // refs:
            outerRef         : mergedDropdownRef,
            
            
            
            // semantics:
            semanticRole     : dropdownComponent.props.semanticRole ?? props.semanticRole ?? calculateSemanticRole(props, defaultActionCtrl),
            
            
            
            // variants:
            orientation      : dropdownComponent.props.orientation ?? dropdownOrientation ?? props.orientation,
            
            
            
            // behaviors:
            lazy             : dropdownComponent.props.lazy ?? lazy,
            
            
            
            // states:
            expanded         : dropdownComponent.props.expanded ?? expanded,
            onExpandedChange : handleExpandedChange,
            
            
            
            // floatable:
            floatingOn,
            floatingPlacement,
            floatingMiddleware,
            floatingStrategy,
            
            floatingAutoFlip,
            floatingAutoShift,
            floatingOffset,
            floatingShift,
            
            onFloatingUpdate : handleFloatingUpdate,
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
                actionCtrl  : defaultActionCtrl,
                
                
                
                // handlers:
                onKeyDown   : handleKeyDown,
            },
            
            
            
            // children:
            React.Children.map(listComponent.props.children ?? listItems, (listItem, index) => {
                // conditions:
                if (!onExpandedChange)                                          return listItem; // [onExpandedChange] was not set => ignore
                if (!React.isValidElement<ListItemProps<Element>>(listItem))    return listItem; // not a <ListItem>               => ignore
                if (!(listItem.props.actionCtrl ?? defaultActionCtrl ?? false)) return listItem; // <ListItem actionCtrl={false}>  => ignore
                // if <Dropdown> or <List> or <ListItem> is disabled => the <AccessibilityProvider> will take care for us
                
                
                
                // jsx:
                return (
                    <ListItemWithExpandedHandler<TDropdownListExpandedChangeEvent>
                        // positions:
                        listIndex={index}
                        
                        
                        
                        // states:
                        onExpandedChange={onExpandedChange}
                        
                        
                        
                        // components:
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
        // states:
        Required<Pick<DropdownProps<Element, TDropdownListExpandedChangeEvent>, 'onExpandedChange'>>
{
    // positions:
    listIndex         : number
    
    
    
    // components:
    listItemComponent : React.ReactElement<ListItemProps<Element>>
}
const ListItemWithExpandedHandler = <TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent = DropdownListExpandedChangeEvent>({listIndex, onExpandedChange, listItemComponent}: ListItemWithExpandedHandlerProps<TDropdownListExpandedChangeEvent>): JSX.Element|null => {
    // handlers:
    const handleExpandedChange = onExpandedChange;
    const handleClickInternal  = useEvent<React.MouseEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // a <ListItem> was clicked => close the <DropdownList>:
        handleExpandedChange({ expanded: false, actionType: listIndex } as TDropdownListExpandedChangeEvent);
        event.preventDefault(); // mark as handled
    });
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
            // behaviors:
            actionCtrl : listItemComponent.props.actionCtrl ?? true,
            
            
            
            // handlers:
            onClick    : handleClick,
        },
    );
};
