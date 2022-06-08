// react:
import {
    // hooks:
    useEffect,
    useLayoutEffect,
    useReducer,
    useCallback,
}                           from 'react'

// cssfn:
import type {
    // types:
    Optional,
}                           from '@cssfn/types'

// other libs:
import {
    // tests:
    isBrowser,
    isJsDom,
}                           from 'is-in-browser'



// utilities:
export const isClientSide : boolean = isBrowser || isJsDom;



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

export const useMergeEvent = <TEvent extends React.SyntheticEvent<any>>(...events: Optional<React.EventHandler<TEvent>>[]): React.EventHandler<TEvent> => {
    return useCallback<React.EventHandler<TEvent>>((e) => {
        for (const event of events) {
            event?.(e);
        } // for
        // eslint-disable-next-line
    }, [...events]);
};



export const useMergeRef = <TValue>(...refs: Optional<React.Ref<TValue>>[]): React.Ref<TValue> => {
    return useCallback<React.RefCallback<TValue>>((value) => {
        for (const ref of refs) {
            if (typeof(ref) === 'function') {
                ref?.(value);
            }
            else {
                (ref as React.MutableRefObject<TValue|null>).current = value;
            } // if
        } // for
        // eslint-disable-next-line
    }, [...refs]);
};
