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
    type DisabledStateProps,
    type DisabledStateUpdateProps,
    type DisabledStatePhaseEventProps,
    type DisabledStateOptions,
    type DisabledPhase,
    type DisabledBehaviorState,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeDisabled,
    defaultDeclarativeCascadeDisabled,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveDisabledPhase,
    getDisabledClassname,
}                           from './internal-utilities.js'

// Contexts:
import {
    DisabledStateContext,
}                           from './contexts.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Resolves the effective disabled value based on props and context.
 * 
 * Resolution priority:
 * - If `disabled` is `true`, the component is explicitly disabled.
 * - If `disabled` is `false` and `cascadeDisabled` is `false`, the component is explicitly enabled.
 * - If `disabled` is `false` and `cascadeDisabled` is `true`, the component checks context for inherited disabled state.
 * - If context is unavailable and `cascadeDisabled` is `true`, the component defaults to enabled (`false`).
 * 
 * @param controlledDisabled - The controlled disabled state.
 * @param cascadeDisabled - Whether to cascade disabled state from context.
 * @returns The resolved disabled value.
 */
const useEffectiveDisabledValue = (controlledDisabled: Required<DisabledStateProps>['disabled'], cascadeDisabled: boolean): boolean => {
    // If explicitly disabled, no need to check context:
    if (controlledDisabled) return true;
    
    
    
    // If not cascading, context is ignored, thus enabled:
    if (!cascadeDisabled) return false;
    
    
    
    // Get the inherited disabled from context:
    const inheritedDisabled = use(DisabledStateContext);
    
    
    
    // If context value exists, return it:
    if (inheritedDisabled !== undefined) return inheritedDisabled;
    
    
    
    // Otherwise, fallback to enabled:
    return false;
};

/**
 * Resolves the current enabled/disabled state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `disabled` state and **forward** it to a base component.
 * 
 * Unlike `useDisabledBehaviorState()`, which handles animation and lifecycle,
 * `useDisabledState()` performs a lightweight resolution of the effective disabled value.
 * 
 * - No internal state or uncontrolled fallback.
 * - Ideal for components that **consume** the resolved `disabled` state.
 * 
 * @param props - The component props that may include a controlled `disabled` value and contextual `cascadeDisabled` value.
 * @param options - An optional configuration for customizing enable/disable behavior.
 * @returns The resolved enabled/disabled state.
 */
