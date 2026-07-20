'use client' // The exported hooks are client side only.

// React:
import {
    // Hooks:
    use,
}                           from 'react'

// Types:
import {
    type ValidityStateProps,
    type ValidityStateOptions,
    type ValidityPhase,
    type ValidityClassname,
    type ValidityState,
}                           from './types.js'
import {
    type ValidityStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativeValidity,
    defaultCascadeValidation,
    defaultFallbackValidity,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveValidityTransitionPhase,
    resolveValidityTransitionClassname,
    triggerValidityPhaseEvents,
}                           from './internal-utilities.js'

// Contexts:
import {
    ValidityStateContext,
}                           from './internal-contexts.js'

// Reusable-ui utilities:
import {
    // Hooks:
    usePreviousValue,
}                           from '@reusable-ui/lifecycles'          // A React utility package for managing component lifecycles, ensuring stable effects, and optimizing state updates.

// Reusable-ui states:
import {
    // Types:
    type ObservableStateDefinition,
    
    
    
    // Hooks:
    useResolvedObservableState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.
import {
    // Hooks:
    useFeedbackState,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.
import {
    useResolvedDisabled,
}                           from '@reusable-ui/disabled-state'      // Adds enabled/disabled functionality to UI components, with transition animations and semantic styling hooks.
import {
    useResolvedReadOnly,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.



/** The observable state definition for validity state management. */
const observableStateDefinition : ObservableStateDefinition<boolean | null, 'auto'> = {
    defaultState         : defaultDeclarativeValidity,
    inactiveState        : null, // `null`: the value of un-valid state
    observableStateToken : 'auto',
};

/**
 * Resolves the current validity state.
 * 
 * Useful for derived components that need to determine whether the base component is valid, invalid, or unvalidated (neither valid nor invalid).
 * 
 * The resolved validity state **should** be forwarded to the base component via the `validity` prop,
 * allowing the base component to rely on the derived component for valid, invalid, and unvalidated handling
 * without observing the validity state itself.
 * 
 * Unlike `useValidityState()`, which handles animation and lifecycle,
 * `useResolvedValidity()` performs a lightweight resolution of the effective validity value.
 * 
 * - No internal state or uncontrolled fallback.
 * - Ideal for components that **consume** the resolved `validity` state.
 * - Supports automatic mode, when `validity` is set to `'auto'`, which defers resolution to
 *   the nearest `<ValidityStateProvider>` (if cascading is enabled) or falls back to
 *   `computedValidity` when no explicit parent validity is available.
 * - Honors `enableValidation` to determine whether validation is active for the component.
 *   Even if enabled locally, a parent `<ValidityStateProvider>` can still disable validation
 *   when `cascadeValidation = true`.
 * - Honors `cascadeValidation` to control whether ancestor validation intent cascades down.
 *   When enabled, parent providers can disable this component or enforce their own validity
 *   when the local validity is `'auto'`.
 * 
 * @param props The component props that may include:
 *   - A controlled `validity` value (`true` | `false` | `null` | `'auto'`).
 *   - A derived `computedValidity` value used when local and parent validity are `'auto'`.
 *   - `enableValidation` and `cascadeValidation` flags to control validation behavior.
 * @param options An optional configuration for customizing validity behavior.
 * @returns The resolved validity state.
 */
export const useResolvedValidity = (props: Pick<ValidityStateProps, 'enableValidation' | 'validity' | 'cascadeValidation' | 'computedValidity'>, options?: Pick<ValidityStateOptions, 'defaultValidity' | 'fallbackValidity'>) : boolean | null => {
    // Extract options and assign defaults:
    const {
        defaultValidity  : defaultState,
        fallbackValidity = defaultFallbackValidity,
    } = options ?? {};
    
    
    
    // Read the nearest ancestor policy (if any):
    // - Used to decide a default `enableValidation`.
    // - May be applied later if inheritance is enabled.
    const nearestAncestorPolicy = use(ValidityStateContext);
    
    
    
    // Extract props and assign defaults:
    const {
        enableValidation                 = (
            // Use the default hint from the nearest ancestor, if available:
            nearestAncestorPolicy?.defaultEnableValidation
            ??
            // Otherwise, fall back to `false` to simulate being outside a `<Form>`:
            false
        ),
        validity          : state         = defaultDeclarativeValidity,
        cascadeValidation                 = defaultCascadeValidation,
        computedValidity  : observedState = fallbackValidity,
    } = props;
    
    
    
    // Decide whether to inherit from the nearest ancestor policy:
    // - Contains the cumulative validation policy (enablement + validity).
    // - `undefined` if inheritance is disabled or no ancestor exists.
    const parentValidationPolicy = (
        cascadeValidation
        ? nearestAncestorPolicy
        : undefined
    );
    
    
    
    // States and flags:
    
    // Resolve whether the component is disabled:
    const isDisabled   = useResolvedDisabled(props as Parameters<typeof useResolvedDisabled>[0]);
    
    // Resolve whether the component is readonly:
    const isReadonly   = useResolvedReadOnly(props as Parameters<typeof useResolvedReadOnly>[0]);
    
    // Resolve enablement cumulatively (AND logic):
    // - Both ancestor and local must allow validation.
    const cumulativeEnableValidation = (
        parentValidationPolicy
        ? parentValidationPolicy.enableValidation && enableValidation
        : enableValidation
    );
    
    // Resolve whether the component is in a restricted state:
    const isRestricted = isDisabled || isReadonly || !cumulativeEnableValidation;
    
    
    
    // Resolve effective validity state:
    // - Collapses to `null` (unvalidated) if restricted.
    // - Otherwise resolved via observable state definition.
    const validity = useResolvedObservableState<boolean | null, 'auto'>(
        // Props:
        { state, isRestricted, observedState },
        
        // Options:
        { defaultState },
        
        // Definition:
        observableStateDefinition,
    );
    
    
    
    // Resolve validity with nearest-wins logic:
    // - Restricted fields always collapse to null (handled by `useResolvedObservableState()`).
    // - If local validity is explicit (true, false, or null), it wins outright.
    // - If local validity is 'auto', inherit ancestor validity if explicit.
    // - If both local and ancestor are 'auto', fall back to the field's observer.
    if (!isRestricted && (state === 'auto')) {
        const parentValidity = parentValidationPolicy?.validity;
        if ((parentValidity !== undefined) && (parentValidity !== 'auto')) return parentValidity;
    } // if
    
    
    
    // Return the resolved validity state:
    return validity;
};



/** The behavior state definition for validity state management. */
const validityStateDefinition : ValidityStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : ['validating', 'invalidating', 'unvalidating'], // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveValidityTransitionPhase,                 // Resolves phases.
    resolveTransitionClassname : resolveValidityTransitionClassname,             // Resolves classnames.
    triggerTransitionEvent     : triggerValidityPhaseEvents,                     // Triggers lifecycle events.
    
    // Direction definitions:
    useResolvedPreviousState   : usePreviousValue,                               // Tracks previous settled state.
};

/**
 * Resolves the validity state, current transition phase, associated CSS classname, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled validity state, when `validity` is set to `true`, `false`, or `null`.
 * - Supports automatic mode, when `validity` is set to `'auto'`, which defers resolution to
 *   the nearest `<ValidityStateProvider>` (if cascading is enabled) or falls back to
 *   `computedValidity` when no explicit parent validity is available.
 * - Honors `enableValidation` to determine whether validation is active for the component.
 *   Even if enabled locally, a parent `<ValidityStateProvider>` can still disable validation
 *   when `cascadeValidation = true`.
 * - Honors `cascadeValidation` to control whether ancestor validation intent cascades down.
 *   When enabled, parent providers can disable this component or enforce their own validity
 *   when the local validity is `'auto'`.
 * 
 * @template TElement The type of the target DOM element.
 * 
 * @param props The component props that may include:
 *   - A controlled `validity` value (`true` | `false` | `null` | `'auto'`).
 *   - A derived `computedValidity` value used when local and parent validity are `'auto'`.
 *   - `enableValidation` and `cascadeValidation` flags to control validation behavior.
 *   - An `onValidityUpdate` callback for observing validity changes.
 * @param options An optional configuration for customizing validity behavior and its animation lifecycle.
 * @returns The resolved validity state, current transition phase, associated CSS classname, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, useState, useEffect } from 'react';
 * import {
 *     useValidityState,
 *     ValidityStateProps,
 * } from '@reusable-ui/validity-state';
 * import styles from './CustomInput.module.css';
 * 
 * export interface CustomInputProps extends
 *     ValidityStateProps
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
 *     } = useValidityState({
 *         computedValidity,
 *         ...restProps,
 *     }, {
 *         defaultValidity   : 'auto',                                         // Defaults to automatic mode.
 *         fallbackValidity  : null,                                           // Defaults to unresolved state when `validity` is 'auto' but no `computedValidity` is provided.
 *         animationPattern  : ['validating', 'invalidating', 'unvalidating'], // Matches animation names ending with 'validating', 'invalidating', or 'unvalidating'.
 *         bubblingAnimation : false,                                          // Ignores bubbling animation events from children.
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
export const useValidityState = <TElement extends Element = HTMLElement>(props: ValidityStateProps, options?: ValidityStateOptions): ValidityState<TElement> => {
    // Extract props:
    const {
        onValidityUpdate : onStateUpdate,
        
        onValidatingStart,
        onValidatingEnd,
        onInvalidatingStart,
        onInvalidatingEnd,
        onUnvalidatingStart,
        onUnvalidatingEnd,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective validity state:
    const effectiveState = useResolvedValidity(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : validity,
        actualState         : actualValidity,
        transitionPhase     : validityPhase,
        transitionClassname : validityClassname,
        ...animationHandlers
    } = useFeedbackState<
        boolean | null,
        ValidityPhase,
        ValidityClassname,
        
        ValidityStateProps,
        ValidityStateOptions,
        ValidityStateDefinition,
        
        TElement
    >(
        // Props:
        {
            effectiveState,
            onStateUpdate,
            
            ...({
                onValidatingStart,
                onValidatingEnd,
                onInvalidatingStart,
                onInvalidatingEnd,
                onUnvalidatingStart,
                onUnvalidatingEnd,
            } as {}),
        },
        
        // Options:
        options,
        
        // Definition:
        validityStateDefinition,
    );
    
    
    
    // Return resolved validity state API:
    return {
        validity,
        actualValidity,
        validityPhase,
        validityClassname,
        ...animationHandlers,
    } satisfies ValidityState<TElement>;
};
