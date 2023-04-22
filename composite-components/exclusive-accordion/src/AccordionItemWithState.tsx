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
import {
    // states:
    ExclusiveExpandedChangeEvent,
    useExclusiveAccordionState,
}                           from './states/exclusiveAccordionState.js'



// react components:
export interface AccordionItemWithStateProps<TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
    extends
        // bases:
        AccordionItemProps<TElement, TExclusiveExpandedChangeEvent>,
        
        // positions:
        Pick<TExclusiveExpandedChangeEvent, 'listIndex'>,
        
        // components:
        Required<AccordionItemComponentProps<TElement, ExpandedChangeEvent>>
{
}
export const AccordionItemWithState = <TElement extends Element = HTMLElement, TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props: AccordionItemWithStateProps<TElement, TExclusiveExpandedChangeEvent>): JSX.Element|null => {
    // rest props:
    const {
        // positions:
        listIndex,
        
        
        
        // components:
        accordionItemComponent,
    ...restAccordionItemProps} = props;
    
    
    
    // states:
    const {
        // states:
        expandedListIndex,
        triggerExpandedChange,
    } = useExclusiveAccordionState();
    
    
    
    // handlers:
    const handleExpandedChangeInternal = useEvent<EventHandler<ExpandedChangeEvent>>(({expanded}) => {
        triggerExpandedChange(expanded, listIndex);
    });
    const handleExpandedChange         = useMergeEvents(
        // preserves the original `onExpandedChange` from `accordionItemComponent`:
        accordionItemComponent.props.onExpandedChange,
        
        
        
        // actions:
        handleExpandedChangeInternal,
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
            expanded         : accordionItemComponent.props.expanded ?? (expandedListIndex === listIndex),
            
            
            
            // handlers:
            onExpandedChange : handleExpandedChange,
        },
    );
};
