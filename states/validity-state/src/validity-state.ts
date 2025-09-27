'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    useEffect,
    useRef,
}                           from 'react'

// Types:
import {
    type ValidityStateProps,
    type ValidityStateUpdateProps,
    type ValidityStatePhaseEventProps,
    type ValidityStateOptions,
    type ValidityPhase,
    type ValidityBehaviorState,
}                           from './types.js'

// Defaults:
import {
    defaultDeclarativeValidity,
    defaultEffectiveValidity,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveValidityPhase,
    getValidityClassname,
}                           from './internal-utilities.js'

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
 * Resolves the current validity state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `validity` state and **forward** it to a base component.
 * 
 * Unlike `useValidityBehaviorState()`, which handles animation and lifecycle,
 * `useValidityState()` performs a lightweight resolution of the effective validity value.
 * 
 * - No internal state or uncontrolled fallback.
 * - `'auto'` is treated as a declarative diagnostic mode.
 * - Ideal for components that **consume** the resolved `validity` state.
 * 
 * @param props - The component props that may include a controlled `validity` value and derived `computedValidity` value.
 * @param options - An optional configuration for customizing validity behavior.
 * @returns The resolved validity state.
 */
export const useValidityState = (props: ValidityStateProps, options?: Pick<ValidityStateOptions, 'defaultValidity'>) : boolean | null => {
    // Extract options and assign defaults:
    const {
        defaultValidity   = defaultDeclarativeValidity,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        validity         : controlledValidity = defaultValidity,
        computedValidity                      = defaultEffectiveValidity,
    } = props;
    
    
    
    // States and flags:
    
    // Determine control mode:
    const isExplicitValue  = (controlledValidity !== 'auto');
    
    // Resolve effective validity state:
    const effectiveValidity = isExplicitValue ? controlledValidity : computedValidity;
    
    
    
    // Return the resolved validity state:
    return effectiveValidity;
};



/**
 * Resolves the validity state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled validity state, when `validity` is set to `true`, `false`, or `null`.
 * - Supports diagnostic mode, when `validity` is set to `'auto'`, which derives the effective validity from `computedValidity`.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `validity` value, derived `computedValidity` value, and `onValidityUpdate` callback.
 * @param options - An optional configuration for customizing validity behavior and animation lifecycle.
 * @returns The resolved validity state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, useState, useEffect } from 'react';
 * import {
 *     useValidityBehaviorState,
 *     ValidityStateProps,
 *     ValidityStateUpdateProps,
 * } from '@reusable-ui/validity-state';
 * import styles from './CustomInput.module.css';
 * 
 * export interface CustomInputProps extends
 *     ValidityStateProps,
 *     ValidityStateUpdateProps // optional update reporting behavior
 * {}
 * 
 * // An input with custom validation logic.
 * export const CustomInput: FC<CustomInputProps> = (props) => {
 *     const [internalComputedValidity, setInternalComputedValidity] = useState<boolean | null>(null);
 *     
 *     const {
 *         // Allows derived components to override the internal validation logic:
 *         computedValidity : externalComputedValidity,
 *         
 *         ...restProps,
 *     } = props;
 *     
 *     const isExternallyComputed = (externalComputedValidity !== undefined);
 *     const computedValidity     = isExternallyComputed ? externalComputedValidity : internalComputedValidity;
 *     
 *     useEffect(() => {
 *         if (isExternallyComputed) return;
 *         
 *         // Perform internal validation logic here:
 *         // setInternalComputedValidity(true);
 *     }, [isExternallyComputed]);
 *     
 *     const {
 *         validity,
 *         validityPhase,
 *         validityClassname,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useValidityBehaviorState({
 *         computedValidity,
 *         ...restProps,
 *     }, {
 *         defaultValidity   : 'auto',                                   // Defaults to diagnostic mode.
 *         animationPattern  : ['validate', 'invalidate', 'unvalidate'], // Matches animation names ending with 'validate', 'invalidate', or 'unvalidate'.
 *         animationBubbling : false,                                    // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${validityClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             {(validity === true ) && <p className={styles.valid}>OK</p>}
 *             {(validity === false) && <p className={styles.valid}>Invalid input</p>}
 *             {(validity === null ) && <p className={styles.valid}>Seems OK</p>}
 *         </div>
 *     );
 * };
 * ```
 */
