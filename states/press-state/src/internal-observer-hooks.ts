'use client' // The exported `usePressObserver()` hook is client side only.

// React:
import {
    // Types:
    type PointerEventHandler,
    type KeyboardEventHandler,
    
    
    
    // Hooks:
    useLayoutEffect,
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

// Reusable-ui states:
import {
    useObserverState,
    type ObserverProps,
    type ObserverDefinition,
}                           from '@reusable-ui/observer-state'      // Observes a specific condition (typically a DOM interaction) and emits a resolved state whenever that condition changes.



// Define how the press observer should behave:
const pressObserverDefinition : ObserverDefinition<boolean, Element> = {
    inactiveState       : false,      // The default state when not pressed.
    restrictionBehavior : 'discrete', // State resets when restriction is lifted.
    getCurrentState     : undefined,  // Not used; press state is determined via event handlers.
};



/**
 * Props for the `usePressObserverState()` hook.
 * 
 * Describes the current component condition for press observation.
 */
export interface PressObserverProps
    extends
        // Bases:
        ObserverProps
{
    /* no additional props yet - reserved for future extensions */
}

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
 * Restricted behavior:
 * - When restricted, the observer forces the press state to released (`false`),
 *   since restricted elements cannot be pressed.
 * - When re-enabled, remains released until the user explicitly re-presses.
 * 
 * @template TElement - The type of the target DOM element.
 * 
 * @param props - The press observer props for describing the current component condition.
 * @param options - Configuration for press resolution (keys, buttons, pressure, fingers, global release behavior).
 * @returns The observed press state and event handlers.
 */
export const usePressObserverState = <TElement extends Element = HTMLElement>(props: PressObserverProps, options: Pick<PressStateOptions, 'pressKeys' | 'clickKeys' | 'triggerClickOnKeyUp' | 'pressButtons' | 'pressPressure' | 'pressFingers' | 'noGlobalPointerRelease' | 'noGlobalKeyRelease'> | undefined): PressObserverState<TElement> => {
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
    
    
    
    // Extract props:
    const {
        isControlled,
    } = props;
    
    
    
    // States and flags:
    
    // Tracks the pending release timeout:
    const deferredReleaseRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
    
    // PointerPress tracker for determining pressed state by pointers:
    const pointerPressTracker = usePointerPressTracker(pressButtons, pressPressure, pressFingers);
    
    // KeyPress tracker for determining pressed state by keys:
    const keyPressTracker     = useKeyPressTracker(pressKeys);
    
    
    
    // Cancels any pending press release when updates are disabled (controlled mode):
    // 
    // Placement matters: this effect must run *before* `useObserverState()` refreshes press state,
    // to avoid clearing a newly scheduled timeout (the "wrong kill" scenario).
    //
    // Using `useLayoutEffect()` to ensure the cancellation happens before browser paint,
    // preventing potential visual glitches if the element is already pressed.
    useLayoutEffect(() => {
        // Kills pending press release update when the observer updates are disabled (controlled mode):
        if (!isControlled) return; // Enabled => do not kill.
        
        
        
        // Cancel the deferred press release:
        const deferredRelease = deferredReleaseRef.current;
        if (deferredRelease !== null) {
            clearTimeout(deferredRelease);
            deferredReleaseRef.current = null;
        } // if
    }, [isControlled]);
    
    
    
    // Use the generic observer state hook with press-specific definition:
    const {
        observedState,
        safeUpdateState,
    } = useObserverState<boolean, TElement>(props, {
        commitState : (newState, setState) => {
            if (newState) {
                // Instant press:
                setState(true);
            }
            else {
                // Deferred release:
                
                /**
                 * Defers the press release update with a *single* macrotask tick.
                 * 
                 * Why:
                 * - Ensures the release runs *after* the click event, so the user has a chance to flip `pressed={true|false}`,
                 *   before the press observer commits a release.
                 * 
                 * How:
                 * - The timeout is cancelled in `useLayoutEffect` when `isControlled` flips,
                 *   preventing unwanted release flicker.
                 * - Cancellation must happen in `useLayoutEffect` (not `useEffect`),
                 *   because `useLayoutEffect` run before paint and before the timeout fires.
                 */
                const deferredRelease = deferredReleaseRef.current;
                if (deferredRelease) clearTimeout(deferredRelease);
                deferredReleaseRef.current = setTimeout(() => setState(false), 0);
            }
        },
    }, pressObserverDefinition);
    
    
    
    // Cleanup on unmount: Cancel any pending press release update.
    // Even with a 0 ms timeout, there is a small chance the callback
    // could fire after the component has been unmounted.
    // Using `useEffect` is sufficient here since this hook only
    // provides cleanup logic (no need for `useLayoutEffect`).
    useEffect(() => {
        return () => {
            // Cancel the deferred press release:
            const deferredRelease = deferredReleaseRef.current;
            if (deferredRelease !== null) {
                clearTimeout(deferredRelease);
                deferredReleaseRef.current = null;
            } // if
        };
    }, []);
    
    
    
    // Imperative handlers for uncontrolled press tracking:
    const handlePointerDown    : PointerEventHandler<TElement>  = useStableCallback((event) => {
        // Track pointer press state:
        if (!pointerPressTracker.track(event, true)) return; // Early exit if not successfully tracked.
        
        
        
        safeUpdateState(event.currentTarget, true);
        
        
        
        // Register global fallback listener to handle premature release outside the component:
        if (!noGlobalPointerRelease) globalPointerReleaseController.register(event.pointerId);
    });
    const handlePointerUp      : PointerEventHandler<TElement>  = useStableCallback((event) => {
        // Untrack pointer press state:
        if (!pointerPressTracker.track(event, false)) return; // Early exit if not fully untracked.
        
        
        
        safeUpdateState(event.currentTarget, false);
        
        
        
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
        
        
        
        safeUpdateState(event.currentTarget, true);
        
        
        
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
        
        
        
        safeUpdateState(event.currentTarget, false);
        
        
        
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
    
    
    
    // Global release controllers:
    const globalPointerReleaseController = useGlobalPointerRelease(handlePointerRelease);
    const globalKeyReleaseController     = useGlobalKeyRelease(handleKeyRelease);
    
    
    
    // Return the observed press indicator state and handlers for integration:
    return {
        observedPress : observedState,
        handlePointerDown,
        handlePointerUp,
        handlePointerCancel,
        handleKeyDown,
        handleKeyUp,
    } satisfies PressObserverState<TElement>;
};
