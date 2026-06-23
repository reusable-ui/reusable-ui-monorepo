'use client' // The exported hooks are client side only.

// Types:
import {
    type CollapseStateProps,
    type CollapseChangeDispatcherOptions,
    type CollapseStateOptions,
    type ExpandPhase,
    type ExpandClassname,
    type CollapseState,
}                           from './types.js'
import {
    type CollapseStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultInitialExpanded,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveExpandTransitionPhase,
    resolveExpandTransitionClassname,
    triggerExpandPhaseEvents,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Types:
    type DispatchValueChange,
}                           from '@reusable-ui/controllable'        // Provides three state-control strategies for sharing values and updates between components and their parents — controlled, uncontrolled, and controllable (hybrid).

// Reusable-ui states:
import {
    // Hooks:
    useDispatchInteractionStateChange,
    useInteractionState,
    useInteractionController,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.

// Hooks:
import {
    useResolvedEffectiveCollapseState,
}                           from './internal-general-hooks.js'



/**
 * Creates a stable dispatcher for requesting a change to the expanded state.
 * 
 * This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `expanded` state and forwards it to a `<BaseComponent expanded={...}>`.
 * 
 * Unlike `useCollapseState()`, which supports both controlled and uncontrolled modes,
 * `useDispatchExpandedChange()` assumes the component is **fully controlled** and does not manage internal state.
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
export const useDispatchExpandedChange = <TChangeEvent = unknown>(props: CollapseStateProps<TChangeEvent> & { defaultExpanded?: never }, options?: CollapseChangeDispatcherOptions<TChangeEvent>) : DispatchValueChange<boolean, TChangeEvent> => {
    return useDispatchInteractionStateChange<boolean, TChangeEvent>(
        // Props:
        { onStateChange: props.onExpandedChange },
        
        // Options:
        options,
    );
};



/** The behavior state definition for expand/collapse state management. */
const collapseBehaviorStateDefinition : CollapseStateDefinition = {
    // State definitions:
    defaultInitialState        : defaultInitialExpanded,
    useResolvedEffectiveState  : useResolvedEffectiveCollapseState, // Resolves effective state.
    
    // Behavior definitions:
    defaultAnimationPattern    : ['expanding', 'collapsing'],       // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveExpandTransitionPhase,      // Resolves phases.
    resolveTransitionClassname : resolveExpandTransitionClassname,  // Resolves classnames.
    triggerTransitionEvent     : triggerExpandPhaseEvents,          // Triggers lifecycle events.
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
 * import React, { FC } from 'react';
 * import {
 *     useCollapseState,
 *     CollapseStateProps,
 * } from '@reusable-ui/collapse-state';
 * import styles from './CollapsibleBox.module.css';
 * 
 * export interface CollapsibleBoxProps extends
 *     CollapseStateProps<React.MouseEvent<HTMLButtonElement>>
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
 *     } = useCollapseState(props, {
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
export const useCollapseState = <TElement extends Element = HTMLElement, TChangeEvent = unknown>(props: CollapseStateProps<TChangeEvent>, options?: CollapseStateOptions): CollapseState<TElement, TChangeEvent> => {
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
        
        onExpandingStart,
        onExpandingEnd,
        onCollapsingStart,
        onCollapsingEnd,
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
    } = useInteractionState<
        boolean,
        boolean,
        ExpandPhase,
        ExpandClassname,
        
        CollapseStateProps<TChangeEvent>,
        CollapseStateOptions,
        CollapseStateDefinition,
        
        TElement,
        TChangeEvent
    >(
        // Props:
        {
            defaultState,
            state,
            onStateChange,
            
            ...({
                onExpandingStart,
                onExpandingEnd,
                onCollapsingStart,
                onCollapsingEnd,
            } as {}),
        },
        
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
    } satisfies CollapseState<TElement, TChangeEvent>;
};

/**
 * Resolves the current expanded/collapsed state and provides a dispatcher for requesting changes.
 * 
 * This hook is intended for components that **manage** the resolved `expanded` state and **forward** it to a base component,
 * while optionally supporting uncontrolled behavior.
 * 
 * Unlike `useCollapseState()`, which resolves full lifecycle,
 * `useCollapseController()` provides a **simplified implementation** for managing expansion state and dispatching changes.
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
export const useCollapseController = <TChangeEvent = unknown>(props: CollapseStateProps<TChangeEvent>, options?: Pick<CollapseStateOptions, 'defaultExpanded'>): [boolean, DispatchValueChange<boolean, TChangeEvent>] => {
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
        
        onExpandingStart,
        onExpandingEnd,
        onCollapsingStart,
        onCollapsingEnd,
    } = props;
    
    
    
    // States and flags:
    
    // Transition orchestration:
    return useInteractionController<
        boolean,
        boolean,
        
        CollapseStateProps<TChangeEvent>,
        CollapseStateOptions,
        CollapseStateDefinition,
        
        TChangeEvent
    >(
        // Props:
        {
            defaultState,
            state,
            onStateChange,
            
            ...({
                onExpandingStart,
                onExpandingEnd,
                onCollapsingStart,
                onCollapsingEnd,
            } as {}),
        },
        
        // Options:
        { defaultState: fallbackState, ...restOptions },
        
        // Definition:
        collapseBehaviorStateDefinition,
    ) satisfies [boolean, DispatchValueChange<boolean, TChangeEvent>];
};
