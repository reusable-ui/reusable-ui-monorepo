'use client' // The exported `useFocusObserver()` hook is client side only.

// React:
import {
    // Types:
    type FocusEvent,
    type FocusEventHandler,
    type KeyboardEvent,
    type KeyboardEventHandler,
    
    
    
    // Hooks:
    useLayoutEffect,
    useRef,
    useState,
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
 * @param disabledUpdates - Whether to disable internal focus state updates (e.g. when externally controlled).
 * @param isRestricted - Whether the component is currently in a restricted state; enforces a blur override.
 * @returns The observed focus state, ref, and event handlers.
 */
export const useFocusObserver = <TElement extends Element = HTMLElement>(disabledUpdates: boolean, isRestricted: boolean): FocusObserverState<TElement> => {
    // States and flags:
    
    // Ref to the focusable DOM element:
    const focusableElementRef = useRef<TElement | null>(null);
    
    // Internal fallback for observed focus (used only when uncontrolled):
    const [observedFocus, setObservedFocus] = useState<boolean>(false);
    
    
    
    /**
     * Updates the internal focus state.
     * 
     * - If `disabledUpdates` is true, the update will be skipped.
     * - If the element is focused, it must also match `focusVisibleWithinSelector` to be considered visibly focused.
     * - If the new state matches the current `observedFocus`, no update will occur.
     * 
     * @param focusableElement - The DOM element whose focus state is being updated.
     * @param newObservedFocus - The desired focus state.
     */
    const handleFocusStateUpdate : (focusableElement: TElement | null, newObservedFocus: boolean) => void = useStableCallback((focusableElement, newObservedFocus) => {
        // Skip if observer updates are disabled (controlled mode):
        if (disabledUpdates) return;
        
        // Skip update if no element to observe:
        if (!focusableElement) return;
        
        // If focused, verify visible focus:
        if (newObservedFocus) {
            newObservedFocus = focusableElement.matches(focusVisibleWithinSelector);
        } // if
        
        // Skip update if state is unchanged:
        if (newObservedFocus === observedFocus) return;
        
        
        
        // Commit focus state update:
        setObservedFocus(newObservedFocus);
    });
    
    
    
    // Focus state refresh effect:
    // Ensures the internal focus state is synchronized when:
    // - The observer switches back to uncontrolled mode (`disabledUpdates` becomes false).
    // - The component transitions between restricted and unrestricted (`isRestricted` changes).
    //
    // For discrete focus behavior, past focus actions are ignored:
    // - Disabling always forces the state to blurred (`false`), even if no native `blur` event fires.
    // - Re-enabling or switching back to uncontrolled also resets to blurred (`false`),
    //   requiring a fresh user interaction to set focus again.
    //
    // Using `useLayoutEffect()` ensures the update runs before the browser paints,
    // preventing potential visual glitches if the element was focused at mount or
    // during a restricted/unrestricted transition.
    useLayoutEffect(() => {
        // Skip if observer updates are disabled (controlled mode):
        if (disabledUpdates) return;
        
        
        
        // Always force blurred (`false`) when restricted or re-unrestricted:
        handleFocusStateUpdate(focusableElementRef.current, false);
    }, [disabledUpdates, isRestricted]);
    // Re-evaluates focus state only when `disabledUpdates` or `isRestricted` changes.
    // `handleFocusStateUpdate` is stable via useStableCallback, so it is safe to omit from deps.
    
    
    
    // Imperative handlers for uncontrolled focus tracking:
    const handleFocus   = useStableCallback((event: FocusEvent<TElement, Element> | KeyboardEvent<TElement>) => {
        handleFocusStateUpdate(event.currentTarget, true);
    });
    const handleBlur    : FocusEventHandler<TElement> = useStableCallback((event) => {
        handleFocusStateUpdate(event.currentTarget, false);
    });
    const handleKeyDown : KeyboardEventHandler<TElement> = useStableCallback((event) => {
        // Ignore if observer updates are disabled (controlled mode):
        if (disabledUpdates) return;
        
        // Ignore if the focus is going to move away via Tab key and not prevented:
        if (event.key === 'Tab' && !event.defaultPrevented) return;
        
        // Delegate to the focus handler to ensure consistent logic:
        handleFocus(event);
    });
    
    
    
    // Return the internal focus state API:
    return {
        observedFocus,
        ref : focusableElementRef,
        handleFocus,
        handleBlur,
        handleKeyDown,
    } satisfies FocusObserverState<TElement>;
};
