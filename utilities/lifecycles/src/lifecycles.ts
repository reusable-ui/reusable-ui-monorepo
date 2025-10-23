// React:
import {
    // Types:
    type DependencyList,
    type DispatchWithoutAction,
    type RefObject,
    
    
    
    // Hooks:
    useLayoutEffect,
    useReducer,
    useRef,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Flags:
    isClientSide,
}                           from '@reusable-ui/runtime-checks'  // Detects whether JavaScript is running on the client-side or server-side, including JSDOM environments.



// Utilities:

/**
 * A shared empty dependency list for optimizing React hooks.
 * Helps prevent unnecessary re-creations of memoized values.
 */
const emptyDependency : DependencyList = [];



// Hooks:

/**
 * A React hook that intelligently switches between `useLayoutEffect` and a no-op function
 * based on the execution environment.
 * 
 * - **Client-side:** Uses `useLayoutEffect` for synchronous updates before paint.
 * - **Server-side:** Falls back to a no-op function to prevent execution during SSR.
 * - Useful for effects that **must run before visual updates** without causing hydration mismatches.
 * 
 * @example
 * ```ts
 * useIsomorphicLayoutEffect(() => {
 *     console.log('This effect runs before paint on the client.');
 * }, []);
 * ```
 */
export const useIsomorphicLayoutEffect : typeof useLayoutEffect = isClientSide ? useLayoutEffect : () => { /* noop */ };



/**
 * Reducer function used to trigger a forced re-render.
 * Always returns a **new unique value** (`Symbol()`) to ensure React detects a state change.
 * 
 * @returns {symbol} A unique identifier for triggering state updates.
 */
const triggerRenderReducer = (_state: symbol, _action: void): symbol => {
    // Forces a re-render by always returning a new value:
    return Symbol();
};

/**
 * Custom React hook to manually trigger a component re-render.
 * 
 * - Ensures the trigger function maintains a **stable reference** across renders.
 * - Useful for manually refreshing components without modifying state.
 * 
 * @returns {[DispatchWithoutAction, symbol]} A tuple containing:
 *   - A `triggerRender` function that forces a re-render while maintaining a stable reference across renders.
 *   - The latest **unique state identifier** (`Symbol`) that updates on each trigger.
 * 
 * @example
 * ```ts
 * const [triggerRender, stateStamp] = useTriggerRender();
 * 
 * // Force a re-render of the component:
 * triggerRender();
 * ```
 */
export const useTriggerRender = (): [DispatchWithoutAction, symbol] => {
    const [stateStamp, setState] = useReducer(triggerRenderReducer, Symbol());
    return [setState, stateStamp] satisfies readonly [DispatchWithoutAction, symbol];
};



/**
 * Tracks the mounted status of a React component.
 * 
 * - `undefined`: The component has never been mounted.
 * - `true`: The component is currently mounted.
 * - `false`: The component has been unmounted.
 *
 * @returns {RefObject<boolean | undefined>} A ref indicating the mounted status.
 * 
 * @example
 * ```ts
 * const isMounted = useMountedFlag();
 * useEffect(() => {
 *     if (isMounted.current) {
 *         console.log('Component is mounted.');
 *     }
 * }, []);
 * ```
 */
export const useMountedFlag = (): RefObject<boolean | undefined> => {
    // Creates a ref to track mount status:
    const isMounted = useRef<boolean | undefined>(undefined); // Initially uninitialized.
    
    
    
    // Updates mount status on lifecycle changes:
    useIsomorphicLayoutEffect(() => {
        // Setups:
        
        // Marks component as mounted:
        isMounted.current = true;
        
        
        
        // Cleanups:
        return () => {
            // Marks component as unmounted:
            isMounted.current = false;
        };
    }, emptyDependency); // Optimized dependency for stable reference.
    
    
    
    // Returns the mounted status flag:
    return isMounted;
};



/**
 * Tracks the previous value of a given input across renders.
 * 
 * This hook is ideal for animation authors, directional transitions, and lifecycle-aware components
 * that need to compare the current and previous values within the same render pass.
 * 
 * Unlike `useEffect`-based tracking, this hook updates the previous value
 * synchronously during render using an inline `if` mutation. This ensures
 * that the previous value is immediately available for layout, animation,
 * or style decisions — without a one-frame delay.
 * 
 * @example
 * ```tsx
 * import { usePreviousValue } from '@reusable-ui/lifecycles';
 * 
 * export const ExampleComponent = ({ viewIndex }: { viewIndex: number }) => {
 *     const prevViewIndex = usePreviousValue(viewIndex);
 *     
 *     const direction = (
 *         prevViewIndex === undefined ? 'initial' :
 *         viewIndex > prevViewIndex ? 'forward' :
 *         viewIndex < prevViewIndex ? 'backward' :
 *         'static'
 *     );
 *     
 *     return (
 *         <div>
 *             <p>Current view index: {viewIndex}</p>
 *             <p>Previous view index: {String(prevViewIndex)}</p>
 *             <p>Transition direction: {direction}</p>
 *         </div>
 *     );
 * };
 * ```
 * 
 * @template TValue - The type of the value to track.
 * 
 * @param value The current value to track.
 * @returns The previous value, or `undefined` on the first render.
 */
export const usePreviousValue = <TValue>(value: TValue): TValue | undefined => {
    // Tracks the history of current and previous values:
    const historyRef = useRef<[current: TValue, previous: TValue | undefined]>([value, undefined]);
    const history    = historyRef.current;
    
    
    
    // Compare and update the history inline during render:
    if (!Object.is(history[0], value)) { // Use `Object.is` for accurate equality check (handles NaN, -0, +0).
        // Shift previous:
        history[1] = history[0];
        
        // Update current:
        history[0] = value;
    } // if
    
    
    
    // Returns the previous value:
    return history[1];
};
