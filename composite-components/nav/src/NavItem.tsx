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
    useDetermineCurrentPage,
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
import {
    // react components:
    Icon,
}                           from '@reusable-ui/icon'            // an icon component



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
        caseSensitive : _caseSensitive, // remove
        end           : _end,           // remove
        
        
        
        // components:
        listItemComponent = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
    ...restListItemProps} = props;
    
    
    
    // fn props:
    const propActive = usePropActive(props, null);
    const activeDn   = useDetermineCurrentPage(props) ?? false /* server-side or <Link> was not defined */;
    const activeFn   = (listItemComponent.props.active ?? propActive) /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // jsx:
    /* <ListItem> */
    return React.cloneElement<ListItemProps<TElement>>(listItemComponent,
        // props:
        {
            // other props:
            ...restListItemProps,
            ...listItemComponent.props, // overwrites restListItemProps (if any conflics)
            
            
            
            // semantics:
            'aria-current' : (activeFn || undefined) && (listItemComponent.props['aria-current'] ?? props['aria-current'] ?? 'page'),
            'aria-label'   : listItemComponent.props['aria-label'] ?? label,
            
            
            
            // states:
            active         : activeFn,
        },
        
        
        
        // children:
        listItemComponent.props.children ?? props.children,
    );
};

export interface NavActionItemProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ListItemProps<TElement>,
        
        // components:
        ListItemComponentProps<TElement>
{
    // accessibilities:
    label ?: string
}
export const NavActionItem = <TElement extends Element = HTMLElement>(props: NavActionItemProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // components:
        listItemComponent = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
    ...restListItemProps} = props;
    
    
    
    // jsx:
    /* <ListItem> */
    return React.cloneElement<ListItemProps<TElement>>(listItemComponent,
        // props:
        {
            // other props:
            ...restListItemProps,
            ...listItemComponent.props, // overwrites restListItemProps (if any conflics)
            
            
            
            // semantics:
            'aria-label'   : listItemComponent.props['aria-label'] ?? label,
        },
        
        
        
        // children:
        listItemComponent.props.children ?? props.children,
    );
};

export const NavPrevItem   = <TElement extends Element = HTMLElement>(props: NavActionItemProps<TElement>): JSX.Element|null => {
    // jsx:
    return (
        <NavActionItem<TElement>
            // other props:
            {...props}
            
            
            
            // accessibilities:
            label={props.label ?? 'Previous'}
        >
            {
                props.children
                ??
                <Icon
                    // appearances:
                    icon='prev'
                    
                    
                    
                    // variants:
                    size='1em'
                />
            }
        </NavActionItem>
    );
};
export const NavNextItem   = <TElement extends Element = HTMLElement>(props: NavActionItemProps<TElement>): JSX.Element|null => {
    // jsx:
    return (
        <NavActionItem<TElement>
            // other props:
            {...props}
            
            
            
            // accessibilities:
            label={props.label ?? 'Next'}
        >
            {
                props.children
                ??
                <Icon
                    // appearances:
                    icon='next'
                    
                    
                    
                    // variants:
                    size='1em'
                />
            }
        </NavActionItem>
    );
};

export {
    ListSeparatorItemProps,
    ListSeparatorItem,
}
