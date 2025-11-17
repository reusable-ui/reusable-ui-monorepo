'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    use,
    useEffect,
    useLayoutEffect,
    useRef,
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
    defaultInitialActive,
    defaultDeclarativeCascadeActive,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveActivePhase,
    getActiveClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    ActiveStateContext,
}                           from './contexts.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Types:
    type ValueChangeDispatcher,
    
    
    
    // Hooks:
    useHybridValueChange,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.
import {
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.

// Reusable-ui states:
import {
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.



/**
 * Resolves the effective active value based on props and context.
 * 
 * Resolution priority:
 * - If `active` is `true`, the component is explicitly active.
 * - If `active` is `false` and `cascadeActive` is `false`, the component is explicitly inactive.
 * - If `active` is `false` and `cascadeActive` is `true`, the component checks context for inherited active state.
 * - If context is unavailable and `cascadeActive` is `true`, the component defaults to inactive (`false`).
 * 
 * @param controlledActive - The controlled active state.
 * @param cascadeActive - Whether to cascade active state from context.
 * @returns The resolved active value.
 */
const useEffectiveActiveValue = (controlledActive: Required<ActiveStateProps>['active'], cascadeActive: boolean): boolean => {
    // If explicitly active, no need to check context:
    if (controlledActive) return true;
    
    
    
    // If not cascading, context is ignored, thus inactive:
    if (!cascadeActive) return false;
    
    
    
    // Get the inherited active from context:
    const inheritedActive = use(ActiveStateContext);
    
    
    
    // If context value exists, return it:
    if (inheritedActive !== undefined) return inheritedActive;
    
    
    
    // Otherwise, fallback to inactive:
    return false;
};

/**
 * Resolves the current active/inactive state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `active` state and **forward** it to a base component.
 * 
 * Unlike `useActiveBehaviorState()`, which supports both controlled and uncontrolled modes,
 * `useActiveState()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Supports contextual override via `cascadeActive`.
 * - Ideal for components that **consume** the resolved `active` state.
 * 
 * @param props - The component props that may include a controlled `active` value but must exclude `defaultActive`, and contextual `cascadeActive` value.
 * @param options - An optional configuration for customizing activate/deactivate behavior.
 * @returns The resolved active/inactive state.
 */
export const useActiveState = (props: ActiveStateProps & { defaultActive: never }, options?: Pick<ActiveStateOptions, 'defaultActive' | 'defaultCascadeActive'>) : boolean => {
    // Extract options and assign defaults:
    const {
        defaultActive        = defaultInitialActive,
        defaultCascadeActive = defaultDeclarativeCascadeActive,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        active        : controlledActive     = defaultActive,
        cascadeActive : cascadeActive        = defaultCascadeActive,
    } = props;
    
    
    
    // States:
    
    // Resolve effective activation state:
    const effectiveActive = useEffectiveActiveValue(controlledActive, cascadeActive);
    
    
    
    // Return the resolved active state:
    return effectiveActive;
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
    // States and flags:
    
    // Determine whether the component is disabled:
    const isDisabled        = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    
    
    // A Stable dispatcher for activation change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchActiveChange : ValueChangeDispatcher<boolean, TChangeEvent> = useStableCallback((newActive: boolean, event: TChangeEvent): void => {
        // Block expansion lifecycle while disabled:
        // - Prevents internal state updates (uncontrolled mode)
        // - Prevents external change requests (controlled mode)
        // - Prevents notifying listeners of a change
        if (isDisabled) return;
        
        
        
        // No internal state to update in controlled mode:
        // if (!isControlled) setInternalActive(newActive);
        
        
        
        // Dispatch external change handler (if provided):
        props.onActiveChange?.(newActive, event);
    });
    
    
    
    // Return the active change dispatcher:
    return dispatchActiveChange;
};

