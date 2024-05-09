// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useRef,
    useMemo,
}                           from 'react'

// cssfn:
import {
    // style sheets:
    dynamicStyleSheet,
}                           from '@cssfn/cssfn-react'           // writes css in react hook

// reusable-ui core:
import {
    // a set of React node utility functions:
    flattenChildren,
    
    
    
    // react helper hooks:
    useIsomorphicLayoutEffect,
    useEvent,
    useMergeEvents,
    useMergeRefs,
    useMergeClasses,
    
    
    
    // focusing functions:
    setFocusFirst,
    setFocusLast,
    setFocusPrev,
    setFocusNext,
    
    
    
    // a capability of UI to rotate its layout:
    useOrientationable,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    CollapsibleState,
    useCollapsible,
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
    // variants:
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

// internals:
import {
    // defaults:
    listDefaultOrientationableOptions,
}                           from './defaults.js'
import {
    // utilities:
    calculateSemanticRole,
}                           from './utilities.js'



// defaults:
const _defaultTabIndex   : number            = -1   // makes the <List> programatically focusable
const _defaultActionCtrl : boolean|undefined = true // the default for <ListItem>(s) is clickable
const _defaultListStyle  : ListStyle         = 'flat'



// styles:
export const useDropdownListStyleSheet = dynamicStyleSheet(
    () => import(/* webpackPrefetch: true */ './styles/styles.js')
, { id: 'jkrdb7z3wo' }); // a unique salt for SSR support, ensures the server-side & client-side have the same generated class names



// react components:

export {
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
}



export type DropdownListActionType = DropdownActionType|number
export interface DropdownListExpandedChangeEvent<TData extends any = any> extends DropdownExpandedChangeEvent<TData> {
    actionType : DropdownListActionType
}

export interface DropdownListProps<TElement extends Element = HTMLElement, TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent<any> = DropdownListExpandedChangeEvent<any>>
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
        Omit<ListComponentProps<TElement>,
            // we don't need these extra properties because the <DropdownList> is sub <List>
            |'listRef'
            |'listOrientation'
            |'listStyle'
            
            
            
            // children:
            |'listItems' // we redefined `children` prop as <ListItem>(s)
        >,
        DropdownComponentProps<Element, TDropdownListExpandedChangeEvent>
{
    // behaviors:
    scrollToActiveItem ?: boolean
}
const DropdownList = <TElement extends Element = HTMLElement, TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent<any> = DropdownListExpandedChangeEvent<any>>(props: DropdownListProps<TElement, TDropdownListExpandedChangeEvent>): JSX.Element|null => {
    // styles:
    const styleSheet = useDropdownListStyleSheet();
    
    
    
    // rest props:
    const {
        // behaviors:
        scrollToActiveItem = true,
        lazy,
        
        
        
        // states:
        expanded,         // take, to be handled by <Dropdown>
        onExpandedChange, // take, to be handled by <Dropdown>
        
        onExpandStart,    // take, to be handled by <Dropdown>
        onCollapseStart,  // take, to be handled by <Dropdown>
        onExpandEnd,      // take, to be handled by <Dropdown>
        onCollapseEnd,    // take, to be handled by <Dropdown>
        
        
        
        // floatable:
        floatingRef,
        
        floatingOn,
        floatingFriends,
        floatingPlacement,
        floatingMiddleware,
        floatingStrategy,
        
        floatingAutoFlip,
        floatingAutoShift,
        floatingOffset,
        floatingShift,
        
        onFloatingUpdate,
        
        
        
        // global stackable:
        viewport,
        
        
        
        // auto focusable:
        autoFocusOn,
        restoreFocusOn,
        autoFocus,
        restoreFocus,
        autoFocusScroll,
        restoreFocusScroll,
        
        
        
        // components:
        listComponent         = (<List<TElement> /> as React.ReactComponentElement<any, ListProps<TElement>>),
        children              : listItems,
        
        dropdownRef,
        dropdownOrientation,
        dropdownComponent     = (<Dropdown<Element, TDropdownListExpandedChangeEvent> >{listComponent}</Dropdown> as React.ReactComponentElement<any, DropdownProps<Element, TDropdownListExpandedChangeEvent>>),
        
        
        
        // behaviors:
        actionCtrl            : defaultActionCtrl = listComponent.props.actionCtrl ?? _defaultActionCtrl,
    ...restListProps} = props;
    
    
    
    // states:
    const collapsibleState = useCollapsible<TElement, TDropdownListExpandedChangeEvent>(props);
    const isFullyExpanded  = (collapsibleState.state === CollapsibleState.Expanded);
    
    
    
    // variants:
    const listOrientationableVariant = useOrientationable(props, listDefaultOrientationableOptions);
    const listIsOrientationVertical  = listOrientationableVariant.isOrientationVertical;
    
    
    
    // classes:
    const mergedListClasses = useMergeClasses(
        // preserves the original `classes` from `listComponent`:
        listComponent.props.classes,
        
        
        
        // classes:
        styleSheet.main,
    );
    
    
    
    // refs:
    const listRefInternal   = useRef<TElement|null>(null);
    const mergedListRef     = useMergeRefs(
        // preserves the original `ref` from `listComponent`:
        listComponent.props.elmRef,
        
        
        
        // preserves the original `elmRef` from `props`:
        props.elmRef,
        
        
        
        listRefInternal,
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
    const handleKeyDownInternal        = useEvent<React.KeyboardEventHandler<Element>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        /* note: the `code` may `undefined` on autoComplete */
        const keyCode = (event.code as string|undefined)?.toLowerCase();
        if (!keyCode) return; // ignores [unidentified] key
        
        
        
        if (((): boolean => {
            const isRtl   = (getComputedStyle(event.currentTarget).direction === 'rtl');
            
            
            
                 if (                                        (keyCode === 'tab'       )) setFocusNext(event.currentTarget);
            else if (                                        (keyCode === 'pagedown'  )) setFocusNext(event.currentTarget);
            else if (                                        (keyCode === 'pageup'    )) setFocusPrev(event.currentTarget);
            
            else if (                                        (keyCode === 'home'      )) setFocusFirst(event.currentTarget);
            else if (                                        (keyCode === 'end'       )) setFocusLast(event.currentTarget);
            
            else if ( listIsOrientationVertical &&           (keyCode === 'arrowdown' )) setFocusNext(event.currentTarget);
            else if ( listIsOrientationVertical &&           (keyCode === 'arrowup'   )) setFocusPrev(event.currentTarget);
            
            else if (!listIsOrientationVertical && !isRtl && (keyCode === 'arrowleft' )) setFocusNext(event.currentTarget);
            else if (!listIsOrientationVertical && !isRtl && (keyCode === 'arrowright')) setFocusPrev(event.currentTarget);
            
            else if (!listIsOrientationVertical &&  isRtl && (keyCode === 'arrowright')) setFocusNext(event.currentTarget);
            else if (!listIsOrientationVertical &&  isRtl && (keyCode === 'arrowleft' )) setFocusPrev(event.currentTarget);
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
    const handleDropdownAnimationStart = useMergeEvents(
        // preserves the original `onAnimationStart` from `dropdownComponent`:
        dropdownComponent.props.onAnimationStart,
        
        
        
        // states:
        collapsibleState.handleAnimationStart,
    );
    const handleDropdownAnimationEnd   = useMergeEvents(
        // preserves the original `onAnimationEnd` from `dropdownComponent`:
        dropdownComponent.props.onAnimationEnd,
        
        
        
        // states:
        collapsibleState.handleAnimationEnd,
    );
    
    const handleExpandStart            = useMergeEvents(
        // preserves the original `onExpandStart` from `dropdownComponent`:
        dropdownComponent.props.onExpandStart,
        
        
        
        // preserves the original `onExpandStart` from `props`:
        onExpandStart,
    );
    const handleCollapseStart          = useMergeEvents(
        // preserves the original `onCollapseStart` from `dropdownComponent`:
        dropdownComponent.props.onCollapseStart,
        
        
        
        // preserves the original `onCollapseStart` from `props`:
        onCollapseStart,
    );
    const handleExpandEnd              = useMergeEvents(
        // preserves the original `onExpandEnd` from `dropdownComponent`:
        dropdownComponent.props.onExpandEnd,
        
        
        
        // preserves the original `onExpandEnd` from `props`:
        onExpandEnd,
    );
    const handleCollapseEnd            = useMergeEvents(
        // preserves the original `onCollapseEnd` from `dropdownComponent`:
        dropdownComponent.props.onCollapseEnd,
        
        
        
        // preserves the original `onCollapseEnd` from `props`:
        onCollapseEnd,
    );
    
    
    
    // dom effects:
    /*
        scrolls the first active <ListItem> when the <Dropdown> is expading or fully expanded
    */
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!isFullyExpanded)    return; // only if fully_expanded
        if (!scrollToActiveItem) return; // only if the `scrollToActiveItem` feature is enabled
        const listElm = listRefInternal.current;
        if (!listElm)            return; // only if the corresponding <ListItem> has mounted to DOM
        
        
        
        // setups:
        const activeItem = listElm.querySelector(':is(:scope>*, :scope>*>*):is(.activating, .activated, [aria-checked]:not([aria-checked="false"]), [aria-pressed]:not([aria-pressed="false"]), [aria-selected]:not([aria-selected="false"]), :checked):not(.passivating)');
        if (!activeItem) return; // no active item found => abort
        activeItem.scrollIntoView({
            behavior : 'smooth',
            inline   : 'nearest',
            block    : 'nearest',
        });
    }, [isFullyExpanded, scrollToActiveItem]);
    
    
    
    // children:
    const listComponentChildren = listComponent.props.children;
    const wrappedChildren = useMemo<React.ReactNode|React.ReactNode[]>(() => {
        let listIndex = -1;
        return (
            listComponentChildren
            ??
            flattenChildren(listItems)
            .map<React.ReactNode>((listItem, childIndex) => {
                // conditions:
                if (!onExpandedChange)                                          return listItem; // [onExpandedChange] was not set => place it anyway
                if (!React.isValidElement<ListItemProps<Element>>(listItem))    return listItem; // not a <ListItem>               => place it anyway
                if (!(listItem.props.actionCtrl ?? defaultActionCtrl))          return listItem; // <ListItem actionCtrl={false}>  => place it anyway
                if (listItem.type === ListSeparatorItem)                        return listItem; // <ListSeparatorItem>            => place it anyway
                if (listItem.props.classes?.includes?.('void'))                 return listItem; // a foreign <ListItem>           => place it anyway
                if (listItem.props.className?.split?.(' ')?.includes?.('void')) return listItem; // a foreign <ListItem>           => place it anyway
                // if <Dropdown> or <List> or <ListItem> is disabled => the <AccessibilityProvider> will take care for us
                
                
                
                // a valid listItem counter:
                listIndex++; // only count of <ListItem>s, ignores of foreign nodes
                
                
                
                // props:
                const listItemProps = listItem.props;
                
                
                
                // jsx:
                return (
                    /* wrap child with <ListItemWithExpandedHandler> */
                    <ListItemWithExpandedHandler<Element, TDropdownListExpandedChangeEvent>
                        // other props:
                        {...listItemProps} // steals all listItem's props, so the <Owner> can recognize the <ListItemWithExpandedHandler> as <TheirChild>
                        
                        
                        
                        // identifiers:
                        key={listItem.key ?? childIndex}
                        
                        
                        
                        // positions:
                        listIndex={listIndex}
                        
                        
                        
                        // states:
                        onExpandedChange={onExpandedChange}
                        
                        
                        
                        // components:
                        listItemComponent={
                            // clone listItem element with (almost) blank props:
                            <listItem.type
                                // identifiers:
                                key={listItem.key}
                                
                                
                                
                                //#region restore conflicting props
                                {...{
                                    ...(('listIndex'         in listItemProps) ? { listIndex         : listItemProps.listIndex         } : undefined),
                                    ...(('onExpandedChange'  in listItemProps) ? { onExpandedChange  : listItemProps.onExpandedChange  } : undefined),
                                    ...(('listItemComponent' in listItemProps) ? { listItemComponent : listItemProps.listItemComponent } : undefined),
                                }}
                                //#endregion restore conflicting props
                            />
                        }
                    />
                );
            })
        );
    }, [listComponentChildren, listItems]);
    
    
    
    // jsx:
    /* <Dropdown> */
    return React.cloneElement<DropdownProps<Element, TDropdownListExpandedChangeEvent>>(dropdownComponent,
        // props:
        {
            // refs:
            outerRef         : mergedDropdownRef,
            
            
            
            // semantics:
            semanticTag      : dropdownComponent.props.semanticTag     ?? props.semanticTag  ?? '',                                              // no corresponding semantic tag => defaults to <div> // NOTE: we don't use <dialog> as the default semantic tag because our <DropdownList> is similar to <dialog>::backdrop, not the <dialog> itself
            semanticRole     : dropdownComponent.props.semanticRole    ?? props.semanticRole ?? calculateSemanticRole(props, defaultActionCtrl), // calculates the default semantic
            
            
            
            // variants:
            orientation      : dropdownComponent.props.orientation     ?? dropdownOrientation,
            
            
            
            // behaviors:
            lazy             : dropdownComponent.props.lazy            ?? lazy,
            
            
            
            // states:
            expanded         : dropdownComponent.props.expanded        ?? expanded,
            onExpandedChange : handleDropdownExpandedChange,
            
            onExpandStart    : handleExpandStart,
            onCollapseStart  : handleCollapseStart,
            onExpandEnd      : handleExpandEnd,
            onCollapseEnd    : handleCollapseEnd,
            
            onAnimationStart : handleDropdownAnimationStart,
            onAnimationEnd   : handleDropdownAnimationEnd,
            
            
            
            // floatable:
            floatingRef,
            
            floatingOn,
            floatingFriends,
            floatingPlacement,
            floatingMiddleware,
            floatingStrategy,
            
            floatingAutoFlip,
            floatingAutoShift,
            floatingOffset,
            floatingShift,
            
            onFloatingUpdate : handleDropdownFloatingUpdate,
            
            
            
            // global stackable:
            viewport,
            
            
            
            // auto focusable:
            autoFocusOn        : dropdownComponent.props.autoFocusOn          ?? autoFocusOn,
            restoreFocusOn     : dropdownComponent.props.restoreFocusOn       ?? restoreFocusOn,
            autoFocus          : dropdownComponent.props.autoFocus            ?? autoFocus,
            restoreFocus       : dropdownComponent.props.restoreFocus         ?? restoreFocus,
            autoFocusScroll    : dropdownComponent.props.autoFocusScroll    ?? autoFocusScroll,
            restoreFocusScroll : dropdownComponent.props.restoreFocusScroll ?? restoreFocusScroll,
        },
        
        
        
        // children:
        /* <List> */
        ((dropdownComponent.props.children !== listComponent) ? dropdownComponent.props.children : React.cloneElement<ListProps<TElement>>(listComponent,
            // props:
            {
                // other props:
                ...restListProps,
                ...listComponent.props, // overwrites restListProps (if any conflics)
                
                
                
                // refs:
                elmRef      : mergedListRef,
                
                
                
                // variants:
                listStyle   : listComponent.props.listStyle  ?? props.listStyle ?? _defaultListStyle,
                
                
                
                // classes:
                classes     : mergedListClasses,
                
                
                
                // accessibilities:
                tabIndex    : listComponent.props.tabIndex   ?? _defaultTabIndex,
                
                
                
                // behaviors:
                actionCtrl  : listComponent.props.actionCtrl ?? defaultActionCtrl,
                
                
                
                // handlers:
                onKeyDown   : handleListKeyDown,
            },
            
            
            
            // children:
            wrappedChildren,
        )),
    );
};
export {
    DropdownList,
    DropdownList as default,
}

export type { ListStyle, ListVariant }



interface ListItemWithExpandedHandlerProps<TElement extends Element = HTMLElement, TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent<any> = DropdownListExpandedChangeEvent<any>>
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
const ListItemWithExpandedHandler = <TElement extends Element = HTMLElement, TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent<any> = DropdownListExpandedChangeEvent<any>>(props: ListItemWithExpandedHandlerProps<TElement, TDropdownListExpandedChangeEvent>): JSX.Element|null => {
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
