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
import {
    // states:
    useListState,
    
    
    
    // react components:
    type ListItemProps,
    
    type ListItemComponentProps,
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
    deepLevels  : number[]
    
    
    
    // handlers:
    onNavigate ?: EventHandler<number[]>
}
export const ListItemWithNavigation = <TElement extends Element = HTMLElement>(props: ListItemWithNavigationProps<TElement>): JSX.Element|null => {
    // props:
    const {
        // positions:
        deepLevels,
        
        
        
        // components:
        listItemComponent,
        
        
        
        // handlers:
        onNavigate,
        
        
        
        // other props:
        ...restListItemWithNavigationProps
    } = props;
    
    
    
    // states:
    const {
        // behaviors:
        defaultActionCtrl: listActionCtrl,
    } = useListState();
    
    
    
    // handlers:
    const handleClickInternal = useEvent<React.MouseEventHandler<TElement>>((event) => {
        // conditions:
        if (event.defaultPrevented) return; // the event was already handled by user => nothing to do
        if (!listItemComponentActionCtrl) return;
        
        
        
        // handlers:
        if (onNavigate) {
            onNavigate(deepLevels);
            event.stopPropagation(); // do not bubbling click event from nested <Navscroll> to parent <Navscroll>
            event.preventDefault();  // handled
        } // if
    });
    const handleClick         = useMergeEvents(
        // preserves the original `onClick` from `listItemComponent`:
        listItemComponent.props.onClick,
        
        
        
        // preserves the original `onClick` from `props`:
        props.onClick,
        
        
        
        // actions:
        onNavigate && handleClickInternal,
    );
    
    
    
    // default props:
    const {
        // behaviors:
        actionCtrl : listItemActionCtrl = listActionCtrl,
        
        
        
        // other props:
        ...restListItemProps
    } = restListItemWithNavigationProps;
    
    const {
        // behaviors:
        actionCtrl : listItemComponentActionCtrl = listItemActionCtrl,
        
        
        
        // other props:
        ...restListItemComponentProps
    } = listItemComponent.props;
    
    
    
    // jsx:
    /* <ListItem> */
    return React.cloneElement<ListItemProps<TElement>>(listItemComponent,
        // props:
        {
            // other props:
            ...restListItemProps,
            ...restListItemComponentProps, // overwrites restListItemProps (if any conflics)
            
            
            
            // behaviors:
            actionCtrl : listItemComponentActionCtrl,
            
            
            
            // handlers:
            onClick    : handleClick,
        },
    );
};
