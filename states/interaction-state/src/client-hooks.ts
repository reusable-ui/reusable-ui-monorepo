'use client' // The exported hooks are client side only.

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Types:
    type DispatchValueChange,
    
    
    
    // Hooks:
    useControllableValue,
}                           from '@reusable-ui/controllable'        // Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).

// Reusable-ui states:
import {
    // Types:
    type TransitionStateProps,
    type TransitionStateDefinition,
    
    
    
    // Hooks:
    useTransitionState,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.
import {
    // Hooks:
    useResolvedDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Hooks:
    useResolvedReadOnlyState,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.

// Types:
import {
    type InteractionStateProps,
    type InteractionStateChangeDispatcherOptions,
    type InteractionStateOptions,
    
    type InteractionStateDefinition,
    
    type InteractionState,
}                           from './types.js'

// Hooks:
import {
    useResolvedInteractionDriverState,
}                           from './internal-general-hooks.js'



/**
 * Creates a stable dispatcher for requesting a change to the state.
 * 
 * This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `state` and forwards it to a `<BaseComponent state={...}>`.
 * 
 * Unlike `useInteractionState()`, which supports both controlled and uncontrolled modes,
 * `useDispatchInteractionStateChange()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Always triggers `onStateChange`, if provided.
 * - Ideal for components that **dictate** the `state` externally and need a stable dispatcher without lifecycle orchestration.
 * 
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TChangeEvent - The type of the event triggering the change request (e.g. mouse click, keyboard event).
 * 
 * @param props - The component props that may include `onStateChange` callback but must exclude `defaultState`.
 * @param options - Optional configuration, such as `onInternalChange` for uncontrolled scenarios.
 * @returns A dispatcher function for state change requests.
 */
export const useDispatchInteractionStateChange = <TState extends {} | null, TChangeEvent = unknown>(props: InteractionStateProps<{} | null, TState, TChangeEvent>, options?: InteractionStateChangeDispatcherOptions<TState, TChangeEvent>) : DispatchValueChange<TState, TChangeEvent> => {
    // States and flags:
    
    // Resolve whether the component is disabled:
    const isDisabled   = useResolvedDisabledState(props as Parameters<typeof useResolvedDisabledState>[0]);
    
    // Resolve whether the component is readonly:
    const isReadonly   = useResolvedReadOnlyState(props as Parameters<typeof useResolvedReadOnlyState>[0]);
    
    // Resolve whether the component is in a restricted state:
    const isRestricted = isDisabled || isReadonly;
    
    
    
    // A stable dispatcher for state change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchStateChange : DispatchValueChange<TState, TChangeEvent> = useStableCallback((newState: TState, event: TChangeEvent): void => {
        // Halt interaction lifecycle when the component is in a restricted state (interaction blocked):
        // - Prevents internal state updates (uncontrolled mode)
        // - Prevents external change requests (controlled mode)
        // - Prevents notifying listeners of a change
        if (isRestricted) return;
        
        
        
        // Update the internal state (if provided):
        options?.onInternalChange?.(newState, event);
        
        
        
        // Dispatch external change handler (if provided):
        props.onStateChange?.(newState, event);
    });
    
    
    
    // Return the state change dispatcher:
    return dispatchStateChange;
};

/**
 * Provides abstract controlled/uncontrolled interaction state with animation lifecycle integration.  
 * Specialize it into **collapse-state**, **active-state**, or **view-state** by defining the `definition` parameter.
 * 
 * **Definition parameters:**
 * - **Transition phase resolver**  
 *   Resolves the semantic phase from the settled state and transition flag.
 * - **Transition classname resolver**  
 *   Resolves the semantic classname from the current phase.
 * - **Previous state resolver (optional)**  
 *   Tracks the previously settled state for direction-aware styling.
 * - **Default animation pattern**  
 *   Default animation names to match against.
 * - **Default animation bubbling**  
 *   Whether to enable bubbling from nested child elements.
 * - **Default initial state**  
 *   Provides a fallback initial concrete state when neither `defaultState` prop nor `defaultState` option is provided.
 * - **Effective state resolver**  
 *   Normalizes declarative values (`'auto'`, `'inherit'`, etc.) into concrete values, applying domain-specific rules such as:
 *   - disabled/read-only restrictions
 *   - cascade/inheritance from parent context
 *   - clamping within valid ranges
 *   - other domain-specific adjustments
 * 
 * Supports both controlled and uncontrolled mode:
 * - **Controlled mode**: `state` prop is provided and may include declarative keywords.  
 *   These are normalized into concrete values on every render.
 * - **Uncontrolled mode**: `state` prop is `undefined`.  
 *   The component manages its own state internally, initialized from `defaultState` prop (which must be a concrete value).
 * 
 * Supports user interaction handling via `dispatchStateChange()`.  
 * Ignores user interaction when the component is disabled or read-only.
 * 
 * @param props - The behavior-specific props, including controlled/uncontrolled state and change request callbacks.
 * @param options - Optional per-component customization for animation lifecycle (pattern, bubbling, etc.) and default state behavior.
 * @param definition - The interaction-specific definition that declares how effective state, phases, and classnames are resolved.
 * 
 * @template TDeclarativeState - The declarative type of the state value (may include keywords).
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TPhase - The type representing semantic transition phases.
 * @template TClassname - The type representing semantic transition classnames.
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. mouse click, keyboard event).
 * 
 * @returns The resolved interaction behavior state API, including a dispatcher for requesting state changes.
 */
