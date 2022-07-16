// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui:
import type {
    // react components:
    DropdownProps,
}                           from '@reusable-ui/dropdown'        // overlays contextual element such as lists, menus, and more
import {
    // types:
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    DropdownListActiveChangeEvent,
    
    DropdownListProps,
    DropdownList,
}                           from '@reusable-ui/dropdown-list'   // overlays a list element (menu)
import {
    // types:
    OrientationName,
    OrientationVariant,
    
    PopupPlacement,
    PopupMiddleware,
    PopupStrategy,
    PopupPosition,
    PopupSide,
    
    ButtonStyle,
    ButtonVariant,
    ButtonType,
    
    
    
    // react components:
    DropdownButtonProps,
    DropdownButton,
}                           from '@reusable-ui/dropdown-button' // a button component with a dropdown UI.
import {
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
}                           from '@reusable-ui/list'            // represents a series of content



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



export interface DropdownListButtonProps<TElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
        // bases:
        Omit<DropdownListProps<TElement, TDropdownListActiveChangeEvent>,
            // refs:
            |'elmRef'|'outerRef' // all (elm|outer)Ref are for <Button>
            
            // DOMs:
            |Exclude<keyof React.DOMAttributes<Element>, 'children'> // all DOM [attributes] are for <Button>
        >,
        Omit<DropdownButtonProps,
            // accessibilities:
            |'onActiveChange' // replaced with more specific <DropdownList>'s `onActiveChange`
            
            // children:
            |'children' // we redefined `children` prop as <ListItem>(s)
        >
{
}
const DropdownListButton = <TElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>(props: DropdownListButtonProps<TElement, TDropdownListActiveChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        onActiveChange, // take, to be handled by `useToggleActive`
        
        
        
        // components:
        children          : listItems,
        dropdownComponent = (<DropdownList<TElement, TDropdownListActiveChangeEvent> onActiveChange={onActiveChange} >{listItems}</DropdownList> as React.ReactComponentElement<any, DropdownProps<Element>>),
    ...restDropdownButtonProps} = props;
    
    
    
    // jsx:
    return (
        <DropdownButton
            // other props:
            {...restDropdownButtonProps}
            
            
            
            // components:
            dropdownComponent={dropdownComponent}
        >
            {dropdownComponent.props.children}
        </DropdownButton>
    );
};
export {
    DropdownListButton,
    DropdownListButton as default,
}

export type { OrientationName, OrientationVariant }

export type { PopupPlacement, PopupMiddleware, PopupStrategy, PopupPosition, PopupSide }

export type { DropdownListActiveChangeEvent }

export type { ButtonStyle, ButtonVariant, ButtonType }

export type { ListStyle, ListVariant }