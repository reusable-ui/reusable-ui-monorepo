// Types:
import {
    type FocusStateProps,
    type FocusStateOptions,
    type FocusPhase,
    type FocusClassname,
}                           from './types.js'
import {
    type FocusBehaviorStateDefinition,
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
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for focused/blurred state behavior. */
export const resolveFocusTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, FocusStateProps, FocusStateOptions, FocusBehaviorStateDefinition>): FocusPhase => {
    if (isTransitioning) return settledState ? 'focusing' : 'blurring';
    return settledState ? 'focused' : 'blurred';
};

/**
 * Resolves the semantic transition classname for focused/blurred state behavior.
 * 
 * If `inputLikeFocus` is enabled, appends `'input-like-focus'` to signal input-style focus ring behavior.
 */
export const resolveFocusTransitionClassname = ({ transitionPhase, options }: ResolveTransitionClassnameArgs<boolean, FocusPhase, FocusStateProps, FocusStateOptions, FocusBehaviorStateDefinition>): FocusClassname => {
    // Extract options and assign defaults:
    const {
        inputLikeFocus = defaultInputLikeFocus,
    } = options ?? {};
    
    
    
    if (inputLikeFocus) return `is-${transitionPhase} input-like-focus`;
    return `is-${transitionPhase}`;
};
