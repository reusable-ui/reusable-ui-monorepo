// react:
import {
    // react:
    default as React,
    
    
    
    // contexts:
    createContext,
    
    
    
    // hooks:
    useContext,
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



export interface ExclusiveAccordionStateApi
{
    // states:
    expandedListIndex         : number,
    triggerExpandedChange     : (expanded: boolean, listIndex: number) => void
}

const ExclusiveAccordionStateContext = createContext<ExclusiveAccordionStateApi>({
    // states:
    expandedListIndex         : _defaultExpandedListIndex,
    triggerExpandedChange     : () => { throw Error('not inside <ExclusiveAccordionStateProvider>'); },
});
ExclusiveAccordionStateContext.displayName  = 'ExclusiveAccordionState';

export const useExclusiveAccordionState = (): ExclusiveAccordionStateApi => {
    return useContext(ExclusiveAccordionStateContext);
}



export interface ExclusiveAccordionStateProps<TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>
{
    // states:
    defaultExpandedListIndex ?: number
    expandedListIndex        ?: number
    onExpandedChange         ?: EventHandler<TExclusiveExpandedChangeEvent>
    
    
    
    // children:
    children                 ?: React.ReactNode
}
const ExclusiveAccordionStateProvider = <TExclusiveExpandedChangeEvent extends ExclusiveExpandedChangeEvent = ExclusiveExpandedChangeEvent>(props: ExclusiveAccordionStateProps<TExclusiveExpandedChangeEvent>): JSX.Element|null => {
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
    const triggerExpandedChange        = useEvent((expanded: boolean, listIndex: number): void => {
        handleExpandedChange?.({ expanded, listIndex } as TExclusiveExpandedChangeEvent);
    });
    
    
    
    // jsx:
    return (
        <ExclusiveAccordionStateContext.Provider value={{
            // states:
            expandedListIndex     : expandedListIndexFn,
            triggerExpandedChange : triggerExpandedChange,
        }}>
            {children}
        </ExclusiveAccordionStateContext.Provider>
    );
};
export {
    ExclusiveAccordionStateProvider,
    ExclusiveAccordionStateProvider as default,
}
//#endregion exclusiveAccordionState
