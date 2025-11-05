'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type CSSProperties,
    
    
    
    // Hooks:
    useEffect,
    useLayoutEffect,
    useRef,
    useMemo,
}                           from 'react'

// Types:
import {
    type ViewStateProps,
    type ViewStateChangeProps,
    type ViewStatePhaseEventProps,
    type UncontrollableViewStateProps,
    type ViewStateOptions,
    type TransitioningViewPhase,
    type ViewPhase,
    type ViewBehaviorState,
}                           from './types.js'

// Defaults:
import {
    defaultInitialViewIndex,
    defaultMinViewIndex,
    defaultMaxViewIndex,
    defaultViewIndexStep,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveViewPhase,
    getViewClassname,
}                           from './internal-utilities.js'

// CSS Variables:
import {
    viewStateVars,
}                           from './css-variables.js'

// Reusable-ui utilities:
import {
    clamp,
}                           from '@reusable-ui/numbers'             // A lightweight JavaScript library for precise numeric operations.
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Hooks:
    usePreviousValue,
}                           from '@reusable-ui/lifecycles'          // A React utility package for managing component lifecycles, ensuring stable effects, and optimizing state updates.
import {
    // Types:
    type ValueChangeDispatcher,
    
    
    
    // Hooks:
    useHybridValueChange,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.
import {
    // Hooks:
    useAnimationState,
}                           from '@reusable-ui/animation-state'     // Declarative animation lifecycle management for React components. Tracks user intent, synchronizes animation transitions, and handles graceful animation sequencing.



/**
 * Resolves the current view index for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `viewIndex` value and **forward** it to a base component.
 * 
 * Unlike `useViewBehaviorState()`, which supports both controlled and uncontrolled modes,
 * `useViewState()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Ideal for components that **consume** the resolved `viewIndex` value.
 * 
 * @param props - The component props that may include a controlled `viewIndex` value but must exclude `defaultViewIndex`.
 * @param options - An optional configuration for customizing view-switching behavior.
 * @returns The resolved view index.
 */
export const useViewState = (props: ViewStateProps & { defaultViewIndex: never }, options?: Pick<ViewStateOptions, 'defaultViewIndex' | 'minViewIndex' | 'maxViewIndex' | 'viewIndexStep'>) : number => {
    // Extract options and assign defaults:
    const {
        defaultViewIndex  = defaultInitialViewIndex,
        minViewIndex      = defaultMinViewIndex,
        maxViewIndex      = defaultMaxViewIndex,
        viewIndexStep     = defaultViewIndexStep,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        viewIndex        : controlledViewIndex = defaultViewIndex,
    } = props;
    
    
    
    // Resolve effective view index:
    const effectiveViewIndex   = clamp(minViewIndex, controlledViewIndex, maxViewIndex, viewIndexStep);
    
    
    
    // Return the resolved view index:
    return effectiveViewIndex;
};

/**
 * Creates a stable dispatcher for requesting a change to the view index.
 * 
 * This hook is designed for **fully controlled components**—typically the outer `<DerivedComponent>` that manages the `viewIndex` value and forwards it to a `<BaseComponent viewIndex={...}>`.
 * 
 * Unlike `useViewBehaviorState()`, which supports both controlled and uncontrolled modes,
 * `useViewIndexChangeDispatcher()` assumes the component is **fully controlled** and does not manage internal state.
 * 
 * - Supports only controlled mode.
 * - Always triggers `onViewIndexChange`, if provided.
 * - Ideal for components that **dictate** the `viewIndex` value externally and need a stable dispatcher without lifecycle orchestration.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. tab click, swipe gesture).
 * 
 * @param props - The component props that may include `onViewIndexChange` callback but must exclude `defaultViewIndex`.
 * @returns A dispatcher function for view index change requests.
 */
export const useViewIndexChangeDispatcher = <TChangeEvent = unknown>(props: ViewStateChangeProps<TChangeEvent> & { defaultViewIndex: never }) : ValueChangeDispatcher<number, TChangeEvent> => {
    // A stable dispatcher for view index change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchViewIndexChange : ValueChangeDispatcher<number, TChangeEvent> = useStableCallback((newViewIndex: number, event: TChangeEvent): void => {
        // No internal state to update in controlled mode:
        // if (!isControlled) setInternalViewIndex(newViewIndex);
        
        
        
        // Dispatch external change handler (if provided):
        props.onViewIndexChange?.(newViewIndex, event);
    });
    
    
    
    // Return the view index change dispatcher:
    return dispatchViewIndexChange;
};

