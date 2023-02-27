// react:
import {
    // hooks:
    useState,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    EventHandler,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// hooks:

// states:

//#region exclusiveAccordionState
export interface ExclusiveExpandedChangeEvent extends ExpandedChangeEvent {
    // positions:
    listIndex : number
}



export interface ExclusiveAccordionStateProps
{
    // states:
    defaultExpandedListIndex ?: number
}
export interface ExclusiveAccordionState<TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
{
    // states:
    expandedListIndex    : number,
    handleExpandedChange : EventHandler<TExclusiveExpandedChangeEvent>
}
export const useExclusiveAccordionState = <TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props?: ExclusiveAccordionStateProps): ExclusiveAccordionState<TExclusiveExpandedChangeEvent> => {
    // states:
    const [expandedListIndex, setExpandedListIndex] = useState<number>(props?.defaultExpandedListIndex ?? -1);
    
    
    
    // handlers:
    const handleExpandedChange = useEvent<EventHandler<TExclusiveExpandedChangeEvent>>((event) => {
        // actions:
        setExpandedListIndex(event.expanded ? event.listIndex : -1);
    });
    
    
    
    return {
        // states:
        expandedListIndex,
        handleExpandedChange,
    };
};
//#endregion exclusiveAccordionState
