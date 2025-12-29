'use client' // The exported hooks are client side only.

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
    type TransitionStateProps,
    type ResolveDriverStateArgs,
    type TransitionBehaviorStateDefinition,
    
    
    
    // Hooks:
    useTransitionBehaviorState,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.
export {
    useTransitionStatePhaseEvents as useInteractionStatePhaseEvents,
}                           from '@reusable-ui/transition-state'    // Lifecycle-aware transition state for React, enabling reusable hooks with consistent animations.
import {
    // Hooks:
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.
import {
    // Hooks:
    useReadOnlyState,
}                           from '@reusable-ui/read-only-state'     // Adds editable/read-only functionality to UI components, with transition animations and semantic styling hooks.

// Types:
import {
    type InteractionStateProps,
    type UncontrollableInteractionStateProps,
    type InteractionStateChangeProps,
    type InteractionStateChangeDispatcherOptions,
    type InteractionStateOptions,
    
    type InteractionBehaviorStateDefinition,
    
    type InteractionBehaviorState,
}                           from './types.js'



/**
 * Creates a stable dispatcher for requesting a change to the state.
 * 
 * This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `state` and forwards it to a `<BaseComponent state={...}>`.
 * 
 * Unlike `useInteractionBehaviorState()`, which supports both controlled and uncontrolled modes,
 * `useInteractionStateChangeDispatcher()` assumes the component is **fully controlled** and does not manage internal state.
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
export const useInteractionStateChangeDispatcher = <TState extends {} | null, TChangeEvent = unknown>(props: InteractionStateChangeProps<TState, TChangeEvent>, options?: InteractionStateChangeDispatcherOptions<TState, TChangeEvent>) : ValueChangeDispatcher<TState, TChangeEvent> => {
    // States and flags:
    
    // Resolve whether the component is disabled:
    const isDisabled   = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Resolve whether the component is readonly:
    const isReadonly   = useReadOnlyState(props as Parameters<typeof useReadOnlyState>[0]);
    
    // Resolve whether the component is in a restricted state:
    const isRestricted = isDisabled || isReadonly;
    
    
    
    // A stable dispatcher for state change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchStateChange : ValueChangeDispatcher<TState, TChangeEvent> = useStableCallback((newState: TState, event: TChangeEvent): void => {
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
export const useInteractionBehaviorState = <
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
    props      : InteractionStateProps<TDeclarativeState> & UncontrollableInteractionStateProps<TState> & InteractionStateChangeProps<TState, TChangeEvent>,
    options    : InteractionStateOptions<TState> | undefined,
    definition : InteractionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
): InteractionBehaviorState<TState, TPhase, TClassname, TElement, TChangeEvent> => {
    // Extract definition:
    const {
        defaultInitialState,
        
        useResolveEffectiveState,
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
    
    
    
    // States and flags:
    
    // Resolve the declarative state into a concrete effective state:
    // - Normalizes keywords into concrete values.
    // - Applies influence rules (disabled/read-only, cascade, clamp, etc.).
    const effectiveState = useResolveEffectiveState({
        declarativeState,
        props            : props      as TBehaviorProps,
        options          : options    as TBehaviorOptions,
        definition       : definition as TBehaviorDefinition,
    });
    
    // Combine props for transition orchestration:
    const combinedProps : TransitionStateProps<TState> & typeof props = {
        // Pass the normalized initial effective state:
        effectiveState  : effectiveState,
        
        // Merge all other props (these may override `effectiveState` if explicitly provided):
        ...props, // May include `onStateChange` and other foreign props.
    };
    
    // Transition orchestration:
    const [transitionBehaviorState, setInternalState] = useTransitionBehaviorState<
        TDeclarativeState,
        TState,
        TPhase,
        TClassname,
        
        InteractionStateProps<TDeclarativeState>,
        InteractionStateOptions<TState>,
        InteractionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>,
        
        TElement
    >(
    combinedProps,
    options,
    {
        // Force `TBehavior**` => `Interaction**`:
        ...definition satisfies InteractionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname,
            TBehaviorProps,
            TBehaviorOptions,
            TBehaviorDefinition
        > as unknown as InteractionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname,
            InteractionStateProps<TDeclarativeState>,
            InteractionStateOptions<TState>,
            InteractionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
        >,
        useResolveDriverState : useResolveInteractionDriverState, // Prefers controlled mode, falls back to uncontrolled mode.
    } satisfies TransitionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname,
        InteractionStateProps<TDeclarativeState>,
        InteractionStateOptions<TState>,
        InteractionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>
    >);
    
    // Determine control mode:
    const isControlled = (controlledState !== undefined);
    
    
    
    // A stable dispatcher for state change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchStateChange = useInteractionStateChangeDispatcher<TState, TChangeEvent>(props as Omit<typeof props, 'defaultState'>, {
        onInternalChange: (newState) => {
            // Update the internal state only if uncontrolled:
            if (!isControlled) setInternalState(newState);
        },
    });
    
    
    
    // Return resolved interaction state API:
    return {
        ...transitionBehaviorState,
        dispatchStateChange,
    } satisfies InteractionBehaviorState<TState, TPhase, TClassname, TElement, TChangeEvent>;
};

/**
 * Resolves the **driver state** for interaction-based components.
 * 
 * In interaction-state (collapse, active, view):
 * - Prefers `props.state` if provided (controlled mode).
 * - Falls back to `internalState` if no controlled state is provided (uncontrolled mode).
 * - The chosen driver state may be declarative (`'auto'`, `'inherit'`, etc.),
 *   so it is normalized via `useResolveEffectiveState` to produce a usable concrete value.
 * 
 * @returns The resolved driver state (controlled or uncontrolled), normalized into a concrete value.
 */
const useResolveInteractionDriverState = <TDeclarativeState extends {} | null, TState extends TDeclarativeState, TPhase extends string, TClassname extends string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>(args: ResolveDriverStateArgs<TState, InteractionStateProps<TDeclarativeState> & UncontrollableInteractionStateProps<TState>, InteractionStateOptions<TState>, InteractionBehaviorStateDefinition<TDeclarativeState, TState, TPhase, TClassname, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>>): TState => {
    // Extract args:
    const {
        internalState,
        props,
        options,
        definition,
    } = args;
    
    
    
    // Extract definition:
    const {
        useResolveEffectiveState,
    } = definition;
    
    
    
    // Extract props:
    const {
        state : controlledState,
    } = props;
    
    
    
    // States and flags:
    
    // Determine control mode:
    const isControlled   = (controlledState !== undefined);
    
    // Resolve effective state:
    // - Prefers controlled state if available, otherwise uses internal state
    // - Effective state normalizes declarative values into concrete ones
    const driverState    = isControlled ? controlledState : internalState;
    const effectiveState = useResolveEffectiveState({
        declarativeState : driverState,
        props            : props      as TBehaviorProps,
        options          : options    as TBehaviorOptions,
        definition       : definition as TBehaviorDefinition,
    });
    
    // Return the resolved effective state:
    return effectiveState;
};



/**
 * Provides abstract controlled/uncontrolled interaction state *without* animation lifecycle integration.  
 * Specialize it into **collapse-state**, **active-state**, or **view-state** by defining the `definition` parameter.
 * 
 * This hook is designed for components that **manage** a resolved interaction state
 * (for example, the `expanded` state in collapsible components) and **forward** it
 * to a base component, while optionally supporting uncontrolled behavior.
 * 
 * Unlike `useInteractionBehaviorState()`, which includes animation lifecycle management,
 * `useUncontrollableInteractionState()` provides a **simplified implementation** that focuses solely
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
export const useUncontrollableInteractionState = <
    TDeclarativeState extends {} | null,
    TState            extends TDeclarativeState,
    
    TBehaviorProps,
    TBehaviorOptions,
    TBehaviorDefinition,
    
    TChangeEvent = unknown
>(
    props      : InteractionStateProps<TDeclarativeState> & UncontrollableInteractionStateProps<TState> & InteractionStateChangeProps<TState, TChangeEvent>,
    options    : Pick<InteractionStateOptions<TState>, 'defaultState'> | undefined,
    definition : Pick<InteractionBehaviorStateDefinition<TDeclarativeState, TState, string, string, TBehaviorProps, TBehaviorOptions, TBehaviorDefinition>, 'defaultInitialState' | 'useResolveEffectiveState'>
): [TState, ValueChangeDispatcher<TState, TChangeEvent>] => {
    // Extract definition:
    const {
        defaultInitialState,
        
        useResolveEffectiveState,
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
    const effectiveState = useResolveEffectiveState({
        declarativeState,
        props            : props      as TBehaviorProps,
        options          : options    as TBehaviorOptions,
        definition       : definition as TBehaviorDefinition,
    });
    
    // Manage the state using hybrid controlled/uncontrolled logic:
    // - In uncontrolled mode: initialize internal state from `defaultValue` (first render only).
    // - In controlled mode: always mirror the external `value`.
    const {
        value               : driverState, // The managed state becomes the driver state.
        dispatchValueChange : dispatchStateChange,
    } = useHybridValueChange<TState, TChangeEvent>({
        defaultValue        : effectiveState, // Used only for initial uncontrolled state.
        value               : (controlledState !== undefined) ? effectiveState : undefined, // Controlled mode: always follow external value.
        onValueChange       : handleStateChange,
    });
    
    
    
    // Return the resolved state and dispatcher:
    return [driverState, dispatchStateChange];
};
