// React:
import {
    // Types:
    type DependencyList,
    type Ref,
    type RefObject,
    type RefCallback,
    type CSSProperties,
    
    
    
    // Hooks:
    useEffect,
    useLayoutEffect,
    useReducer,
    useCallback,
    useRef,
    useMemo,
    useState,
}                           from 'react'

// Cssfn:
import {
    // Cssfn general types:
    type Optional,
    type MaybeArray,
}                           from '@cssfn/core'                  // Writes css in javascript.

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
 * A React hook that intelligently switches between `useLayoutEffect` and `useEffect`
 * based on the execution environment.
 * 
 * - Uses `useLayoutEffect` **in the browser** (client-side) for synchronous updates before paint.
 * - Falls back to `useEffect` **on the server** to avoid unnecessary execution during SSR.
 * - Ideal for effects that need to run **before visual updates** in client-side rendering.
 */
export const useIsomorphicLayoutEffect : typeof useLayoutEffect = isClientSide ? useLayoutEffect : useEffect;



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
 * @returns {[() => void, symbol]} A tuple containing the trigger function and the current state identifier.
 * 
 * @example
 * ```ts
 * const [triggerRender, stateStamp] = useTriggerRender();
 * // Use `triggerRender` to force a re-render of the component:
 * triggerRender(); // Forces a re-render
 * ```
 */
export const useTriggerRender = () => {
    const [stateStamp, setState] = useReducer(triggerRenderReducer, Symbol());
    return [setState, stateStamp] satisfies readonly [() => void, symbol];
};



// const useClientOnlyInsertionEffect : typeof useInsertionEffect = isClientSide ? useInsertionEffect : () => { /* noop */ }

/**
 * A React hook that ensures stable function references across renders.
 * 
 * - Prevents unnecessary re-creations of the callback function.
 * - Keeps the most recent reference without triggering extra renders.
 * - Useful for event handlers, preventing stale closures.
 * 
 * @param {TCallback} callback - The function whose reference should be preserved.
 * @returns {TCallback} A stable function reference.
 */
export const useEvent = <TCallback extends ((...args: any[]) => unknown)>(callback: TCallback): TCallback => {
    // Store the latest callback reference:
    const callbackRef = useRef<TCallback>(callback);
    
    
    
    /*  
        Too overkill for updating the callback reference by using `useInsertionEffect`, just assign it directly:
        
        // Effects:
        useClientOnlyInsertionEffect(() => {
            // Update the callback reference **on each re-render**:
            callbackRef.current = callback;
        }); // Runs every time the component re-renders.
    */
    
    // Update the callback reference **on each re-render**:
    callbackRef.current = callback;
    
    
    
    // Return a stable callback reference:
    return useCallback<TCallback>(((...args) => {
        // Calls the latest callback reference with the provided arguments:
        return callbackRef.current(...args);
    }) as TCallback, emptyDependency); // Runs only once, so the callback reference is stable.
};



/**
 * Defines a generic event handler function type.
 * 
 * @template TEvent - The type of the event object.
 * @template TExtra - Additional parameters passed to the event handler.
 */
export type EventHandler<in TEvent, in TExtra extends unknown[] = []> = (event: TEvent, ...extra: TExtra) => void;

/**
 * Combines multiple event handlers into a single function.
 * 
 * - Ensures stable references for performance optimization.
 * - Handles cases where some handlers may be `null` or `undefined`.
 * - Executes all provided handlers in sequence when triggered.
 * 
 * @template TEvent - The type of the event object.
 * @template TExtra - Additional parameters passed to each handler.
 * @param {Optional<EventHandler<TEvent, TExtra>>[]} eventHandlers - List of event handlers to merge.
 * @returns {EventHandler<TEvent, TExtra>} A merged event handler function.
 */
export const useMergeEvents = <TEvent, TExtra extends unknown[] = []>(...eventHandlers: Optional<EventHandler<TEvent, TExtra>>[]): EventHandler<TEvent, TExtra> => {
    // Returns a stable merged event handler function:
    return useEvent<EventHandler<TEvent, TExtra>>((event, ...extra) => {
        // Iterates through handlers and calls each one if defined:
        for (const eventHandler of eventHandlers) {
            eventHandler?.(event, ...extra);
        } // for
    });
};



