// React:
import {
    // Hooks:
    useState,
}                           from 'react'

// Reusable-ui utilities:
import {
    clamp,
}                           from '@reusable-ui/numbers'             // A lightweight JavaScript library for precise numeric operations.
import {
    // Hooks:
    useEvent,
    EventHandler,
    useScheduleTriggerEvent,
}                           from '@reusable-ui/hooks'               // React helper hooks.



// defaults:
const _defaultScrollIndex = 0;



/**
 * @deprecated - No longer needed.
 */
export interface ScrollIndexChangeEvent {
    // states:
    scrollIndex          : number
}
/**
 * @deprecated - Use `ViewStateProps` instead.
 */
export interface ScrollableProps<TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>
    extends
        // states:
        Partial<Pick<TScrollIndexChangeEvent,
            |'scrollIndex'
        >>
{
}

/**
 * @deprecated - Use `ViewStateProps & ViewStateChangeProps` instead.
 */
export interface ControllableScrollableProps<TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>
    extends
        // states:
        ScrollableProps<TScrollIndexChangeEvent>
{
    // states:
    onScrollIndexChange ?: EventHandler<TScrollIndexChangeEvent>
}
/**
 * @deprecated - Use `ViewStateProps & ViewStateChangeProps & UncontrollableViewStateProps` instead.
 */
export interface UncontrollableScrollableProps<TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>
    extends
        // states:
        ControllableScrollableProps<TScrollIndexChangeEvent>
{
    // states:
    defaultScrollIndex  ?: number
}
/**
 * @deprecated - Use `ViewStateOptions` instead.
 */
export interface UncontrollableScrollableOptions {
    min  ?: number
    max  ?: number
    step ?: number
}
/**
 * @deprecated - Use `useUncontrollableViewState` instead.
 */
export const useUncontrollableScrollable = <TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>(props: UncontrollableScrollableProps<TScrollIndexChangeEvent>, options?: UncontrollableScrollableOptions): readonly [number, React.Dispatch<React.SetStateAction<number>>] => {
    // options:
    const {
        min  = -Infinity,
        max  =  Infinity,
        step = 0,
    } = options ?? {};
    
    
    
    // utilities:
    const trimValue = <TNumber extends number|null|undefined>(value: TNumber): TNumber => {
        return clamp<TNumber>(min, value, max, step);
    };
    
    
    
    // states:
    const [scrollIndexDn, setScrollIndexDn] = useState<number>(trimValue(props.defaultScrollIndex ?? _defaultScrollIndex));
    
    
    
    /*
     * scrollIndex state is based on [controllable scrollIndex] (if set) and fallback to [uncontrollable scrollIndex]
     */
    const scrollIndexFn : number = trimValue(props.scrollIndex) /*controllable*/ ?? scrollIndexDn /*uncontrollable*/;
    
    
    
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
        const newScrollIndex = trimValue((typeof(scrollIndex) === 'function') ? scrollIndex(scrollIndexFn) : scrollIndex);
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
