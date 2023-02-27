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
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component

// reusable-ui components:
import {
    // react components:
    AccordionItemProps,
    
    AccordionItemComponentProps,
}                           from '@reusable-ui/accordion'       // represents a series of toggleable collapsing content

// internals:
import type {
    // states:
    ExclusiveExpandedChangeEvent,
}                           from './states/exclusiveAccordionState.js'



// react components:
export interface AccordionItemWithExclusivityProps<TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
    extends
        // bases:
        Omit<AccordionItemProps<TElement, TExclusiveExpandedChangeEvent>,
            |'expanded'          // change expanded prop as required
            |'onExpandedChange'  // change onExpandedChange prop as required
        >,
        
        // positions:
        Pick<TExclusiveExpandedChangeEvent, 'listIndex'>,
        
        // states:
        Required<Pick<AccordionItemProps<TElement, TExclusiveExpandedChangeEvent>,
            |'expanded'          // change expanded prop as required
            |'onExpandedChange'  // change onExpandedChange prop as required
        >>,
        
        // components:
        Required<AccordionItemComponentProps<TElement, ExpandedChangeEvent>>
{
}
export const AccordionItemWithExclusivity = <TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props: AccordionItemWithExclusivityProps<TElement, TExclusiveExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // positions:
        listIndex,
        
        
        
        // states:
        expanded,
        onExpandedChange,
        
        
        
        // components:
        accordionItemComponent,
    ...restAccordionItemProps} = props;
    
    
    
    // handlers:
    const handleExpandedChangeByAccordionItem = useEvent<EventHandler<ExpandedChangeEvent>>((event) => {
        // <AccordionItem> expanded/collapsed => request to show/hide the <ExclusiveAccordionItem> with `listIndex`:
        onExpandedChange?.({ ...event, listIndex } as TExclusiveExpandedChangeEvent);
    });
    const handleExpandedChange                = useMergeEvents(
        // preserves the original `onExpandedChange` from `accordionItemComponent`:
        accordionItemComponent.props.onExpandedChange,
        
        
        
        // forwards the original `onExpandedChange` from `props`:
        handleExpandedChangeByAccordionItem,
    );
    
    
    
    // jsx:
    /* <AccordionItem> */
    return React.cloneElement<AccordionItemProps<TElement, ExpandedChangeEvent>>(accordionItemComponent,
        // props:
        {
            // other props:
            ...restAccordionItemProps,
            ...accordionItemComponent.props, // overwrites restAccordionItemProps (if any conflics)
            
            
            
            // states:
            expanded         : accordionItemComponent.props.expanded ?? expanded,
            
            
            
            // handlers:
            onExpandedChange : handleExpandedChange,
        },
    );
};
