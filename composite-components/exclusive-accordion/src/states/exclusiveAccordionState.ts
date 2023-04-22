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
    useMergeEvents,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// hooks:

// states:

//#region exclusiveAccordionState
// defaults:
const _defaultExpandedListIndex = -1;



export interface ExclusiveExpandedChangeEvent extends ExpandedChangeEvent {
    // positions:
    listIndex : number
}



export interface ExclusiveAccordionStateProps<TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
{
    // states:
    defaultExpandedListIndex ?: number
    expandedListIndex        ?: number
    onExpandedChange         ?: EventHandler<TExclusiveExpandedChangeEvent>
}
export interface ExclusiveAccordionState<TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
{
    // states:
    expandedListIndex         : number,
    handleExpandedChange      : EventHandler<TExclusiveExpandedChangeEvent>
}
export const useExclusiveAccordionState = <TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props: ExclusiveAccordionStateProps<TExclusiveExpandedChangeEvent>): ExclusiveAccordionState<TExclusiveExpandedChangeEvent> => {
    // rest props:
    const {
        // states:
        defaultExpandedListIndex,
        expandedListIndex,
        onExpandedChange,
    } = props;
    
    
    
    // states:
    const isControllableExpanded = (expandedListIndex !== undefined);
    const [expandedListIndexDn, setExpandedListIndexDn] = useState<number>(defaultExpandedListIndex ?? _defaultExpandedListIndex);
    const expandedListIndexFn : number = (expandedListIndex /*controllable*/ ?? expandedListIndexDn /*uncontrollable*/);
    
    
    
    // handlers:
    const handleExpandedChangeInternal = useEvent<EventHandler<TExclusiveExpandedChangeEvent>>(({expanded, listIndex}) => {
        // update state:
        if (!isControllableExpanded) setExpandedListIndexDn(expanded ? listIndex : _defaultExpandedListIndex);
    });
    const handleExpandedChange         = useMergeEvents(
        // preserves the original `onExpandedChange` from `props`:
        onExpandedChange,
        
        
        
        // actions:
        handleExpandedChangeInternal,
    ) ?? handleExpandedChangeInternal;
    
    
    
    return {
        // states:
        expandedListIndex    : expandedListIndexFn,
        handleExpandedChange : handleExpandedChange,
    };
};
//#endregion exclusiveAccordionState