export const useInteractionState = <
    TDeclarativeState extends {} | null,
    TState            extends TDeclarativeState,
    TPhase            extends string,
    TClassname        extends string,
    
    TBehaviorProps,
    TBehaviorOptions,
    TBehaviorDefinition,
    
    TElement          extends Element = HTMLElement,
    
    TChangeEvent = unknown
>(
    props      : InteractionStateProps<TDeclarativeState, TState, TChangeEvent>,
    options    : InteractionStateOptions<TState> | undefined,
    definition : InteractionStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
): InteractionState<TState, TPhase, TClassname, TElement, TChangeEvent> => {
    // Extract definition:
    const {
        defaultInitialState,
        
        useResolvedEffectiveState,
    } = definition;
    
    
    
    // Extract options and assign defaults:
    const {
        defaultState = defaultInitialState,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultState  : fallbackState    = defaultState,
        state         : declarativeState = fallbackState, // Controlled: from `state`; Uncontrolled: from `defaultState`.
        state         : controlledState,
    } = props;
    
    
    
    // States:
    
    // Resolve the declarative state into a concrete effective state:
    // - Normalizes keywords into concrete values.
    // - Applies influence rules (disabled/read-only, cascade, clamp, etc.).
    const effectiveState = useResolvedEffectiveState({
        declarativeState,
        props      : props      as TBehaviorProps,
        options    : options    as TBehaviorOptions,
        definition : definition as TBehaviorDefinition,
    });
    
    // Combine props for transition orchestration:
    const combinedProps : typeof props & Pick<TransitionStateProps<TState>, 'effectiveState'> = {
        // Pass the normalized effective state as the initial state:
        effectiveState,
        
        // Merge all other props (these may override `effectiveState` if explicitly provided):
        ...props, // May include `onStateChange` and other foreign props.
    };
    
    // Transition orchestration:
    const [transitionBehaviorState, setInternalState] = useTransitionState<
        TState,
        TPhase,
        TClassname,
        
        typeof combinedProps,
        InteractionStateOptions<TState>,
        InteractionStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>,
        
        TElement
    >(
    combinedProps,
    options,
    {
        // Force `TBehavior**` => `Interaction**`:
        ...definition satisfies InteractionStateDefinition<TDeclarativeState, TState, TPhase, TClassname,
            TBehaviorProps,
            TBehaviorOptions,
            TBehaviorDefinition
        > as unknown as InteractionStateDefinition<TDeclarativeState, TState, TPhase, TClassname,
            InteractionStateProps<TDeclarativeState, TState, TChangeEvent>,
            InteractionStateOptions<TState>,
            InteractionStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
        >,
        useResolvedDriverState : useResolvedInteractionDriverState, // Prefers controlled mode, falls back to uncontrolled mode.
    } satisfies TransitionStateDefinition<TState, TPhase, TClassname,
        typeof combinedProps,
        InteractionStateOptions<TState>,
        InteractionStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
    >);
    
    
    
    // A stable dispatcher for state change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchStateChange = useDispatchInteractionStateChange<TState, TChangeEvent>(props as Omit<typeof props, 'defaultState'>, {
        onInternalChange: (newState) => {
            // Update the internal state only if uncontrolled:
            if (controlledState === undefined) setInternalState(newState);
        },
    });
    
    
    
    // Return resolved interaction state API:
    return {
        ...transitionBehaviorState,
        dispatchStateChange,
    } satisfies InteractionState<TState, TPhase, TClassname, TElement, TChangeEvent>;
};



