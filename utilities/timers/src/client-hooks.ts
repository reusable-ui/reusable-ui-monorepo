// React:
import {
    // Types:
    type DependencyList,
    
    
    
    // Hooks:
    useState,
    useEffect,
}                           from 'react'



// Utilities:

/**
 * A shared empty dependency list for optimizing React hooks.
 * Helps prevent unnecessary re-creations of memoized values.
 */
const emptyDependency : DependencyList = [];



// Utilities:

/**
 * An abortable scheduled promise.
 */
export class ScheduledPromise<T> extends Promise<T | false> {
    // States:
    
    /**
     * Stores the resolve function from the Promise API.
     */
    /* mutable */ #resolve: ((value: T | false | PromiseLike<T | false>) => void) | undefined
    
    /**
     * Stores the external abort handler.
     */
    readonly #onAbort: () => void
    
    
    
    // Constructors:
    
    /**
     * Initializes a new ScheduledPromise instance.
     * 
     * @param executor - Function that resolves or rejects the promise.
     * @param onAbort - Handler triggered when the scheduled task is aborted.
     */
    constructor(
        executor: (
            resolve : (value: T | false | PromiseLike<T | false>) => void,
            reject  : (reason?: unknown) => void
        ) => void,
        onAbort: () => void
    ) {
        // Stores the resolve function from the base class:
        let localResolve : ((value: T | false | PromiseLike<T | false>) => void) | undefined = undefined;
        
        // Initialize base class:
        super((resolve, reject) => {
            // Capture resolve function:
            localResolve = resolve;
            
            
            
            // Execute the provided executor:
            executor(resolve, reject);
        });
        
        // Assign the captured resolve function:
        this.#resolve = localResolve;
        
        
        
        // Store the external abort handler:
        this.#onAbort = onAbort;
    }
    
    
    
    // Methods:
    
    /**
     * Aborts the scheduled task.
     */
    abort(): void {
        // Notify the task was aborted:
        this.#resolve?.(false);
        
        
        
        // Trigger the provided abort handler:
        this.#onAbort();
    }
}

/**
 * A factory function for creating scheduled timeout promises that resolves `true` after the specified delay, or `false` if aborted.
 * 
 * @param delay - The duration (in milliseconds) before the timeout resolves.
 * @returns A `ScheduledPromise<boolean>` that resolves `true` after the specified delay, or `false` if aborted.
 */
export type CreateScheduledTimeout = (delay: number) => ScheduledPromise<boolean>

/**
 * A React hook for creating timeout-based promises.
 * 
 * - Provides a factory function that creates a `ScheduledPromise`, resolving `true` after the specified delay, or `false` if aborted.
 * - Supports aborting timeout tasks before resolution.
 * - Automatically cleans up all running timers when the component unmounts.
 * 
 * @returns {CreateScheduledTimeout} A factory function for creating scheduled timeout promises that resolves `true` after the specified delay, or `false` if aborted.
 * 
 * @example
 * ```ts
 * const setTimeoutAsync = useSetTimeout();
 * 
 * setTimeoutAsync(1000)
 * .then((isCompleted) => {
 *      console.log(isCompleted ? 'Timeout completed!' : 'Timeout aborted!');
 * });
 * 
 * (async () => {
 *      const isCompleted = await setTimeoutAsync(1000);
 *      console.log(isCompleted ? 'Timeout completed!' : 'Timeout aborted!');
 * })();
 * ```
 */
export const useSetTimeout = (): CreateScheduledTimeout => {
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
            // If there are some running timer tasks => abort all:
            for (const [timerTask, resolve] of timerRegistry) {
                // Notify timeout was aborted:
                resolve(false);
                
                
                
                // Abort timer:
                clearTimeout(timerTask);
            } // for
            
            
            
            // Clear the registry:
            timerRegistry.clear();
        };
    }, emptyDependency); // Optimized dependency for stable reference.
    
    
    
    // Returns a factory function for scheduling timeouts:
    return ((delay: number): ScheduledPromise<boolean> => {
        // Stores the running timer task:
        let currentTimerTask : ReturnType<typeof setTimeout> | undefined = undefined;
        
        
        
        /**
         * Cleans up the running timer task (if any).
         */
        const cleanupCurrentTask = (): void => {
            // Ignore non-started timer task:
            if (currentTimerTask === undefined) return;
            
            
            
            // Abort timer:
            clearTimeout(currentTimerTask);
            
            
            
            // Remove aborted timer task from registry:
            timerRegistry.delete(currentTimerTask);
        };
        
        
        
        // Return a new ScheduledPromise instance:
        return new ScheduledPromise<boolean>(
            // Executor function that resolves or rejects the promise:
            (resolve, reject): void => {
                try {
                    // Create a timer task that resolves after the specified delay:
                    const newTimerTask = setTimeout(() => {
                        // Handles timeout completion:
                        resolve(true);
                        
                        
                        
                        // Remove completed timer task:
                        timerRegistry.delete(newTimerTask);
                    }, delay);
                    
                    
                    
                    // Save the timer task for possible abortion:
                    currentTimerTask = newTimerTask;
                    
                    
                    
                    // Register running timer for cleanup on unmount:
                    timerRegistry.set(newTimerTask, resolve);
                }
                catch (error: unknown) {
                    // Handle unexpected errors:
                    reject(error);
                    
                    
                    
                    // Cleans up on failure:
                    cleanupCurrentTask();
                } // try
            },
            
            // Handles abort request:
            /* onAbort: */ () => {
                // Cleans up on abort:
                cleanupCurrentTask();
            },
        );
    }) satisfies CreateScheduledTimeout;
};

