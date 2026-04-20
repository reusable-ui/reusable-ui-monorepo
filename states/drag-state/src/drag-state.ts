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
    type DragStateUpdateProps,
    type DragStatePhaseEventProps,
    type DragStateOptions,
    type DragPhase,
    type DragClassname,
    type DragBehaviorState,
}                           from './types.js'
import {
    type DragBehaviorStateDefinition,
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
}                           from './internal-utilities.js'

// CSS Variables:
import {
    dragStateVars,
}                           from './css-variables.js'

// Hooks:
import {
    useDragObserverState,
}                           from './drag-observer.js'

// Reusable-ui states:
import {
    // Types:
    type ObservableStateDefinition,
    
    
    
    // Hooks:
    useObservableState,
}                           from '@reusable-ui/effective-state'     // Reusable resolvers for deriving effective state from props, with optional behaviors like range clamping, context cascading, and external observation.
import {
    // Hooks:
    useFeedbackBehaviorState,
    useFeedbackStatePhaseEvents,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, drag, and validity.
import {
    useDisabledState,
}                           from '@reusable-ui/disabled-state'      // Adds enable/disable functionality to UI components, with transition animations and semantic styling hooks.



/** The observable state definition for drag/drop state management. */
const observableStateDefinition : ObservableStateDefinition<boolean, 'auto'> = {
    defaultState         : defaultDeclarativeDragged,
    inactiveState        : false, // `false`: the value of un-drag state
    observableStateToken : 'auto',
};

/**
 * Resolves the current dragged/dropped state for a fully controlled component.
 * 
 * This hook is intended for components that **consume** the resolved `dragged` state and **forward** it to a base component.
 * 
 * Unlike `useDragBehaviorState()`, which handles animation and lifecycle,
 * `useDragState()` performs a lightweight resolution of the effective drag value.
 * 
 * - No internal state or uncontrolled fallback.
 * - `'auto'` is treated as a declarative diagnostic mode.
 * - Ideal for components that **consume** the resolved `dragged` state.
 * 
 * @param props - The component props that may include a controlled `dragged` value and derived `computedDrag` value.
 * @param options - An optional configuration for customizing drag/drop behavior.
 * @returns The resolved dragged/dropped state.
 */
export const useDragState = (props: DragStateProps, options?: Pick<DragStateOptions, 'defaultDragged' | 'fallbackDragged'>) : boolean => {
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
    const isRestricted         = useDisabledState(props as Parameters<typeof useDisabledState>[0]);
    
    // Resolve effective dragged state:
    // - Collapses to `false` (dropped) if restricted.
    // - Otherwise resolved via observable state definition.
    return useObservableState<boolean, 'auto'>(
        // Props:
        { state, isRestricted, observedState },
        
        // Options:
        { defaultState },
        
        // Definition:
        observableStateDefinition,
    );
};



/** The behavior state definition for drag/drop state management. */
const dragBehaviorStateDefinition : DragBehaviorStateDefinition = {
    // Behavior definitions:
    defaultAnimationPattern    : ['dragging', 'dropping'],       // Matches animation names for transitions.
    defaultAnimationBubbling   : false,
    resolveTransitionPhase     : resolveDragTransitionPhase,     // Resolves phases.
    resolveTransitionClassname : resolveDragTransitionClassname, // Resolves classnames.
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
 * @returns The resolved dragged/dropped state, current transition phase, associated CSS class name, and animation event handlers.
 * 
 * @example
 * ```tsx
 * import React, { FC, useEffect } from 'react';
 * import {
 *     useDragBehaviorState,
 *     DragStateProps,
 *     DragStateUpdateProps,
 * } from '@reusable-ui/drag-state';
 * import {
 *     usePressBehaviorState,
 * } from '@reusable-ui/press-state';
 * import styles from './DraggableOption.module.css';
 * 
 * export interface CustomButtonProps extends
 *     DragStateProps,
 *     DragStateUpdateProps // optional update reporting behavior
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
 *     const { actualPressed } = usePressBehaviorState(...);
 *     // const actualPressed = usePressState(...); // Alternatively use `usePressState(...)`
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
 *         relativeDragOffset,
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
 *     } = useDragBehaviorState({
 *         computedDrag,
 *         ...restProps,
 *     }, {
 *         defaultDragged    : 'auto',                   // Defaults to diagnostic mode.
 *         animationPattern  : ['dragging', 'dropping'], // Matches animation names ending with 'dragging' or 'dropping'.
 *         animationBubbling : false,                    // Ignores bubbling animation events from children.
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
export const useDragBehaviorState = <TElement extends Element = HTMLElement>(props: DragStateProps & DragStateUpdateProps, options?: DragStateOptions): DragBehaviorState<TElement> => {
    // Extract props:
    const {
        onDragUpdate : onStateUpdate,
        // ...restProps // Not needed the rest since all resolvers in the definition are *not* dependent of the props.
    } = props;
    
    
    
    // States and flags:
    
    // Resolve effective drag state:
    const effectiveState = useDragState(props, options);
    
    // Transition orchestration:
    const {
        prevSettledState    : _prevSettledState, // unused in this domain
        state               : dragged,
        actualState         : actualDragged,
        transitionPhase     : dragPhase,
        transitionClassname : dragClassname,
        ...animationHandlers
    } = useFeedbackBehaviorState<
        boolean,
        DragPhase,
        DragClassname,
        
        DragStateProps,
        DragStateOptions,
        DragBehaviorStateDefinition,
        
        TElement
    >(
        // Props:
        { effectiveState, onStateUpdate, /* ...restProps */ },
        
        // Options:
        options,
        
        // Definition:
        dragBehaviorStateDefinition,
    );
    
    
    
    // Internal drag observer for tracking relative cursor offset during an active drag:
    // - Enabled when `dragged` is true.
    // - Use `dragged` instead of `actualDragged` because `dragged` correlates with `dragClassname`
    // which drives the animations based on the relative offset.
    const {
        relativeDragOffset,
        handlePointerDown,
        handlePointerMove,
    } = useDragObserverState<TElement>({
        isDragActive : dragged,
    });
    
    
    
    // Compute inline CSS variables for exposing the current drag offsets:
    const {
        x : relativeDragOffsetX,
        y : relativeDragOffsetY,
    } = relativeDragOffset;
    const dragStyle = useMemo<CSSProperties>(() => ({
        [
            dragStateVars.relativeDragOffsetX
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(relativeDragOffsetX),
        
        [
            dragStateVars.relativeDragOffsetY
            .slice(4, -1) // fix: var(--customProp) => --customProp
        ]: String(relativeDragOffsetY),
    }), [dragStateVars.relativeDragOffsetX, dragStateVars.relativeDragOffsetY, relativeDragOffsetX, relativeDragOffsetY]);
    
    
    
    // Return resolved drag state API:
    return {
        dragged,
        relativeDragOffset,
        actualDragged,
        dragPhase,
        dragClassname,
        dragStyle,
        ...animationHandlers,
        handlePointerDown,
        handlePointerMove,
    } satisfies DragBehaviorState<TElement>;
};



/**
 * Emits lifecycle events in response to drag/drop phase transitions.
 * 
 * This hook observes the resolved `dragPhase` from `useDragBehaviorState()` and triggers
 * the appropriate callbacks defined in `DragStatePhaseEventProps`, such as:
 * 
 * - `onDraggingStart`
 * - `onDraggingEnd`
 * - `onDroppingStart`
 * - `onDroppingEnd`
 * 
 * @param {DragStatePhaseEventProps} props - The component props that may include phase-specific lifecycle event handlers.
 * @param {DragPhase} dragPhase - The current phase value returned from `useDragBehaviorState()`.
 */
export const useDragStatePhaseEvents = (props: DragStatePhaseEventProps, dragPhase: DragPhase): void => {
    useFeedbackStatePhaseEvents(dragPhase, (dragPhase: DragPhase): void => {
        switch (dragPhase) {
            case 'dragging' : props.onDraggingStart?.(dragPhase, undefined); break;
            case 'dragged'  : props.onDraggingEnd?.(dragPhase, undefined);   break;
            case 'dropping' : props.onDroppingStart?.(dragPhase, undefined); break;
            case 'dropped'  : props.onDroppingEnd?.(dragPhase, undefined);   break;
        } // switch
    });
};
