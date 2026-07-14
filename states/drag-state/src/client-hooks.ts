'use client' // The exported hooks are client side only.

// React:
import {
    // Types:
    type CSSProperties,
    
    
    
    // Hooks:
    useMemo,
}                           from 'react'

// Types:
import {
    type DragStateProps,
    type DragStateOptions,
    type DragPhase,
    type DragClassname,
    type DragState,
}                           from './types.js'
import {
    type DragStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultDeclarativeDragged,
    defaultFallbackDragged,
}                           from './internal-defaults.js'

// Utilities:
import {
    resolveDragTransitionPhase,
    resolveDragTransitionClassname,
    triggerDragPhaseEvents,
}                           from './internal-utilities.js'

// CSS Variables:
import {
    dragStateVars,
}                           from './css-internal-variables.js'

// Hooks:
import {
    useDragObserverState,
}                           from './internal-drag-observer-client-hook.js'

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
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, drag, and validity.
import {
    useResolvedDisabled,
}                           from '@reusable-ui/disabled-state'      // Adds enabled/disabled functionality to UI components, with transition animations and semantic styling hooks.



/** The observable state definition for drag/drop state management. */
const observableStateDefinition : ObservableStateDefinition<boolean, 'auto'> = {
    defaultState         : defaultDeclarativeDragged,
    inactiveState        : false, // `false`: the value of un-drag state
    observableStateToken : 'auto',
};

/**
 * Resolves the current drag/drop state.
 * 
 * Useful for derived components that need to determine whether the base component is dragged or dropped.
 * 
 * The resolved drag state **should** be forwarded to the base component via the `dragged` prop,
 * allowing the base component to rely on the derived component for drag and drop handling
 * without observing the drag state itself.
 * 
 * Unlike `useDragState()`, which handles animation and lifecycle,
 * `useResolvedDragged()` performs a lightweight resolution of the effective drag value.
 * 
 * - No internal state or uncontrolled fallback.
 * - `'auto'` is treated as a declarative diagnostic mode.
 * - Ideal for components that **consume** the resolved `dragged` state.
 * 
 * @param props - The component props that may include a controlled `dragged` value and derived `computedDrag` value.
 * @param options - An optional configuration for customizing drag/drop behavior.
 * @returns The resolved drag/drop state.
 */
export const useResolvedDragged = (props: Pick<DragStateProps, 'dragged' | 'computedDrag'>, options?: Pick<DragStateOptions, 'defaultDragged' | 'fallbackDragged'>) : boolean => {
    // Extract options:
    const {
        defaultDragged  : defaultState,
        fallbackDragged = defaultFallbackDragged,
    } = options ?? {};
    
    
    
    // Extract props and assign defaults:
    const {
        dragged      : state         = defaultDeclarativeDragged,
        computedDrag : observedState = fallbackDragged,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve whether the component is in a restricted state (interaction blocked):
    const isRestricted         = useResolvedDisabled(props as Parameters<typeof useResolvedDisabled>[0]);
    
    
    
    // Resolve effective drag state:
    // - Collapses to `false` (dropped) if restricted.
    // - Otherwise resolved via observable state definition.
    return useResolvedObservableState<boolean, 'auto'>(
        // Props:
        { state, isRestricted, observedState },
        
        // Options:
        { defaultState },
        
        // Definition:
        observableStateDefinition,
    );
};



/** The behavior state definition for drag/drop state management. */
const dragStateDefinition : DragStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : ['dragging', 'dropping'],       // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveDragTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolveDragTransitionClassname, // Resolves classnames.
    triggerTransitionEvent     : triggerDragPhaseEvents,         // Triggers lifecycle events.
};

