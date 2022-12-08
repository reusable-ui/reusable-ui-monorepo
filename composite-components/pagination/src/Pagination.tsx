// react:
import {
    // react:
    default as React,
}                           from 'react'

// reusable-ui core:
import {
    // a capability of UI to rotate its layout:
    defaultInlineOrientationableOptions,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // styles:
    ListStyle,
    ListVariant,
    
    
    
    // react components:
    ListItemProps,
    ListProps,
    List,
    
    ListComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content



// defaults:
export const defaultOrientationableOptions = defaultInlineOrientationableOptions;



// react components:
export interface PaginationProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        ListProps<TElement>,
        
        // components:
        Omit<ListComponentProps<TElement>,
            // we don't need these extra properties because the <Pagination> is sub <List>
            |'listRef'
            |'listOrientation'
            |'listStyle'
            
            
            
            // children:
            |'listItems' // we redefined `children` prop as <ListItem>(s)
        >
{
    // paginations:
    itemsLimit ?: number|null
    
    
    
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
        listComponent = (<List<TElement> /> as React.ReactComponentElement<any, ListProps<TElement>>),
        
        
        
        // children:
        prevItems,
        nextItems,
        children,
    ...restListProps} = props;
    
    
    
    // fn props:
    const limitedChildren = (): React.ReactNode => {
        // conditions:
        if ((itemsLimit === undefined) || (itemsLimit === null)) return children; // limiter was not set => nothing to limit
        
        
        
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
    /* <List> */
    return React.cloneElement<ListProps<TElement>>(listComponent,
        // props:
        {
            // other props:
            ...restListProps,
            ...listComponent.props, // overwrites restListProps (if any conflics)
            
            
            
            // variants:
            orientation : listComponent.props.orientation ?? props.orientation ?? 'inline',
        },
        
        
        
        // children:
        ...(listComponent.props.children ? [listComponent.props.children] : [
            ...(prevItems ? [prevItems] : []),
            ...React.Children.toArray(listComponent.props.children ?? limitedChildren()),
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