/**
 * Merges multiple React refs into a single stable ref function.
 * 
 * - Ensures all provided refs receive the assigned value.
 * - Handles both **callback refs** (`(value) => void`) and **ref objects** (`{ current: value }`).
 * - Prevents unnecessary re-creations with a stable reference.
 * 
 * @template TValue - The type of the referenced value.
 * @param {Optional<Ref<TValue>>[]} refs - List of refs to merge.
 * @returns {RefCallback<TValue>} A stable merged ref function.
 */
export const useMergeRefs = <TValue>(...refs: Optional<Ref<TValue>>[]): RefCallback<TValue> => {
    // Returns a stable merged ref function:
    return useEvent<RefCallback<TValue>>((value) => {
        // Iterates through refs and sets each one if defined:
        for (const ref of refs) {
            // Ignore undefined or null refs:
            if (!ref) continue;
            
            
            
            if (typeof ref === 'function') {
                // If ref is a function, call it with the value:
                ref(value);
            }
            else {
                // If ref is an object, set its current value:
                ref.current = value;
            } // if
        } // for
    });
};



/**
 * Merges multiple class names into a stable array when possible.
 * 
 * - Preserves the same reference **if the elements remain unchanged**.
 * - Generates a **new array** only when the `classes` actually changes.
 * 
 * @param {MaybeArray<Optional<string>>[]} classes - List of class names (including nested arrays).
 * @returns {Optional<string>[]} A memoized array of class names.
 */
export const useMergeClasses = (...classes: MaybeArray<Optional<string>>[]): Optional<string>[] => {
    // Flatten class names while ensuring correct order:
    const flattenedClasses = classes.flat();
    
    
    
    // Preserve the same reference as much as possible:
    return useMemo<Optional<string>[]>(() => {
        return flattenedClasses;
    }, [JSON.stringify(flattenedClasses)]);
    // Performance Note: `JSON.stringify` is fine for <20 items, ensuring stable references while avoiding complex comparisons.
};



/**
 * Merges multiple style objects into a single stable object.
 * 
 * - Preserves the same reference **if the styles remain unchanged**.
 * - Returns `undefined` if no styles are provided.
 * - Generates a **new style object** only when the `styles` actually changes.
 * 
 * @param {Optional<CSSProperties>[]} styles - List of style objects.
 * @returns {CSSProperties | undefined} A memoized merged style object.
 */
export const useMergeStyles = (...styles: Optional<CSSProperties>[]): CSSProperties | undefined => {
    // Flatten the styles array:
    const flattenedStyles = styles.flat();
    
    
    
    // Preserve the same reference as much as possible:
    return useMemo<CSSProperties | undefined>(() => {
        // Merge styles into a single object:
        const mergedStyles = Object.assign({}, ...flattenedStyles);
        
        
        
        // Return `undefined` if no styles exist:
        if (!Object.keys(mergedStyles).length) return undefined;
        
        
        
        // Return the merged styles object:
        return mergedStyles;
    }, [JSON.stringify(flattenedStyles)]);
    // Performance Note: `JSON.stringify` is fine for small inline styles, ensuring stable references while avoiding complex comparisons.
};



/**
 * Tracks the mounted status of a React component.
 * 
 * - `undefined`: Component has never been mounted.
 * - `true`: Component is currently mounted.
 * - `false`: Component is unmounted.
 *
 * @returns {RefObject<boolean | undefined>} A ref indicating the mounted status.
 */
export const useMountedFlag = (): RefObject<boolean | undefined> => {
    // Create a ref to track mount status:
    const isMounted = useRef<boolean | undefined>(undefined); // Initially uninitialized.
    
    
    
    // Effect to update mount status:
    useIsomorphicLayoutEffect(() => {
        // Setups:
        isMounted.current = true; // Mark as mounted.
        
        
        
        // Cleanups:
        return () => {
            isMounted.current = false; // Mark as unmounted.
        };
    }, emptyDependency); // Optimized dependency for stable reference.
    
    
    
    // Return the reference to the mounted status flag:
    return isMounted;
};



/**
 * Options for the ScheduledPromise, including an abort handler.
 */
export interface ScheduledPromiseOptions {
    /**
     * Callback function to handle the abort action for the scheduled task.
     * It should include cleanup logic or state updates when the task is aborted.
     */
    onAbort: () => void
}

/**
 * A custom promise class that supports aborting a scheduled task.
 */
export class ScheduledPromise<T> extends Promise<T> {
    // States:
    
