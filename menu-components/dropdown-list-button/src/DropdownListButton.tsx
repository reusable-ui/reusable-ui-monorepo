// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // a capability of UI to rotate its layout:
    useOrientationableWithDirection,
    
    
    
    // basic variants of UI:
    useBasicVariantProps,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    DropdownProps,
}                           from '@reusable-ui/dropdown'        // overlays contextual element such as lists, menus, and more
import {
    // variants:
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    DropdownListActionType,
    DropdownListExpandedChangeEvent,
    
    DropdownListProps,
    DropdownList,
}                           from '@reusable-ui/dropdown-list'   // overlays a list element (menu)
import {
    // semantics:
    ButtonType,
    
    
    
    // variants:
    ButtonStyle,
    ButtonVariant,
    
    
    
    // react components:
    DropdownButtonProps,
    DropdownButton,
}                           from '@reusable-ui/dropdown-button' // a button component with a dropdown UI
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

// internals:
import {
    // defaults:
    defaultOrientationableWithDirectionOptions,
}                           from './defaults.js'



// react components:

export {
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
}



export interface DropdownListButtonProps<TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent<any> = DropdownListExpandedChangeEvent<any>>
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
const DropdownListButton = <TDropdownListExpandedChangeEvent extends DropdownListExpandedChangeEvent<any> = DropdownListExpandedChangeEvent<any>>(props: DropdownListButtonProps<TDropdownListExpandedChangeEvent>): JSX.Element|null => {
    // basic variant props:
    const basicVariantProps = useBasicVariantProps(props);
    
    
    
    // variants:
    const dropdownOrientationableVariant = useOrientationableWithDirection(props, defaultOrientationableWithDirectionOptions);
    const determineDropdownOrientation = () => {
        switch(dropdownOrientationableVariant.orientation) {
            case 'inline-start': return 'inline';
            case 'inline-end'  : return 'inline';
            case 'block-start' : return 'block';
            default            : return 'block';
        } // switch
    };
    
    
    
    // accessibility props:
    const {
        enabled,
        inheritEnabled,
        readOnly,
        inheritReadOnly,
        // active,        // activating the <Button> will not cause the <List> to active
        // inheritActive, // activating the <Button> will not cause the <List> to active
    } = props;
    
    
    
    // rest props:
    const {
        // components:
        listRef,
        listOrientation     = 'block',
        listStyle,
        listComponent       = (<List<Element> /> as React.ReactComponentElement<any, ListProps<Element>>),
        children            : listItems,
        
        dropdownRef,
        dropdownOrientation = determineDropdownOrientation(),
        dropdownComponent   = (<DropdownList<Element, TDropdownListExpandedChangeEvent>
            // components:
            elmRef={listRef}
            orientation={listOrientation}
            listStyle={listStyle}
            listComponent={React.cloneElement<ListProps<Element>>(listComponent,
                // props:
                {
                    // basic variant props:
                    ...basicVariantProps,
                    
                    
                    
                    // other props:
                    ...listComponent.props,
                    
                    
                    
                    // accessibility props:
                    enabled         : listComponent.props.enabled         ?? enabled,
                    inheritEnabled  : listComponent.props.inheritEnabled  ?? inheritEnabled,
                    readOnly        : listComponent.props.readOnly        ?? readOnly,
                    inheritReadOnly : listComponent.props.inheritReadOnly ?? inheritReadOnly,
                 // active          : listComponent.props.active          ?? active,       // activating the <Button> will not cause the <List> to active
                 // inheritActive   : listComponent.props.inheritActive   ?? inheritActive, // activating the <Button> will not cause the <List> to active
                },
            )}
            
            dropdownRef={dropdownRef}
            dropdownOrientation={dropdownOrientation}
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
            dropdownRef         = {((dropdownComponent as React.ReactComponentElement<any, DropdownListProps<Element, TDropdownListExpandedChangeEvent>>).props.dropdownRef         === dropdownRef        ) ? undefined : dropdownRef        }
            dropdownOrientation = {((dropdownComponent as React.ReactComponentElement<any, DropdownListProps<Element, TDropdownListExpandedChangeEvent>>).props.dropdownOrientation === dropdownOrientation) ? undefined : dropdownOrientation}
            dropdownComponent   = {dropdownComponent}
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

export type { ButtonType, ButtonStyle, ButtonVariant }

export type { ListStyle, ListVariant }
