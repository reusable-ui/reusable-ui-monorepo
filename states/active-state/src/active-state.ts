'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    useEffect,
    useRef,
    useState,
}                           from 'react'

// Types:
import {
    type ActiveStateProps,
    type ActiveStateChangeProps,
    type ActiveStatePhaseEventProps,
    type UncontrollableActiveStateProps,
    type ActiveStateOptions,
    type ActivePhase,
    type ActiveBehaviorState,
}                           from './types.js'

// Defaults:
import {
    finalDefaultActive,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveActivePhase,
    getActiveClassname,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Types:
    type ValueChangeDispatcher,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.
import {
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Resolves the current active state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `active` state and **forward** it to a base component.
 * 
 * Unlike `useActiveBehaviorState()`, which supports both controlled and uncontrolled modes,
 * `useActiveState()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Ideal for components that **consume** the resolved `active` state.
 * 
 * @param props - The component props that may include a controlled `active` value but must exclude `defaultActive`.
 * @returns The resolved active state.
 */
export const useActiveState = (props: ActiveStateProps & { defaultActive: never }) : boolean => {
    // Extract props and assign defaults:
    const {
        active : controlledActive = finalDefaultActive,
    } = props;
    
    
    
    // Return the resolved active state:
    return controlledActive;
};

/**
 * Creates a stable dispatcher for requesting a change to the active state.
 * 
 * This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `active` state and forwards it to a `<BaseComponent active={...}>`.
 * 
 * Unlike `useActiveBehaviorState()`, which supports both controlled and uncontrolled modes,
 * `useActiveChangeDispatcher()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Always triggers `onActiveChange`, if provided.
 * - Ideal for components that **dictate** the `active` state externally and need a stable dispatcher without lifecycle orchestration.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 * 
 * @param props - The component props that may include `onActiveChange` callback but must exclude `defaultActive`.
 * @returns A dispatcher function for activation change requests.
 */
export const useActiveChangeDispatcher = <TChangeEvent = unknown>(props: ActiveStateChangeProps<TChangeEvent> & { defaultActive: never }) : ValueChangeDispatcher<boolean, TChangeEvent> => {
    // A Stable dispatcher for activation change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchActiveChange : ValueChangeDispatcher<boolean, TChangeEvent> = useStableCallback((newActive: boolean, event: TChangeEvent): void => {
        // No internal state to update in controlled mode:
        // if (!isControlled) setInternalActive(newActive);
        
        
        
        // Dispatch external change handler (if provided):
        props.onActiveChange?.(newActive, event);
    });
    
    
    
    // Return the active change dispatcher:
    return dispatchActiveChange;
};

/**
 * Resolves the current active state and provides a dispatcher for requesting changes.
 * 
 * This hook is intended for components that **manage** the resolved `active` state and **forward** it to a base component,
 * while optionally supporting uncontrolled behavior.
 * 
 * Unlike `useActiveBehaviorState()`, which resolves full lifecycle,
 * `useUncontrollableActiveState()` provides a **simplified implementation** for managing active state and dispatching changes.
 * 
 * - Supports both controlled and uncontrolled modes.
 * - If `active` is provided, the internal state is disabled and the component becomes fully controlled.
 * - If `active` is omitted, the internal state is initialized via `defaultActive`.
 * - Ideal for components that **manage** the resolved `active` state.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 * 
 * @param props - The component props that may include a controlled `active` value, `defaultActive` value, and `onActiveChange` callback.
 * @returns A tuple of the resolved active state and a dispatcher for requesting changes.
 */
