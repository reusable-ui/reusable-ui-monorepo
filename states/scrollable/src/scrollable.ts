// react:
import {
    // hooks:
    useState,
}                           from 'react'

// reusable-ui utilities:
import {
    decimalify,
}                           from '@reusable-ui/numbers'         // a set of numeric utility functions
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
export interface UncontrollableScrollableOptions {
    min  ?: number
    max  ?: number
    step ?: number
}
export const useUncontrollableScrollable = <TScrollIndexChangeEvent extends ScrollIndexChangeEvent = ScrollIndexChangeEvent>(props: UncontrollableScrollableProps<TScrollIndexChangeEvent>, options?: UncontrollableScrollableOptions): readonly [number, React.Dispatch<React.SetStateAction<number>>] => {
    // options:
    const {
        min  = Number.MIN_SAFE_INTEGER,
        max  = Number.MAX_SAFE_INTEGER,
        step = 0,
    } = options ?? {};
    const negative : boolean = (max < min);
    
    
    
    // validations:
    if ((step !== undefined) && (step < 0)) throw Error('`step` cannot be a negative value.');
    
    
    
    // utilities:
    const trimValue = (value: number): number => {
        // make sure the requested value is between the min value & max value:
        value     = Math.min(Math.max(
            value
        , (negative ? max : min)), (negative ? min : max));
        
        // if step was specified => stepping the value starting from min value:
        if (step > 0) {
            let steps    = Math.round((value - min) / step); // get the_nearest_stepped_value
            
            // make sure the_nearest_stepped_value is not exceeded the max value:
            let maxSteps = (max - min) / step;
            maxSteps     = negative ? Math.ceil(maxSteps) : Math.floor(maxSteps); // remove the decimal fraction
            
            // re-align the steps:
            steps        = negative ? Math.max(steps, maxSteps) : Math.min(steps, maxSteps);
            
            // calculate the new value:
            value        = min + (steps * step);
        } // if
        
        return decimalify(value);
    };
    const trimValueOpt = (value: number|undefined): number|undefined => {
        // conditions:
        if (value === undefined) return undefined;
        
        
        
        return trimValue(value);
    };
    
    
    
    // states:
    const [scrollIndexDn, setScrollIndexDn] = useState<number>(trimValue(props.defaultScrollIndex ?? _defaultScrollIndex));
    
    
    
    /*
     * scrollIndex state is based on [controllable scrollIndex] (if set) and fallback to [uncontrollable scrollIndex]
     */
    const scrollIndexFn : number = trimValueOpt(props.scrollIndex) /*controllable*/ ?? scrollIndexDn /*uncontrollable*/;
    
    
    
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
//#endregion scrollable