/**
 * Resolves the current active/inactive state and provides a dispatcher for requesting changes.
 * 
 * This hook is intended for components that **manage** the resolved `active` state and **forward** it to a base component,
 * while optionally supporting uncontrolled behavior.
 * 
 * Unlike `useActiveBehaviorState()`, which resolves full lifecycle,
 * `useUncontrollableActiveState()` provides a **simplified implementation** for managing activation state and dispatching changes.
 * 
 * - Supports both controlled and uncontrolled modes.
 * - Supports contextual override via `cascadeActive`.
 * - If `active` is provided, the internal state is disabled and the component becomes fully controlled.
 * - If `active` is omitted, the internal state is initialized via `defaultActive`.
 * - Ideal for components that **manage** the resolved `active` state.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 * 
 * @param props - The component props that may include a controlled `active` value, optional `defaultActive` value, contextual `cascadeActive` value, and `onActiveChange` callback.
 * @param options - An optional configuration for customizing activate/deactivate behavior.
 * @returns A tuple of the resolved active/inactive state and a dispatcher for requesting changes.
 */
export const useUncontrollableActiveState = <TChangeEvent = unknown>(props: ActiveStateProps & UncontrollableActiveStateProps & ActiveStateChangeProps<TChangeEvent>, options?: Pick<ActiveStateOptions, 'defaultActive' | 'defaultCascadeActive'>): [boolean, ValueChangeDispatcher<boolean, TChangeEvent>] => {
    // Extract options and assign defaults:
    const {
        defaultActive        = defaultInitialActive,
        defaultCascadeActive = defaultDeclarativeCascadeActive,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultActive : defaultInitialIntent = defaultActive,
        active        : initialIntent        = defaultInitialIntent,
        active        : controlledActive,
        cascadeActive : cascadeActive        = defaultCascadeActive,
        onActiveChange,
    } = props;
    
    
    
    // States:
    
    // Internal activation state:
    const {
        value               : intendedActive,
        dispatchValueChange : dispatchActiveChange,
    } = useHybridValueChange<boolean, TChangeEvent>({
        defaultValue  : initialIntent,
        value         : controlledActive,
        onValueChange : onActiveChange,
    });
    
    // Resolve effective activation state:
    const effectiveActive = useEffectiveActiveValue(intendedActive, cascadeActive);
    
    
    
    // Return resolved active state and dispatcher:
    return [effectiveActive, dispatchActiveChange];
};