/**
 * Resolves the current view index and provides a dispatcher for requesting changes.
 * 
 * This hook is intended for components that **manage** the resolved `viewIndex` value and **forward** it to a base component,
 * while optionally supporting uncontrolled behavior.
 * 
 * Unlike `useViewBehaviorState()`, which resolves full lifecycle,
 * `useUncontrollableViewState()` provides a **simplified implementation** for managing view index state and dispatching changes.
 * 
 * - Supports both controlled and uncontrolled modes.
 * - If `viewIndex` is provided, the internal state is disabled and the component becomes fully controlled.
 * - If `viewIndex` is omitted, the internal state is initialized via `defaultViewIndex`.
 * - Ideal for components that **manage** the resolved `viewIndex` value.
 * 
 * @template TChangeEvent - The type of the event triggering the change request (e.g. tab click, swipe gesture).
 * 
 * @param props - The component props that may include a controlled `viewIndex` value, optional `defaultViewIndex` value, and `onViewIndexChange` callback.
 * @param options - An optional configuration for customizing view-switching behavior.
 * @returns A tuple of the resolved view index and a dispatcher for requesting changes.
 */
export const useUncontrollableViewState = <TChangeEvent = unknown>(props: ViewStateProps & UncontrollableViewStateProps & ViewStateChangeProps<TChangeEvent>, options?: Pick<ViewStateOptions, 'defaultViewIndex' | 'minViewIndex' | 'maxViewIndex' | 'viewIndexStep'>): [number, ValueChangeDispatcher<number, TChangeEvent>] => {
    // Extract options and assign defaults:
    const {
        defaultViewIndex  = defaultInitialViewIndex,
        minViewIndex      = defaultMinViewIndex,
        maxViewIndex      = defaultMaxViewIndex,
        viewIndexStep     = defaultViewIndexStep,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultViewIndex : defaultInitialIntent = defaultViewIndex,
        viewIndex        : rawInitialIntent     = defaultInitialIntent,
        viewIndex        : controlledViewIndex,
        onViewIndexChange,
    } = props;
    
    
    
    // States:
    
    // Clamp the initial intent within valid range:
    const initialIntent        = clamp(minViewIndex, rawInitialIntent, maxViewIndex, viewIndexStep);
    
    // Internal view index state:
    const {
        value               : unclampedViewIndex,
        dispatchValueChange : dispatchViewIndexChange,
    } = useHybridValueChange<number, TChangeEvent>({
        defaultValue  : initialIntent,
        value         : controlledViewIndex,
        onValueChange : onViewIndexChange,
    });
    
    
    
    // Resolve effective view index:
    const effectiveViewIndex   = clamp(minViewIndex, unclampedViewIndex, maxViewIndex, viewIndexStep);
    
    
    
    // Return resolved view index and dispatcher:
    return [effectiveViewIndex, dispatchViewIndexChange];
};



