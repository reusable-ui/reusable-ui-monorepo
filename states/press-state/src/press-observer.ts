'use client' // The exported `usePressObserver()` hook is client side only.

// React:
import {
    // Types:
    type PointerEventHandler,
    type KeyboardEventHandler,
    
    
    
    // Hooks:
    useLayoutEffect,
    useState,
    useRef,
    useEffect,
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
    
    defaultPressButtons,
    defaultPressPressure,
    defaultPressFingers,
    
    defaultNoGlobalPointerRelease,
    defaultNoGlobalKeyRelease,
}                           from './internal-defaults.js'

// Utilities:
import {
    matchesKey,
}                           from './internal-utilities.js'
import {
    usePointerPressTracker,
}                           from './pointer-press-tracker.js'
import {
    useKeyPressTracker,
}                           from './key-press-tracker.js'
import {
    useGlobalPointerRelease,
}                           from './global-pointer-release.js'
import {
    useGlobalKeyRelease,
}                           from './global-key-release.js'

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Utilities:
    createSyntheticPointerEvent,
    createSyntheticKeyboardEvent,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.



/**
 * An observed press state for uncontrolled components.
 * 
 * Updates internal state via pointer and keyboard handlers. Skips updates when externally controlled.
 * 
 * Includes fallback detection for pre-existing press on mount,
 * ensuring lifecycle consistency during hydration or layout delay.
 * 
 * @template TElement - The type of the target DOM element.
 */
export interface PressObserverState<TElement extends Element = HTMLElement>
    extends
        // Bases:
        Pick<PressBehaviorState<TElement>, 'handlePointerDown' | 'handlePointerUp' | 'handlePointerCancel' | 'handleKeyDown' | 'handleKeyUp'>
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
 * Updates internal state via pointer and keyboard handlers. Skips updates when externally controlled.
 * 
 * Disabled behavior:
 * - When disabled, the observer forces the press state to released (`false`),
 *   since disabled elements cannot be pressed.
 * - When re-enabled, remains released until the user explicitly re-presses.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param disabledUpdates - Whether to disable internal press state updates (e.g. when externally controlled).
 * @param isDisabled - Whether the component is currently disabled; used to enforce release override.
 * @param options - Configuration for press resolution (keys, buttons, pressure, fingers, global release behavior).
 * @returns The observed press state and event handlers.
 */
