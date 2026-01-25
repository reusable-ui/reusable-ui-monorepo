'use client' // The exported `useFocusObserver()` hook is client side only.

// React:
import {
    // Types:
    type FocusEvent,
    type FocusEventHandler,
    type KeyboardEvent,
    type KeyboardEventHandler,
}                           from 'react'

// Types:
import {
    type FocusBehaviorState,
}                           from './types.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.

// Reusable-ui states:
import {
    useObserverState,
    type ObserverProps,
    type ObserverDefinition,
}                           from '@reusable-ui/observer-state'      // Observes a specific condition (typically a DOM interaction) and emits a resolved state whenever that condition changes.



/**
 * A selector used to detect whether an element or any of its descendants
 * are currently visibly focused for styling purposes.
 * 
 * This includes:
 * - Native `:focus-visible` matches
 * - Polyfilled input-like focus via `.input-like-focus:focus`
 * - Descendant matches via `:has(...)`, mimicking `:focus-within`
 */
const focusVisibleWithinSelector = ':is(:focus-visible, .input-like-focus:focus, :has(:focus-visible, .input-like-focus:focus))';

// Define how the focus observer should behave:
// - This is not a raw "isFocused" check, but a *focus indicator* observer.
// - Inputs/textareas always show focus indicators.
// - Other elements (like buttons) only show focus indicators when keyboard navigation is detected.
const focusObserverDefinition : ObserverDefinition<boolean, Element> = {
    inactiveState       : false,      // The default state when not focused.
    restrictionBehavior : 'discrete', // State resets when restriction is lifted.
    getCurrentState     : (element) => element.matches(focusVisibleWithinSelector),
};



/**
 * Props for the `useFocusObserverState()` hook.
 * 
 * Describes the current component condition for focus observation.
 */
export interface FocusObserverProps
    extends
        // Bases:
        ObserverProps
{
    /* no additional props yet - reserved for future extensions */
}

/**
 * An observed focus state for uncontrolled components.
 * 
 * Provides a ref to the focusable element and imperative focus/blur/keydown handlers
 * for tracking focus presence when not explicitly controlled.
 * 
 * Includes fallback detection for pre-existing focus on mount,
 * ensuring lifecycle consistency during hydration or silent autofocus.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface FocusObserverState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Pick<FocusBehaviorState<TElement>, 'ref' | 'handleFocus' | 'handleBlur' | 'handleKeyDown'>
{
    /**
     * Observed focus presence.
     * 
     * Reflects whether the element is currently focused, based on event handlers
     * and initial mount detection (e.g. autoFocus or preserved focus).
     * Used only when the component is uncontrolled and not externally delegated.
     */
    observedFocus: boolean
}

/**
 * Observes focus state in uncontrolled scenarios.
 * 
 * Detects initial focus on mount and updates internal state via
 * imperative focus/blur/keydown handlers. Skips updates when externally controlled.
 * 
 * Restricted behavior:
 * - When restricted, the observer forces the focus state to blurred (`false`),
 *   since restricted elements cannot be focused.
 * - When re-enabled, remains blurred until the user explicitly refocuses.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The focus observer props for describing the current component condition.
 * @returns The observed focus state, ref, and event handlers.
 */
export const useFocusObserverState = <TElement extends Element = HTMLElement>(props: FocusObserverProps): FocusObserverState<TElement> => {
    // Use the generic observer state hook with focus-specific definition:
    const {
        elementRef,
        observedState,
        safeUpdateState,
    } = useObserverState<boolean, TElement>(props, undefined, focusObserverDefinition);
    
    
    
    // Event handlers:
    
    // Marks focus indicator as active when element gains focus:
    const handleFocus   = useStableCallback((event: FocusEvent<TElement, Element> | KeyboardEvent<TElement>) => {
        safeUpdateState(event.currentTarget, undefined); // Use `undefined` to probe focus-visible state.
    });
    
    // Mark focus indicator as inactive when element loses focus:
    const handleBlur    : FocusEventHandler<TElement> = useStableCallback((event) => {
        safeUpdateState(event.currentTarget, false);
    });
    
    // Detect keyboard navigation:
    //   For non-heavy-input elements (like buttons), focus indicators should only appear
    //   if keyboard input is detected. This handler ensures that pressing keys other than Tab
    //   can activate the focus indicator.
    const handleKeyDown : KeyboardEventHandler<TElement> = useStableCallback((event) => {
        // Skip if externally controlled:
        if (props.isControlled) return;
        
        // Let browser handle Tab focus:
        if ((event.key === 'Tab') && !event.defaultPrevented) return;
        
        
        
        // Activate focus indicator on other key presses:
        safeUpdateState(event.currentTarget, true);
    });
    
    
    
    // Return the observed focus indicator state and handlers for integration:
    return {
        observedFocus : observedState,
        ref           : elementRef,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } satisfies FocusObserverState<TElement>;
};
