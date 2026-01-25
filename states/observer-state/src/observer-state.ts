'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    useRef,
    useState,
    useLayoutEffect,
}                           from 'react'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Types:
import {
    type ObserverProps,
    type ObserverOptions,
    type ObserverDefinition,
    type ObserverState,
}                           from './types.js'



/**
 * Observes a specific condition (typically a DOM interaction) and emits a resolved state whenever that condition changes.
 * 
 * Actively tracks the component's state by listening to event updates
 * and applying restriction rules when the component is disabled or read-only.
 * 
 * ### Controlled mode
 * When `isControlled` is `true`, the observer becomes inactive and stops emitting state updates.  
 * In this mode, `observedState` should be considered *unreliable*,
 * and the component must rely entirely on its externally controlled state.
 * 
 * ### Restricted mode
 * When `isRestricted` is `true`, the state is always treated as inactive, regardless of incoming updates.  
 * In this mode, `observedState` remains *reliable* as a reflection of the restricted condition.
 * 
 * @template TState - The type of the state value.
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The runtime props for describing the current component condition.
 * @param options - Optional per-component customization (e.g. commit logic).
 * @param definition - The domain-specific definition that defines the inactive state, restriction behavior, and state probe.
 * 
 * @returns The resolved state and updater utilities.
 */
export const useObserverState = <TState extends {} | null, TElement extends Element = HTMLElement>(props: ObserverProps, options: ObserverOptions<TState> | undefined, definition: ObserverDefinition<TState, TElement>): ObserverState<TState, TElement> => {
    // Extract definition:
    const {
        inactiveState,
        restrictionBehavior,
        getCurrentState,
    } = definition;
    
    
    
    // Extract options:
    const {
        commitState,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        isControlled,
        isRestricted,
    } = props;
    
    
    
    // States and flags:
    
    // Ref to the observed DOM element:
    const elementRef = useRef<TElement | null>(null);
    
    // Internal observed state (used only when uncontrolled):
    const [internalState, setInternalState] = useState<TState>(inactiveState);
    
    /**
     * Raw update function.
     * 
     * - Applies new state directly or via commit logic.
     * - Does not guard against restriction (used by lifecycle effect).
     */
    const updateState = useStableCallback((element: TElement | null, newState?: TState) => {
        // Skip updates if externally controlled:
        if (isControlled) return;
        
        
        
        // If no new state provided, attempt DOM measurement:
        if (newState === undefined) {
            if (getCurrentState) {
                // Abort if element not yet mounted:
                if (!element) return;
                
                
                
                // Perform DOM measurement:
                newState = getCurrentState(element);
            }
            else {
                // Fallback to inactive baseline:
                newState = inactiveState;
            } // if
        } // if
        
        
        
        // Skip if already in sync:
        if (Object.is(newState, internalState)) return;
        
        
        
        // Apply via commit logic if provided, otherwise update directly:
        if (commitState) {
            commitState(newState, setInternalState);
        }
        else {
            setInternalState(newState);
        } // if
    });
    
    /**
     * Safe update function for event handlers.
     * 
     * - Guards against restriction to prevent illegal updates.
     * - Delegates to raw update otherwise.
     */
    const safeUpdateState = useStableCallback((element: TElement | null, newState?: TState) => {
        // Block updates while still in a restricted state:
        if (isRestricted) return;
        
        
        
        // Safely update the state:
        updateState(element, newState);
    });
    
    
    
    /**
     * Handles restriction changes.
     * 
     * - For `discrete` behavior, resets to inactive when restricted.
     * - For `continuous` behavior, recomputes when unrestricted.
     */
    const handleRestrictionChange = useStableCallback((isRestricted: boolean) => {
        // Skip updates if externally controlled:
        if (isControlled) return;
        
        
        
        if (restrictionBehavior === 'discrete') {
            if (isRestricted) {
                // Reset immediately when restricted:
                // - Ensures the user *must perform* a new action to reactivate.
                updateState(elementRef.current, inactiveState);
            } // if
        }
        else if (restrictionBehavior === 'continuous') {
            if (!isRestricted) {
                // When restriction lifts, recompute actual DOM condition:
                // - Ensures the state accurately reflects the current situation.
                updateState(elementRef.current);
            } // if
            
            // While restricted, do nothing:
            // - Avoids unnecessary re-renders.
            // - `effectiveState` handles restricted case.
        } // if
    });
    
    /**
     * Lifecycle effect:
     * 
     * - Runs whenever `isRestricted` changes.
     */
    useLayoutEffect(() => {
        handleRestrictionChange(isRestricted);
    }, [isRestricted]);
    
    
    
    // Resolve effective state:
    const effectiveState = (
        isRestricted
        ? inactiveState // Always use inactive state when restricted.
        : internalState // Otherwise, use the internal observed state.
    );
    
    
    
    // Return resolved state and updater utilities:
    return {
        elementRef,
        observedState: effectiveState,
        safeUpdateState
    } satisfies ObserverState<TState, TElement>;
};