export const useValidityBehaviorState = <TElement extends Element = HTMLElement>(props: ValidityStateProps & ValidityStateUpdateProps, options?: ValidityStateOptions): ValidityBehaviorState<TElement> => {
    // Extract options and assign defaults:
    const {
        defaultValidity   = defaultDeclarativeValidity,
        animationPattern  = ['validate', 'invalidate', 'unvalidate'], // Matches animation names for transitions
        animationBubbling = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        validity         : controlledValidity = defaultValidity,
        computedValidity                      = defaultEffectiveValidity,
        onValidityUpdate,
    } = props;
    
    
    
    // States and flags:
    
    // Determine control mode:
    const isExplicitValue   = (controlledValidity !== 'auto');
    
    // Resolve effective validity state:
    const effectiveValidity = isExplicitValue ? controlledValidity : computedValidity;
    
    // Internal animation lifecycle:
    const [, setInternalValidity, runningIntent, animationHandlers] = useAnimationState<boolean | null, TElement>({
        initialIntent : effectiveValidity,
        animationPattern,
        animationBubbling,
    });
    
    // Derive semantic phase from animation lifecycle:
    const validityPhase     = resolveValidityPhase(effectiveValidity, runningIntent); // 'valid', 'invalid', 'unvalidated', 'validating', 'invalidating', 'unvalidating'
    
    
    
    // Tracks the history of effective validity states to expose the previous state.
    // This is useful for animation authors to determine the direction of transitions.
    const validityHistoryRef = useRef<[current: boolean | null, previous: boolean | null | undefined]>([effectiveValidity, undefined]);
    const validityHistory = validityHistoryRef.current;
    
    if (validityHistory[0] !== effectiveValidity) {
        // Shift history:
        validityHistory[1] = validityHistory[0];
        
        // Update current:
        validityHistory[0] = effectiveValidity;
    } // if
    
    // Expose previous validity state for animation authors:
    const prevResolvedValidity = validityHistory[1];
    
    
    
    // Sync animation state with effective validity state:
    useEffect(() => {
        // The `setInternalValidity()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalValidity(effectiveValidity);
    }, [effectiveValidity]);
    
    
    
    // A stable dispatcher for emitting validity update events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleValidityUpdate = useStableCallback((currentValidity: boolean | null): void => {
        onValidityUpdate?.(currentValidity, undefined);
    });
    
    
    
    // Observer effect: emits validity update events on `effectiveValidity` updates.
    useEffect(() => {
        // Emits validity update events:
        handleValidityUpdate(effectiveValidity);
    }, [effectiveValidity]);
    
    
    
    // Return resolved validity state API:
    return {
        validity          : effectiveValidity,
        validityPhase,
        validityClassname : getValidityClassname(validityPhase, prevResolvedValidity),
        ...animationHandlers,
    } satisfies ValidityBehaviorState<TElement>;
};

/**
 * Emits lifecycle events in response to validity phase transitions.
 * 
 * This hook observes the resolved `validityPhase` from `useValidityBehaviorState()` and triggers
 * the appropriate callbacks defined in `ValidityStatePhaseEventProps`, such as:
 * 
 * - `onValidateStart`
 * - `onValidateEnd`
 * - `onInvalidateStart`
 * - `onInvalidateEnd`
 * - `onUnvalidateStart`
 * - `onUnvalidateEnd`
 * 
 * @param {ValidityStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {ValidityPhase} validityPhase - The current phase value returned from `useValidityBehaviorState()`.
 */
export const useValidityStatePhaseEvents = (props: ValidityStatePhaseEventProps, validityPhase: ValidityPhase): void => {
    // Extract props:
    const {
        onValidateStart,
        onValidateEnd,
        onInvalidateStart,
        onInvalidateEnd,
        onUnvalidateStart,
        onUnvalidateEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleValidityPhaseChange = useStableCallback((validityPhase: ValidityPhase): void => {
        switch (validityPhase) {
            case 'validating'   : onValidateStart?.(validityPhase, undefined);   break;
            case 'valid'        : onValidateEnd?.(validityPhase, undefined);     break;
            case 'invalidating' : onInvalidateStart?.(validityPhase, undefined); break;
            case 'invalid'      : onInvalidateEnd?.(validityPhase, undefined);   break;
            case 'unvalidating' : onUnvalidateStart?.(validityPhase, undefined); break;
            case 'unvalidated'  : onUnvalidateEnd?.(validityPhase, undefined);   break;
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
        
        Sequence on subsequent updates of `validityPhase`:
            → observer effect runs → emits phase change event
            → setup effect does NOT run (no changes in dependencies)
        
        Sequence on final unmount:
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`
    */
    
    
    
    // Observer effect: emits phase change events on `validityPhase` updates.
    useEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleValidityPhaseChange(validityPhase);
    }, [validityPhase]);
    
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
