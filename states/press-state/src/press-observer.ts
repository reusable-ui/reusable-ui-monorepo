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
    
    defaultPressButtons,
    defaultPressPressure,
    defaultPressFingers,
    
    defaultNoGlobalPointerRelease,
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

// Reusable-ui utilities:
import {
    // Hooks:
    useStableCallback,
}                           from '@reusable-ui/callbacks'           // A utility package providing stable and merged callback functions for optimized event handling and performance.
import {
    // Utilities:
    createSyntheticPointerEvent,
}                           from '@reusable-ui/events'              // State management hooks for controllable, uncontrollable, and hybrid UI components.



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
export const usePressObserver = <TElement extends Element = HTMLElement>(disabledUpdates: boolean, options: Pick<PressStateOptions, 'pressKeys' | 'clickKeys' | 'triggerClickOnKeyUp' | 'pressButtons' | 'pressPressure' | 'pressFingers' | 'noGlobalPointerRelease'> | undefined): PressObserverState<TElement> => {
    // Extract options and assign defaults:
    const {
        pressKeys              = defaultPressKeys,
        clickKeys              = defaultClickKeys,
        triggerClickOnKeyUp    = defaultTriggerClickOnKeyUp,
        
        pressButtons           = defaultPressButtons,
        pressPressure          = defaultPressPressure,
        pressFingers           = defaultPressFingers,
        
        noGlobalPointerRelease = defaultNoGlobalPointerRelease,
    } = options ?? {};
    
    
    
    // States and flags:
    
    // Ref to the pressable DOM element:
    const pressableElementRef = useRef<TElement | null>(null);
    
    // Internal fallback for observed press (used only when uncontrolled):
    const [observedPress, setObservedPress] = useState<boolean>(false);
    
    // PointerPress tracker for determining pressed state by pointers:
    const trackPointerPressState = usePointerPressTracker(pressButtons, pressPressure, pressFingers);
    
    // KeyPress tracker for determining pressed state by keys:
    const trackKeyPressState     = useKeyPressTracker(pressKeys);
    
    
    
    /**
     * Updates the internal press state based on the current press state of the given element.
     * 
     * - If `disabledUpdates` is true, the update will be skipped.
     * - If `newObservedPress` is not provided, it will be auto-detected using `.matches(pressWithinSelector)`.
     * - If the new state matches the current `observedPress`, no update will occur.
     * 
     * @param pressableElement - The DOM element to observe for press state (only required when the `newObservedPress` is not provided).
     * @param newObservedPress - Optional override for the detected press state.
     */
    const handlePressStateUpdate : (pressableElement: TElement | null, newObservedPress?: boolean) => void = useStableCallback((pressableElement, newObservedPress) => {
        // Skip update if disabled:
        if (disabledUpdates) return;
        
        // If press state is not provided, attempt to infer from element:
        if (newObservedPress === undefined) {
            if (!pressableElement) return; // Cannot infer without element
            newObservedPress = pressableElement.matches(pressWithinSelector);
        } // if
        
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
    const handlePointerDown    : PointerEventHandler<TElement>  = useStableCallback((event) => {
        // Track pointer press state:
        if (!trackPointerPressState(event, true)) return; // Early exit if not successfully tracked.
        
        
        
        handlePressStateUpdate(event.currentTarget, true);
        
        
        
        // Register global fallback listener to handle premature release outside the component:
        if (!noGlobalPointerRelease) globalPointerReleaseController.register(event.pointerId);
    });
    const handlePointerUp      : PointerEventHandler<TElement>  = useStableCallback((event) => {
        // Untrack pointer press state:
        if (!trackPointerPressState(event, false)) return; // Early exit if not fully untracked.
        
        
        
        handlePressStateUpdate(event.currentTarget, false);
        
        
        
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
        if (!trackKeyPressState(keyCode, true)) return; // Early exit if not successfully tracked.
        event.preventDefault(); // The key is handled (tracked), prevent default browser behavior (e.g. form submission, scroll).
        
        
        
        handlePressStateUpdate(event.currentTarget, true);
    });
    const handleKeyUp          : KeyboardEventHandler<TElement> = useStableCallback((event) => {
        // Get the pressed key for matching the configured keys:
        const keyCode = event.code;
        
        // Defensive check: although `event.code` is typed as a string,
        // some browsers may emit key events with `undefined` code during autocomplete or IME composition.
        // Exit early to avoid matching against an invalid or missing key.
        if (keyCode === undefined) return;
        
        
        
        // Untrack key press state:
        if (!trackKeyPressState(keyCode, false)) return; // Early exit if not fully untracked.
        
        
        
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
    
    
    
    // States and flags:
    const globalPointerReleaseController = useGlobalPointerRelease(handlePointerRelease);
    
    
    
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
