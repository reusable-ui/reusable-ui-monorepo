// Types:
import {
    type FocusStateProps,
    type FocusStateOptions,
    type FocusPhase,
    type FocusClassname,
}                           from './types.js'
import {
    type FocusStateDefinition,
}                           from './internal-types.js'

// Defaults:
import {
    defaultInputLikeFocus,
}                           from './internal-defaults.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
    type TriggerTransitionEventArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for focused/blurred state behavior. */
export const resolveFocusTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, FocusStateProps, FocusStateOptions, FocusStateDefinition>): FocusPhase => {
    if (isTransitioning) return settledState ? 'focusing' : 'blurring';
    return settledState ? 'focused' : 'blurred';
};

/**
 * Resolves the semantic transition classname for focused/blurred state behavior.
 * 
 * If `inputLikeFocus` is enabled, appends `'input-like-focus'` to signal input-style focus ring behavior.
 */
export const resolveFocusTransitionClassname = ({ transitionPhase, options }: ResolveTransitionClassnameArgs<boolean, FocusPhase, FocusStateProps, FocusStateOptions, FocusStateDefinition>): FocusClassname => {
    // Extract options and assign defaults:
    const {
        inputLikeFocus = defaultInputLikeFocus,
    } = options ?? {};
    
    
    
    if (inputLikeFocus) return `is-${transitionPhase} input-like-focus`;
    return `is-${transitionPhase}`;
};

/** Triggers the appropriate lifecycle events for focused/blurred state behavior. */
export const triggerFocusPhaseEvents = ({ props, changedTransitionPhase }: TriggerTransitionEventArgs<boolean, FocusPhase, FocusStateProps, FocusStateOptions, FocusStateDefinition>): void => {
    switch (changedTransitionPhase) {
        case 'focusing' : props.onFocusingStart?.(changedTransitionPhase, undefined); break;
        case 'focused'  : props.onFocusingEnd?.(changedTransitionPhase, undefined);   break;
        case 'blurring' : props.onBlurringStart?.(changedTransitionPhase, undefined); break;
        case 'blurred'  : props.onBlurringEnd?.(changedTransitionPhase, undefined);   break;
    } // switch
};