export const useDisabledState = (props: DisabledStateProps, options?: Pick<DisabledStateOptions, 'defaultDisabled' | 'defaultCascadeDisabled'>) : boolean => {
    // Extract options and assign defaults:
    const {
        defaultDisabled        = defaultDeclarativeDisabled,
        defaultCascadeDisabled = defaultDeclarativeCascadeDisabled,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        disabled         : controlledDisabled = defaultDisabled,
        cascadeDisabled  : cascadeDisabled    = defaultCascadeDisabled,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective disabled state:
    const effectiveDisabled = useEffectiveDisabledValue(controlledDisabled, cascadeDisabled);
    
    
    
    // Return the resolved enabled/disabled state:
    return effectiveDisabled;
};



/**
 * Resolves the enabled/disabled state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled disabled state.
 * - Supports contextual override via `cascadeDisabled`.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `disabled` value, contextual `cascadeDisabled` value, and `onDisabledUpdate` callback.
 * @param options - An optional configuration for customizing disabled behavior and animation lifecycle.
 * @returns The resolved enabled/disabled state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC } from 'react';
 * import {
 *     useDisabledBehaviorState,
 *     DisabledStateProps,
 *     DisabledStateUpdateProps,
 * } from '@reusable-ui/disabled-state';
 * import styles from './CustomEditor.module.css';
 * 
 * export interface CustomEditorProps extends
 *     DisabledStateProps,
 *     DisabledStateUpdateProps // optional update reporting behavior
 * {}
 * 
 * // An editor that can be enabled or disabled.
 * export const CustomEditor: FC<CustomEditorProps> = (props) => {
 *     const {
 *         disabled,
 *         actualDisabled,
 *         disabledPhase,
 *         disabledClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useDisabledBehaviorState(props, {
 *         defaultDisabled        : false,                     // Defaults to enabled.
 *         defaultCascadeDisabled : true,                      // Defaults to allow contextual disabling.
 *         animationPattern       : ['enabling', 'disabling'], // Matches animation names ending with 'enabling' or 'disabling'.
 *         animationBubbling      : false,                     // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <input
 *             type='text'
 *             className={`${styles.box} ${disabledClassname}`}
 *             disabled={disabled}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         />
 *     );
 * };
 * ```
 */
export const useDisabledBehaviorState = <TElement extends Element = HTMLElement>(props: DisabledStateProps & DisabledStateUpdateProps, options?: DisabledStateOptions): DisabledBehaviorState<TElement> => {
    // Extract options and assign defaults:
    const {
        defaultDisabled        = defaultDeclarativeDisabled,
        defaultCascadeDisabled = defaultDeclarativeCascadeDisabled,
        animationPattern       = ['enabling', 'disabling'], // Matches animation names for transitions
        animationBubbling      = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        disabled         : controlledDisabled = defaultDisabled,
        cascadeDisabled  : cascadeDisabled    = defaultCascadeDisabled,
        onDisabledUpdate,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective disabled state:
    const effectiveDisabled = useEffectiveDisabledValue(controlledDisabled, cascadeDisabled);
    
    // Internal animation lifecycle:
    const [internalDisabled, setInternalDisabled, runningIntent, animationHandlers] = useAnimationState<boolean, TElement>({
        initialIntent : effectiveDisabled,
        animationPattern,
        animationBubbling,
    });
    
    // The current settled or animating disabled state.
    // During animation, this reflects the active target (`runningIntent`).
    // If no animation is active, it reflects the latest declared intent (`effectiveDisabled`), even if not yet committed.
    // This optimistic fallback ensures transition logic and styling remain in sync with declared transitions.
    // Deferred or discarded intents are never reflected here.
    const settledDisabled   = runningIntent ?? effectiveDisabled;
    
    // Determine whether a transition toward the effective disabled state is currently in progress:
    const isTransitioning   = (
        // An in-flight animation is active toward a target disabled state:
        (runningIntent !== undefined)
        
        ||
        
        // An optimistic transition is pending: the intent has changed, but React has not yet re-rendered to reflect it.
        // This mismatch is expected and resolves once `setInternalDisabled(effectiveDisabled)` takes effect.
        (internalDisabled !== effectiveDisabled)
    );
    
    // Derive semantic phase from animation lifecycle:
    const disabledPhase     = resolveDisabledPhase(settledDisabled, isTransitioning); // 'enabled', 'disabled', 'enabling', 'disabling'
    
    
    
    // Sync animation state with effective disabled state:
    // Use `useLayoutEffect()` to ensure the intent is registered before the browser fires `animationstart`.
    // This guarantees the animation lifecycle handshake completes correctly.
    // The `useAnimationState()` hook internally treats missing animation events as immediately completed transitions.
    useLayoutEffect(() => {
        // The `setInternalDisabled()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalDisabled(effectiveDisabled);
        
        // Note: If `setInternalDisabled()` is delayed (e.g. by React's render scheduler),
        // both `internalDisabled` and `runningIntent` may remain stale temporarily.
        // This introduces a brief pre-transition ambiguity, safely handled by `isTransitioning` logic.
    }, [effectiveDisabled]);
    
    
    
    // A stable dispatcher for emitting disabled update events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleDisabledUpdate = useStableCallback((currentDisabled: boolean): void => {
        onDisabledUpdate?.(currentDisabled, undefined);
    });
    
    
    
    // Observer effect: emits disabled update events on `effectiveDisabled` updates.
    // Use `useLayoutEffect()` to ensure the update is emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Emits disabled update events:
        handleDisabledUpdate(effectiveDisabled);
    }, [effectiveDisabled]);
    
    
    
    // Return resolved disabled state API:
    return {
        disabled          : settledDisabled,   // Use `settledDisabled` instead of `effectiveDisabled`, because during animation, the settled state reflects the visually committed disabled state.
        actualDisabled    : effectiveDisabled, // Expose the actual effective state for advanced use cases.
        disabledPhase,
        disabledClassname : getDisabledClassname(disabledPhase),
        ...animationHandlers,
    } satisfies DisabledBehaviorState<TElement>;
};

/**
 * Emits lifecycle events in response to enable/disable phase transitions.
 * 
 * This hook observes the resolved `disabledPhase` from `useDisabledBehaviorState()` and triggers
 * the appropriate callbacks defined in `DisabledStatePhaseEventProps`, such as:
 * 
 * - `onEnablingStart`
 * - `onEnablingEnd`
 * - `onDisablingStart`
 * - `onDisablingEnd`
 * 
 * @param {DisabledStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {DisabledPhase} disabledPhase - The current phase value returned from `useDisabledBehaviorState()`.
 */
export const useDisabledStatePhaseEvents = (props: DisabledStatePhaseEventProps, disabledPhase: DisabledPhase): void => {
    // Extract props:
    const {
        onEnablingStart,
        onEnablingEnd,
        onDisablingStart,
        onDisablingEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleDisabledPhaseChange = useStableCallback((disabledPhase: DisabledPhase): void => {
        switch (disabledPhase) {
            case 'enabling'  : onEnablingStart?.(disabledPhase, undefined);  break;
            case 'enabled'   : onEnablingEnd?.(disabledPhase, undefined);    break;
            case 'disabling' : onDisablingStart?.(disabledPhase, undefined); break;
            case 'disabled'  : onDisablingEnd?.(disabledPhase, undefined);   break;
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
        
        Sequence on subsequent updates of `disabledPhase`:
            → observer effect runs → emits phase change event
            → setup effect does NOT run (no changes in dependencies)
        
        Sequence on final unmount:
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`
    */
    
    
    
    // Observer effect: emits phase change events on `disabledPhase` updates.
    // Use `useLayoutEffect()` to ensure the events are emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleDisabledPhaseChange(disabledPhase);
    }, [disabledPhase]);
    
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