export const useUncontrollableActiveState = <TChangeEvent = unknown>(props: ActiveStateProps & UncontrollableActiveStateProps & ActiveStateChangeProps<TChangeEvent>, options?: Pick<ActiveStateOptions, 'defaultActive'>): [boolean, ValueChangeDispatcher<boolean, TChangeEvent>] => {
    // Extract options and assign defaults:
    const {
        defaultActive     = finalDefaultActive,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultActive : defaultInitialIntent = defaultActive,
        active        : initialIntent        = defaultInitialIntent,
        active        : controlledActive,
        onActiveChange,
    } = props;
    
    
    
    // States and flags:
    
    // Internal activation state:
    const [internalActive, setInternalActive] = useState<boolean>(initialIntent);
    
    // Determine control mode:
    const isControlled     = (controlledActive !== undefined);
    
    // Resolve effective activation state:
    const resolvedActive   = isControlled ? controlledActive : internalActive;
    
    
    
    // A Stable dispatcher for activation change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchActiveChange : ValueChangeDispatcher<boolean, TChangeEvent> = useStableCallback((newActive: boolean, event: TChangeEvent): void => {
        // Update the internal state only if uncontrolled:
        if (!isControlled) setInternalActive(newActive);
        
        
        
        // Dispatch external change handler (if provided):
        onActiveChange?.(newActive, event);
    });
    
    
    
    // Return resolved active state and dispatcher:
    return [resolvedActive, dispatchActiveChange];
};



/**
 * Resolves the active/inactive state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * Supports controlled, uncontrolled, and hybrid activation behavior with optional change dispatching.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 * 
 * @param props - The component props that may include a controlled `active` value, optional `defaultActive`, and `onActiveChange`.
 * @param options - An optional configuration for customizing activate/deactivate behavior.
 * @returns The resolved active/inactive state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, MouseEventHandler } from 'react';
 * import {
 *     useActiveBehaviorState,
 *     ActiveStateProps,
 *     UncontrollableActiveStateProps,
 *     ActiveStateChangeProps,
 * } from '@reusable-ui/active-state';
 * import styles from './ActivatableBox.module.css';
 * 
 * export interface ActivatableBoxProps extends
 *     ActiveStateProps,
 *     UncontrollableActiveStateProps<MouseEventHandler<HTMLButtonElement>>, // optional uncontrolled behavior
 *     ActiveStateChangeProps // optional change dispatching behavior
 * {}
 * 
 * // A box that can be activated and deactivated.
 * export const ActivatableBox: FC<ActivatableBoxProps> = (props) => {
 *     const {
 *         active,
 *         activePhase,
 *         activeClassname,
 *         
 *         dispatchActiveChange,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useActiveBehaviorState(props, {
 *         defaultActive     : false,                      // Fallback for uncontrolled mode.
 *         animationPattern  : ['activate', 'deactivate'], // Matches animation names ending with 'activate' or 'deactivate'.
 *         animationBubbling : false,                      // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${activeClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             <button onClick={(event) => dispatchActiveChange(!active, event)}>
 *                 Toggle state
 *             </button>
 *             {active && <div className={styles.details}>
 *                 <p>Active content goes here.</p>
 *             </div>}
 *         </div>
 *     );
 * };
 * ```
 */
export const useActiveBehaviorState = <TElement extends Element = HTMLElement, TChangeEvent = unknown>(props: ActiveStateProps & UncontrollableActiveStateProps & ActiveStateChangeProps<TChangeEvent>, options?: ActiveStateOptions): ActiveBehaviorState<TElement, TChangeEvent> => {
    // Extract options and assign defaults:
    const {
        defaultActive     = finalDefaultActive,
        animationPattern  = ['activate', 'deactivate'], // Matches animation names for transitions
        animationBubbling = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultActive : defaultInitialIntent = defaultActive,
        active        : initialIntent        = defaultInitialIntent,
        active        : controlledActive,
        onActiveChange,
    } = props;
    
    
    
    // States and flags:
    
    // Internal activation state with animation lifecycle:
    const [internalActive, setInternalActive, runningIntent, animationHandlers] = useAnimationState<boolean, TElement>({
        initialIntent,
        animationPattern,
        animationBubbling,
    });
    
    // Determine control mode:
    const isControlled     = (controlledActive !== undefined);
    
    // Resolve effective activation state:
    const resolvedActive   = isControlled ? controlledActive : internalActive;
    
    // Derive semantic phase from animation lifecycle:
    const activePhase      = resolveActivePhase(resolvedActive, runningIntent); // 'inactive', 'deactivating', 'activating', 'active'
    
    
    
    // Sync animation state with resolved activation state:
    useEffect(() => {
        // The `setInternalActive()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalActive(resolvedActive);
    }, [resolvedActive]);
    
    
    
    // A Stable dispatcher for activation change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchActiveChange : ValueChangeDispatcher<boolean, TChangeEvent> = useStableCallback((newActive: boolean, event: TChangeEvent): void => {
        // Update the internal state only if uncontrolled:
        if (!isControlled) setInternalActive(newActive);
        
        
        
        // Dispatch external change handler (if provided):
        onActiveChange?.(newActive, event);
    });
    
    
    
    // Return resolved active state API:
    return {
        active          : resolvedActive,
        activePhase,
        activeClassname : getActiveClassname(activePhase),
        dispatchActiveChange,
        ...animationHandlers,
    } satisfies ActiveBehaviorState<TElement, TChangeEvent>;
};

