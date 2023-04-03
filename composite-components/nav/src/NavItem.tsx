// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // an accessibility management system:
    usePropActive,
    
    
    
    // a set of navigation functions:
    DetermineCurrentPageProps,
    WithAutoActive,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ListItemProps,
    ListItem,
    
    ListSeparatorItemProps,
    ListSeparatorItem,
    
    ListItemComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content



// react components:
export interface NavItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ListItemProps<TElement>,
        
        // navigations:
        DetermineCurrentPageProps,
        
        // components:
        ListItemComponentProps<TElement>
{
    // accessibilities:
    label ?: string
}
export const NavItem       = <TElement extends Element = HTMLElement>(props: NavItemProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // navigations:
        caseSensitive,
        end,
        
        
        
        // components:
        listItemComponent = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
    ...restListItemProps} = props;
    
    
    
    // fn props:
    const propActive           = usePropActive(props, null);
    const activeSt             = (listItemComponent.props.active ?? propActive) /*controllable*/;
    const isControllableActive = activeSt !== null;
    
    
    
    // jsx:
    /* <ListItem> */
    const navItem = React.cloneElement<ListItemProps<TElement>>(listItemComponent,
        // props:
        {
            // other props:
            ...restListItemProps,
            ...listItemComponent.props, // overwrites restListItemProps (if any conflics)
            
            
            
            // semantics:
            'aria-current' : listItemComponent.props['aria-current'] ?? props['aria-current'] ?? 'page',
            'aria-label'   : listItemComponent.props['aria-label'] ?? label,
        },
        
        
        
        // children:
        listItemComponent.props.children ?? props.children,
    );
    if (isControllableActive) return React.cloneElement<ListItemProps<TElement>>(navItem,
        // props:
        {
            // states:
            active         : activeSt,
        },
    );
    return (
        <WithAutoActive
            // navigations:
            caseSensitive={caseSensitive}
            end={end}
            
            
            
            // components:
            elementComponent={navItem}
        />
    );
};

export {
    ListSeparatorItemProps,
    ListSeparatorItem,
}
