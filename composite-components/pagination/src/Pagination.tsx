// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui components:
import {
    // variants:
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    ListItemProps,
    ListItem,
}                           from '@reusable-ui/list'            // represents a series of content
import {
    // react components:
    NavActionItemProps,
    NavPrevItem,
    NavNextItem,
    
    NavProps,
    Nav,
    
    NavComponentProps,
}                           from '@reusable-ui/nav'             // a navigation component to navigate between pages



// react components:

export {
    ListItemProps,
    ListItem,
    
    NavActionItemProps,
    NavPrevItem,
    NavNextItem,
}



export interface PaginationProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        NavProps<TElement>,
        
        // components:
        NavComponentProps<TElement>
{
    // paginations:
    itemsLimit ?: number
    
    
    
    // children:
    prevItems  ?: React.ReactNode
    nextItems  ?: React.ReactNode
}
const Pagination = <TElement extends Element = HTMLElement>(props: PaginationProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // paginations:
        itemsLimit,
        
        
        
        // components:
        navComponent = (<Nav<TElement> /> as React.ReactComponentElement<any, NavProps<TElement>>),
        
        
        
        // children:
        prevItems,
        nextItems,
        children,
    ...restNavProps} = props;
    
    
    
    // fn props:
    const limitedChildren = (): React.ReactNode => {
        // conditions:
        if (itemsLimit === undefined) return children; // limiter was not set => nothing to limit
        if (itemsLimit <= 0) return [];
        
        
        
        const childrenArr = React.Children.toArray(children);
        const activeIndex = childrenArr.findIndex((child) => React.isValidElement<ListItemProps>(child) && child.props.active);
        if (activeIndex < 0) return childrenArr.slice(0, itemsLimit); // no active child => limit the children from the beginning
        
        
        
        const limitCountHalf    = (itemsLimit - 1) / 2;          // the half of limit count, excluding the activeIndex
        const limitCountLeft    = Math.floor(limitCountHalf);    // the limit count at the left
        const limitCountRight   = Math.ceil(limitCountHalf);     // the limit count at the right
        
        const limitIndexLeft    = activeIndex - limitCountLeft;  // the theoretical limit index at the left
        const limitIndexRight   = activeIndex + limitCountRight; // the theoretical limit index at the right
        
        const minChildIndex     = 0;
        const maxChildIndex     = childrenArr.length - 1;
        
        // the missing item count due to *out_of_range*,
        // the missing ones will be *compensated* on the other sides:
        const missingLeft       = Math.max(0, minChildIndex   - limitIndexLeft);
        const missingRight      = Math.max(0, limitIndexRight - maxChildIndex);
        
        const trimmedIndexLeft  = Math.max(minChildIndex, limitIndexLeft  - missingRight);
        const trimmedIndexRight = Math.min(maxChildIndex, limitIndexRight + missingLeft );
        
        
        
        return childrenArr.slice(trimmedIndexLeft, trimmedIndexRight + 1);
    };
    
    
    // jsx:
    /* <Nav> */
    return React.cloneElement<NavProps<TElement>>(navComponent,
        // props:
        {
            // other props:
            ...restNavProps,
            ...navComponent.props, // overwrites restNavProps (if any conflics)
            
            
            
            // variants:
            orientation : navComponent.props.orientation ?? props.orientation ?? 'inline',
        },
        
        
        
        // children:
        ...(navComponent.props.children ? [navComponent.props.children] : [
            ...(prevItems ? [prevItems] : []),
            ...React.Children.toArray(navComponent.props.children ?? limitedChildren()),
            ...(nextItems ? [nextItems] : []),
        ]),
    );
};
export {
    Pagination,
    Pagination as default,
}

export type { ListStyle, ListVariant }



export interface PaginationComponentProps<TElement extends Element = HTMLElement>
{
    // components:
    paginationComponent ?: React.ReactComponentElement<any, PaginationProps<TElement>>
}
