'use client' // The exported `useCollapseState()` and `useCollapseStatePhaseEvents()` hooks are client side only.

// React:
import {
    // Hooks:
    useEffect,
    useRef,
}                           from 'react'

// Types:
import {
    type CollapseStateProps,
    type CollapseStateChangeProps,
    type CollapseStatePhaseEventProps,
    type CollapseStateUncontrollableProps,
    type CollapseStateOptions,
    type ExpandPhase,
    type CollapseStateApi,
}                           from './types.js'

// Defaults:
import {
    finalDefaultExpanded,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveExpandPhase,
    getExpandClassname,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Types:
    type ValueChangeDispatcher,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.
import {
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Resolves the expand/collapse state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * Supports controlled, uncontrolled, and hybrid expansion behavior with optional change dispatching.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. button click, keyboard event).
 * 
 * @param props - The component props that may include a controlled `expanded` value, optional `defaultExpanded`, and `onExpandedChange`.
 * @param options - An optional configuration for customizing expand/collapse behavior.
 * @returns The resolved expand/collapse state, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, MouseEventHandler } from 'react';
 * import {
 *     useCollapseState,
 *     CollapseStateProps,
 *     CollapseStateUncontrollableProps,
 *     CollapseStateChangeProps,
 * } from '@reusable-ui/collapse-state';
 * import styles from './CollapsibleBox.module.css';
 * 
 * export interface CollapsibleBoxProps extends
 *     CollapseStateProps,
 *     CollapseStateUncontrollableProps<MouseEventHandler<HTMLButtonElement>>, // optional uncontrolled behavior
 *     CollapseStateChangeProps // optional change dispatching behavior
 * {}
 * 
 * // A box that can be expanded and collapsed.
 * export const CollapsibleBox: FC<CollapsibleBoxProps> = (props) => {
 *     const {
 *         expanded,
 *         expandPhase,
 *         expandClassname,
 *         
 *         dispatchExpandedChange,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useCollapseState(props, {
 *         defaultExpanded   : false,                  // Fallback for uncontrolled mode.
 *         animationPattern  : ['expand', 'collapse'], // Matches animation names ending with 'expand' or 'collapse'.
 *         animationBubbling : false,                  // Ignores bubbling animation events from children.
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
export const useCollapseState = <TElement extends Element = HTMLElement, TChangeEvent = unknown>(props: CollapseStateProps & Partial<CollapseStateUncontrollableProps> & Partial<CollapseStateChangeProps<TChangeEvent>>, options?: CollapseStateOptions): CollapseStateApi<TElement, TChangeEvent> => {
    // Extract options and assign defaults:
    const {
        defaultExpanded   = finalDefaultExpanded,
        animationPattern  = ['expand', 'collapse'], // Matches animation names for transitions
        animationBubbling = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultExpanded : defaultInitialIntent = defaultExpanded,
        expanded        : initialIntent        = defaultInitialIntent,
        expanded        : controlledExpanded,
        onExpandedChange,
    } = props;
    
    
    
    // States and flags:
    
    // Internal expansion state with animation lifecycle:
    const [internalExpanded, setInternalExpanded, runningIntent, animationHandlers] = useAnimationState<boolean, TElement>({
        initialIntent,
        animationPattern,
        animationBubbling,
    });
    
    // Determine control mode:
    const isControlled     = (controlledExpanded !== undefined);
    
    // Resolve effective expansion state:
    const resolvedExpanded = isControlled ? controlledExpanded : internalExpanded;
    
    // Derive semantic phase from animation lifecycle:
    const expandPhase      = resolveExpandPhase(resolvedExpanded, runningIntent); // 'collapsed', 'collapsing', 'expanding', 'expanded'
    
    
    
    // Sync animation state with resolved expansion state:
    useEffect(() => {
        // The `setInternalExpanded()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalExpanded(resolvedExpanded);
    }, [resolvedExpanded]);
    
    
    
    // Stable dispatcher for expansion change requests:
    const dispatchExpandedChange : ValueChangeDispatcher<boolean, TChangeEvent> = useStableCallback((newExpanded: boolean, event: TChangeEvent): void => {
        // Update the internal state only if uncontrolled:
        if (!isControlled) setInternalExpanded(newExpanded);
        
        
        
        // Dispatch external change handler (if provided):
        onExpandedChange?.(newExpanded, event);
    });
    
    
    
    // Return resolved collapse state API:
    return {
        expanded        : resolvedExpanded,
        expandPhase,
        expandClassname : getExpandClassname(expandPhase),
        dispatchExpandedChange,
        ...animationHandlers,
    } satisfies CollapseStateApi<TElement, TChangeEvent>;
};

/**
 * Emits lifecycle events in response to expand/collapse phase transitions.
 * 
 * This hook observes the resolved `expandPhase` from `useCollapseState()` and triggers
 * the appropriate callbacks defined in `CollapseStatePhaseEventProps`, such as:
 * 
 * - `onExpandStart`
 * - `onExpandEnd`
 * - `onCollapseStart`
 * - `onCollapseEnd`
 * 
 * @param {CollapseStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {ExpandPhase} expandPhase - The current phase value returned from `useCollapseState()`.
 */
export const useCollapseStatePhaseEvents = (props: CollapseStatePhaseEventProps, expandPhase: ExpandPhase): void => {
    // Extract props:
    const {
        onExpandStart,
        onExpandEnd,
        onCollapseStart,
        onCollapseEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleExpandPhaseChange = useStableCallback((expandPhase: ExpandPhase): void => {
        switch (expandPhase) {
            case 'collapsed'  : onCollapseEnd?.(expandPhase, undefined);   break;
            case 'collapsing' : onCollapseStart?.(expandPhase, undefined); break;
            case 'expanding'  : onExpandStart?.(expandPhase, undefined);   break;
            case 'expanded'   : onExpandEnd?.(expandPhase, undefined);     break;
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
        
        Sequence on subsequent updates of `expandPhase`:
            → observer effect runs → emits phase change event
            → setup effect does NOT run (no changes in dependencies)
        
        Sequence on final unmount:
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`
    */
    
    
    
    // Observer effect: emits phase change events on `expandPhase` updates.
    useEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleExpandPhaseChange(expandPhase);
    }, [expandPhase]);
    
    // Setup effect: marks the component as mounted and resets on unmount.
    useEffect(() => {
        // Mark as mounted:
        hasMountedRef.current = true;
        
        
        
        // Unmark when unmounted:
        return () => {
            hasMountedRef.current = false;
        }
    }, []);
};
