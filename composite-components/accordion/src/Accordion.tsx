// react:
import {
    // react:
    default as React,
    
    
    
    // hooks:
    useMemo,
}                           from 'react'

// reusable-ui core:
import {
    // a set of React node utility functions:
    flattenChildren,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    ListProps,
    List,
    
    ListComponentProps,
}                           from '@reusable-ui/list'            // represents a series of content

// internals:
import type {
    // variants:
    ListVariantLimited,
}                           from './variants/ListVariantLimited.js'
import type {
    // react components:
    AccordionItemProps,
}                           from './AccordionItem.js'



// react components:
export interface AccordionProps<TElement extends Element = HTMLElement>
    extends
        // bases:
        Omit<ListProps<TElement>,
            // variants:
            |'listStyle' // we downgraded the [listStyle] options
        >,
        
        // variants:
        ListVariantLimited,
        
        // components:
        Omit<ListComponentProps<TElement>,
            // we don't need these extra properties because the <Accordion> is sub <List>
            |'listRef'
            |'listOrientation'
            |'listStyle'
            
            
            
            // children:
            |'listItems' // we redefined `children` prop as <ListItem>(s)
        >
{
    // accessibilities:
    label ?: string
    
    
    
    // behaviors:
    lazy  ?: boolean
}
const Accordion = <TElement extends Element = HTMLElement>(props: AccordionProps<TElement>): JSX.Element|null => {
    // rest props:
    const {
        // accessibilities:
        label,
        
        
        
        // behaviors:
        lazy = undefined,
        
        
        
        // components:
        listComponent = (<List<TElement> /> as React.ReactComponentElement<any, ListProps<TElement>>),
        
        
        
        // children:
        children,
    ...restListProps} = props;
    
    
    
    // children:
    const listComponentChildren = listComponent.props.children;
    const mutatedChildren = useMemo<React.ReactNode|React.ReactNode[]>(() =>
        listComponentChildren
        ??
        flattenChildren(children)
        .map<React.ReactNode>((accordionItem) => {
            // conditions:
            if (lazy === undefined) return accordionItem; // the default [lazy] is not assigned => nothing to mutate
            if (!React.isValidElement<AccordionItemProps<Element, ExpandedChangeEvent>>(accordionItem)) return accordionItem; // not an <AccordionItem> => place it anyway
            if (accordionItem.props.lazy !== undefined) return accordionItem; // the default [lazy] has already assigned => do not mutate
            
            
            
            // jsx:
            return React.cloneElement<AccordionItemProps<Element, ExpandedChangeEvent>>(accordionItem,
                // props:
                {
                    // behaviors:
                    lazy : lazy,
                },
            );
        })
    , [listComponentChildren, children]);
    
    
    
    // jsx:
    /* <List> */
    return React.cloneElement<ListProps<TElement>>(listComponent,
        // props:
        {
            // other props:
            ...restListProps,
            ...listComponent.props, // overwrites restListProps (if any conflics)
            
            
            
            // semantics:
            'aria-label' : listComponent.props['aria-label'] ?? label,
        },
        
        
        
        // children:
        mutatedChildren,
    );
};
export {
    Accordion,
    Accordion as default,
}



export interface AccordionComponentProps<TElement extends Element = HTMLElement>
{
    // components:
    accordionComponent ?: React.ReactComponentElement<any, AccordionProps<TElement>>
}
