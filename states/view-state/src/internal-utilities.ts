// Types:
import {
    type ViewStateProps,
    type ViewStateOptions,
    type ViewPhase,
    type ViewClassname,
}                           from './types.js'
import {
    type ViewBehaviorStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultMinViewIndex,
    defaultMaxViewIndex,
    defaultViewIndexStep,
}                           from './internal-defaults.js'

// Reusable-ui utilities:
import {
    clamp,
}                           from '@reusable-ui/numbers'             // A lightweight JavaScript library for precise numeric operations.

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/interaction-state'   // Lifecycle-aware interaction state for React, providing reusable hooks for collapse, active, view, and selected.



/** Resolves the semantic transition phase for view-switching behavior. */
export const resolveViewTransitionPhase = ({ prevSettledState: prevSettledViewIndex, settledState: settledViewIndex, isTransitioning }: ResolveTransitionPhaseArgs<number, ViewStateProps<unknown>, ViewStateOptions, ViewBehaviorStateDefinition>): ViewPhase => {
    if (isTransitioning && (prevSettledViewIndex !== undefined)) {
        return (
            // Determine the direction of movement (the same index counts as **forward**, which should never happen):
            (settledViewIndex >= prevSettledViewIndex)
            ? 'view-advancing'
            : 'view-receding'
        );
    } // if
    
    
    
    return 'view-settled';
};

/** Resolves the semantic transition classname for view-switching behavior. */
export const resolveViewTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<number, ViewPhase, ViewStateProps<unknown>, ViewStateOptions, ViewBehaviorStateDefinition>): ViewClassname => {
    return transitionPhase;
};

/** Triggers the appropriate lifecycle events for view-switching behavior. */
export const triggerViewPhaseEvents = ({ prevSettledState: prevSettledViewIndex, settledState: settledViewIndex, props, changedTransitionPhase }: TriggerTransitionEventArgs<number, ViewPhase, ViewStateProps<unknown>, ViewStateOptions, ViewBehaviorStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'view-advancing':
            props.onViewAdvancingStart?.(changedTransitionPhase, undefined);
            break;
        
        case 'view-receding':
            props.onViewRecedingStart?.(changedTransitionPhase, undefined);
            break;
        
        case 'view-settled':
            // Emit the corresponding end event:
            // - Determine the direction of movement (the same index counts as **forward**, which should never happen).
            if (prevSettledViewIndex !== undefined) {
                if (settledViewIndex >= prevSettledViewIndex) {
                    props.onViewAdvancingEnd?.(changedTransitionPhase, undefined);
                }
                else {
                    props.onViewRecedingEnd?.(changedTransitionPhase, undefined);
                } // if
            } // if
            break;
    } // switch
};



/**
 * Clamps a raw view index within the configured range and step.
 * 
 * @param rawViewIndex - The raw view index to clamp.
 * @param options - Configuration for clamping behavior.
 * @returns The clamped view index.
 */
export const clampViewIndex = (rawViewIndex: number, options?: Pick<ViewStateOptions, 'minViewIndex' | 'maxViewIndex' | 'viewIndexStep'>): number => {
    // Extract options and assign defaults:
    const {
        minViewIndex  = defaultMinViewIndex,
        maxViewIndex  = defaultMaxViewIndex,
        viewIndexStep = defaultViewIndexStep,
    } = options ?? {};
    
    
    
    // Clamp the value within the range and step:
    return clamp<number>(minViewIndex, rawViewIndex, maxViewIndex, viewIndexStep);
};
