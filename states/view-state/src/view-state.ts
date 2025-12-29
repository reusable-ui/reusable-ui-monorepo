'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type CSSProperties,
    
    
    
    // Hooks:
    useRef,
    useMemo,
}                           from 'react'

// Types:
import {
    type ViewStateProps,
    type ViewStateChangeProps,
    type ViewIndexChangeDispatcherOptions,
    type ViewStatePhaseEventProps,
    type UncontrollableViewStateProps,
    type ViewStateOptions,
    type TransitioningViewPhase,
    type ViewPhase,
    type ViewClassname,
    type ViewBehaviorState,
}                           from './types.js'
import {
    type ViewBehaviorStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultInitialViewIndex,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveViewTransitionPhase,
    resolveViewTransitionClassname,
    clampViewIndex,
}                           from './internal-utilities.js'

// CSS Variables:
import {
    viewStateVars,
}                           from './css-variables.js'

// Reusable-ui utilities:
import {
    // Hooks:
    usePreviousValue,
}                           from '@reusable-ui/lifecycles'          // A React utility package for managing component lifecycles, ensuring stable effects, and optimizing state updates.
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
export const useViewState = (props: ViewStateProps & { defaultViewIndex?: never }, options?: Pick<ViewStateOptions, 'defaultViewIndex' | 'minViewIndex' | 'maxViewIndex' | 'viewIndexStep'>) : number => {
    // Extract options and assign defaults:
    const {
        defaultViewIndex  = defaultInitialViewIndex,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        viewIndex         : controlledViewIndex = defaultViewIndex,
    } = props;
    
    
    
    // Clamp the view index within valid range and step:
    const effectiveViewIndex   = clampViewIndex(controlledViewIndex, options);
    
    
    
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
 * @param options - Optional configuration, such as `onInternalChange` for uncontrolled scenarios.
 * @returns A dispatcher function for view index change requests.
 */
export const useViewIndexChangeDispatcher = <TChangeEvent = unknown>(props: ViewStateChangeProps<TChangeEvent> & { defaultViewIndex?: never }, options?: ViewIndexChangeDispatcherOptions<TChangeEvent>) : ValueChangeDispatcher<number, TChangeEvent> => {
    return useInteractionStateChangeDispatcher<number, TChangeEvent>(
        // Props:
        { onStateChange: props.onViewIndexChange },
        
        // Options:
        options,
    );
};



/** Resolves the effective view index, normalizing declarative keywords into concrete values. */
const useResolveEffectiveViewState = ({ declarativeState, props, options }: ResolveEffectiveStateArgs<number, ViewStateProps, ViewStateOptions, ViewBehaviorStateDefinition>): number => {
    const effectiveViewIndex = useViewState({
        ...props,
        defaultViewIndex  : undefined,        // Prevents uncontrolled value.
        viewIndex         : declarativeState, // Pass the declarative state as controlled value.
    }, options);
    
    // Return the resolved effective view index:
    return effectiveViewIndex;
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
 *         defaultViewIndex  : 0,                                   // Fallback for uncontrolled mode.
 *         minViewIndex      : 0,                                   // Limits minimum view index to 0.
 *         maxViewIndex      : 4,                                   // Limits maximum view index to 4.
 *         viewIndexStep     : 1,                                   // Snaps to integer view indices.
 *         animationPattern  : ['view-advancing', 'view-receding'], // Matches animation names ending with 'view-advancing' or 'view-receding'.
 *         animationBubbling : false,                               // Ignores bubbling animation events from children.
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
        defaultViewIndex,
        ...restOptions
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultViewIndex  : initialViewIndex,
        viewIndex         : controlledViewIndex,
        onViewIndexChange : handleViewIndexChange,
        ...restProps
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
    
    // Transition orchestration:
    const {
        prevSettledState    : prevViewIndex,
        state               : viewIndex,
        actualState         : actualViewIndex,
        transitionPhase     : viewPhase,
        transitionClassname : viewClassname,
        dispatchStateChange : dispatchViewIndexChange,
        ...animationHandlers
    } = useInteractionBehaviorState<
        number,
        number,
        ViewPhase,
        ViewClassname,
        
        ViewStateProps,
        ViewStateOptions,
        ViewBehaviorStateDefinition,
        
        TElement,
        TChangeEvent
    >(
        // Props:
        { defaultState: initialViewIndex, state: controlledViewIndex, onStateChange: handleViewIndexChange, ...restProps },
        
        // Options:
        { defaultState: defaultViewIndex, ...restOptions },
        
        // Definition:
        {
            defaultInitialState        : defaultInitialViewIndex,
            useResolveEffectiveState   : useResolveEffectiveViewState,        // Resolves effective state.
            
            defaultAnimationPattern    : ['view-advancing', 'view-receding'], // Matches animation names for transitions.
            defaultAnimationBubbling   : false,
            resolveTransitionPhase     : resolveViewTransitionPhase,          // Resolves phases.
            resolveTransitionClassname : resolveViewTransitionClassname,      // Resolves classnames.
            
            useResolvePreviousState    : usePreviousValue,                    // Tracks previous settled state.
        } satisfies ViewBehaviorStateDefinition,
    );
    
    
    
    // Determine the range of visible views, including during transitions:
    const fromIndex = (viewPhase === 'view-settled') ? viewIndex : (prevViewIndex ?? viewIndex);
    const toIndex   = viewIndex;
    const [minVisibleViewIndex, maxVisibleViewIndex] = (
        fromIndex < toIndex
        ? [fromIndex, toIndex]
        : [toIndex, fromIndex]
    );
    
    
    
    // Compute inline CSS variables for driving view-switching styles and animations:
    const viewStyle = useMemo<CSSProperties>(() => ({
        [
            viewStateVars.viewIndex
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(viewIndex),
        
        [
            viewStateVars.prevViewIndex
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: (prevViewIndex !== undefined) ? String(prevViewIndex) : 'unset',
    }), [viewStateVars.viewIndex, viewStateVars.prevViewIndex, viewIndex, prevViewIndex]);
    
    
    
    // Return resolved view-switching state API:
    return {
        viewIndex,
        prevViewIndex,
        minVisibleViewIndex, // The minimum visible view index in the current transition or settled state.
        maxVisibleViewIndex, // The maximum visible view index in the current transition or settled state.
        actualViewIndex,
        viewPhase,
        viewClassname,
        viewStyle,
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
 * - `onViewAdvancingStart`
 * - `onViewAdvancingEnd`
 * - `onViewRecedingStart`
 * - `onViewRecedingEnd`
 * 
 * @param {ViewStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {ViewPhase} viewPhase - The current phase value returned from `useViewBehaviorState()`.
 */
export const useViewStatePhaseEvents = (props: ViewStatePhaseEventProps, viewPhase: ViewPhase): void => {
    // Remembers the previous transitioning phase for proper end event emission.
    const prevPhaseRef = useRef<TransitioningViewPhase | undefined>(undefined);
    
    
    
    useInteractionStatePhaseEvents(viewPhase, (viewPhase: ViewPhase): void => {
        switch (viewPhase) {
            case 'view-advancing':
                // Remember the current transitioning phase:
                prevPhaseRef.current = viewPhase;
                
                props.onViewAdvancingStart?.(viewPhase, undefined);
                break;
            
            case 'view-receding':
                // Remember the current transitioning phase:
                prevPhaseRef.current = viewPhase;
                
                props.onViewRecedingStart?.(viewPhase, undefined);
                break;
            
            case 'view-settled':
                // Determine the previous transitioning phase to emit the corresponding end event:
                const prevPhase = prevPhaseRef.current;
                
                // Clear the remembered transitioning phase:
                prevPhaseRef.current = undefined;
                
                // Emit the corresponding end event:
                switch (prevPhase) {
                    case 'view-advancing':
                        props.onViewAdvancingEnd?.(viewPhase, undefined);
                        break;
                    
                    case 'view-receding':
                        props.onViewRecedingEnd?.(viewPhase, undefined);
                        break;
                } // switch
                break;
        } // switch
    });
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
        defaultViewIndex,
        ...restOptions
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        defaultViewIndex  : initialViewIndex,
        viewIndex         : controlledViewIndex,
        onViewIndexChange : handleViewIndexChange,
        ...restProps
    } = props;
    
    
    
    // States and flags:
    
    // Transition orchestration:
    return useUncontrollableInteractionState<
        number,
        number,
        
        ViewStateProps,
        ViewStateOptions,
        ViewBehaviorStateDefinition,
        
        TChangeEvent
    >(
        // Props:
        { defaultState: initialViewIndex, state: controlledViewIndex, onStateChange: handleViewIndexChange, ...restProps },
        
        // Options:
        { defaultState: defaultViewIndex, ...restOptions },
        
        // Definition:
        {
            defaultInitialState        : defaultInitialViewIndex,
            useResolveEffectiveState   : useResolveEffectiveViewState,        // Resolves effective state.
        } satisfies Pick<ViewBehaviorStateDefinition, 'defaultInitialState' | 'useResolveEffectiveState'>,
    ) satisfies [number, ValueChangeDispatcher<number, TChangeEvent>];
};
