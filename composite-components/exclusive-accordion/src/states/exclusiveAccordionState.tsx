// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
    
    
    
    // hooks:
    useContext,
    useState,
    useMemo,
}                           from 'react'

// reusable-ui core:
import {
    // react helper hooks:
    useEvent,
    EventHandler,
    useMergeEvents,
    useScheduleTriggerEvent,
    
    
    
    // a capability of UI to expand/reduce its size or toggle the visibility:
    ExpandedChangeEvent,
}                           from '@reusable-ui/core'            // a set of reusable-ui packages which are responsible for building any component



// hooks:

// states:

//#region exclusiveAccordionState

// defaults:
const _defaultExpandedListIndex = -1;



// types:
export interface ExclusiveExpandedChangeEvent extends ExpandedChangeEvent {
    // positions:
    listIndex : number
}



// contexts:
export interface ExclusiveAccordionState
{
    // states:
    expandedListIndex         : number,
    triggerExpandedChange     : (expanded: boolean, listIndex: number) => void
}

const ExclusiveAccordionStateContext = createContext<ExclusiveAccordionState>({
    // states:
    expandedListIndex         : _defaultExpandedListIndex,
    triggerExpandedChange     : () => { throw Error('not inside <ExclusiveAccordionStateProvider>'); },
});
ExclusiveAccordionStateContext.displayName  = 'ExclusiveAccordionState';

export const useExclusiveAccordionState = (): ExclusiveAccordionState => {
    return useContext(ExclusiveAccordionStateContext);
}



// react components:
export interface ExclusiveAccordionStateProps<TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
{
    // states:
    defaultExpandedListIndex ?: number
    expandedListIndex        ?: number
    onExpandedChange         ?: EventHandler<TExclusiveExpandedChangeEvent>
}
const ExclusiveAccordionStateProvider = <TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props: React.PropsWithChildren<ExclusiveAccordionStateProps<TExclusiveExpandedChangeEvent>>): JSX.Element|null => {
    // props:
    const {
        // states:
        defaultExpandedListIndex,
        expandedListIndex,
        onExpandedChange,
        
        
        
        // children:
        children,
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
    );
    
    
    
    // events:
    const scheduleTriggerEvent         = useScheduleTriggerEvent();
    const triggerExpandedChange        = useEvent((expanded: boolean, listIndex: number): void => {
        if (handleExpandedChange) scheduleTriggerEvent(() => { // runs the `onExpandedChange` event *next after* current macroTask completed
            // fire `onExpandedChange` react event:
            handleExpandedChange({ expanded, listIndex } as TExclusiveExpandedChangeEvent);
        });
    });
    
    
    
    // states:
    const exclusiveAccordionState = useMemo<ExclusiveAccordionState>(() => ({
        // states:
        expandedListIndex     : expandedListIndexFn,   // mutable value
        triggerExpandedChange : triggerExpandedChange, // stable ref
    }), [
        // states:
        expandedListIndexFn,
    ]);
    
    
    
    // jsx:
    return (
        <ExclusiveAccordionStateContext.Provider value={exclusiveAccordionState}>
            {children}
        </ExclusiveAccordionStateContext.Provider>
    );
};
export {
    ExclusiveAccordionStateProvider,
    ExclusiveAccordionStateProvider as default,
}
//#endregion exclusiveAccordionState
