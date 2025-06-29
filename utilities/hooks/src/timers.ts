// Utilities:
import {
    // Types:
    type CreateScheduledTimeout,
    type CreateScheduledAnimationFrame,
    
    
    
    // Classes:
    ScheduledPromise         as ImportedScheduledPromise,
    
    
    
    // Hooks:
    useSetTimeout            as importedUseSetTimeout,
    useRequestAnimationFrame as importedUseRequestAnimationFrame,
}                           from '@reusable-ui/timers'          // A collection of reusable timing utilities for UI components.



/**
 * @deprecated - Use `ScheduledPromise` from '@reusable-ui/timers' instead.
 * 
 * An abortable scheduled promise.
 */
export class ScheduledPromise<T> extends ImportedScheduledPromise<T> {
}



/**
 * @deprecated - Use `useSetTimeout` from '@reusable-ui/timers' instead.
 * 
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
export const useSetTimeout = (): CreateScheduledTimeout => importedUseSetTimeout();



/**
 * @deprecated - Use `useRequestAnimationFrame` from '@reusable-ui/timers' instead.
 * 
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
export const useRequestAnimationFrame = (): CreateScheduledAnimationFrame => importedUseRequestAnimationFrame();
