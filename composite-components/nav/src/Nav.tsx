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
    // defaults:
    defaultOrientationableOptions,
    
    
    
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
    
    ListItemComponentProps,
    ListComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content
import {
    // react components:
    Icon,
}                           from '@reusable-ui/icon'            // an icon component



// defaults:
export { defaultOrientationableOptions };



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
export const NavItem     = <TElement extends Element = HTMLElement>(props: NavItemProps<TElement>): JSX.Element|null => {
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

export const NavPrevItem = <TElement extends Element = HTMLElement>(props: NavItemProps<TElement>): JSX.Element|null => {
    // jsx:
    return (
        <NavItem<TElement>
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
        </NavItem>
    );
};
export const NavNextItem = <TElement extends Element = HTMLElement>(props: NavItemProps<TElement>): JSX.Element|null => {
    // jsx:
    return (
        <NavItem<TElement>
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
        </NavItem>
    );
};

export {
    ListSeparatorItemProps,
    ListSeparatorItem,
}



export interface NavProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ListProps<TElement>,
        
        // components:
        Omit<ListComponentProps<TElement>,
            // we don't need these extra properties because the <Nav> is sub <List>
            |'listRef'
            |'listOrientation'
            |'listStyle'
            
            
            
            // children:
            |'listItems' // we redefined `children` prop as <ListItem>(s)
        >
{
    // accessibilities:
    label ?: string
}
const Nav = <TElement extends Element = HTMLElement>(props: NavProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // components:
        listComponent = (<List<TElement> /> as React.ReactComponentElement<any, ListProps<TElement>>),
    ...restListProps} = props;
    
    
    
    // jsx:
    /* <List> */
    return React.cloneElement<ListProps<TElement>>(listComponent,
        // props:
        {
            // other props:
            ...restListProps,
            ...listComponent.props, // overwrites restListProps (if any conflics)
            
            
            
            // semantics:
            semanticTag  : listComponent.props.semanticTag   ?? props.semanticTag  ?? 'nav',
            semanticRole : listComponent.props.semanticRole  ?? props.semanticRole ?? 'navigation',
            'aria-label' : listComponent.props['aria-label'] ?? label,
            
            
            
            // behaviors:
            actionCtrl   : listComponent.props.actionCtrl    ?? props.actionCtrl   ?? true,
        },
        
        
        
        // children:
        listComponent.props.children ?? props.children,
    );
};
export {
    Nav,
    Nav as default,
}

export type { ListStyle, ListVariant }



export interface NavComponentProps<TElement extends Element = HTMLElement>
{
    // components:
    navComponent ?: React.ReactComponentElement<any, NavProps<TElement>>
}
