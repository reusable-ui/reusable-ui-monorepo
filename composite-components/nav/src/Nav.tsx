// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    usePropActive,
}                           from '@reusable-ui/accessibilities' // an accessibility management system
import {
    // hooks:
    DetermineCurrentPageProps,
    useDetermineCurrentPage,
}                           from '@reusable-ui/navigations'     // a set of navigation functions

// reusable-ui components:
import {
    // defaults:
    defaultOrientationableOptions as listDefaultOrientationableOptions,
    
    
    
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
    // hooks:
    usesIcon,
    
    
    
    // configs:
    icons,
    
    
    
    // react components:
    IconProps,
    Icon,
    
    IconComponentProps,
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
}
export const NavItem = <TElement extends Element = HTMLElement>(props: NavItemProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // navigations:
        caseSensitive : _caseSensitive, // remove
        end           : _end,           // remove
        
        
        
        // components:
        listItemComponent     = (<ListItem<TElement> /> as React.ReactComponentElement<any, ListItemProps<TElement>>),
    ...restListItemProps} = props;
    type T1 = typeof restListItemProps
    type T2 = Omit<T1, keyof ListItemProps>
    
    
    
    // fn props:
    const propActive = usePropActive(props, null);
    const activeDn   = useDetermineCurrentPage(props);
    const activeFn   = (listItemComponent.props.active ?? propActive) /*controllable*/ ?? activeDn /*uncontrollable*/;
    
    
    
    // jsx:
    /* <ListItem> */
    return React.cloneElement<ListItemProps<TElement>>(listItemComponent,
        // props:
        {
            // other props:
            ...restListItemProps,
            
            
            
            // semantics:
            'aria-current' : (activeFn || undefined) && (listItemComponent.props['aria-current'] ?? props['aria-current'] ?? 'page'),
            
            
            
            // states:
            active         : activeFn,
        },
        
        
        
        // children:
        listItemComponent.props.children ?? props.children,
    );
};


export interface CloseButtonProps
    extends
        // bases:
        ButtonIconProps
{
}
const CloseButton = (props: CloseButtonProps): JSX.Element|null => {
    // jsx:
    return (
        <ButtonIcon
            // other props:
            {...props}
            
            
            
            // appearances:
            icon={props.icon ?? 'close'}
            
            
            
            // variants:
            buttonStyle={props.buttonStyle ?? 'link'}
            
            
            
            // accessibilities:
            label={props.label ?? 'Close'}
        />
    );
};
export {
    CloseButton,
    CloseButton as default,
}

export type { ButtonStyle, ButtonVariant, ButtonType, IconPosition }