/**
 * Resolves the active/inactive state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled, uncontrolled, and hybrid activation behavior with optional change dispatching.
 * - Supports contextual override via `cascadeActive`.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 * 
 * @param props - The component props that may include a controlled `active` value, optional `defaultActive` value, contextual `cascadeActive` value, and `onActiveChange` callback.
 * @param options - An optional configuration for customizing activate/deactivate behavior and animation lifecycle.
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
 *     UncontrollableActiveStateProps, // optional uncontrolled behavior
 *     ActiveStateChangeProps<MouseEventHandler<HTMLButtonElement>> // optional change dispatching behavior
 * {}
 * 
 * // A box that can be activated and deactivated.
 * export const ActivatableBox: FC<ActivatableBoxProps> = (props) => {
 *     const {
 *         active,
 *         actualActive,
 *         activePhase,
 *         activeClassname,
 *         
 *         dispatchActiveChange,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useActiveBehaviorState(props, {
 *         defaultActive        : false,                          // Fallback for uncontrolled mode.
 *         defaultCascadeActive : false,                          // Defaults to prevent contextual activation.
 *         animationPattern     : ['activating', 'deactivating'], // Matches animation names ending with 'activating' or 'deactivating'.
 *         animationBubbling    : false,                          // Ignores bubbling animation events from children.
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
        defaultActive        = defaultInitialActive,
        defaultCascadeActive = defaultDeclarativeCascadeActive,
        animationPattern     = ['activating', 'deactivating'], // Matches animation names for transitions
        animationBubbling    = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultActive : defaultInitialIntent = defaultActive,
        active        : initialIntent        = defaultInitialIntent,
        active        : controlledActive,
        cascadeActive : cascadeActive        = defaultCascadeActive,
        onActiveChange,
    } = props;
    
    
    
    // States and flags:
    
    // Determine whether the component is disabled:
    const isDisabled      = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Internal activation state with animation lifecycle:
    const [internalActive, setInternalActive, runningIntent, animationHandlers] = useAnimationState<boolean, TElement>({
        initialIntent,
        animationPattern,
        animationBubbling,
    });
    
    // Determine control mode:
    const isControlled    = (controlledActive !== undefined);
    
    // Resolve effective activation state:
    const intendedActive  = isControlled ? controlledActive : internalActive;
    const effectiveActive = useEffectiveActiveValue(intendedActive, cascadeActive);
    
    // The current settled or animating active state.
    // During animation, this reflects the active target (`runningIntent`).
    // If no animation is active, it reflects the latest declared intent (`effectiveActive`), even if not yet committed.
    // This optimistic fallback ensures transition logic and styling remain in sync with declared transitions.
    // Deferred or discarded intents are never reflected here.
    const settledActive   = runningIntent ?? effectiveActive;
    
    // Determine whether a transition toward the effective active state is currently in progress:
    const isTransitioning = (
        // An in-flight animation is active toward a target active state:
        (runningIntent !== undefined)
        
        ||
        
        // An optimistic transition is pending: the intent has changed, but React has not yet re-rendered to reflect it.
        // This mismatch is expected and resolves once `setInternalActive(effectiveActive)` takes effect.
        (internalActive !== effectiveActive)
    );
    
    // Derive semantic phase from animation lifecycle:
    const activePhase     = resolveActivePhase(settledActive, isTransitioning); // 'active', 'inactive', 'activating', 'deactivating'
    
    
    
    // Sync animation state with effective activation state:
    // Use `useLayoutEffect()` to ensure the intent is registered before the browser fires `animationstart`.
    // This guarantees the animation lifecycle handshake completes correctly.
    // The `useAnimationState()` hook internally treats missing animation events as immediately completed transitions.
    useLayoutEffect(() => {
        // The `setInternalActive()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalActive(effectiveActive);
        
        // Note: If `setInternalActive()` is delayed (e.g. by React's render scheduler),
        // both `internalActive` and `runningIntent` may remain stale temporarily.
        // This introduces a brief pre-transition ambiguity, safely handled by `isTransitioning` logic.
    }, [effectiveActive]);
    
    
    
    // A Stable dispatcher for activation change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchActiveChange : ValueChangeDispatcher<boolean, TChangeEvent> = useStableCallback((newActive: boolean, event: TChangeEvent): void => {
        // Block expansion lifecycle while disabled:
        // - Prevents internal state updates (uncontrolled mode)
        // - Prevents external change requests (controlled mode)
        // - Prevents notifying listeners of a change
        if (isDisabled) return;
        
        
        
        // Update the internal state only if uncontrolled:
        if (!isControlled) setInternalActive(newActive);
        
        
        
        // Dispatch external change handler (if provided):
        onActiveChange?.(newActive, event);
    });
    
    
    
    // Return resolved active state API:
    return {
        active          : settledActive,   // Use `settledActive` instead of `effectiveActive`, because during animation, the settled state reflects the visually committed active state.
        actualActive    : effectiveActive, // Expose the actual effective state for advanced use cases.
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
 * - `onActivatingStart`
 * - `onActivatingEnd`
 * - `onDeactivatingStart`
 * - `onDeactivatingEnd`
 * 
 * @param {ActiveStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {ActivePhase} activePhase - The current phase value returned from `useActiveBehaviorState()`.
 */
export const useActiveStatePhaseEvents = (props: ActiveStatePhaseEventProps, activePhase: ActivePhase): void => {
    // Extract props:
    const {
        onActivatingStart,
        onActivatingEnd,
        onDeactivatingStart,
        onDeactivatingEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleActivePhaseChange = useStableCallback((activePhase: ActivePhase): void => {
        switch (activePhase) {
            case 'activating'   : onActivatingStart?.(activePhase, undefined);   break;
            case 'active'       : onActivatingEnd?.(activePhase, undefined);     break;
            case 'deactivating' : onDeactivatingStart?.(activePhase, undefined); break;
            case 'inactive'     : onDeactivatingEnd?.(activePhase, undefined);   break;
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
    // Use `useLayoutEffect()` to ensure the events are emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleActivePhaseChange(activePhase);
    }, [activePhase]);
    
    // Setup effect: marks the component as mounted and resets on unmount.
    // Use regular `useEffect()` is sufficient, since mount status tracking does not require timing-sensitive operations before painting.
    useEffect(() => {
        // Mark as mounted:
        hasMountedRef.current = true;
        
        
        
        // Unmark when unmounted:
        return () => {
            hasMountedRef.current = false;
        };
    }, []);
};