/**
 * Provides abstract controlled/uncontrolled interaction state *without* animation lifecycle integration.  
 * Specialize it into **collapse-state**, **active-state**, or **view-state** by defining the `definition` parameter.
 * 
 * This hook is designed for components that **manage** a resolved interaction state
 * (for example, the `expanded` state in collapsible components) and **forward** it
 * to a base component, while optionally supporting uncontrolled behavior.
 * 
 * Unlike `useInteractionState()`, which includes animation lifecycle management,
 * `useInteractionController()` provides a **simplified implementation** that focuses solely
 * on controlled/uncontrolled state management without animation lifecycle.
 * 
 * **Definition parameters:**
 * - **Default initial state**  
 *   Provides a fallback initial concrete state when neither `defaultState` prop nor `defaultState` option is provided.
 * - **Effective state resolver**  
 *   Normalizes declarative values (`'auto'`, `'inherit'`, etc.) into concrete values, applying domain-specific rules such as:
 *   - disabled/read-only restrictions
 *   - cascade/inheritance from parent context
 *   - clamping within valid ranges
 *   - other domain-specific adjustments
 * 
 * Supports both controlled and uncontrolled mode:
 * - **Controlled mode**: `state` prop is provided and may include declarative keywords.  
 *   These are normalized into concrete values on every render.
 * - **Uncontrolled mode**: `state` prop is `undefined`.  
 *   The component manages its own state internally, initialized from `defaultState` prop (which must be a concrete value).
 * 
 * Supports user interaction handling via `dispatchStateChange()`.  
 * Ignores user interaction when the component is disabled or read-only.
 * 
 * @param props - The behavior-specific props, including controlled/uncontrolled state and change request callbacks.
 * @param options - Optional per-component customization for default state behavior.
 * @param definition - The interaction-specific definition that declares how effective state is resolved.
 * 
 * @template TDeclarativeState - The declarative type of the state value (may include keywords).
 * @template TState - The concrete type of the state value (must not be declarative).
 * @template TBehaviorProps - The type of the behavior-specific props.
 * @template TBehaviorOptions - The type of the behavior-specific options.
 * @template TBehaviorDefinition - The type of the behavior-specific definition.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. mouse click, keyboard event).
 * 
 * @returns A tuple containing:
 * - The resolved concrete interaction state.
 * - A dispatcher for requesting state changes.
 */
export const useInteractionController = <
    TDeclarativeState extends {} | null,
    TState            extends TDeclarativeState,
    
    TBehaviorProps,
    TBehaviorOptions,
    TBehaviorDefinition,
    
    TChangeEvent = unknown
>(
    props      : InteractionStateProps<TDeclarativeState, TState, TChangeEvent>,
    options    : Pick<InteractionStateOptions<TState>, 'defaultState'> | undefined,
    definition : Pick<InteractionStateDefinition<TDeclarativeState, TState, string, string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>, 'defaultInitialState' | 'useResolvedEffectiveState'>
): [TState, DispatchValueChange<TState, TChangeEvent>] => {
    // Extract definition:
    const {
        defaultInitialState,
        
        useResolvedEffectiveState,
    } = definition;
    
    
    
    // Extract options and assign defaults:
    const {
        defaultState = defaultInitialState,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultState  : fallbackState    = defaultState,
        state         : declarativeState = fallbackState, // Controlled: from `state`; Uncontrolled: from `defaultState`.
        state         : controlledState,
        onStateChange : handleStateChange,
    } = props;
    
    
    
    // States:
    
    // Resolve the declarative state into a concrete effective state:
    // - Normalizes keywords into concrete values.
    // - Applies influence rules (disabled/read-only, cascade, clamp, etc.).
    const effectiveState = useResolvedEffectiveState({
        declarativeState,
        props      : props      as TBehaviorProps,
        options    : options    as TBehaviorOptions,
        definition : definition as TBehaviorDefinition,
    });
    
    // Manage the state using hybrid controlled/uncontrolled logic:
    // - In uncontrolled mode: initialize internal state from `defaultValue` (first render only).
    // - In controlled mode: always mirror the external `value`.
    const [driverState, dispatchStateChange] = useControllableValue<TState, TChangeEvent>({
        defaultValue        : effectiveState, // Used only for initial uncontrolled state.
        value               : (controlledState !== undefined) ? effectiveState : undefined, // Controlled mode: always follow external value.
        onValueChange       : handleStateChange,
    });
    
    
    
    // Return the resolved state and dispatcher:
    return [driverState, dispatchStateChange];
};