/**
 * Resolves the current view index, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled, uncontrolled, and hybrid view-switching behavior with optional change dispatching.
 * 
 * @template TElement - The type of the target DOM element.
 * @template TChangeEvent - The type of the event triggering the change request (e.g. tab click, swipe gesture).
 * 
 * @param props - The component props that may include a controlled `viewIndex` value, optional `defaultViewIndex` value, and `onViewIndexChange` callback.
 * @param options - An optional configuration for customizing view-switching behavior and animation lifecycle.
 * @returns The resolved view index, current transition phase, associated CSS class name, change dispatcher, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, MouseEventHandler } from 'react';
 * import {
 *     useViewBehaviorState,
 *     ViewStateProps,
 *     UncontrollableViewStateProps,
 *     ViewStateChangeProps,
 * } from '@reusable-ui/view-state';
 * import styles from './SlideBox.module.css';
 * 
 * export interface SlideBoxProps extends
 *     ViewStateProps,
 *     UncontrollableViewStateProps, // optional uncontrolled behavior
 *     ViewStateChangeProps<MouseEventHandler<HTMLButtonElement>> // optional change dispatching behavior
 * {}
 * 
 * // A box that can switch views.
 * export const SlideBox: FC<SlideBoxProps> = (props) => {
 *     const {
 *         viewIndex,
 *         prevViewIndex,
 *         minVisibleViewIndex,
 *         maxVisibleViewIndex,
 *         actualViewIndex,
 *         viewPhase,
 *         viewClassname,
 *         viewStyle,
 *         
 *         dispatchViewIndexChange,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *     } = useViewBehaviorState(props, {
 *         defaultViewIndex  : 0,                                       // Fallback for uncontrolled mode.
 *         minViewIndex      : 0,                                       // Limits minimum view index to 0.
 *         maxViewIndex      : 4,                                       // Limits maximum view index to 4.
 *         viewIndexStep     : 1,                                       // Snaps to integer view indices.
 *         animationPattern  : ['view-progressing', 'view-regressing'], // Matches animation names ending with 'view-progressing' or 'view-regressing'.
 *         animationBubbling : false,                                   // Ignores bubbling animation events from children.
 *     });
 *     
 *     // Determine which views to render based on visibility range:
 *     const minRenderViewIndex = Math.floor(minVisibleViewIndex);
 *     const maxRenderViewIndex = Math.ceil(maxVisibleViewIndex);
 *     
 *     return (
 *         <div
 *             className={`${styles.box} ${viewClassname}`}
 *             style={viewStyle}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *         >
 *             {['First', 'Second', 'Third', 'Fourth', 'Fifth'].map((label, currentIndex) => (
 *                 // Only render views within the visible or transitioning range to optimize performance:
 *                 ((currentIndex >= minRenderViewIndex) && (currentIndex <= maxRenderViewIndex)) && <div
 *                     key={currentIndex}
 *                     className={styles.item}
 *                 >
 *                     <p>{label} view</p>
 *                 </div>
 *             ))}
 *             
 *             <button onClick={(event) => dispatchViewIndexChange(((viewIndex - 1) + 5) % 5, event)}>
 *                 Prev
 *             </button>
 *             <button onClick={(event) => dispatchViewIndexChange((viewIndex + 1) % 5, event)}>
 *                 Next
 *             </button>
 *         </div>
 *     );
 * };
 * ```
 */
