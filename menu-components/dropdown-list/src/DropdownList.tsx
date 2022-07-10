// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui:
import {
    // hooks:
    useMergeRefs,
}                           from '@reusable-ui/hooks'           // react helper hooks
import type {
    // types:
    Role,
}                           from '@reusable-ui/generic'         // a generic component
import {
    // types:
    OrientationName,
    OrientationVariant,
    
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
    
    
    
    // react components:
    DropdownCloseType,
    DropdownActiveChangeEvent,
    
    DropdownComponentUiProps,
    
    DropdownProps,
    Dropdown,
}                           from '@reusable-ui/dropdown'        // a base component
import {
    // types:
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
    
    ListProps,
    List,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
const _defaultActionCtrl : boolean = true // the default for <ListItem>(s) is clickable



// utilities:
export const calculateSemanticRole = <TElement extends Element = HTMLElement>(props: ListProps<TElement>): Role|null => {
    if (props.role) return null; // pre defined role => no need to determine the role automatically
    
    
    
    const children          = props.children;
    const defaultActionCtrl = props.actionCtrl ?? true;
    if (React.Children.toArray(children).some((child) => {
        if (!React.isValidElement<ListItemProps<Element>>(child)) {
            return !defaultActionCtrl;                             // if the default is not an actionCtrl => not a menu item => role='dialog'
        }
        else {
            return !(child.props.actionCtrl ?? defaultActionCtrl); // if <ListItem>  is not an actionCtrl => not a menu item => role='dialog'
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

export interface DropdownListComponentUiProps<TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
        // accessibilities:
        DropdownComponentUiProps<TDropdownListActiveChangeEvent>
{
    /* no additional required props yet */
}
export interface DropdownListComponentProps<TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
        // component ui:
        DropdownListComponentUiProps<TDropdownListActiveChangeEvent>
{
    // refs:
    listRef         ?: React.Ref<Element> // setter ref
    
    
    
    // layouts:
    listOrientation ?: OrientationName
    
    
    
    // components:
    listComponent   ?: React.ReactComponentElement<any, ListProps<Element>>
    children        ?: ListProps<Element>['children']
}

export interface DropdownListProps<TElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
        // bases:
        Omit<DropdownProps<TElement, TDropdownListActiveChangeEvent>,
            // refs:
            |'dropdownUiRef' // we replaced `dropdownUiRef` with `listRef`
            
            // children:
            |'children' // we redefined `children` prop as <ListItem>(s)
        >,
        
        // components:
        DropdownListComponentProps<TDropdownListActiveChangeEvent>
{
}
const DropdownList = <TElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>(props: DropdownListProps<TElement, TDropdownListActiveChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        listRef,
        listOrientation,
        listComponent    = (<List<Element> /> as React.ReactComponentElement<any, ListProps<Element>>),
        children         : listItems,
    ...restDropdownProps} = props;
    
    
    
    // refs:
    const mergedListRef = useMergeRefs(
        // preserves the original `elmRef` from `listComponent`:
        listComponent.props.elmRef,
        
        
        
        // preserves the original `listRef` from `props`:
        listRef,
    );
    
    
    
    // jsx:
    return (
        <Dropdown<TElement, TDropdownListActiveChangeEvent>
            // other props:
            {...restDropdownProps}
            
            
            
            // semantics:
            semanticRole={props.semanticRole ?? calculateSemanticRole(props)}
        >
            {React.cloneElement<ListProps<Element>>(listComponent,
                // props:
                {
                    // refs:
                    elmRef      : mergedListRef,
                    
                    
                    
                    // layouts:
                    orientation : listComponent.props.orientation ?? listOrientation,
                    
                    
                    
                    // behaviors:
                    actionCtrl  : listComponent.props.actionCtrl ?? _defaultActionCtrl,
                },
                
                
                
                // children:
                listComponent.props.children ?? listItems,
            )}
        </Dropdown>
    );
};
export {
    DropdownList,
    DropdownList as default,
}

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy, PopupPosition, PopupSide }

export type { ListStyle, ListVariant }
