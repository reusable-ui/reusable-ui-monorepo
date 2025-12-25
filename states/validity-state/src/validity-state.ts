'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    useEffect,
    useLayoutEffect,
    useRef,
}                           from 'react'

// Types:
import {
    type ValidityStateProps,
    type ValidityStateUpdateProps,
    type ValidityStatePhaseEventProps,
    type ValidityStateOptions,
    type ValidityPhase,
    type ValidityClassname,
    type ValidityBehaviorState,
}                           from './types.js'
import {
    type ValidityBehaviorStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativeValidity,
    defaultFallbackValidity,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveValidityTransitionPhase,
    resolveValidityTransitionClassname,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Hooks:
    usePreviousValue,
}                           from '@reusable-ui/lifecycles'          // A React utility package for managing component lifecycles, ensuring stable effects, and optimizing state updates.

// Reusable-ui states:
import {
    // Hooks:
    useFeedbackBehaviorState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.
import {
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.
import {
    useReadOnlyState,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.



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
export const useValidityState = (props: ValidityStateProps, options?: Pick<ValidityStateOptions, 'defaultValidity' | 'fallbackValidity'>) : boolean | null => {
    // Extract options and assign defaults:
    const {
        defaultValidity   = defaultDeclarativeValidity,
        fallbackValidity  = defaultFallbackValidity,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        validity         : controlledValidity = defaultValidity,
        computedValidity                      = fallbackValidity,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve whether the component is disabled:
    const isDisabled           = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Resolve whether the component is readonly:
    const isReadonly           = useReadOnlyState(props as Parameters<typeof useReadOnlyState>[0]);
    
    // Resolve whether the component is in a restricted state:
    const isRestricted         = isDisabled || isReadonly;
    
    // Determine control mode:
    const isExplicitValue      = (controlledValidity !== 'auto');
    
    // Resolve validity state prior to applying the restricted guard:
    const resolvedValidity     = isExplicitValue ? controlledValidity : computedValidity;
    
    // Apply restricted guard — restriction always enforces unvalidated (`null`):
    const effectiveValidity    = isRestricted ? null : resolvedValidity;
    
    
    
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
 *         actualValidity,
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
 *         defaultValidity   : 'auto',                                         // Defaults to diagnostic mode.
 *         fallbackValidity  : null,                                           // Defaults to unresolved state when `validity` is 'auto' but no `computedValidity` is provided.
 *         animationPattern  : ['validating', 'invalidating', 'unvalidating'], // Matches animation names ending with 'validating', 'invalidating', or 'unvalidating'.
 *         animationBubbling : false,                                          // Ignores bubbling animation events from children.
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
    // Extract props:
    const {
        onValidityUpdate : handleValidityUpdate,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective validity state:
    const effectiveValidity = useValidityState(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : validity,
        actualState         : actualValidity,
        transitionPhase     : validityPhase,
        transitionClassname : validityClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        boolean | null,
        ValidityPhase,
        ValidityClassname,
        
        ValidityStateProps,
        ValidityStateOptions,
        ValidityBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { resolvedState: effectiveValidity, onStateUpdate: handleValidityUpdate },
        
        // Options:
        options,
        
        // Definition:
        {
            defaultAnimationPattern    : ['validating', 'invalidating', 'unvalidating'], // Matches animation names for transitions.
            defaultAnimationBubbling   : false,
            useResolvePreviousState    : usePreviousValue,                               // Tracks previous settled state.
            resolveTransitionPhase     : resolveValidityTransitionPhase,                 // Resolves phases.
            resolveTransitionClassname : resolveValidityTransitionClassname,             // Resolves classnames.
        } satisfies ValidityBehaviorStateDefinition,
    );
    
    
    
    // Return resolved validity state API:
    return {
        validity,
        actualValidity,
        validityPhase,
        validityClassname,
        ...animationHandlers,
    } satisfies ValidityBehaviorState<TElement>;
};

/**
 * Emits lifecycle events in response to validity phase transitions.
 * 
 * This hook observes the resolved `validityPhase` from `useValidityBehaviorState()` and triggers
 * the appropriate callbacks defined in `ValidityStatePhaseEventProps`, such as:
 * 
 * - `onValidatingStart`
 * - `onValidatingEnd`
 * - `onInvalidatingStart`
 * - `onInvalidatingEnd`
 * - `onUnvalidatingStart`
 * - `onUnvalidatingEnd`
 * 
 * @param {ValidityStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {ValidityPhase} validityPhase - The current phase value returned from `useValidityBehaviorState()`.
 */
export const useValidityStatePhaseEvents = (props: ValidityStatePhaseEventProps, validityPhase: ValidityPhase): void => {
    // Extract props:
    const {
        onValidatingStart,
        onValidatingEnd,
        onInvalidatingStart,
        onInvalidatingEnd,
        onUnvalidatingStart,
        onUnvalidatingEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleValidityPhaseChange = useStableCallback((validityPhase: ValidityPhase): void => {
        switch (validityPhase) {
            case 'validating'   : onValidatingStart?.(validityPhase, undefined);   break;
            case 'valid'        : onValidatingEnd?.(validityPhase, undefined);     break;
            case 'invalidating' : onInvalidatingStart?.(validityPhase, undefined); break;
            case 'invalid'      : onInvalidatingEnd?.(validityPhase, undefined);   break;
            case 'unvalidating' : onUnvalidatingStart?.(validityPhase, undefined); break;
            case 'unvalidated'  : onUnvalidatingEnd?.(validityPhase, undefined);   break;
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
    // Use `useLayoutEffect()` to ensure the events are emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleValidityPhaseChange(validityPhase);
    }, [validityPhase]);
    
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