    /**
     * Stores the options for the scheduled promise, including the abort handler.
     */
    readonly #options: ScheduledPromiseOptions
    
    
    
    // Constructors:
    
    /**
     * Creates a new ScheduledPromise instance.
     * 
     * @param executor - Function that resolves or rejects the promise.
     * @param options - Configuration including an abort handler.
     */
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: unknown) => void) => void, options: ScheduledPromiseOptions) {
        super(executor);
        this.#options = options;
    }
    
    
    
    // Methods:
    
    /**
     * Aborts the scheduled task associated with this promise.
     */
    abort(): void {
        // Call the abort handler provided in the options:
        this.#options.onAbort();
    }
}

/**
 * A React hook for creating timeout-based promises.
 * 
 * - Provides a function that creates a `ScheduledPromise`, resolving `true` when completed, or `false` if aborted.
 * - Supports aborting timeout tasks before resolution.
 * - Automatically cleans up all running timers when the component unmounts.
 * 
 * @returns {(delay: number) => ScheduledPromise<boolean>} A function that creates a ScheduledPromise resolving `true` when completed, or `false` if aborted.
 */
export const useSetTimeout = (): ((delay: number) => ScheduledPromise<boolean>) => {
    // States:
    
    // Tracks active timers and their resolve functions:
    const [timerRegistry] = useState<Map<ReturnType<typeof setTimeout>, (value: boolean) => void>>(
        // Initialize the registry as an empty Map:
        () => new Map<ReturnType<typeof setTimeout>, (value: boolean) => void>()
    );
    
    
    
    // Effects:
    
    // Cancels all timers when the component unmounts:
    useEffect(() => {
        // Cleanups:
        return () => {
            // if there are SOME running timer tasks => ABORT all:
            for (const [timerTask, resolve] of timerRegistry) {
                // Abort timer:
                clearTimeout(timerTask);
                
                
                
                // Notify timeout was aborted:
                resolve(false);
            } // for
            
            
            
            // Clear the registry:
            timerRegistry.clear();
        };
    }, emptyDependency); // Optimized dependency for stable reference.
    
    
    
    // Returns a function that creates a timeout-based promise:
    return (delay: number): ScheduledPromise<boolean> => {
        // Create a new promise with resolvers:
        const { promise, resolve } = Promise.withResolvers<boolean>();
        
        
        
        // Create a timer task that resolves after the specified delay:
        const timerTask = setTimeout(() => {
            // Remove completed task:
            timerRegistry.delete(timerTask);
            
            
            
            // Notify timeout completion:
            resolve(true);
        }, delay);
        
        
        
        // Register new timer task:
        timerRegistry.set(timerTask, resolve);
        
        
        
        // Return a new ScheduledPromise instance that wraps the original promise:
        return new ScheduledPromise<boolean>(
            // Executor function that resolves or rejects the promise:
            (resolve, reject): void => {
                promise
                .then((value)   => resolve(value))
                .catch((reason) => reject(reason))
            },
            
            // Options for the timer promise, including an abort handler:
            {
                /**
                 * Aborts the timer task and prevents resolution.
                 */
                onAbort: (): void => {
                    // Abort timer:
                    clearTimeout(timerTask);
                    
                    
                    
                    // Notify timeout was aborted:
                    resolve(false);
                    
                    
                    
                    // Remove aborted task from registry:
                    timerRegistry.delete(timerTask);
                },
            }
        );
    };
};

/**
 * A React hook for creating animation-frame-based promises.
 * 
 * - Provides a function that creates a `ScheduledPromise`, resolving with the timestamp from `requestAnimationFrame`, or `false` if aborted.
 * - Supports aborting animation frame requests before resolution.
 * - Automatically cleans up all pending frame requests when the component unmounts.
 * 
 * @returns {() => ScheduledPromise<DOMHighResTimeStamp | false>} A function that creates a ScheduledPromise resolving with the timestamp from `requestAnimationFrame`, or `false` if aborted.
 */