export const usePressObserver = <TElement extends Element = HTMLElement>(disabledUpdates: boolean, isDisabled: boolean, options: Pick<PressStateOptions, 'pressKeys' | 'clickKeys' | 'triggerClickOnKeyUp' | 'pressButtons' | 'pressPressure' | 'pressFingers' | 'noGlobalPointerRelease' | 'noGlobalKeyRelease'> | undefined): PressObserverState<TElement> => {
    // Extract options and assign defaults:
    const {
        pressKeys              = defaultPressKeys,
        clickKeys              = defaultClickKeys,
        triggerClickOnKeyUp    = defaultTriggerClickOnKeyUp,
        
        pressButtons           = defaultPressButtons,
        pressPressure          = defaultPressPressure,
        pressFingers           = defaultPressFingers,
        
        noGlobalPointerRelease = defaultNoGlobalPointerRelease,
        noGlobalKeyRelease     = defaultNoGlobalKeyRelease,
    } = options ?? {};
    
    
    
    // States and flags:
    
    // Internal fallback for observed press (used only when uncontrolled):
    const [observedPress, setObservedPress] = useState<boolean>(false);
    
    // PointerPress tracker for determining pressed state by pointers:
    const pointerPressTracker = usePointerPressTracker(pressButtons, pressPressure, pressFingers);
    
    // KeyPress tracker for determining pressed state by keys:
    const keyPressTracker     = useKeyPressTracker(pressKeys);
    
    // Tracks the pending release timeout:
    const timeoutRef          = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    
    
    /**
     * Updates the internal press state.
     * 
     * - If `disabledUpdates` is true, the update will be skipped.
     * - If the new state matches the current `observedPress`, no update will occur.
     * 
     * @param newObservedPress - The desired press state.
     */
    const handlePressStateUpdate : (newObservedPress: boolean) => void = useStableCallback((newObservedPress) => {
        // Skip update if disabled:
        if (disabledUpdates) return;
        
        // Skip update if state is unchanged:
        if (newObservedPress === observedPress) return;
        
        
        
        // Commit press state update:
        if (newObservedPress) {
            setObservedPress(true);
        }
        else {
            /**
             * Defers the press release update with a *single* macrotask tick.
             * 
             * Why:
             * - Ensures the release runs *after* the click event, so the user has a chance to flip `pressed={true|false}`,
             *   before the press observer commits a release.
             * 
             * How:
             * - The timeout is cancelled in `useLayoutEffect` when `disabledUpdates` flips,
             *   preventing unwanted release flicker.
             * - Cancellation must happen in `useLayoutEffect` (not `useEffect`),
             *   because `useLayoutEffect` run before paint and before the timeout fires.
             */
            timeoutRef.current = setTimeout(() => {
                setObservedPress(false);
            }, 0);
        } // if
    });
    
    
    
    // Cancels any pending press release update when the press observer is disabled.
    // 
    // Placement matters: this effect must run *before* the subsequent `useLayoutEffect` that refreshes press state,
    // to avoid accidentally clearing a newly scheduled timeout from that refresh (the *wrong kill* scenario).
    //
    // Using `useLayoutEffect()` to ensure the cancellation happens before browser paint,
    // preventing potential visual glitches if the element is already pressed.
    useLayoutEffect(() => {
        // Kills pending press release update when the press observer is disabled:
        if (!disabledUpdates) return; // Enabled => do not kill.
        
        
        
        // Cancel the deferred press release update:
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        } // if
    }, [disabledUpdates]);
    
    
    
    // Press state refresh effect:
    // Ensures the internal press state is synchronized when:
    // - The observer switches back to uncontrolled mode (`disabledUpdates` becomes false).
    // - The component transitions between disabled and enabled (`isDisabled` changes).
    //
    // For discrete press behavior, past press actions are ignored:
    // - Disabling always forces the state to released (`false`), even if no native `pointerup` or `keyup` event fires.
    // - Re-enabling or switching back to uncontrolled also resets to released (`false`),
    //   requiring a fresh user interaction to set press again.
    //
    // Using `useLayoutEffect()` ensures the update runs before the browser paints,
    // preventing potential visual glitches if the element was pressed at mount or
    // during a disable/enable transition.
    useLayoutEffect(() => {
        // Skip if observer updates are disabled (controlled mode):
        if (disabledUpdates) return;
        
        
        
        // Always force released (`false`) when disabled or re-enabled:
        handlePressStateUpdate(false);
    }, [disabledUpdates, isDisabled]);
    // Re-evaluates press state only when `disabledUpdates` or `isDisabled` changes.
    // `handlePressStateUpdate` is stable via useStableCallback, so it is safe to omit from deps.
    
    
    
    // Cleanup on unmount: Cancel any pending press release update.
    // Even with a 0 ms timeout, there is a small chance the callback
    // could fire after the component has been unmounted.
    // Using `useEffect` is sufficient here since this hook only
    // provides cleanup logic (no need for `useLayoutEffect`).
    useEffect(() => {
        return () => {
            // Cancel the deferred press release update:
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            } // if
        };
    }, []);
    
    
    
    // Imperative handlers for uncontrolled press tracking:
    const handlePointerDown    : PointerEventHandler<TElement>  = useStableCallback((event) => {
        // Track pointer press state:
        if (!pointerPressTracker.track(event, true)) return; // Early exit if not successfully tracked.
        
        
        
        handlePressStateUpdate(true);
        
        
        
        // Register global fallback listener to handle premature release outside the component:
        if (!noGlobalPointerRelease) globalPointerReleaseController.register(event.pointerId);
    });
    const handlePointerUp      : PointerEventHandler<TElement>  = useStableCallback((event) => {
        // Untrack pointer press state:
        if (!pointerPressTracker.track(event, false)) return; // Early exit if not fully untracked.
        
        
        
        handlePressStateUpdate(false);
        
        
        
        // Abort global fallback listener — release has already been handled:
        if (!noGlobalPointerRelease) globalPointerReleaseController.abort(); // `abort()` is safe to call multiple times — it’s idempotent and guards against late release callbacks.
    });
    const handlePointerCancel  : PointerEventHandler<TElement>  = handlePointerUp; // Currently, pointercancel has the same effect as pointerup.
    const handlePointerRelease = useStableCallback((event: globalThis.PointerEvent) => {
        // Convert native PointerEvent to a React-compatible synthetic event:
        const syntheticEvent = createSyntheticPointerEvent<TElement, PointerEvent>({
            nativeEvent : event,
        });
        
        // Delegate to the pointercancel handler to ensure consistent release logic:
        handlePointerCancel(syntheticEvent);
    });
    
    const handleKeyDown        : KeyboardEventHandler<TElement> = useStableCallback((event) => {
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
        
        
        
        // Track key press state:
        if (!keyPressTracker.track(keyCode, true)) return; // Early exit if not successfully tracked.
        event.preventDefault(); // The key is handled (tracked), prevent default browser behavior (e.g. form submission, scroll).
        
        
        
        handlePressStateUpdate(true);
        
        
        
        // Register global fallback listener to handle premature release outside the component:
        if (!noGlobalKeyRelease) globalKeyReleaseController.register(keyCode);
    });
    const handleKeyUp          : KeyboardEventHandler<TElement> = useStableCallback((event) => {
        // Get the pressed key for matching the configured keys:
        const keyCode = event.code;
        
        // Defensive check: although `event.code` is typed as a string,
        // some browsers may emit key events with `undefined` code during autocomplete or IME composition.
        // Exit early to avoid matching against an invalid or missing key.
        if (keyCode === undefined) return;
        
        
        
        // Untrack key press state:
        if (!keyPressTracker.track(keyCode, false)) return; // Early exit if not fully untracked.
        
        
        
        //#region Keyboard click on release behavior
        // Trigger synthetic click on keyup if configured:
        if (!triggerClickOnKeyUp) return;
        const pressableElement = event.currentTarget;
        if (pressableElement instanceof HTMLElement) {
            pressableElement.click();
        } // if
        //#endregion Keyboard click on release behavior
        
        
        
        handlePressStateUpdate(false);
        
        
        
        // Abort global fallback listener — release has already been handled:
        if (!noGlobalKeyRelease) globalKeyReleaseController.abort(); // `abort()` is safe to call multiple times — it’s idempotent and guards against late release callbacks.
    });
    const handleKeyRelease     = useStableCallback((event: globalThis.KeyboardEvent) => {
        // Convert native KeyboardEvent to a React-compatible synthetic event:
        const syntheticEvent = createSyntheticKeyboardEvent<TElement, KeyboardEvent>({
            nativeEvent : event,
        });
        
        // Delegate to the keyup handler to ensure consistent release logic:
        handleKeyUp(syntheticEvent);
    });
    
    
    
    // States and flags:
    const globalPointerReleaseController = useGlobalPointerRelease(handlePointerRelease);
    const globalKeyReleaseController     = useGlobalKeyRelease(handleKeyRelease);
    
    
    
    // Return the internal press state API:
    return {
        observedPress,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } satisfies PressObserverState<TElement>;
};
