'use client' // The exported `usePressObserver()` hook is client side only.

// React:
import {
    // Types:
    type PointerEventHandler,
    type KeyboardEventHandler,
    
    
    
    // Hooks:
    useLayoutEffect,
    useRef,
    useState,
}                           from 'react'

// Types:
import {
    type PressStateOptions,
    type PressBehaviorState,
}                           from './types.js'

// Defaults:
import {
    defaultPressKeys,
    defaultClickKeys,
    defaultTriggerClickOnKeyUp,
}                           from './internal-defaults.js'

// Utilities:
import {
    matchesKey,
}                           from './internal-utilities.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.



/**
 * A selector used to detect whether an element or any of its descendants
 * are currently pressed for styling purposes.
 * 
 * This includes:
 * - Native `:active` matches
 * - No need descendant matches via `:has(...)` as nested press is inherently handled by `:active`
 */
const pressWithinSelector = ':active';



/**
 * An observed press state for uncontrolled components.
 * 
 * Provides a ref to the pressable element and imperative pointerdown/pointerup/pointercancel handlers
 * for tracking press presence when not explicitly controlled.
 * 
 * Includes fallback detection for pre-existing press on mount,
 * ensuring lifecycle consistency during hydration or layout delay.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface PressObserverState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Pick<PressBehaviorState<TElement>, 'ref' | 'handlePointerDown' | 'handlePointerUp' | 'handlePointerCancel' | 'handleKeyDown' | 'handleKeyUp'>
{
    /**
     * Observed press presence.
     * 
     * Reflects whether the element is currently pressed, based on event handlers
     * and initial mount detection (e.g. pointer resting or layout overflow).
     * Used only when the component is uncontrolled and not externally delegated.
     */
    observedPress: boolean
}

/**
 * Observes press state in uncontrolled scenarios.
 * 
 * Detects initial press on mount and updates internal state via
 * imperative pointerdown/pointerup/pointercancel handlers. Skips updates when externally controlled.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param disabledUpdates - Whether to disable internal press state updates (e.g. when externally controlled).
 * @returns The observed press state, ref, and event handlers.
 */
