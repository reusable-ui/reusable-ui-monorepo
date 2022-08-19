// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui components:
import type {
    // react components:
    DropdownProps,
}                           from '@reusable-ui/dropdown'        // overlays contextual element such as lists, menus, and more
import {
    // styles:
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    DropdownListActionType,
    DropdownListExpandedChangeEvent,
    
    DropdownList,
}                           from '@reusable-ui/dropdown-list'   // overlays a list element (menu)
import {
    // styles:
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
    List,
    
    ListComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content



// react components:

export {
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
}



export interface DropdownListButtonProps<TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent = DropdownListExpandedChangeEvent>
    extends
        // bases:
        Omit<DropdownButtonProps<TDropdownListExpandedChangeEvent>,
            // children:
            |'children' // we redefined `children` prop as <ListItem>(s)
        >,
        
        // components:
        Omit<ListComponentProps<Element>,
            // children:
            |'listItems' // we redefined `children` prop as <ListItem>(s)
        >,
        Pick<ListProps<Element>,
            // children:
            |'children' // we redefined `children` prop as <ListItem>(s)
        >
{
}
const DropdownListButton = <TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent = DropdownListExpandedChangeEvent>(props: DropdownListButtonProps<TDropdownListExpandedChangeEvent>): JSX.Element|null => {
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
        active,
        inheritActive,
    } = props;
    
    
    
    // rest props:
    const {
        // components:
        listRef,
        listOrientation,
        listStyle,
        listComponent     = (<List<Element> /> as React.ReactComponentElement<any, ListProps<Element>>),
        children          : listItems,
        
        dropdownComponent = (<DropdownList<Element, TDropdownListExpandedChangeEvent>
            // components:
            listRef={listRef}
            listOrientation={listOrientation}
            listStyle={listStyle}
            listComponent={React.cloneElement<ListProps<Element>>(listComponent,
                // props:
                {
                    // from <Basic>:
                    size            : listComponent.props.size            ?? size,
                    nude            : listComponent.props.nude            ?? nude,
                    theme           : listComponent.props.theme           ?? theme,
                    gradient        : listComponent.props.gradient        ?? gradient,
                    outlined        : listComponent.props.outlined        ?? outlined,
                    mild            : listComponent.props.mild            ?? mild,
                    
                    
                    
                    // from <Indicator>:
                    enabled         : listComponent.props.enabled         ?? enabled,
                    inheritEnabled  : listComponent.props.inheritEnabled  ?? inheritEnabled,
                    readOnly        : listComponent.props.readOnly        ?? readOnly,
                    inheritReadOnly : listComponent.props.inheritReadOnly ?? inheritReadOnly,
                    active          : listComponent.props.active          ?? active,
                    inheritActive   : listComponent.props.inheritActive   ?? inheritActive,
                },
            )}
        >
            {listItems}
        </DropdownList> as React.ReactComponentElement<any, DropdownProps<Element, TDropdownListExpandedChangeEvent>>),
    ...restDropdownButtonProps} = props;
    
    
    
    // jsx:
    return (
        <DropdownButton<TDropdownListExpandedChangeEvent>
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

export type { DropdownListActionType, DropdownListExpandedChangeEvent }

export type { ButtonStyle, ButtonVariant, ButtonType }

export type { ListStyle, ListVariant }
