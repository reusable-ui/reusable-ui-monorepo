// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import type {
    // react components:
    ListItemProps,
    
    ListItemComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content



// react components:
export interface ListItemWithNavigationProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<ListItemProps<TElement>,
            |'active' // change active prop as required
        >,
        
        // states:
        Required<Pick<ListItemProps<TElement>,
            |'active' // change active prop as required
        >>,
        
        // components:
        Required<ListItemComponentProps<TElement>>
{
    // positions:
    deepLevels      : number[]
    
    
    
    // handlers:
    handleNavigate ?: EventHandler<number[]>
}
export const ListItemWithNavigation = <TElement extends Element = HTMLElement>(props: ListItemWithNavigationProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // positions:
        deepLevels,
        
        
        
        // states:
        active,
        
        
        
        // handlers:
        handleNavigate,
        
        
        
        // components:
        listItemComponent,
    ...restListItemProps} = props;
    
    
    
    // handlers:
    const handleClickInternal = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        
        
        
        // handlers:
        if (handleNavigate) {
            handleNavigate(deepLevels);
            event.stopPropagation(); // do not bubbling click event from nested <Navscroll> to parent <Navscroll>
            event.preventDefault();  // handled
        } // if
    });
    const handleClick         = useMergeEvents(
        // preserves the original `onClick` from `listItemComponent`:
        listItemComponent.props.onClick,
        
        
        
        // handlers:
        handleNavigate && handleClickInternal,
    );
    
    
    
    // jsx:
    /* <ListItem> */
    return React.cloneElement<ListItemProps<TElement>>(listItemComponent,
        // props:
        {
            // other props:
            ...restListItemProps,
            ...listItemComponent.props, // overwrites restListItemProps (if any conflics)
            
            
            
            // states:
            active  : listItemComponent.props.active ?? active,
            
            
            
            // handlers:
            onClick : handleClick,
        },
    );
};
