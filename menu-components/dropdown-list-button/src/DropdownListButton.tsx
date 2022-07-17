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
    DropdownListCloseType,
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

// ListItem => DropdownListButtonItem
export type {
    ListItemProps,
    ListItemProps as DropdownListButtonItemProps,
    ListItemProps as ItemProps,
}
export {
    ListItem,
    ListItem as DropdownListButtonItem,
    ListItem as Item,
}



// ListSeparatorItem => DropdownListButtonSeparatorItem
export type {
    ListSeparatorItemProps,
    ListSeparatorItemProps as DropdownListButtonSeparatorItemProps,
    ListSeparatorItemProps as SeparatorItemProps,
}
export {
    ListSeparatorItem,
    ListSeparatorItem as DropdownListButtonSeparatorItem,
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
        Omit<DropdownButtonProps<TDropdownListActiveChangeEvent>,
            // children:
            |'children' // we redefined `children` prop as <ListItem>(s)
        >
{
}
const DropdownListButton = <TElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>(props: DropdownListButtonProps<TElement, TDropdownListActiveChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        children          : listItems,
        dropdownComponent = (<DropdownList<Element, TDropdownListActiveChangeEvent> >{listItems}</DropdownList> as React.ReactComponentElement<any, DropdownProps<Element, TDropdownListActiveChangeEvent>>),
    ...restDropdownButtonProps} = props;
    
    
    
    // forward props:
    const {
        // from <Basic>:
        size,
        nude,
        theme,
        gradient,
        outlined,
        mild,
        
        // from <Indicator>:
        enabled,
        inheritEnabled,
        readOnly,
        inheritReadOnly,
        // active,
        // inheritActive,
    } = props;
    
    
    
    // jsx:
    return (
        <DropdownButton<TDropdownListActiveChangeEvent>
            // other props:
            {...restDropdownButtonProps}
            
            
            
            // components:
            dropdownComponent={React.cloneElement<DropdownProps<Element, TDropdownListActiveChangeEvent>>(dropdownComponent,
                // props:
                {
                    // from <Basic>:
                    size,
                    nude,
                    theme,
                    gradient,
                    outlined,
                    mild,
                    
                    // from <Indicator>:
                    enabled,
                    inheritEnabled,
                    readOnly,
                    inheritReadOnly,
                    // active,
                    // inheritActive,
                }
            )}
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

export type { DropdownListCloseType, DropdownListActiveChangeEvent }

export type { ButtonStyle, ButtonVariant, ButtonType }

export type { ListStyle, ListVariant }