export const useRequestAnimationFrame = (): (() => ScheduledPromise<DOMHighResTimeStamp | false>) => {
    // States:
    
    // Tracks active animation frame requests and their resolve functions:
    const [frameRegistry] = useState<Map<ReturnType<typeof requestAnimationFrame>, (value: DOMHighResTimeStamp | false) => void>>(
        // Initialize the registry as an empty Map:
        () => new Map<ReturnType<typeof requestAnimationFrame>, (value: DOMHighResTimeStamp | false) => void>()
    );
    
    
    
    // Effects:
    
    // Cancels all animation frames when the component unmounts:
    useEffect(() => {
        // Cleanups:
        return () => {
            // if there are SOME pending frame request tasks => ABORT all:
            for (const [frameTask, resolve] of frameRegistry) {
                // Abort animation frame request:
                cancelAnimationFrame(frameTask);
                
                
                
                // Notify frame request was aborted:
                resolve(false);
            } // for
            
            
            
            // Clear the registry:
            frameRegistry.clear();
        };
    }, emptyDependency); // Optimized dependency for stable reference.
    
    
    
    // Returns a function that creates an animation-frame-based promise:
    return (): ScheduledPromise<DOMHighResTimeStamp | false> => {
        // Create a new promise with resolvers:
        const { promise, resolve } = Promise.withResolvers<DOMHighResTimeStamp | false>();
        
        
        
        // Create a frame task that resolves with the timestamp from `requestAnimationFrame`:
        const frameTask = requestAnimationFrame((timestamp) => {
            // Remove completed task:
            frameRegistry.delete(frameTask);
            
            
            
            // Notify the frame request was completed with the timestamp:
            resolve(timestamp);
        });
        
        
        
        // Register new frame task:
        frameRegistry.set(frameTask, resolve);
        
        
        
        // Return a new ScheduledPromise instance that wraps the original promise:
        return new ScheduledPromise<DOMHighResTimeStamp | false>(
            // Executor function that resolves or rejects the promise:
            (resolve, reject): void => {
                promise
                .then((value)   => resolve(value))
                .catch((reason) => reject(reason))
            },
            
            // Options for the timer promise, including an abort handler:
            {
                /**
                 * Aborts the animation frame request and prevents resolution.
                 */
                onAbort: (): void => {
                    // Abort animation frame request:
                    cancelAnimationFrame(frameTask);
                    
                    
                    
                    // Notify frame request was aborted:
                    resolve(false);
                    
                    
                    
                    // Remove aborted task from registry:
                    frameRegistry.delete(frameTask);
                },
            }
        );
    };
};



export type ScheduledTriggerEventCallback = () => void
export type ScheduleTriggerEventFunction  = (scheduledTriggerEventCallback: ScheduledTriggerEventCallback) => void
export const useScheduleTriggerEvent = (): ScheduleTriggerEventFunction => {
    const isMounted = useMountedFlag();
    
    
    
    return (scheduledTriggerEventCallback) => {
        setTimeout(() => {
            // conditions:
            if (!isMounted.current) return;
            
            
            
            // fire the event_delegator_callback:
            scheduledTriggerEventCallback();
        }, 0); // runs the event_delegator_callback *next after* current macroTask completed
    };
};



/**
 * Determines if an element uses **right-to-left (RTL)** direction.
 * 
 * - Attaches a ref to the target element.
 * - Tracks RTL status and updates when the component re-renders.
 * - Defaults to `false` (assuming left-to-right in most cases).
 *
 * @returns {[boolean, RefCallback<TElement | null>]} A tuple containing the RTL status and a ref callback.
 */
export const useIsRtl = <TElement extends Element = HTMLElement>(): readonly [boolean, RefCallback<TElement | null>] => {
    // States:
    
    // Tracks the target element reference:
    const [targetElementRef, setTargetElementRef] = useState<TElement | null>(null);
    
    // Tracks whether the element is **right-to-left (RTL)**:
    const [isRtl, setIsRtl] = useState<boolean>(false); // Assuming left-to-right by default.
    
    
    
    // Effects::
    
    // Updates RTL status when the element reference changes:
    useIsomorphicLayoutEffect(() => {
        // Ensure the target element reference is valid:
        if (!targetElementRef) return;
        
        
        
        // Check the computed style of the target element to determine its direction:
        const newIsRtl = (getComputedStyle(targetElementRef).direction === 'rtl');
        
        // Update only if the value changes:
        if (isRtl === newIsRtl) return;
        
        // Update the RTL status:
        setIsRtl(newIsRtl);
    }); // Runs on each render to track direction changes.
    
    
    
    // Returns a tuple containing the RTL status and a ref callback:
    return [isRtl, setTargetElementRef];
};
