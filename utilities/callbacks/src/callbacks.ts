// React:
import {
    // Types:
    type DependencyList,
    
    
    
    // Hooks:
    useCallback,
    useRef,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    type Optional,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Types:
import {
    type Callback,
    type EventHandler,
}                           from './types.js'



// Utilities:

/**
 * A shared empty dependency list for optimizing React hooks.
 * Helps prevent unnecessary re-creations of memoized values.
 */
const emptyDependency : DependencyList = [];



// Hooks:

// Unused:
// const useClientOnlyInsertionEffect : typeof useInsertionEffect = isClientSide ? useInsertionEffect : () => { /* noop */ }

/**
 * Ensures a stable function reference across renders.
 * 
 * - Prevents unnecessary re-creations of the callback function.
 * - Avoids stale closures while keeping the latest function reference.
 * - Useful for **event handlers**, preventing unnecessary updates when passed as props.
 * - Useful for **API functions**, ensuring persistent execution without stale closures.
 * 
 * @template TArgs - The argument types passed to the callback function.
 * @template TReturn - The return type of the callback function.
 * @param {Callback<TArgs, TReturn>} callback - The function to be stabilized.
 * @returns {Callback<TArgs, TReturn>} A stable callback function.
 * 
 * @example
 * ```ts
 * // Ensures stable event handlers for performance:
 * const handleClick = useStableCallback((event: MouseEvent) => console.log('Clicked', event));
 * <button onClick={handleClick}>Click Me</button>
 * ```
 * 
 * @example
 * ```ts
 * // Ensures API methods remain stable across renders:
 * const fetchData = useStableCallback(() => fetch('/data'));
 * useEffect(() => {
 *     fetchData(); // Always refers to the latest stable function.
 *     
 *     // The `fetchData` does not change, so omitting it from the dependency array is safe.
 *     // To suppress ESLint warnings:
 *     // eslint-disable-next-line react-hooks/exhaustive-deps
 * }, []);
 * ```
 */
export const useStableCallback = <TArgs extends unknown[] = [], TReturn extends unknown = void>(callback: Callback<TArgs, TReturn>): Callback<TArgs, TReturn> => {
    // Stores the latest callback reference:
    const callbackRef = useRef<Callback<TArgs, TReturn>>(callback);
    
    
    
    /*  
        Too overkill for updating the callback reference by using `useInsertionEffect`, just assign it directly:
        
        // Effects:
        useClientOnlyInsertionEffect(() => {
            // Updates the callback reference on each render:
            callbackRef.current = callback;
        }); // Runs every time the component re-renders.
    */
    
    // Directly update the reference—`useInsertionEffect` or `useClientOnlyInsertionEffect` is unnecessary:
    callbackRef.current = callback;
    
    
    
    // Returns a stable callback reference:
    return useCallback<Callback<TArgs, TReturn>>(((...args) => {
        // Calls the latest callback reference with the provided arguments:
        return callbackRef.current(...args);
    }) as Callback<TArgs, TReturn>, emptyDependency); // Runs only once, keeping a stable function reference.
};



/**
 * Merges multiple callback functions into a single stable function.
 * 
 * - Ensures stable references to optimize performance.
 * - Handles cases where some callbacks may be `null` or `undefined`.
 * - Executes all provided callbacks sequentially.
 * - Useful for combining **multiple event handlers** into a single stable function.
 * 
 * @template TArgs - The argument types passed to each callback function.
 * @param {Optional<Callback<TArgs, void>>[]} callbacks - List of callback functions to merge.
 * @returns {Callback<TArgs, void>} A merged callback function.
 * 
 * @example
 * ```ts
 * // Merging multiple event handlers into a stable reference:
 * const handleClickA = useStableCallback((event: MouseEvent) => console.log('A clicked', event));
 * const handleClickB = useStableCallback((event: MouseEvent) => console.log('B clicked', event));
 * const mergedClickHandler = useMergeCallbacks(handleClickA, handleClickB);
 * 
 * <button onClick={mergedClickHandler}>Click Me</button>
 * ```
 */
export const useMergeCallbacks = <TArgs extends unknown[] = []>(...callbacks: Optional<Callback<TArgs, void>>[]): Callback<TArgs, void> => {
    // Returns a stable merged callback function:
    return useStableCallback<TArgs, void>((...args) => {
        // Iterates through and invokes each callback if defined:
        for (const callback of callbacks) {
            callback?.(...args);
        } // for
    });
};



/**
 * Merges multiple asynchronous callback functions into a single stable function.
 * 
 * - Ensures stable references to optimize performance.
 * - Handles cases where some callbacks may be `null` or `undefined`.
 * - Executes all provided async callbacks in parallel.
 * - Useful for combining **multiple async event handlers** into a single stable function.
 * 
 * @template TArgs - The argument types passed to each callback function.
 * @param {Optional<Callback<TArgs, Promise<void>>>[]} callbacks - List of async callback functions to merge.
 * @returns {Callback<TArgs, Promise<void>>} A merged async callback function.
 * 
 * @example
 * ```ts
 * // Merging multiple async callbacks into a stable reference:
 * const fetchDataA = useStableCallback(async () => console.log('Fetching A...'));
 * const fetchDataB = useStableCallback(async () => console.log('Fetching B...'));
 * const mergedAsyncHandler = useMergeAsyncCallbacks(fetchDataA, fetchDataB);
 * 
 * await mergedAsyncHandler();
 * ```
 */
export const useMergeAsyncCallbacks = <TArgs extends unknown[] = []>(...callbacks: Optional<Callback<TArgs, Promise<void>>>[]): Callback<TArgs, Promise<void>> => {
    // Returns a stable merged async callback function:
    return useStableCallback<TArgs, Promise<void>>(async (...args) => {
        // Executes all async callbacks in parallel, resolving missing callbacks safely:
        await Promise.all(
            callbacks
            .map((callback) =>
                callback?.(...args) ?? Promise.resolve()
            )
        );
    });
};



/**
 * Ensures a stable event handler function reference across renders.
 * 
 * - Prevents unnecessary re-creations of the event handler function.
 * - Avoids stale closures while keeping the latest function reference.
 * - Optimized for performance when passing event handlers as props.
 * 
 * @template TEvent - The event object type.
 * @template TExtra - Additional argument types passed to the event handler function.
 * @template TReturn - The return type of the event handler function.
 * @param {EventHandler<TEvent, TExtra, TReturn>} eventHandler - The event handler function to be stabilized.
 * @returns {EventHandler<TEvent, TExtra, TReturn>} A stable event handler function.
 * 
 * @example
 * ```ts
 * // Ensures stable event handlers for performance:
 * const handleInputChange = useStableEventHandler((event: Event) => console.log('Changed:', event.target.value));
 * <input onChange={handleInputChange} />
 * ```
 */
export const useStableEventHandler = <TEvent, TExtra extends unknown[] = [], TReturn extends unknown = void>(eventHandler: EventHandler<TEvent, TExtra, TReturn>): EventHandler<TEvent, TExtra, TReturn> => {
    // Returns a stable event handler function:
    return useStableCallback<[TEvent, ...TExtra], TReturn>(eventHandler);
};



/**
 * Merges multiple event handler functions into a single stable function.
 * 
 * - Ensures stable references to optimize performance.
 * - Handles cases where some event handlers may be `null` or `undefined`.
 * - Executes all provided event handlers sequentially.
 * - Useful for combining **multiple event handlers** into a single stable function.
 * 
 * @template TEvent - The event object type.
 * @template TExtra - Additional argument types passed to each handler function.
 * @param {Optional<EventHandler<TEvent, TExtra, void>>[]} eventHandlers - List of event handlers to merge.
 * @returns {EventHandler<TEvent, TExtra, void>} A merged event handler function.
 * 
 * @example
 * ```ts
 * // Merging multiple event handlers:
 * const handleClickA = useStableEventHandler((event: MouseEvent) => console.log('A clicked', event));
 * const handleClickB = useStableEventHandler((event: MouseEvent) => console.log('B clicked', event));
 * const mergedClickHandler = useMergeEventHandlers(handleClickA, handleClickB);
 * 
 * <button onClick={mergedClickHandler}>Click Me</button>
 * ```
 */
export const useMergeEventHandlers = <TEvent, TExtra extends unknown[] = []>(...eventHandlers: Optional<EventHandler<TEvent, TExtra, void>>[]): EventHandler<TEvent, TExtra, void> => {
    // Returns a stable merged event handler function:
    return useMergeCallbacks<[TEvent, ...TExtra]>(...eventHandlers);
};

/**
 * @deprecated Use `useMergeEventHandlers` instead.
 */
export const useMergeEvents = useMergeEventHandlers;



/**
 * Merges multiple asynchronous event handler functions into a single stable function.
 * 
 * - Ensures stable references to optimize performance.
 * - Handles cases where some event handlers may be `null` or `undefined`.
 * - Executes all provided async event handlers in parallel.
 * - Useful for combining **multiple async event handlers** into a single stable function.
 * 
 * @template TEvent - The event object type.
 * @template TExtra - Additional argument types passed to each handler function.
 * @param {Optional<EventHandler<TEvent, TExtra, Promise<void>>>[]} eventHandlers - List of async event handler functions to merge.
 * @returns {EventHandler<TEvent, TExtra, Promise<void>>} A merged async event handler function.
 * 
 * @example
 * ```ts
 * // Merging multiple async event handlers into a stable reference:
 * const handleAsyncA = useStableEventHandler(async (event: Event) => console.log('A completed', event));
 * const handleAsyncB = useStableEventHandler(async (event: Event) => console.log('B completed', event));
 * const mergedAsyncHandler = useMergeAsyncEventHandlers(handleAsyncA, handleAsyncB);
 * 
 * await mergedAsyncHandler(event);
 * ```
 */
export const useMergeAsyncEventHandlers = <TEvent, TExtra extends unknown[] = []>(...eventHandlers: Optional<EventHandler<TEvent, TExtra, Promise<void>>>[]): EventHandler<TEvent, TExtra, Promise<void>> => {
    // Returns a stable merged async event handler function:
    return useMergeAsyncCallbacks<[TEvent, ...TExtra]>(...eventHandlers);
};

/**
 * @deprecated Use `useMergeAsyncEventHandlers` instead.
 */
export const useMergeAsyncEvents = useMergeAsyncEventHandlers;
