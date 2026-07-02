'use client' // The exported hooks are client side only.

// Types:
import {
    type ActiveStateProps,
    type ActiveChangeDispatcherOptions,
    type ActiveStateOptions,
    type ActivePhase,
    type ActiveClassname,
    type ActiveState,
}                           from './types.js'
import {
    type ActiveStateDefinition,
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
    triggerActivePhaseEvents,
}                           from './internal-utilities.js'

// Contexts:
import {
    ActiveStateContext,
}                           from './internal-contexts.js'

// Reusable-ui utilities:
import {
    // Types:
    type DispatchValueChange,
}                           from '@reusable-ui/controllable'        // Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).

// Reusable-ui states:
import {
    // Types:
    type CascadeStateDefinition,
    
    
    
    // Hooks:
    useResolvedCascadeState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.
import {
    // Types:
    type ResolveEffectiveStateArgs,
    
    
    
    // Hooks:
    useDispatchInteractionStateChange,
    useInteractionState,
    useInteractionController,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** The cascade state definition for active/inactive state management. */
const cascadeStateDefinition : CascadeStateDefinition<boolean> = {
    defaultState          : defaultInitialActive,
    defaultCascadeEnabled : defaultDeclarativeCascadeActive,
    inactiveState         : false, // `false`: the value of un-active state
    stateContext          : ActiveStateContext,
};

/**
 * Resolves the current active/inactive state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `active` state and **forward** it to the base component.
 * 
 * The resolved active state **must** be forwarded to the base component via the `active` prop,
 * so the base component becomes **fully controlled** and does not manage its own internal state.
 * 
 * The passed `props` must **not** include `defaultActive`, since this hook is designed for fully controlled components.
 * 
 * Unlike `useActiveState()`, which supports both controlled and uncontrolled modes,
 * `useResolvedActive()` assumes the component is **fully controlled** and does not manage internal state.
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
 * @param props - The component props that may include a controlled `active` value and contextual `cascadeActive` value, but must exclude `defaultActive`.
 * @param options - An optional configuration for customizing activate/deactivate behavior.
 * @returns The resolved active/inactive state.
 */
export const useResolvedActive = (props: Pick<ActiveStateProps<any>, 'active' | 'cascadeActive'> & { defaultActive?: never }, options?: Pick<ActiveStateOptions, 'defaultActive' | 'defaultCascadeActive'>) : boolean => {
    // Extract options:
    const {
        defaultActive        : defaultState,
        defaultCascadeActive : defaultCascadeEnabled,
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        active        : state,
        cascadeActive : cascadeEnabled,
    } = props;
    
    
    
    // Resolve effective activation state:
    return useResolvedCascadeState<boolean>(
        // Props:
        { state, cascadeEnabled },
        
        // Options:
        { defaultState, defaultCascadeEnabled },
        
        // Definition:
        cascadeStateDefinition,
    );
};



/**
 * Creates a stable dispatcher for requesting a change to the active state.
 * 
 * This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `active` state and forwards it to a `<BaseComponent active={...}>`.
 * 
 * Unlike `useActiveState()`, which supports both controlled and uncontrolled modes,
 * `useDispatchActiveChange()` assumes the component is **fully controlled** and does not manage internal state.
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
export const useDispatchActiveChange = <TChangeEvent = unknown>(props: Pick<ActiveStateProps<TChangeEvent>, 'onActiveChange'> & { defaultActive?: never }, options?: ActiveChangeDispatcherOptions<TChangeEvent>) : DispatchValueChange<boolean, TChangeEvent> => {
    return useDispatchInteractionStateChange<boolean, TChangeEvent>(
        // Props:
        { onStateChange: props.onActiveChange },
        
        // Options:
        options,
    );
};



/** Resolves the effective activation state, normalizing declarative keywords into concrete values. */
const useResolvedEffectiveActiveState = ({ declarativeState, props, options }: ResolveEffectiveStateArgs<boolean, ActiveStateProps<unknown>, ActiveStateOptions, ActiveStateDefinition>): boolean => {
    return useResolvedActive({
        ...props,
        defaultActive : undefined,        // Prevents uncontrolled value.
        active        : declarativeState, // Pass the declarative state as controlled value.
    }, options);
};

/** The behavior state definition for active/inactive state management. */
const activeStateDefinition : ActiveStateDefinition = {
    // State definitions:
    defaultInitialState        : defaultInitialActive,
    useResolvedEffectiveState  : useResolvedEffectiveActiveState,  // Resolves effective state.
    
    // Behavior definitions:
    defaultAnimationPattern    : ['activating', 'deactivating'],   // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveActiveTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolveActiveTransitionClassname, // Resolves classnames.
    triggerTransitionEvent     : triggerActivePhaseEvents,         // Triggers lifecycle events.
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
 * import React, { FC } from 'react';
 * import {
 *     useActiveState,
 *     ActiveStateProps,
 * } from '@reusable-ui/active-state';
 * import styles from './ActivatableBox.module.css';
 * 
 * export interface ActivatableBoxProps extends
 *     ActiveStateProps<React.MouseEvent<HTMLButtonElement>>
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
 *     } = useActiveState(props, {
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
export const useActiveState = <TElement extends Element = HTMLElement, TChangeEvent = unknown>(props: ActiveStateProps<TChangeEvent>, options?: ActiveStateOptions): ActiveState<TElement, TChangeEvent> => {
    // Extract options:
    const {
        defaultActive : fallbackState,
        ...restOptions
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        defaultActive  : defaultState,
        active         : state,
        onActiveChange : onStateChange,
        
        cascadeActive,
        
        onActivatingStart,
        onActivatingEnd,
        onDeactivatingStart,
        onDeactivatingEnd,
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
    } = useInteractionState<
        boolean,
        boolean,
        ActivePhase,
        ActiveClassname,
        
        ActiveStateProps<TChangeEvent>,
        ActiveStateOptions,
        ActiveStateDefinition,
        
        TElement,
        TChangeEvent
    >(
        // Props:
        {
            defaultState,
            state,
            onStateChange,
            
            ...({
                cascadeActive,
                
                onActivatingStart,
                onActivatingEnd,
                onDeactivatingStart,
                onDeactivatingEnd,
            } as {}),
        },
        
        // Options:
        { defaultState: fallbackState, ...restOptions },
        
        // Definition:
        activeStateDefinition,
    );
    
    
    
    // Return resolved active state API:
    return {
        active,
        actualActive,
        activePhase,
        activeClassname,
        dispatchActiveChange,
        ...animationHandlers,
    } satisfies ActiveState<TElement, TChangeEvent>;
};

/**
 * Resolves the current active/inactive state and provides a dispatcher for requesting changes.
 * 
 * This hook is intended for components that **manage** the resolved `active` state and **forward** it to the base component,
 * while optionally supporting uncontrolled behavior.
 * 
 * The resolved active state **must** be forwarded to the base component via the `active` prop,
 * so the base component becomes **fully controlled** and does not manage its own internal state,
 * since this hook **already** manages the state and dispatches changes.
 * 
 * Unlike `useActiveState()`, which resolves full lifecycle,
 * `useActiveController()` provides a **simplified implementation** for managing activation state and dispatching changes.
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
export const useActiveController = <TChangeEvent = unknown>(props: ActiveStateProps<TChangeEvent>, options?: Pick<ActiveStateOptions, 'defaultActive' | 'defaultCascadeActive'>): [boolean, DispatchValueChange<boolean, TChangeEvent>] => {
    // Extract options:
    const {
        defaultActive : fallbackState,
        ...restOptions
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        defaultActive  : defaultState,
        active         : state,
        onActiveChange : onStateChange,
        
        cascadeActive,
        
        onActivatingStart,
        onActivatingEnd,
        onDeactivatingStart,
        onDeactivatingEnd,
    } = props;
    
    
    
    // States and flags:
    
    // Transition orchestration:
    return useInteractionController<
        boolean,
        boolean,
        
        ActiveStateProps<TChangeEvent>,
        ActiveStateOptions,
        ActiveStateDefinition,
        
        TChangeEvent
    >(
        // Props:
        {
            defaultState,
            state,
            onStateChange,
            
            ...({
                cascadeActive,
                
                onActivatingStart,
                onActivatingEnd,
                onDeactivatingStart,
                onDeactivatingEnd,
            } as {}),
        },
        
        // Options:
        { defaultState: fallbackState, ...restOptions },
        
        // Definition:
        activeStateDefinition,
    ) satisfies [boolean, DispatchValueChange<boolean, TChangeEvent>];
};