/**
 * Emits lifecycle events in response to activate/deactivate phase transitions.
 * 
 * This hook observes the resolved `activePhase` from `useActiveBehaviorState()` and triggers
 * the appropriate callbacks defined in `ActiveStatePhaseEventProps`, such as:
 * 
 * - `onActivateStart`
 * - `onActivateEnd`
 * - `onDeactivateStart`
 * - `onDeactivateEnd`
 * 
 * @param {ActiveStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {ActivePhase} activePhase - The current phase value returned from `useActiveBehaviorState()`.
 */
export const useActiveStatePhaseEvents = (props: ActiveStatePhaseEventProps, activePhase: ActivePhase): void => {
    // Extract props:
    const {
        onActivateStart,
        onActivateEnd,
        onDeactivateStart,
        onDeactivateEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleActivePhaseChange = useStableCallback((activePhase: ActivePhase): void => {
        switch (activePhase) {
            case 'inactive'     : onDeactivateEnd?.(activePhase, undefined);   break;
            case 'deactivating' : onDeactivateStart?.(activePhase, undefined); break;
            case 'activating'   : onActivateStart?.(activePhase, undefined);   break;
            case 'active'       : onActivateEnd?.(activePhase, undefined);     break;
        } // switch
    });
    
    
    
    /*
        ⚠️ React Strict Mode Consideration:
        This hook uses two effects to ensure **consistent behavior** across strict and non-strict modes.
        The observer effect emits phase change events, while the setup effect tracks the mount status.
        The setup effect must be placed after observer effect in order to correctly emit events for subsequent updates only.
        
        This configuration ensures that phase change events are emitted only for SUBSEQUENT UPDATES.
        The first update never emits any events.
        
        Sequence on initial mount:
        1. First render
            → observer effect runs → but SKIPS event emission due to `hasMountedRef = false`
            → setup effect runs → marks `hasMountedRef = true`, allowing further updates to emit events
        2. [Strict Mode] Simulated unmount
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`, preventing further updates from emitting events
        3. [Strict Mode] Second render
            → observer effect runs → SKIPS event emission again due to `hasMountedRef = false`
            → setup effect runs → marks `hasMountedRef = true`, allowing further updates to emit events
        So effectively, the initial mount does NOT emit any events in both strict and non-strict modes.
        
        Sequence on subsequent updates of `activePhase`:
            → observer effect runs → emits phase change event
            → setup effect does NOT run (no changes in dependencies)
        
        Sequence on final unmount:
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`
    */
    
    
    
    // Observer effect: emits phase change events on `activePhase` updates.
    useEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleActivePhaseChange(activePhase);
    }, [activePhase]);
    
    // Setup effect: marks the component as mounted and resets on unmount.
    useEffect(() => {
        // Mark as mounted:
        hasMountedRef.current = true;
        
        
        
        // Unmark when unmounted:
        return () => {
            hasMountedRef.current = false;
        };
    }, []);
};