export const useViewBehaviorState = <TElement extends Element = HTMLElement, TChangeEvent = unknown>(props: ViewStateProps & UncontrollableViewStateProps & ViewStateChangeProps<TChangeEvent>, options?: ViewStateOptions): ViewBehaviorState<TElement, TChangeEvent> => {
    // Extract options and assign defaults:
    const {
        defaultViewIndex  = defaultInitialViewIndex,
        minViewIndex      = defaultMinViewIndex,
        maxViewIndex      = defaultMaxViewIndex,
        viewIndexStep     = defaultViewIndexStep,
        animationPattern  = ['view-progressing', 'view-regressing'], // Matches animation names for transitions
        animationBubbling = false,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultViewIndex : defaultInitialIntent = defaultViewIndex,
        viewIndex        : rawInitialIntent     = defaultInitialIntent,
        viewIndex        : controlledViewIndex,
        onViewIndexChange,
    } = props;
    
    
    
    // States and flags:
    
    /*
        ┌───────────────────────────────────────────────────────────────────────────────────────┐
        │                               View Transition Lifecycle                               │
        ├────────────┬────────────┬─────────────────────────────────────────────────────────────┤
        │  Block #   │   Label    │                        Meaning / Role                       │
        ├────────────┼────────────┼─────────────────────────────────────────────────────────────┤
        │     0      │   past     │ Historical view index before any transition                 │
        │     1      │   past     │ Historical view index before any transition                 │
        │     2  ─┐  │   prev     │ Previously settled view index                               │
        │  x  3   │  │ discarded  │ Interrupted intent — never animated                         │
        │  x  4   │  │ discarded  │ Interrupted intent — never animated                         │
        │  x  5   v  │ discarded  │ Interrupted intent — never animated                         │
        │     6  ─┘  │ settled    │ Current laggy view index (settled after animation)          │
        │  x  7   │  │ deferred   │ Overwritten intent — will be discarded                      │
        │  x  8   v  │ deferred   │ Overwritten intent — will be discarded                      │
        │     9  ─┘  │ effective  │ Final intent — will animate after current animation ends    │
        ├────────────┴────────────┴─────────────────────────────────────────────────────────────┤
        │ → Only one animation runs at a time and cannot be interrupted mid-flight              │
        │ → Current animation direction: top to bottom (from block #2 to #6)                    │
        │ → Intermediate deferred intents are discarded                                         │
        │ → Only the latest deferred intent (effective) will animate next (from block #6 to #9) │
        │ → `settledViewIndex` lags behind `effectiveViewIndex` during animation                │
        │ → `prevSettledViewIndex` enables directional inference                                │
        └───────────────────────────────────────────────────────────────────────────────────────┘
    */
    
    // Clamp the initial intent within valid range:
    const initialIntent        = clamp(minViewIndex, rawInitialIntent, maxViewIndex, viewIndexStep);
    
    // Internal view index state with animation lifecycle:
    const [internalViewIndex, setInternalViewIndex, runningIntent, animationHandlers] = useAnimationState<number, TElement>({
        initialIntent,
        animationPattern,
        animationBubbling,
    });
    
    // Determine control mode:
    const isControlled         = (controlledViewIndex !== undefined);
    
    // Resolve effective view index:
    const unclampedViewIndex   = isControlled ? controlledViewIndex : internalViewIndex;
    const effectiveViewIndex   = clamp(minViewIndex, unclampedViewIndex, maxViewIndex, viewIndexStep);
    
    // The current settled or animating target view index.
    // During animation, this reflects the active target (`runningIntent`).
    // If no animation is active, it reflects the latest declared intent (`effectiveViewIndex`), even if not yet committed.
    // This optimistic fallback ensures directional inference and styling remain in sync with declared transitions.
    // Deferred or discarded intents are never reflected here.
    const settledViewIndex     = runningIntent ?? effectiveViewIndex;
    
    // The previously settled view index before the most recent transition.
    // This value trails one step behind `settledViewIndex`.
    // It updates only after a transition completes, and persists even after settling.
    // When no prior view exists, it resolves to `undefined`.
    // Useful for directional inference, layout comparisons, and transition-aware animations.
    const prevSettledViewIndex = usePreviousValue<number>(settledViewIndex);
    
    // Determine whether a transition toward the effective view index is currently in progress:
    const isTransitioning      = (
        // An in-flight animation is active toward a target view index:
        (runningIntent !== undefined)
        
        ||
        
        // An optimistic transition is pending: the intent has changed, but React has not yet re-rendered to reflect it.
        // This mismatch is expected and resolves once `setInternalViewIndex(effectiveViewIndex)` takes effect.
        (internalViewIndex !== effectiveViewIndex)
    );
    
    // Derive semantic phase from animation lifecycle:
    const viewPhase            = resolveViewPhase(prevSettledViewIndex, settledViewIndex, isTransitioning); // 'view-progressing', 'view-regressing', 'view-settled'
    
    
    
    // Sync animation state with effective view index:
    // Use `useLayoutEffect()` to ensure the intent is registered before the browser fires `animationstart`.
    // This guarantees the animation lifecycle handshake completes correctly.
    // The `useAnimationState()` hook internally treats missing animation events as immediately completed transitions.
    useLayoutEffect(() => {
        // The `setInternalViewIndex()` has internal `Object.is()` check to avoid redundant state updates.
        setInternalViewIndex(effectiveViewIndex);
        
        // Note: If `setInternalViewIndex()` is delayed (e.g. by React's render scheduler),
        // both `internalViewIndex` and `runningIntent` may remain stale temporarily.
        // This introduces a brief pre-transition ambiguity, safely handled by `isTransitioning` logic.
    }, [effectiveViewIndex]);
    
    
    
    // A stable dispatcher for view index change requests.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const dispatchViewIndexChange : ValueChangeDispatcher<number, TChangeEvent> = useStableCallback((newViewIndex: number, event: TChangeEvent): void => {
        // Update the internal state only if uncontrolled:
        if (!isControlled) setInternalViewIndex(newViewIndex);
        
        
        
        // Dispatch external change handler (if provided):
        onViewIndexChange?.(newViewIndex, event);
    });
    
    
    
    // Determine the range of visible views, including during transitions:
    const fromIndex = isTransitioning ? (prevSettledViewIndex ?? settledViewIndex) : settledViewIndex;
    const toIndex   = settledViewIndex;
    const [minVisibleViewIndex, maxVisibleViewIndex] = (
        fromIndex < toIndex
        ? [fromIndex, toIndex]
        : [toIndex, fromIndex]
    );
    
    
    
    // Return resolved view-switching state API:
    return {
        viewIndex           : settledViewIndex,     // Use `settledViewIndex` instead of `effectiveViewIndex`, because during animation, the settled index reflects the visually committed view.
        prevViewIndex       : prevSettledViewIndex, // Include the previous settled index for conditionally rendering the origin view during animations.
        minVisibleViewIndex,                        // The minimum visible view index in the current transition or settled state.
        maxVisibleViewIndex,                        // The maximum visible view index in the current transition or settled state.
        actualViewIndex     : effectiveViewIndex,   // Expose the actual effective index for advanced use cases.
        viewPhase,
        viewClassname       : getViewClassname(viewPhase),
        viewStyle           : useMemo(() => ({
            // These variables are used in CSS to drive animation and layout:
            [
                viewStateVars.viewIndex
                .slice(4, -1) // fix: var(--customProp) => --customProp
            ]: String(settledViewIndex),
            
            [
                viewStateVars.prevViewIndex
                .slice(4, -1) // fix: var(--customProp) => --customProp
            ]: (prevSettledViewIndex !== undefined) ? String(prevSettledViewIndex) : 'unset',
        } as CSSProperties), [viewStateVars.viewIndex, viewStateVars.prevViewIndex, settledViewIndex, prevSettledViewIndex]),
        dispatchViewIndexChange,
        ...animationHandlers,
    } satisfies ViewBehaviorState<TElement, TChangeEvent>;
};

