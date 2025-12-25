// Types:
import {
    type PressStateProps,
    type PressStateOptions,
    type PressPhase,
    type PressClassname,
}                           from './types.js'
import {
    type PressBehaviorStateDefinition,
}                           from './internal-types.js'

// Reusable-ui states:
import {
    // Types:
    type ResolveTransitionPhaseArgs,
    type ResolveTransitionClassnameArgs,
}                           from '@reusable-ui/feedback-state'      // Lifecycle-aware feedback state for React, offering reusable hooks for focus, hover, press, and validity.



/** Resolves the semantic transition phase for pressed/released state behavior. */
export const resolvePressTransitionPhase = ({ settledState, isTransitioning }: ResolveTransitionPhaseArgs<boolean, PressStateProps, PressStateOptions, PressBehaviorStateDefinition>): PressPhase => {
    if (isTransitioning) return settledState ? 'pressing' : 'releasing';
    return settledState ? 'pressed' : 'released';
};

/** Resolves the semantic transition classname for pressed/released state behavior. */
export const resolvePressTransitionClassname = ({ transitionPhase }: ResolveTransitionClassnameArgs<boolean, PressPhase, PressStateProps, PressStateOptions, PressBehaviorStateDefinition>): PressClassname => {
    return `is-${transitionPhase}`;
};



/**
 * Determines whether the given keyCode matches the expected keyCode(s).
 * 
 * @param actualKey - The keyCode received from a keyboard event (e.g. `event.code`)
 * @param expectedKeys - A string or array of strings representing the keyCode(s) to match against
 * @returns `true` if the actual keyCode matches any of the expected keyCode(s); otherwise `false`
 */
export const matchesKey = (actualKey: string | undefined, expectedKeys: string | string[] | null): boolean => {
    if (actualKey === undefined) return false;
    if (expectedKeys === null) return false;
    
    
    
    if (typeof expectedKeys === 'string') return actualKey === expectedKeys;
    return expectedKeys.includes(actualKey);
};

/**
 * Determines whether the given pointer button matches the expected button(s).
 * 
 * @param actualButton - The button value received from a pointer event (e.g. `event.button`)
 * @param expectedButtons - A number or array of numbers representing the buttons to match against
 * @returns `true` if the actual button matches any of the expected buttons; otherwise `false`
 */
export const matchesButton = (actualButton: number, expectedButtons: number | number[] | null): boolean => {
    // Validate parameters:
    if (expectedButtons === null) return false;
    
    
    
    // Test matches:
    if (Array.isArray(expectedButtons)) return expectedButtons.includes(actualButton);
    return (actualButton === expectedButtons);
};
