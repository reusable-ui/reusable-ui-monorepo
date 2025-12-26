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
    type ActiveChangeDispatcherOptions,
    type ActiveStatePhaseEventProps,
    type UncontrollableActiveStateProps,
    type ActiveStateOptions,
    type ActivePhase,
    type ActiveClassname,
    type ActiveBehaviorState,
}                           from './types.js'
import {
    type ActiveBehaviorStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultInitialActive,
    defaultDeclarativeCascadeActive,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveActiveTransitionPhase,
    resolveActiveTransitionClassname,
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

// Reusable-ui states:
import {
    // Types:
    type ResolveEffectiveStateArgs,
    
    
    
    // Hooks:
    useInteractionStateChangeDispatcher,
    useInteractionBehaviorState,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



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
 * Resolution priority:
 * - If `active` is `true`, the component is explicitly active.
 * - If `active` is `false` and `cascadeActive` is `false`, the component is explicitly inactive.
 * - If `active` is `false` and `cascadeActive` is `true`, the component checks context for inherited active state.
 * - If context is unavailable and `cascadeActive` is `true`, the component defaults to inactive (`false`).
 * 
 * @param props - The component props that may include a controlled `active` value but must exclude `defaultActive`, and contextual `cascadeActive` value.
 * @param options - An optional configuration for customizing activate/deactivate behavior.
 * @returns The resolved active/inactive state.
 */
export const useActiveState = (props: ActiveStateProps & { defaultActive?: never }, options?: Pick<ActiveStateOptions, 'defaultActive' | 'defaultCascadeActive'>) : boolean => {
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
    
    
    
    // Resolve effective activation state:
    
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
 * @param options - Optional configuration, such as `onInternalChange` for uncontrolled scenarios.
 * @returns A dispatcher function for activation change requests.
 */
export const useActiveChangeDispatcher = <TChangeEvent = unknown>(props: ActiveStateChangeProps<TChangeEvent> & { defaultActive?: never }, options?: ActiveChangeDispatcherOptions<TChangeEvent>) : ValueChangeDispatcher<boolean, TChangeEvent> => {
    return useInteractionStateChangeDispatcher<boolean, TChangeEvent>(
        // Props:
        { onStateChange: props.onActiveChange },
        
        // Options:
        options,
    );
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
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultActive : defaultInitialIntent = defaultActive,
        active        : initialIntent        = defaultInitialIntent, // Initial intent comes from `active` (if controlled) or `defaultActive` (if uncontrolled).
        active        : controlledActive,
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
    const effectiveActive = useActiveState({ ...props, defaultActive: undefined, active: intendedActive }, options);
    
    
    
    // Return resolved active state and dispatcher:
    return [effectiveActive, dispatchActiveChange];
};



/** Resolves the effective activation state, normalizing declarative keywords into concrete values. */
const useResolveEffectiveActiveState = ({ declarativeState, props, options }: ResolveEffectiveStateArgs<boolean, ActiveStateProps, ActiveStateOptions, ActiveBehaviorStateDefinition>): boolean => {
    const effectiveActive = useActiveState({
        ...props,
        defaultActive : undefined,        // Prevents uncontrolled value.
        active        : declarativeState, // Pass the declarative state as controlled value.
    }, options);
    
    // Return the resolved effective activation state:
    return effectiveActive;
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
    // Extract props:
    const {
        defaultActive  : initialActive,
        active         : controlledActive,
        onActiveChange : handleActiveChange,
    } = props;
    
    
    
    // States and flags:
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : active,
        actualState         : actualActive,
        transitionPhase     : activePhase,
        transitionClassname : activeClassname,
        dispatchStateChange : dispatchActiveChange,
        ...animationHandlers
    } = useInteractionBehaviorState<
        boolean,
        boolean,
        ActivePhase,
        ActiveClassname,
        
        ActiveStateProps,
        ActiveStateOptions,
        ActiveBehaviorStateDefinition,
        
        TElement,
        TChangeEvent
    >(
        // Props:
        { defaultState: initialActive, state: controlledActive, onStateChange: handleActiveChange },
        
        // Options:
        options,
        
        // Definition:
        {
            defaultAnimationPattern    : ['activating', 'deactivating'],   // Matches animation names for transitions.
            defaultAnimationBubbling   : false,
            defaultInitialState        : defaultInitialActive,
            useResolveEffectiveState   : useResolveEffectiveActiveState,   // Resolves effective state.
            resolveTransitionPhase     : resolveActiveTransitionPhase,     // Resolves phases.
            resolveTransitionClassname : resolveActiveTransitionClassname, // Resolves classnames.
        } satisfies ActiveBehaviorStateDefinition,
    );
    
    
    
    // Return resolved active state API:
    return {
        active,
        actualActive,
        activePhase,
        activeClassname,
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