/**
 * Emits lifecycle events in response to view phase transitions.
 * 
 * This hook observes the resolved `viewPhase` from `useViewBehaviorState()` and triggers
 * the appropriate callbacks defined in `ViewStatePhaseEventProps`, such as:
 * 
 * - `onViewProgressingStart`
 * - `onViewProgressingEnd`
 * - `onViewRegressingStart`
 * - `onViewRegressingEnd`
 * 
 * @param {ViewStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {ViewPhase} viewPhase - The current phase value returned from `useViewBehaviorState()`.
 */
export const useViewStatePhaseEvents = (props: ViewStatePhaseEventProps, viewPhase: ViewPhase): void => {
    // Extract props:
    const {
        onViewProgressingStart,
        onViewProgressingEnd,
        onViewRegressingStart,
        onViewRegressingEnd,
    } = props;
    
    
    
    // Tracks whether the component has passed its initial mount phase.
    // Prevents phase-specific lifecycle events from wrongfully firing on initial mount.
    const hasMountedRef = useRef<boolean>(false);
    
    
    
    // Remembers the previous transitioning phase for proper end event emission.
    const prevTransitioningViewPhaseRef = useRef<TransitioningViewPhase | undefined>(undefined);
    
    
    
    // A stable dispatcher for emitting phase change events.
    // This function remains referentially stable across renders,
    // avoids to be included in the `useEffect()` dependency array, thus preventing unnecessary re-runs.
    const handleViewPhaseChange = useStableCallback((viewPhase: ViewPhase): void => {
        switch (viewPhase) {
            case 'view-progressing':
                // Remember the current transitioning phase:
                prevTransitioningViewPhaseRef.current = viewPhase;
                
                onViewProgressingStart?.(viewPhase, undefined);
                break;
            
            case 'view-regressing':
                // Remember the current transitioning phase:
                prevTransitioningViewPhaseRef.current = viewPhase;
                
                onViewRegressingStart?.(viewPhase, undefined);
                break;
            
            case 'view-settled':
                // Determine the previous transitioning phase to emit the corresponding end event:
                const prevTransitioningViewPhase = prevTransitioningViewPhaseRef.current;
                
                // Clear the remembered transitioning phase:
                prevTransitioningViewPhaseRef.current = undefined;
                
                // Emit the corresponding end event:
                switch (prevTransitioningViewPhase) {
                    case 'view-progressing':
                        onViewProgressingEnd?.(viewPhase, undefined);
                        break;
                    
                    case 'view-regressing':
                        onViewRegressingEnd?.(viewPhase, undefined);
                        break;
                } // switch
                break;
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
        
        Sequence on subsequent updates of `viewPhase`:
            → observer effect runs → emits phase change event
            → setup effect does NOT run (no changes in dependencies)
        
        Sequence on final unmount:
            → observer cleanup (noop)
            → setup cleanup → resets `hasMountedRef = false`
    */
    
    
    
    // Observer effect: emits phase change events on `viewPhase` updates.
    // Use `useLayoutEffect()` to ensure the events are emitted before browser paint,
    // in case the event handlers manipulate timing-sensitive DOM operations.
    useLayoutEffect(() => {
        // Ignore the first mount phase change:
        if (!hasMountedRef.current) return;
        
        
        
        // Emits subsequent phase change events:
        handleViewPhaseChange(viewPhase);
    }, [viewPhase]);
    
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