/**
 * Resolves the drag state, current transition phase, associated CSS class name, and animation event handlers
 * based on component props, optional default configuration, and animation lifecycle.
 * 
 * - Supports controlled drag state, when `dragged` is set to `true` or `false`.
 * - Supports diagnostic mode, when `dragged` is set to `'auto'`, which derives the effective drag from `computedDrag`.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The component props that may include a controlled `dragged` value, derived `computedDrag` value, and `onDragUpdate` callback.
 * @param options - An optional configuration for customizing drag/drop behavior and animation lifecycle.
 * @returns The resolved drag/drop state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, useEffect } from 'react';
 * import {
 *     useDragState,
 *     DragStateProps,
 * } from '@reusable-ui/drag-state';
 * import {
 *     usePressState,
 * } from '@reusable-ui/press-state';
 * import styles from './DraggableOption.module.css';
 * 
 * export interface CustomButtonProps extends
 *     DragStateProps
 * {}
 * 
 * // A draggable option component with custom drag logic.
 * export const DraggableOption: FC<CustomButtonProps> = (props) => {
 *     const {
 *         // Allows derived components to override the internal drag logic:
 *         computedDrag : externalComputedDrag,
 *         
 *         ...restProps
 *     } = props;
 *     
 *     // Supply `computedDrag` from press-state or external override:
 *     const { actualPressed } = usePressState(...);
 *     // const actualPressed = useResolvedPressed(...); // Alternatively use `useResolvedPressed(...)`
 *     const internalComputedDrag = actualPressed;
 *     const isExternallyComputed = (externalComputedDrag !== undefined);
 *     const computedDrag         = isExternallyComputed ? externalComputedDrag : internalComputedDrag;
 *     
 *     useEffect(() => {
 *         if (isExternallyComputed) return;
 *         
 *         // Perform internal drag logic here:
 *         // setInternalComputedDrag(true);
 *     }, [isExternallyComputed]);
 *     
 *     const {
 *         dragged,
 *         dragOffset,
 *         actualDragged,
 *         dragPhase,
 *         dragClassname,
 *         dragStyle,
 *         
 *         handleAnimationStart,
 *         handleAnimationEnd,
 *         handleAnimationCancel,
 *         handlePointerDown,
 *         handlePointerMove,
 *     } = useDragState({
 *         computedDrag,
 *         ...restProps,
 *     }, {
 *         defaultDragged    : 'auto',                   // Defaults to diagnostic mode.
 *         animationPattern  : ['dragging', 'dropping'], // Matches animation names ending with 'dragging' or 'dropping'.
 *         bubblingAnimation : false,                    // Ignores bubbling animation events from children.
 *     });
 *     
 *     return (
 *         <div
 *             className={`${styles.button} ${dragClassname}`}
 *             style={dragStyle}
 *             
 *             onAnimationStart={handleAnimationStart}
 *             onAnimationEnd={handleAnimationEnd}
 *             onPointerDown={handlePointerDown}
 *             onPointerMove={handlePointerMove}
 *         >
 *             <p>Drag this component to somewhere else.</p>
 *             {dragged  && <p className={styles.dragged}>Dragged</p>}
 *             {!dragged && <p className={styles.dropped}>Dropped</p>}
 *         </div>
 *     );
 * };
 * ```
 */
export const useDragState = <TElement extends Element = HTMLElement>(props: DragStateProps, options?: DragStateOptions): DragState<TElement> => {
    // Extract props:
    const {
        onDragUpdate : onStateUpdate,
        
        onDraggingStart,
        onDraggingEnd,
        onDroppingStart,
        onDroppingEnd,
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective drag state:
    const effectiveState = useResolvedDragged(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : dragged,
        actualState         : actualDragged,
        transitionPhase     : dragPhase,
        transitionClassname : dragClassname,
        ...animationHandlers
    } = useFeedbackState<
        boolean,
        DragPhase,
        DragClassname,
        
        DragStateProps,
        DragStateOptions,
        DragStateDefinition,
        
        TElement
    >(
        // Props:
        {
            effectiveState,
            onStateUpdate,
            
            ...({
                onDraggingStart,
                onDraggingEnd,
                onDroppingStart,
                onDroppingEnd,
            } as {}),
        },
        
        // Options:
        options,
        
        // Definition:
        dragStateDefinition,
    );
    
    
    
    // Internal drag observer for tracking relative cursor offset during an active drag:
    // - Enabled when `dragged` is true.
    // - Use `dragged` instead of `actualDragged` because `dragged` correlates with `dragClassname`
    // which drives the animations based on the relative offset.
    const {
        dragOffset,
        handlePointerDown,
        handlePointerMove,
    } = useDragObserverState<TElement>({
        isDragActive : dragged,
    });
    
    
    
    // Compute inline CSS variables for exposing the current drag offsets:
    const {
        x : dragOffsetX,
        y : dragOffsetY,
    } = dragOffset;
    const dragStyle = useMemo<CSSProperties>(() => ({
        [
            dragStateVars.dragOffsetX
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(dragOffsetX),
        
        [
            dragStateVars.dragOffsetY
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(dragOffsetY),
    }), [dragStateVars.dragOffsetX, dragStateVars.dragOffsetY, dragOffsetX, dragOffsetY]);
    
    
    
    // Return resolved drag state API:
    return {
        dragged,
        dragOffset,
        actualDragged,
        dragPhase,
        dragClassname,
        dragStyle,
        ...animationHandlers,
        handlePointerDown,
        handlePointerMove,
    } satisfies DragState<TElement>;
};
