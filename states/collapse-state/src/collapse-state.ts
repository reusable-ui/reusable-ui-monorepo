'use client' // The exported hooks are client side only.

// Types:
import {
    type CollapseStateProps,
    type CollapseStateChangeProps,
    type CollapseChangeDispatcherOptions,
    type CollapseStatePhaseEventProps,
    type UncontrollableCollapseStateProps,
    type CollapseStateOptions,
    type ExpandPhase,
    type ExpandClassname,
    type CollapseBehaviorState,
}                           from './types.js'
import {
    type CollapseBehaviorStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultInitialExpanded,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveExpandTransitionPhase,
    resolveExpandTransitionClassname,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Types:
    type ValueChangeDispatcher,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.

// Reusable-ui states:
import {
    // Types:
    type ResolveEffectiveStateArgs,
    
    
    
    // Hooks:
    useInteractionStateChangeDispatcher,
    useInteractionBehaviorState,
    useInteractionStatePhaseEvents,
    useUncontrollableInteractionState,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/**
 * Resolves the current expanded/collapsed state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `expanded` state and **forward** it to a base component.
 * 
 * Unlike `useCollapseBehaviorState()`, which supports both controlled and uncontrolled modes,
 * `useCollapseState()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Ideal for components that **consume** the resolved `expanded` state.
 * 
 * @param props - The component props that may include a controlled `expanded` value but must exclude `defaultExpanded`.
 * @param options - An optional configuration for customizing expand/collapse behavior.
 * @returns The resolved expanded/collapsed state.
 */
export const useCollapseState = (props: CollapseStateProps & { defaultExpanded?: never }, options?: Pick<CollapseStateOptions, 'defaultExpanded'>) : boolean => {
    // Extract options and assign defaults:
    const {
        defaultExpanded   = defaultInitialExpanded,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        expanded        : controlledExpanded = defaultExpanded,
    } = props;
    
    
    
    // Return the resolved expansion state:
    return controlledExpanded;
};



/**
 * Creates a stable dispatcher for requesting a change to the expanded state.
 * 
 * This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `expanded` state and forwards it to a `<BaseComponent expanded={...}>`.
 * 
 * Unlike `useCollapseBehaviorState()`, which supports both controlled and uncontrolled modes,
 * `useCollapseChangeDispatcher()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Always triggers `onExpandedChange`, if provided.
 * - Ideal for components that **dictate** the `expanded` state externally and need a stable dispatcher without lifecycle orchestration.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 * 
 * @param props - The component props that may include `onExpandedChange` callback but must exclude `defaultExpanded`.
 * @param options - Optional configuration, such as `onInternalChange` for uncontrolled scenarios.
 * @returns A dispatcher function for expansion change requests.
 */
export const useCollapseChangeDispatcher = <TChangeEvent = unknown>(props: CollapseStateChangeProps<TChangeEvent> & { defaultExpanded?: never }, options?: CollapseChangeDispatcherOptions<TChangeEvent>) : ValueChangeDispatcher<boolean, TChangeEvent> => {
    return useInteractionStateChangeDispatcher<boolean, TChangeEvent>(
        // Props:
        { onStateChange: props.onExpandedChange },
        
        // Options:
        options,
    );
};



/** Resolves the effective expansion state, normalizing declarative keywords into concrete values. */
const useResolveEffectiveCollapseState = ({ declarativeState, props, options }: ResolveEffectiveStateArgs<boolean, CollapseStateProps, CollapseStateOptions, CollapseBehaviorStateDefinition>): boolean => {
    const effectiveExpanded = useCollapseState({
        ...props,
        defaultExpanded : undefined,        // Prevents uncontrolled value.
        expanded        : declarativeState, // Pass the declarative state as controlled value.
    }, options);
    
    // Return the resolved effective expansion state:
    return effectiveExpanded;
};

/** The behavior state definition for expand/collapse state management. */
const collapseBehaviorStateDefinition : CollapseBehaviorStateDefinition = {
    // State definitions:
    defaultInitialState        : defaultInitialExpanded,
    useResolveEffectiveState   : useResolveEffectiveCollapseState, // Resolves effective state.
    
    // Behavior definitions:
    defaultAnimationPattern    : ['expanding', 'collapsing'],      // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveExpandTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolveExpandTransitionClassname, // Resolves classnames.
};

/**
 * Resolves the expanded/collapsed state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled, uncontrolled, and hybrid expansion behavior with optional change dispatching.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 * 
 * @param props - The component props that may include a controlled `expanded` value, optional `defaultExpanded` value, and `onExpandedChange` callback.
 * @param options - An optional configuration for customizing expand/collapse behavior and animation lifecycle.
 * @returns The resolved expanded/collapsed state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, MouseEventHandler } from 'react';
 * import {
 *     useCollapseBehaviorState,
 *     CollapseStateProps,
 *     UncontrollableCollapseStateProps,
 *     CollapseStateChangeProps,
 * } from '@reusable-ui/collapse-state';
 * import styles from './CollapsibleBox.module.css';
 * 
 * export interface CollapsibleBoxProps extends
 *     CollapseStateProps,
 *     UncontrollableCollapseStateProps, // optional uncontrolled behavior
 *     CollapseStateChangeProps<MouseEventHandler<HTMLButtonElement>> // optional change dispatching behavior
 * {}
 * 
 * // A box that can be expanded and collapsed.
 * export const CollapsibleBox: FC<CollapsibleBoxProps> = (props) => {
 *     const {
 *         expanded,
 *         actualExpanded,
 *         expandPhase,
 *         expandClassname,
 *         
 *         dispatchExpandedChange,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useCollapseBehaviorState(props, {
 *         defaultExpanded   : false,                       // Fallback for uncontrolled mode.
 *         animationPattern  : ['expanding', 'collapsing'], // Matches animation names ending with 'expanding' or 'collapsing'.
 *         animationBubbling : false,                       // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${expandClassname}`}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             <button onClick={(event) => dispatchExpandedChange(!expanded, event)}>
 *                 See details
 *             </button>
 *             {expanded && <div className={styles.details}>
 *                 <p>Additional details go here.</p>
 *             </div>}
 *         </div>
 *     );
 * };
 * ```
 */
export const useCollapseBehaviorState = <TElement extends Element = HTMLElement, TChangeEvent = unknown>(props: CollapseStateProps & UncontrollableCollapseStateProps & CollapseStateChangeProps<TChangeEvent>, options?: CollapseStateOptions): CollapseBehaviorState<TElement, TChangeEvent> => {
    // Extract options:
    const {
        defaultExpanded : fallbackState,
        ...restOptions
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        defaultExpanded  : defaultState,
        expanded         : state,
        onExpandedChange : onStateChange,
        ...restProps
    } = props;
    
    
    
    // States and flags:
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : expanded,
        actualState         : actualExpanded,
        transitionPhase     : expandPhase,
        transitionClassname : expandClassname,
        dispatchStateChange : dispatchExpandedChange,
        ...animationHandlers
    } = useInteractionBehaviorState<
        boolean,
        boolean,
        ExpandPhase,
        ExpandClassname,
        
        CollapseStateProps,
        CollapseStateOptions,
        CollapseBehaviorStateDefinition,
        
        TElement,
        TChangeEvent
    >(
        // Props:
        { defaultState, state, onStateChange, ...restProps },
        
        // Options:
        { defaultState: fallbackState, ...restOptions },
        
        // Definition:
        collapseBehaviorStateDefinition,
    );
    
    
    
    // Return resolved expansion state API:
    return {
        expanded,
        actualExpanded,
        expandPhase,
        expandClassname,
        dispatchExpandedChange,
        ...animationHandlers,
    } satisfies CollapseBehaviorState<TElement, TChangeEvent>;
};

/**
 * Resolves the current expanded/collapsed state and provides a dispatcher for requesting changes.
 * 
 * This hook is intended for components that **manage** the resolved `expanded` state and **forward** it to a base component,
 * while optionally supporting uncontrolled behavior.
 * 
 * Unlike `useCollapseBehaviorState()`, which resolves full lifecycle,
 * `useUncontrollableCollapseState()` provides a **simplified implementation** for managing expansion state and dispatching changes.
 * 
 * - Supports both controlled and uncontrolled modes.
 * - If `expanded` is provided, the internal state is disabled and the component becomes fully controlled.
 * - If `expanded` is omitted, the internal state is initialized via `defaultExpanded`.
 * - Ideal for components that **manage** the resolved `expanded` state.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 * 
 * @param props - The component props that may include a controlled `expanded` value, optional `defaultExpanded` value, and `onExpandedChange` callback.
 * @param options - An optional configuration for customizing expand/collapse behavior.
 * @returns A tuple of the resolved expanded/collapsed state and a dispatcher for requesting changes.
 */
export const useUncontrollableCollapseState = <TChangeEvent = unknown>(props: CollapseStateProps & UncontrollableCollapseStateProps & CollapseStateChangeProps<TChangeEvent>, options?: Pick<CollapseStateOptions, 'defaultExpanded'>): [boolean, ValueChangeDispatcher<boolean, TChangeEvent>] => {
    // Extract options:
    const {
        defaultExpanded : fallbackState,
        ...restOptions
    } = options ?? {};
    
    
    
    // Extract props:
    const {
        defaultExpanded  : defaultState,
        expanded         : state,
        onExpandedChange : onStateChange,
        ...restProps
    } = props;
    
    
    
    // States and flags:
    
    // Transition orchestration:
    return useUncontrollableInteractionState<
        boolean,
        boolean,
        
        CollapseStateProps,
        CollapseStateOptions,
        CollapseBehaviorStateDefinition,
        
        TChangeEvent
    >(
        // Props:
        { defaultState, state, onStateChange, ...restProps },
        
        // Options:
        { defaultState: fallbackState, ...restOptions },
        
        // Definition:
        collapseBehaviorStateDefinition,
    ) satisfies [boolean, ValueChangeDispatcher<boolean, TChangeEvent>];
};



/**
 * Emits lifecycle events in response to expand/collapse phase transitions.
 * 
 * This hook observes the resolved `expandPhase` from `useCollapseBehaviorState()` and triggers
 * the appropriate callbacks defined in `CollapseStatePhaseEventProps`, such as:
 * 
 * - `onExpandingStart`
 * - `onExpandingEnd`
 * - `onCollapsingStart`
 * - `onCollapsingEnd`
 * 
 * @param {CollapseStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {ExpandPhase} expandPhase - The current phase value returned from `useCollapseBehaviorState()`.
 */
export const useCollapseStatePhaseEvents = (props: CollapseStatePhaseEventProps, expandPhase: ExpandPhase): void => {
    useInteractionStatePhaseEvents(expandPhase, (expandPhase: ExpandPhase): void => {
        switch (expandPhase) {
            case 'expanding'  : props.onExpandingStart?.(expandPhase, undefined);  break;
            case 'expanded'   : props.onExpandingEnd?.(expandPhase, undefined);    break;
            case 'collapsing' : props.onCollapsingStart?.(expandPhase, undefined); break;
            case 'collapsed'  : props.onCollapsingEnd?.(expandPhase, undefined);   break;
        } // switch
    });
};
