// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    useMergeEvents,
    useMergeRefs,
    
    
    
    // a semantic management system for react web components:
    Role,
    
    
    
    // focusing functions:
    setFocusFirst,
    setFocusLast,
    setFocusPrev,
    setFocusNext,
    
    
    
    // a capability of UI to rotate its layout:
    useOrientationable,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

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
    
    ListItemComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
const _defaultTabIndex   : number            = -1   // makes the <List> programatically focusable
const _defaultActionCtrl : boolean|undefined = true // the default for <ListItem>(s) is clickable
const _defaultListStyle  : ListStyle         = 'joined'



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
        
        // additional bases:
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
            // we don't need these extra properties because the <DropdownList> is sub <List>
            |'listRef'
            |'listOrientation'
            |'listStyle'
            
            
            
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
    const mergedDropdownRef = useMergeRefs(
        // preserves the original `outerRef` from `dropdownComponent`:
        dropdownComponent.props.outerRef,
        
        
        
        // preserves the original `dropdownRef` from `props`:
        dropdownRef,
        // preserves the original `outerRef` from `props`:
        props.outerRef,
    );
    
    
    
    // handlers:
    const handleKeyDownInternal        = useEvent<React.KeyboardEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        if (((): boolean => {
            const keyCode = event.code.toLowerCase();
            const isRtl   = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (                                     (keyCode === 'tab'       )) setFocusNext(event.currentTarget);
            else if (                                     (keyCode === 'pagedown'  )) setFocusNext(event.currentTarget);
            else if (                                     (keyCode === 'pageup'    )) setFocusPrev(event.currentTarget);
            
            else if (                                     (keyCode === 'home'      )) setFocusFirst(event.currentTarget);
            else if (                                     (keyCode === 'end'       )) setFocusLast(event.currentTarget);
            
            else if ( listIsOrientationBlock &&           (keyCode === 'arrowdown' )) setFocusNext(event.currentTarget);
            else if ( listIsOrientationBlock &&           (keyCode === 'arrowup'   )) setFocusPrev(event.currentTarget);
            
            else if (!listIsOrientationBlock && !isRtl && (keyCode === 'arrowleft' )) setFocusNext(event.currentTarget);
            else if (!listIsOrientationBlock && !isRtl && (keyCode === 'arrowright')) setFocusPrev(event.currentTarget);
            
            else if (!listIsOrientationBlock &&  isRtl && (keyCode === 'arrowright')) setFocusNext(event.currentTarget);
            else if (!listIsOrientationBlock &&  isRtl && (keyCode === 'arrowleft' )) setFocusPrev(event.currentTarget);
            else return false; // not handled
            
            
            
            return true; // handled
        })()) {
            event.preventDefault(); // prevents the whole page from scrolling when the user press the [up],[down],[left],[right],[pg up],[pg down],[home],[end]
        } // if
    });
    const handleListKeyDown            = useMergeEvents(
        // preserves the original `onKeyDown` from `listComponent`:
        listComponent.props.onKeyDown,
        
        
        
        // actions:
        handleKeyDownInternal,
    );
    const handleDropdownExpandedChange = useMergeEvents(
        // preserves the original `onExpandedChange` from `dropdownComponent`:
        dropdownComponent.props.onExpandedChange,
        
        
        
        // actions:
        onExpandedChange,
    );
    const handleDropdownFloatingUpdate = useMergeEvents(
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
            orientation      : dropdownComponent.props.orientation ?? dropdownOrientation,
            
            
            
            // behaviors:
            lazy             : dropdownComponent.props.lazy ?? lazy,
            
            
            
            // states:
            expanded         : dropdownComponent.props.expanded ?? expanded,
            onExpandedChange : handleDropdownExpandedChange,
            
            
            
            // floatable:
            floatingOn,
            floatingPlacement,
            floatingMiddleware,
            floatingStrategy,
            
            floatingAutoFlip,
            floatingAutoShift,
            floatingOffset,
            floatingShift,
            
            onFloatingUpdate : handleDropdownFloatingUpdate,
        },
        
        
        
        // children:
        /* <List> */
        ((dropdownComponent.props.children !== listComponent) ? dropdownComponent.props.children : React.cloneElement<ListProps<Element>>(listComponent,
            // props:
            {
                // other props:
                ...restListProps,
                ...listComponent.props, // overwrites restListProps (if any conflics)
                
                
                
                // variants:
                listStyle   : listComponent.props.listStyle  ?? props.listStyle ?? _defaultListStyle,
                
                
                
                // accessibilities:
                tabIndex    : listComponent.props.tabIndex   ?? _defaultTabIndex,
                
                
                
                // behaviors:
                actionCtrl  : listComponent.props.actionCtrl ?? defaultActionCtrl,
                
                
                
                // handlers:
                onKeyDown   : handleListKeyDown,
            },
            
            
            
            // children:
            React.Children.map(listComponent.props.children ?? listItems, (listItem, index) => {
                // conditions:
                if (!onExpandedChange)                                          return listItem; // [onExpandedChange] was not set => ignore
                if (!React.isValidElement<ListItemProps<Element>>(listItem))    return listItem; // not a <ListItem>               => ignore
                if (!(listItem.props.actionCtrl ?? defaultActionCtrl ?? false)) return listItem; // <ListItem actionCtrl={false}>  => ignore
                if (listItem.type === ListSeparatorItem)                        return listItem; // <ListSeparatorItem>            => ignore
                if (listItem.props.classes?.includes('void'))                   return listItem; // a foreign <ListItem>           => ignore
                // if <Dropdown> or <List> or <ListItem> is disabled => the <AccessibilityProvider> will take care for us
                
                
                
                // jsx:
                return (
                    <ListItemWithExpandedHandler<Element, TDropdownListExpandedChangeEvent>
                        // other props:
                        {...listItem.props} // steals all listItem's props, so the <List> can recognize the <ListItemWithExpandedHandler> as <ListItem>
                        
                        
                        
                        // positions:
                        listIndex={index}
                        
                        
                        
                        // states:
                        onExpandedChange={onExpandedChange}
                        
                        
                        
                        // components:
                        listItemComponent={
                            // clone listItem element with blank props:
                            <listItem.type
                                // identifiers:
                                key={listItem.key}
                            />
                        }
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



interface ListItemWithExpandedHandlerProps<TElement extends Element = HTMLElement, TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent = DropdownListExpandedChangeEvent>
    extends
        // bases:
        ListItemProps<TElement>,
        
        // states:
        Required<Pick<DropdownProps<TElement, TDropdownListExpandedChangeEvent>, 'onExpandedChange'>>,
        
        // components:
        Required<ListItemComponentProps<TElement>>
{
    // positions:
    listIndex : number
}
const ListItemWithExpandedHandler = <TElement extends Element = HTMLElement, TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent = DropdownListExpandedChangeEvent>(props: ListItemWithExpandedHandlerProps<TElement, TDropdownListExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // positions:
        listIndex,
        
        
        
        // states:
        onExpandedChange,
        
        
        
        // components:
        listItemComponent,
    ...restListItemProps} = props;
    
    
    
    // handlers:
    const handleExpandedChange = onExpandedChange;
    const handleClickInternal  = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // <ListItem> clicked => request to hide the <Dropdown> with `actionType`:
        handleExpandedChange({ expanded: false, actionType: listIndex } as TDropdownListExpandedChangeEvent);
        event.preventDefault(); // mark as handled
    });
    const handleClick         = useMergeEvents(
        // preserves the original `onClick` from `listItemComponent`:
        listItemComponent.props.onClick,
        
        
        
        // preserves the original `onClick` from `props`:
        props.onClick,
        
        
        
        // handlers:
        handleClickInternal,
    );
    
    
    
    // jsx:
    /* <ListItem> */
    return React.cloneElement<ListItemProps<TElement>>(listItemComponent,
        // props:
        {
            // other props:
            ...restListItemProps,
            ...listItemComponent.props, // overwrites restListItemProps (if any conflics)
            
            
            
            // handlers:
            onClick    : handleClick,
        },
    );
};
