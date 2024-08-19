// react:
import {
    // hooks:
    useEffect,
    useLayoutEffect,
    useReducer,
    useCallback,
    useRef,
    useMemo,
    useState,
}                           from 'react'

// cssfn:
import type {
    // cssfn general types:
    Optional,
    MaybeArray,
}                           from '@cssfn/core'                  // writes css in javascript

// reusable-ui utilities:
import {
    // utilities:
    isClientSide,
}                           from '@reusable-ui/client-sides'    // a set of client-side functions



// utilities:
const emptyDependency : React.DependencyList = [];



// hooks:

/**
 * A React helper hook for using `useLayoutEffect` with a fallback to a regular `useEffect` for environments where `useLayoutEffect` should not be used (such as server-side rendering).
 */
export const useIsomorphicLayoutEffect : typeof useLayoutEffect = isClientSide ? useLayoutEffect : useEffect;



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



// const useClientOnlyInsertionEffect : typeof useInsertionEffect = isClientSide ? useInsertionEffect : () => { /* noop */ }
export const useEvent = <TCallback extends ((...args: any[]) => unknown)>(callback: TCallback) => {
    // refs:
    const callbackRef = useRef<TCallback>(callback);
    
    
    
    // too overkill:
    // // dom effects:
    // useClientOnlyInsertionEffect(() => {
    //     // keep track of the latest `callback`:
    //     callbackRef.current = callback;
    // }); // runs on every render
    
    // update the callback reference on each re-render is enough:
    callbackRef.current = callback;
    
    
    
    return useCallback<TCallback>(((...args) => {
        return callbackRef.current(...args);
    }) as TCallback, emptyDependency); // runs once on startup (and never re-created)
};

export type EventHandler<in TEvent, in TExtra extends unknown[] = []> = (event: TEvent, ...extra: TExtra) => void;
export const useMergeEvents = <TEvent, TExtra extends unknown[] = []>(...eventHandlers: Optional<EventHandler<TEvent, TExtra>>[]): EventHandler<TEvent, TExtra>|undefined => {
    return useMemo<EventHandler<TEvent, TExtra>|undefined>(() => {
        // check if singular eventHandler:
        let firstEventHandler : EventHandler<TEvent, TExtra>|undefined = undefined;
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
        return (event, ...extra) => {
            for (const eventHandler of eventHandlers) {
                eventHandler?.(event, ...extra);
            } // for
        };
    }, eventHandlers);
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
                if (!ref) { // ignores empty ref
                    continue;
                }
                else if (typeof(ref) === 'function') {
                    ref?.(value);
                }
                else {
                    (ref as React.MutableRefObject<TValue|null>).current = value;
                } // if
            } // for
        };
    }, refs);
};