/**
 * A factory function for creating scheduled animation frame promises that resolves with the timestamp from `requestAnimationFrame`, or `false` if aborted.
 * 
 * @param frameCount - The number of animation frames to wait before resolving (default: `1`).
 * @returns A `ScheduledPromise<DOMHighResTimeStamp | false>` that resolves with the timestamp from `requestAnimationFrame`, or `false` if aborted.
 */
export type CreateScheduledAnimationFrame = (frameCount?: number) => ScheduledPromise<DOMHighResTimeStamp | false>

/**
 * A React hook for creating animation-frame-based promises.
 * 
 * - Provides a factory function that creates a `ScheduledPromise`, resolving with the timestamp from `requestAnimationFrame`, or `false` if aborted.
 * - Supports aborting animation frame requests before resolution.
 * - Automatically cleans up all pending frame requests when the component unmounts.
 * 
 * @returns {CreateScheduledAnimationFrame} A factory function for creating scheduled animation frame promises that resolves with the timestamp from `requestAnimationFrame`, or `false` if aborted.
 * 
 * @example
 * ```ts
 * const requestAnimationFrameAsync = useRequestAnimationFrame();
 * 
 * requestAnimationFrameAsync()
 * .then((timestamp) => {
 *      console.log(timestamp ? `Animation frame completed at ${timestamp}` : 'Animation frame aborted!');
 * });
 * 
 * (async () => {
 *      const timestamp = await requestAnimationFrameAsync();
 *      console.log(timestamp ? `Animation frame completed at ${timestamp}` : 'Animation frame aborted!');
 * })();
 * ```
 */
export const useRequestAnimationFrame = (): CreateScheduledAnimationFrame => {
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
            // If there are some pending animation frame request tasks => abort all:
            for (const [frameTask, resolve] of frameRegistry) {
                // Notify animation frame request was aborted:
                resolve(false);
                
                
                
                // Abort animation frame request:
                cancelAnimationFrame(frameTask);
            } // for
            
            
            
            // Clear the registry:
            frameRegistry.clear();
        };
    }, emptyDependency); // Optimized dependency for stable reference.
    
    
    
    // Returns a factory function for scheduling animation frames:
    return ((frameCount: number = 1): ScheduledPromise<DOMHighResTimeStamp | false> => {
        // Stores the pending animation frame request tasks:
        let currentFrameTask : ReturnType<typeof requestAnimationFrame> | undefined = undefined;
        
        // Flag to indicate if the request was aborted:
        let isAborted = false;
        
        
        
        /**
         * Cleans up the pending animation frame task (if any).
         */
        const cleanupCurrentTask = (): void => {
            // Set the aborted flag:
            isAborted = true;
            
            
            
            // Ignore non-started animation frame request task:
            if (currentFrameTask === undefined) return;
            
            
            
            // Abort animation frame request:
            cancelAnimationFrame(currentFrameTask);
            
            
            
            // Remove aborted animation frame request task from registry:
            frameRegistry.delete(currentFrameTask);
        };
        
        
        
        // Return a new ScheduledPromise instance:
        return new ScheduledPromise<DOMHighResTimeStamp | false>(
            // Executor function that resolves or rejects the promise:
            (resolve, reject): void => {
                try {
                    // Start a new asynchronous task to handle multi-frame requests:
                    (async (): Promise<void> => {
                        // Stores the latest timestamp from the repeat:
                        let latestTimestamp : DOMHighResTimeStamp = 0;
                        
                        
                        
                        // Sequentially repeats request animation frames by the `frameCount`:
                        for (let counter = 0; (counter < frameCount) && !isAborted; counter++) {
                            latestTimestamp = await new Promise<DOMHighResTimeStamp>((resolveTimestamp, rejectTimestamp): void => {
                                try {
                                    // Create a sub-frame task that resolves with the timestamp from `requestAnimationFrame`:
                                    const newSubFrameTask = requestAnimationFrame((timestamp) => {
                                        // Handles sub-frame request completion with the timestamp:
                                        resolveTimestamp(timestamp);
                                        
                                        
                                        
                                        // Remove completed sub-frame task:
                                        frameRegistry.delete(newSubFrameTask);
                                    });
                                    
                                    
                                    
                                    // Save the sub-frame task for possible abortion:
                                    currentFrameTask = newSubFrameTask;
                                    
                                    
                                    
                                    // Register pending sub-frame for cleanup on unmount:
                                    frameRegistry.set(newSubFrameTask, resolve);
                                }
                                catch (error: unknown) {
                                    rejectTimestamp(error);
                                } // try
                            });
                        } // for
                        
                        
                        
                        // Handles multi-frame request completion with the latest timestamp, or noop if was aborted:
                        if (!isAborted) resolve(latestTimestamp); // If aborted, the `ScheduledPromise.abort()` already resolved with `false`.
                    })()
                    .catch((error: unknown) => {
                        // Handle unexpected errors:
                        reject(error);
                        
                        
                        
                        // Cleans up on failure:
                        cleanupCurrentTask();
                    });
                }
                catch (error: unknown) {
                    // Handle unexpected errors:
                    reject(error);
                    
                    
                    
                    // Cleans up on failure:
                    cleanupCurrentTask();
                } // try
            },
            
            // Handles abort request:
            /* onAbort: */ () => {
                // Cleans up on abort:
                cleanupCurrentTask();
            },
        );
    }) satisfies CreateScheduledAnimationFrame;
};
