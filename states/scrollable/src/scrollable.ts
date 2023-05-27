// react:
import {
    // hooks:
    useState,
}                           from 'react'

// reusable-ui utilities:
import {
    // hooks:
    useEvent,
    EventHandler,
    useScheduleTriggerEvent,
}                           from '@reusable-ui/hooks'           // react helper hooks



// hooks:

// states:

//#region scrollable
// defaults:
const _defaultScrollIndex = 0;



export interface ScrollIndexChangeEvent {
    // states:
    scrollIndex          : number
}
export interface ScrollableProps<TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>
    extends
        // states:
        Partial<Pick<TScrollIndexChangeEvent,
            |'scrollIndex'
        >>
{
}

export interface ControllableScrollableProps<TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>
    extends
        // states:
        ScrollableProps<TScrollIndexChangeEvent>
{
    // states:
    onScrollIndexChange ?: EventHandler<TScrollIndexChangeEvent>
}
export interface UncontrollableScrollableProps<TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>
    extends
        // states:
        ControllableScrollableProps<TScrollIndexChangeEvent>
{
    // states:
    defaultScrollIndex  ?: number
}
export const useUncontrollableScrollable = <TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>(props: UncontrollableScrollableProps<TScrollIndexChangeEvent>): readonly [number, React.Dispatch<React.SetStateAction<number>>] => {
    // states:
    const [scrollIndexDn, setScrollIndexDn] = useState<number>(props.defaultScrollIndex ?? _defaultScrollIndex);
    
    
    
    /*
     * scrollIndex state is based on [controllable scrollIndex] (if set) and fallback to [uncontrollable scrollIndex]
     */
    const scrollIndexFn : number = props.scrollIndex /*controllable*/ ?? scrollIndexDn /*uncontrollable*/;
    
    
    
    // events:
    const scheduleTriggerEvent = useScheduleTriggerEvent();
    const {
        onScrollIndexChange,
    } = props;
    /*
          controllable : setScrollIndex(new) => update state(old => old) => trigger Event(new)
        uncontrollable : setScrollIndex(new) => update state(old => new) => trigger Event(new)
    */
    const triggerScrollIndexChange = useEvent<React.Dispatch<number>>((scrollIndex) => {
        if (onScrollIndexChange) scheduleTriggerEvent(() => { // runs the `onScrollIndexChange` event *next after* current macroTask completed
            // fire `onScrollIndexChange` react event:
            onScrollIndexChange({ scrollIndex } as TScrollIndexChangeEvent);
        });
    });
    
    
    
    // callbacks:
    const setScrollIndex = useEvent<React.Dispatch<React.SetStateAction<number>>>((scrollIndex) => {
        // conditions:
        const newScrollIndex = (typeof(scrollIndex) === 'function') ? scrollIndex(scrollIndexFn) : scrollIndex;
        if (newScrollIndex === scrollIndexFn) return; // still the same => nothing to update
        
        
        
        // update:
        setScrollIndexDn(newScrollIndex);
        triggerScrollIndexChange(newScrollIndex);
    }); // a stable callback, the `setScrollIndex` guaranteed to never change
    
    
    
    return [
        scrollIndexFn,
        setScrollIndex,
    ];
};
//#endregion scrollable
