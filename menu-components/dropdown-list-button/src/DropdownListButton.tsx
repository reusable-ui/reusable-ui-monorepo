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
    
    ListProps,
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



export interface DropdownListButtonProps<TListElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>
    extends
        // bases:
        Omit<DropdownButtonProps<TDropdownListActiveChangeEvent>,
            // children:
            |'children' // we redefined `children` prop as <ListItem>(s)
        >,
        Omit<ListProps<TListElement>,
            // refs:
            |'elmRef'|'outerRef' // all (elm|outer)Ref are for <Button>
            
            // DOMs:
            |Exclude<keyof React.DOMAttributes<TListElement>, 'children'> // all DOM [attributes] are for <Button>
            
            // appearances:
            |keyof ListVariant
            
            // behaviors:
            |keyof Pick<ListItemProps<TListElement>, 'actionCtrl'>
        >
{
}
const DropdownListButton = <TListElement extends Element = HTMLElement, TDropdownListActiveChangeEvent extends DropdownListActiveChangeEvent = DropdownListActiveChangeEvent>(props: DropdownListButtonProps<TListElement, TDropdownListActiveChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // components:
        children          : listItems,
        dropdownComponent = (<DropdownList<TListElement, TDropdownListActiveChangeEvent> >{listItems}</DropdownList> as React.ReactComponentElement<any, DropdownProps<Element, TDropdownListActiveChangeEvent>>),
    ...restDropdownButtonProps} = props;
    type Test1 = typeof restDropdownButtonProps;
    type Test2 = Omit<Test1, keyof DropdownButtonProps<TDropdownListActiveChangeEvent>>
    
    
    
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
                    size            : dropdownComponent.props.size            ?? size,
                    nude            : dropdownComponent.props.nude            ?? nude,
                    theme           : dropdownComponent.props.theme           ?? theme,
                    gradient        : dropdownComponent.props.gradient        ?? gradient,
                    outlined        : dropdownComponent.props.outlined        ?? outlined,
                    mild            : dropdownComponent.props.mild            ?? mild,
                    
                    // from <Indicator>:
                    enabled         : dropdownComponent.props.enabled         ?? enabled,
                    inheritEnabled  : dropdownComponent.props.inheritEnabled  ?? inheritEnabled,
                    readOnly        : dropdownComponent.props.readOnly        ?? readOnly,
                    inheritReadOnly : dropdownComponent.props.inheritReadOnly ?? inheritReadOnly,
                 // active          : dropdownComponent.props.active          ?? active,
                 // inheritActive   : dropdownComponent.props.inheritActive   ?? inheritActive,
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