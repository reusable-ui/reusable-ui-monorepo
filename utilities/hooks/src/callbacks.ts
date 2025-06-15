// Cssfn:
import {
    // Cssfn general types:
    type Optional,
}                           from '@cssfn/core'                  // Writes css in javascript.

// Utilities:
import {
    // Types:
    type EventHandler as ImportedEventHandler,
    
    
    
    // Hooks:
    useStableEventHandler,
    useMergeEventHandlers,
}                           from '@reusable-ui/callbacks'       // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * @deprecated - Use `EventHandler` from '@reusable-ui/callbacks' instead.
 * 
 * Represents a generic event handler function type.
 * 
 * - Supports additional arguments for more flexibility.
 * - Returns a value of type `TReturn` (defaulting to `void`).
 * 
 * @template TEvent - The event object type.
 * @template TExtra - Additional argument types passed to the handler function.
 */
export type EventHandler<in TEvent, in TExtra extends unknown[] = []> = ImportedEventHandler<TEvent, TExtra, void>



/**
 * @deprecated - Use `useStableEventHandler` from '@reusable-ui/callbacks' instead.
 * 
 * Ensures a stable event handler function reference across renders.
 * 
 * - Prevents unnecessary re-creations of the event handler function.
 * - Avoids stale closures while keeping the latest function reference.
 * - Optimized for performance when passing event handlers as props.
 * 
 * @template TEventHandler - The type of the event handler function.
 * @param {TEventHandler} eventHandler - The event handler function to be stabilized.
 * @returns {TEventHandler} A stable event handler function.
 * 
 * @example
 * ```ts
 * // Ensures stable event handlers for performance:
 * const handleInputChange = useEvent((event: Event) => console.log('Changed:', event.target.value));
 * <input onChange={handleInputChange} />
 * ```
 */
export const useEvent = <TEventHandler extends ((...args: any[]) => unknown)>(eventHandler: TEventHandler): TEventHandler => useStableEventHandler(eventHandler) as TEventHandler;



/**
 * @deprecated - Use `useMergeEventHandlers` from '@reusable-ui/callbacks' instead.
 * 
 * Merges multiple event handler functions into a single stable function.
 * 
 * - Ensures stable references to optimize performance.
 * - Handles cases where some event handlers may be `null` or `undefined`.
 * - Executes all provided event handlers sequentially.
 * - Useful for combining **multiple event handlers** into a single stable function.
 * 
 * @template TEvent - The event object type.
 * @template TExtra - Additional argument types passed to each handler function.
 * @param {Optional<EventHandler<TEvent, TExtra>>[]} eventHandlers - List of event handlers to merge.
 * @returns {EventHandler<TEvent, TExtra>} A merged event handler function.
 * 
 * @example
 * ```ts
 * // Merging multiple event handlers:
 * const handleClickA = useEvent((event: MouseEvent) => console.log('A clicked', event));
 * const handleClickB = useEvent((event: MouseEvent) => console.log('B clicked', event));
 * const mergedClickHandler = useMergeEvents(handleClickA, handleClickB);
 * 
 * <button onClick={mergedClickHandler}>Click Me</button>
 * ```
 */
export const useMergeEvents = <TEvent, TExtra extends unknown[] = []>(...eventHandlers: Optional<EventHandler<TEvent, TExtra>>[]): EventHandler<TEvent, TExtra> => useMergeEventHandlers<TEvent, TExtra>(...eventHandlers);
