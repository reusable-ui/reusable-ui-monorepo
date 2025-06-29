// Utilities:
import {
    // Hooks:
    useSetTimeout,
}                           from '@reusable-ui/timers'          // A collection of reusable timing utilities for UI components.



export type ScheduledTriggerEventCallback = () => void
export type ScheduleTriggerEventFunction  = (scheduledTriggerEventCallback: ScheduledTriggerEventCallback) => void

/**
 * @deprecated - Use `useSetTimeout` from '@reusable-ui/timers' instead.
 */
export const useScheduleTriggerEvent = (): ScheduleTriggerEventFunction => {
    const setTimeoutAsync = useSetTimeout();
    
    
    
    return ((scheduledTriggerEventCallback: ScheduledTriggerEventCallback): void => {
        setTimeoutAsync(0) // Runs the event_delegator_callback *next after* current macroTask completed.
        .then((isCompleted) => {
            // Ensures the timeout is not aborted:
            if (!isCompleted) return;
            
            
            
            // Triggers the event_delegator_callback:
            scheduledTriggerEventCallback();
        });
    }) satisfies ScheduleTriggerEventFunction;
};