export const usePressObserver = <TElement extends Element = HTMLElement>(disabledUpdates: boolean, options: Pick<PressStateOptions, 'pressKeys' | 'clickKeys' | 'triggerClickOnKeyUp'> | undefined): PressObserverState<TElement> => {
    // Extract options and assign defaults:
    const {
        pressKeys           = defaultPressKeys,
        clickKeys           = defaultClickKeys,
        triggerClickOnKeyUp = defaultTriggerClickOnKeyUp,
    } = options ?? {};
    
    
    
    // States and flags:
    
    // Ref to the pressable DOM element:
    const pressableElementRef = useRef<TElement | null>(null);
    
    // Internal fallback for observed press (used only when uncontrolled):
    const [observedPress, setObservedPress] = useState<boolean>(false);
    
    // Internal memory for tracking currently pressed keys:
    const pressedKeysRef = useRef<Set<string> | undefined>(undefined);
    if (pressedKeysRef.current === undefined) pressedKeysRef.current = new Set<string>();
    const pressedKeys = pressedKeysRef.current;
    
    
    
    /**
     * Updates the internal press state based on the current press state of the given element.
     * 
     * - If `disabledUpdates` is true, the update will be skipped.
     * - If `newObservedPress` is not provided, it will be auto-detected using `.matches(pressWithinSelector)`.
     * - If the new state matches the current `observedPress`, no update will occur.
     * 
     * @param pressableElement - The DOM element to observe for press state.
     * @param newObservedPress - Optional override for the detected press state.
     */
    const handlePressStateUpdate : (pressableElement: TElement | null, newObservedPress?: boolean) => void = useStableCallback((pressableElement, newObservedPress) => {
        // Skip update if disabled:
        if (disabledUpdates) return;
        
        // Skip update if no element to observe:
        if (!pressableElement) return;
        
        // Auto-detect press state if not provided:
        newObservedPress ??= pressableElement.matches(pressWithinSelector);
        
        // The code below is redundant as `:press` inherently means the element is `:press-within`,
        // so no additional verification is needed.
        // // If pressed, verify press-within:
        // if (newObservedPress) {
        //     newObservedPress = pressableElement.matches(pressWithinSelector);
        // } // if
        
        // Skip update if state is unchanged:
        if (newObservedPress === observedPress) return;
        
        
        
        // Commit press state update:
        setObservedPress(newObservedPress);
    });
    
    
    
    // Initial mount effect: sync internal state if the element is already pressed on mount.
    // Using `useLayoutEffect()` to ensure the check runs before browser paint,
    // preventing potential visual glitches if the element is already pressed.
    useLayoutEffect(() => {
        handlePressStateUpdate(pressableElementRef.current);
    }, [disabledUpdates]);
    // Re-evaluate press state only when `disabledUpdates` changes.
    // `handlePressStateUpdate` is stable via useStableCallback, so it's safe to omit from deps.
    
    
    
    // Imperative handlers for uncontrolled press tracking:
    const handlePointerDown   : PointerEventHandler<TElement> = useStableCallback((event) => {
        handlePressStateUpdate(event.currentTarget, true);
    });
    const handlePointerUp     : PointerEventHandler<TElement> = useStableCallback((event) => {
        handlePressStateUpdate(event.currentTarget, false);
    });
    const handlePointerCancel : PointerEventHandler<TElement> = handlePointerUp; // Currently, pointercancel has the same effect as pointerup.
    
    const handleKeyDown       : KeyboardEventHandler<TElement> = useStableCallback((event) => {
        // Get the pressed key for matching the configured keys:
        const keyCode = event.code;
        
        // Defensive check: although `event.code` is typed as a string,
        // some browsers may emit key events with `undefined` code during autocomplete or IME composition.
        // Exit early to avoid matching against an invalid or missing key.
        if (keyCode === undefined) return;
        
        
        
        //#region Keyboard click on press behavior
        // Trigger synthetic click for keys in `clickKeys`:
        const pressableElement = event.currentTarget;
        if ((pressableElement instanceof HTMLElement) && matchesKey(keyCode, clickKeys)) {
            event.preventDefault(); // The key is handled, prevent default browser behavior (e.g. form submission, scroll).
            
            // Dispatch a synthetic click event:
            pressableElement.click();
            
            /**
             * This combination of `.preventDefault()` and `.click()` ensures consistent behavior across browsers:
             * 
             * - For native submit buttons inside forms, form submission still occurs once as expected.
             *   The manual `.click()` replaces the browser's native activation, avoiding double submission.
             * 
             * - For custom buttons (e.g. styled `<div>`), the synthetic click mimics native behavior,
             *   triggering associated click handlers without unintended side effects like scroll or focus shifts.
             */
        } // if
        //#endregion Keyboard click on press behavior
        
        
        
        //#region Keyboard press tracking
        // Track press state for keys in `pressKeys`:
        if (!matchesKey(keyCode, pressKeys)) return; // Early exit if the key is not in `pressKeys`.
        pressedKeys.add(keyCode);
        event.preventDefault(); // The key is handled, prevent default browser behavior (e.g. form submission, scroll).
        //#endregion Keyboard press tracking
        
        
        
        handlePressStateUpdate(event.currentTarget, true);
    });
    const handleKeyUp         : KeyboardEventHandler<TElement> = useStableCallback((event) => {
        // Get the pressed key for matching the configured keys:
        const keyCode = event.code;
        
        // Defensive check: although `event.code` is typed as a string,
        // some browsers may emit key events with `undefined` code during autocomplete or IME composition.
        // Exit early to avoid matching against an invalid or missing key.
        if (keyCode === undefined) return;
        
        
        
        //#region Keyboard press tracking
        // Untrack release state for keys in `pressKeys`:
        if (!matchesKey(keyCode, pressKeys)) return; // Early exit if the key is not in `pressKeys`.
        pressedKeys.delete(keyCode);
        
        
        
        // If other keys are still pressed, keep press state active:
        if (pressedKeys.size !== 0) return;
        //#endregion Keyboard press tracking
        
        
        
        //#region Keyboard click on release behavior
        // Trigger synthetic click on keyup if configured:
        if (!triggerClickOnKeyUp) return;
        const pressableElement = event.currentTarget;
        if (pressableElement instanceof HTMLElement) {
            pressableElement.click();
        } // if
        //#endregion Keyboard click on release behavior
        
        
        
        handlePressStateUpdate(event.currentTarget, false);
    });
    
    
    
    // Return the internal press state API:
    return {
        observedPress,
        ref : pressableElementRef,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } satisfies PressObserverState<TElement>;
};
