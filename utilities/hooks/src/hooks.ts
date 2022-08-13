// react:
import {
    // hooks:
    useEffect,
    useLayoutEffect,
    useReducer,
    useCallback,
    useMemo,
}                           from 'react'

// cssfn:
import type {
    // types:
    Optional,
    SingleOrArray,
}                           from '@cssfn/types'                 // cssfn general types

// reusable-ui utilities:
import {
    // utilities:
    isClientSide,
}                           from '@reusable-ui/utilities'       // common utility functions



// hooks:

/**
 * A React helper hook for using `useLayoutEffect` with a fallback to a regular `useEffect` for environments where `useLayoutEffect` should not be used (such as server-side rendering).
 */
export const useIsomorphicLayoutEffect = isClientSide ? useLayoutEffect : useEffect;



const triggerRenderReducer = (_currentGeneration: object, _action: void): object => {
    return {}; // update with a new object
};
/**
 * Manually controls the (re)render event.
 */
export const useTriggerRender = () => {
    const [generation, setState] = useReducer(triggerRenderReducer, {});
    return [setState, generation] as const;
};



export { useCallback as useEvent };

export type EventHandler<in TEvent> = (event: TEvent) => void;
export const useMergeEvents = <TEvent>(...eventHandlers: Optional<EventHandler<TEvent>>[]): EventHandler<TEvent>|undefined => {
    return useMemo<EventHandler<TEvent>|undefined>(() => {
        // check if singular eventHandler:
        let firstEventHandler : EventHandler<TEvent>|undefined = undefined;
        let multiEventHandlers = false;
        for (const eventHandler of eventHandlers) {
            if (!eventHandler) continue; // ignores empty eventHandler
            
            
            
            if (!firstEventHandler) {
                firstEventHandler = eventHandler;
            }
            else {
                multiEventHandlers = true;
                break; // no need for testing more eventHandlers
            } // if
        } // for
        if (!multiEventHandlers) return firstEventHandler;
        
        
        
        // merge eventHandlers:
        return (event) => {
            for (const eventHandler of eventHandlers) {
                eventHandler?.(event);
            } // for
            // eslint-disable-next-line
        };
    }, [...eventHandlers]);
};



export const useMergeRefs = <TValue>(...refs: Optional<React.Ref<TValue>>[]): React.Ref<TValue>|undefined => {
    return useMemo<React.Ref<TValue>|undefined>(() => {
        // check if singular ref:
        let firstRef : React.Ref<TValue>|undefined = undefined;
        let multiRefs = false;
        for (const ref of refs) {
            if (!ref) continue; // ignores empty ref
            
            
            
            if (!firstRef) {
                firstRef = ref;
            }
            else {
                multiRefs = true;
                break; // no need for testing more refs
            } // if
        } // for
        if (!multiRefs) return firstRef;
        
        
        
        // merge refs:
        return (value) => {
            for (const ref of refs) {
                if (typeof(ref) === 'function') {
                    ref?.(value);
                }
                else {
                    (ref as React.MutableRefObject<TValue|null>).current = value;
                } // if
            } // for
            // eslint-disable-next-line
        };
    }, [...refs]);
};



export const useMergeClasses = (...classes: SingleOrArray<Optional<string>>[]): Optional<string>[] => {
    return useMemo<Optional<string>[]>(() => {
        return classes.flat();
    }, [...classes]);
};



export const useMergeStyles = (...styles: Optional<React.CSSProperties>[]): React.CSSProperties|undefined => {
    return useMemo<React.CSSProperties|undefined>(() => {
        const mergedStyles : React.CSSProperties = {};
        for (const style of styles) {
            if (!style) continue;
            Object.assign(mergedStyles, style);
        } // for
        if (!Object.keys(mergedStyles).length) return undefined;
        return mergedStyles;
    }, [...styles]);
};