export const useMergeClasses = (...classes: MaybeArray<Optional<string>>[]): Optional<string>[] => {
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



export const useMountedFlag = () => {
    const isMounted = useRef<boolean>(false); // initially marked as unmounted
    useIsomorphicLayoutEffect(() => {
        // setups:
        isMounted.current = true; // mark as mounted
        
        
        
        // cleanups:
        return () => {
            isMounted.current = false; // mark as unmounted
        };
    }, emptyDependency);
    
    
    
    return isMounted;
};



export interface TimerPromiseOptions {
    onAbort: () => void
}
export class TimerPromise<T> extends Promise<T> {
    readonly #options: TimerPromiseOptions
    constructor(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void, options: TimerPromiseOptions) {
        super(executor);
        this.#options = options;
    }
    
    
    
    abort(): void {
        this.#options.onAbort();
    }
}
export const useSetTimeout = () => {
    // states:
    const [timerRegistry] = useState<Map<ReturnType<typeof setTimeout>, (value: boolean) => void>>(
        () => new Map<ReturnType<typeof setTimeout>, (value: boolean) => void>()
    );
    
    
    
    // effects:
    useEffect(() => {
        // cleanups:
        return () => {
            // if there are SOME running timer tasks => ABORT all:
            for (const [timerTask, resolve] of timerRegistry) {
                // ABORT the running timer task, so the `resolve(true)` will never called:
                clearTimeout(timerTask);
                
                
                
                // NOTIFY the timeout has been ABORTED:
                resolve(false);
            } // for
            timerRegistry.clear();
        };
    }, []);
    
    
    
    // returns a function to CREATE a timeout promise:
    return (delay: number): TimerPromise<boolean> => {
        const { promise, resolve } = Promise.withResolvers<boolean>();
        
        
        
        const timerTask = setTimeout(() => {
            // the timeout has been DONE => UNREGISTER from the registry:
            timerRegistry.delete(timerTask);
            
            
            
            // NOTIFY the timeout has been DONE:
            resolve(true);
        }, delay);
        timerRegistry.set(timerTask, resolve);
        
        
        
        return new TimerPromise<boolean>((resolve, reject): void => {
                promise
                .then((value)   => resolve(value))
                .catch((reason) => reject(reason))
            },
            {
                onAbort: (): void => {
                    // ABORT the running timer task, so the `resolve(true)` will never called:
                    clearTimeout(timerTask);
                    
                    
                    
                    // NOTIFY the timeout has been ABORTED:
                    resolve(false);
                },
            }
        );
    };
};



export const useRequestAnimationFrame = () => {
    // states:
    const [timerRegistry] = useState<Map<ReturnType<typeof requestAnimationFrame>, (value: DOMHighResTimeStamp|false) => void>>(
        () => new Map<ReturnType<typeof requestAnimationFrame>, (value: DOMHighResTimeStamp|false) => void>()
    );
    
    
    
    // effects:
    useEffect(() => {
        // cleanups:
        return () => {
            // if there are SOME running timer tasks => ABORT all:
            for (const [timerTask, resolve] of timerRegistry) {
                // ABORT the running timer task, so the `resolve(true)` will never called:
                cancelAnimationFrame(timerTask);
                
                
                
                // NOTIFY the timeout has been ABORTED:
                resolve(false);
            } // for
            timerRegistry.clear();
        };
    }, []);
    
    
    
    // returns a function to CREATE a timeout promise:
    return (): TimerPromise<DOMHighResTimeStamp|false> => {
        const { promise, resolve } = Promise.withResolvers<DOMHighResTimeStamp|false>();
        
        
        
        const timerTask = requestAnimationFrame((time) => {
            // the timeout has been DONE => UNREGISTER from the registry:
            timerRegistry.delete(timerTask);
            
            
            
            // NOTIFY the timeout has been DONE:
            resolve(time);
        });
        timerRegistry.set(timerTask, resolve);
        
        
        
        return new TimerPromise<DOMHighResTimeStamp|false>((resolve, reject): void => {
                promise
                .then((value)   => resolve(value))
                .catch((reason) => reject(reason))
            },
            {
                onAbort: (): void => {
                    // ABORT the running timer task, so the `resolve(true)` will never called:
                    cancelAnimationFrame(timerTask);
                    
                    
                    
                    // NOTIFY the timeout has been ABORTED:
                    resolve(false);
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



export const useIsRtl = <TElement extends Element = HTMLElement>(): readonly [boolean, React.Dispatch<React.SetStateAction<TElement|null>>] => {
    // refs:
    const [elmRef, setElmRef] = useState<TElement|null>(null);
    
    
    
    // states:
    const [isRtl, setIsRtl] = useState<boolean>(false); // assumes the default direction (in most cases) is 'rtl'
    useIsomorphicLayoutEffect(() => {
        // conditions:
        if (!elmRef) return; // the element must exist to measure
        
        
        
        // measuring:
        const newIsRtl = (getComputedStyle(elmRef).direction === 'rtl');
        if (isRtl === newIsRtl) return; // already the same => noting to change
        setIsRtl(newIsRtl);
    }); // perform direction check *every time* the component re-renders
    
    
    
    return [isRtl, setElmRef];
};
