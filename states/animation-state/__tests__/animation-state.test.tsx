import React, { useRef, useEffect, useState, type RefObject } from 'react'
import {
    type AnimationStateApi,
    useAnimationState,
} from '../dist/index.js'
import { render, renderHook, act } from '@testing-library/react'
import { useMergeEventHandlers } from '@reusable-ui/callbacks'
import { useSetTimeout } from '@reusable-ui/timers'
// import styles from './TestComponent.module.css'



// Tests:

/**
 * Represents a single test scenario for validating animation-aware state transitions.
 */
interface AnimationStateTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title    : string
    
    /**
     * Initial expanded/collapsed state.
     * - `true`: expanded
     * - `false`: collapsed
     */
    expanded : boolean
    
    /**
     * Initial validity state.
     * - `true`: valid
     * - `false`: invalid
     * - `null`: neutral (no validation)
     */
    valid    : boolean | null
    
    /**
     * A sequence of updates applied to the animation state, including expected outcomes.
     */
    updates  : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                    : string
        
        /**
         * New value for expanded/collapsed state.
         * Set to `undefined` to skip updating this part.
         */
        expanded                ?: boolean
        
        /**
         * New value for validity state.
         * Set to `undefined` to skip updating this part.
         */
        valid                   ?: boolean | null
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay                   ?: number
        
        // Expected Outcomes:
        
        /**
         * Expected expand/collapse state after the delay.
         */
        expectedExpand           : boolean
        
        /**
         * Expected running expand/collapse animation after the delay.
         * - `undefined`: no animation is in progress
         */
        expectedRunningExpand    : boolean | undefined
        
        /**
         * Expected validity state after the delay.
         */
        expectedValidity         : ValidityState
        
        /**
         * Expected running validity animation after the delay.
         * - `undefined`: no animation is in progress
         */
        expectedRunningValidity  : ValidityState | undefined
    }[]
}



type UndoAnimation =
    |  0  // undoing valid
    | -0  // undoing invalid
type ValidityState =
    |  1  // valid
    | -1  // invalid
    | UndoAnimation
/**
 * Props for the mock component used to test animation-aware state transitions.
 */
interface MockComponentProps {
    /**
     * Indicates whether the component is expanded (`true`) or collapsed (`false`).
     * Changing this value will trigger an expand/collapse animation.
     */
    expanded         ?: boolean
    
    /**
     * Reference to access the internal expand/collapse animation state.
     * Useful for testing and tracking animated expand/collapse transitions.
     */
    expandStateRef    : RefObject<AnimationStateApi<boolean, HTMLDivElement> | null>
    
    /**
     * Validity state of the component.
     * - `true`: marked as valid.
     * - `false`: marked as invalid.
     * - `null`: neutral (no validation applied).
     * Changing this value will trigger a validity animation.
     */
    valid            ?: boolean | null
    
    /**
     * Reference to access the internal validity animation state.
     * Useful for testing and tracking animated validation transitions.
     * 
     * Validity states:
     * - `-1`: invalid.
     * - `-0`: transitioning from invalid to neutral.
     * - `+0`: transitioning from valid to neutral.
     * - `+1`: valid.
     */
    validityStateRef  : RefObject<AnimationStateApi<-1 | -0 | 0 | 1, HTMLDivElement> | null>
}
const MockComponent = (props: MockComponentProps) => {
    // Extract props and assign defaults:
    const {
        expanded          = false,
        expandStateRef,
        
        valid             = null,
        validityStateRef,
    } = props;
    
    
    
    //#region Expand/Collapse Animation API
    const expandState = useAnimationState<boolean, HTMLDivElement>({
        initialIntent     : expanded,
        animationPattern  : [
            'expand',
            'collapse',
        ],
        animationBubbling : false,
    });
    expandStateRef.current = expandState;
    
    const [
        isExpanded,     // Latest intent
        setExpanded,    // Intent setter
        isExpanding,    // Ongoing animation (if any)
        expandHandlers, // Lifecycle event handlers
    ] = expandState;
    
    useEffect(() => {
        setExpanded(expanded);
    }, [expanded]);
    
    // Map expand animation state to corresponding class:
    const expandClass = (
        (isExpanding !== undefined)
        ? isExpanding ? 'expanding' : 'collapsing'
        : isExpanded  ? 'expanded'  : 'collapsed'
    );
    //#endregion Expand/Collapse Animation API
    
    
    
    //#region Validity Animation API
    const validityState = useAnimationState<ValidityState, HTMLDivElement>({
        initialIntent     : (() => {
            switch (valid) {
                case true  : return +1;
                case false : return -1;
                default    : return +0;
            } // switch
        })(),
        animationPattern  : [
            'validate',
            'unvalidate',
            'invalidate',
            'uninvalidate',
        ],
        animationBubbling : false,
    });
    validityStateRef.current = validityState;
    
    const [
        currentValidity,  // Latest intent
        setValidity,      // Intent setter
        validating,       // Ongoing animation
        validityHandlers, // Lifecycle event handlers
    ] = validityState;
    
    useEffect(() => {
        if (valid !== null) {
            setValidity(valid ? 1 : -1);
        }
        else {
            setValidity((currentValue, currentRunning) => {
                const latestEffect = currentRunning ?? currentValue;
                switch (latestEffect) {
                    case -1 : return -0;   // undoing invalid
                    case +1 : return +0;   // undoing valid
                    default : return latestEffect; // already neutral
                } // switch
            });
        } // if
    }, [valid]);
    
    // Map validity animation state to corresponding class:
    const validityClass = (() => {
        if (validating !== undefined) {
            if (validating === -1)         return 'invalidating';
            if (Object.is(validating, -0)) return 'uninvalidating';
            if (Object.is(validating, +0)) return 'unvalidating';
            if (validating === +1)         return 'validating';
        } // if
        
        if (currentValidity === -1) return 'invalidated';
        if (currentValidity === +1) return 'validated';
        if (currentValidity === 0) return 'novalidity';
        
        return '';
    })();
    //#endregion Validity Animation API
    
    
    
    // Merged Event Handlers:
    const handleAnimationStart = useMergeEventHandlers(
        expandHandlers.handleAnimationStart,
        validityHandlers.handleAnimationStart,
    );
    const handleAnimationEnd   = useMergeEventHandlers(
        expandHandlers.handleAnimationEnd,
        validityHandlers.handleAnimationEnd,
    );
    
    
    
    // Manual `animationcancel` Handling:
    // This is necessary because React does not provide an `onAnimationCancel` event handler.
    const divRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const divElm = divRef.current;
        if (!divElm) return;
        
        const handleNativeAnimationCancel = (event: AnimationEvent) => {
            expandHandlers.handleAnimationCancel(event as any);
            validityHandlers.handleAnimationCancel(event as any);
        };
        
        divElm.addEventListener('animationcancel', handleNativeAnimationCancel);
        return () => {
            divElm.removeEventListener('animationcancel', handleNativeAnimationCancel);
        };
    }, []);
    
    
    
    // Simulate animation events:
    const [activeAnimations] = useState(() => new Map</* activeClass: */ string, /* abortAnimation: */() => void>());
    const setTimeoutAsync = useSetTimeout();
    useEffect(() => {
        const divElm = divRef.current;
        if (!divElm) return;
        
        const currentClasses = [expandClass, validityClass].filter(Boolean);
        const activeClasses  = Array.from(activeAnimations.keys());
        
        // The additional classes that are not in the active set:
        const addedClasses   = currentClasses.filter((c) => !activeClasses.includes(c));
        // The missing classes that are not in the current set:
        const removedClasses = activeClasses.filter((c)  => !currentClasses.includes(c));
        
        
        
        // Abort animation for removed classes:
        for (const className of removedClasses) {
            const animationName = getCorrespondingAnimationName(className);
            if (animationName === null) continue; // Skip if no corresponding animation name
            
            
            
            const abort = activeAnimations.get(className);
            if (abort) {
                abort();
                activeAnimations.delete(className);
                
                // Fire animation abort event:
                divElm.dispatchEvent(new AnimationEvent('animationcancel', {
                    bubbles: true,
                    cancelable: true,
                    animationName,
                }));
            } // if
        } // for
        
        
        
        // Start animation for added classes:
        for (const className of addedClasses) {
            const animationName = getCorrespondingAnimationName(className);
            if (animationName === null) continue; // Skip if no corresponding animation name
            
            
            
            // Create delay to simulate animation end:
            const timerPromise = setTimeoutAsync(1000);
            
            // Store the abort function:
            // This allows us to cancel the animation if the class is removed before it ends.
            activeAnimations.set(className, timerPromise.abort);
            
            // Fire animation start event:
            divElm.dispatchEvent(new AnimationEvent('animationstart', {
                bubbles: true,
                cancelable: true,
                animationName,
            }));
            
            
            
            // End the animation after the delay:
            timerPromise.then(() => {
                // Remove the class after the animation ends:
                activeAnimations.delete(className);
                
                // Fire animation end event:
                divElm.dispatchEvent(new AnimationEvent('animationend', {
                    bubbles: true,
                    cancelable: true,
                    animationName,
                }));
            });
        } // for
    }, [expandClass, validityClass]);
    
    
    
    // Render:
    return (
        <div
            ref={divRef}
            
            onAnimationStart={handleAnimationStart}
            onAnimationEnd={handleAnimationEnd}
            // onAnimationCancel={handleAnimationCancel} // There's no `onAnimationCancel` on React's DOMAttributes
            
            className={`${expandClass} ${validityClass}`}
        />
    );
};

const animationClassMap: Record<string, string> = {
    expanding      : 'expand',
    collapsing     : 'collapse',
    validating     : 'validate',
    unvalidating   : 'unvalidate',
    invalidating   : 'invalidate',
    uninvalidating : 'uninvalidate',
};
const getCorrespondingAnimationName = (className: string): string | null => {
    return animationClassMap[className] ?? null;
};



describe('useAnimationState', () => {
    const createTestRef = <TRef extends unknown>(initial: TRef) => renderHook(() => useRef<TRef>(initial)).result.current;
    
    test.each<AnimationStateTestCase>([
        {
            title            : 'Initial state is collapsed and neutral',
            expanded         : false,
            valid            : null,
            updates          : [],
        },
        {
            title            : 'Expanded state after update',
            expanded         : false,
            valid            : null,
            updates          : [
                {
                    title                   : 'Set expanded to true (immediate)',
                    expanded                : true,
                    delay                   : 100,
                    expectedExpand          : true,
                    expectedRunningExpand   : true,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
                {
                    title                   : 'Wait for expand animation to finish',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : true,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Valid state after update',
            expanded         : false,
            valid            : false,
            updates          : [
                {
                    title                   : 'Set valid to true  (immediate)',
                    valid                   : true,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +1,
                    expectedRunningValidity : +1,
                },
                {
                    title                   : 'Wait for expand animation to finish',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +1,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Collapse after expansion',
            expanded         : true,
            valid            : null,
            updates          : [
                {
                    title                   : 'Set expanded to false (immediate)',
                    expanded                : false,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : false,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
                {
                    title                   : 'Wait for collapse animation to finish',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Undo valid → neutral transition',
            expanded         : false,
            valid            : true,
            updates          : [
                {
                    title                   : 'Set valid to null (immediate)',
                    valid                   : null,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +0,
                    expectedRunningValidity : +0,
                },
                {
                    title                   : 'Wait for unvalidating animation to finish',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Undo invalid → neutral transition',
            expanded         : false,
            valid            : false,
            updates          : [
                {
                    title                   : 'Set valid to null (immediate)',
                    valid                   : null,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -0,
                    expectedRunningValidity : -0,
                },
                {
                    title                   : 'Wait for uninvalidating animation to finish',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -0,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Toggle expansion and validity together',
            expanded         : false,
            valid            : null,
            updates          : [
                {
                    title                   : 'Expand and validate simultaneously',
                    expanded                : true,
                    valid                   : true,
                    delay                   : 100,
                    expectedExpand          : true,
                    expectedRunningExpand   : true,
                    expectedValidity        : +1,
                    expectedRunningValidity : +1,
                },
                {
                    title                   : 'Wait for both animations to finish',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : true,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +1,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Repeated no-op (setting neutral twice)',
            expanded         : false,
            valid            : null,
            updates          : [
                {
                    title                   : 'Set valid to null again (should be no-op)',
                    valid                   : null,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Jump directly from valid → invalid',
            expanded         : false,
            valid            : true,
            updates          : [
                {
                    title                   : 'Switch to invalid (no neutral in-between)',
                    valid                   : false,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -1,
                    expectedRunningValidity : -1,
                },
                {
                    title                   : 'Wait for animation to complete',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -1,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Jump directly from invalid → valid',
            expanded         : false,
            valid            : false,
            updates          : [
                {
                    title                   : 'Switch to valid (no neutral in-between)',
                    valid                   : true,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +1,
                    expectedRunningValidity : +1,
                },
                {
                    title                   : 'Wait for animation to complete',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +1,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Toggle expansion during validity change',
            expanded         : true,
            valid            : true,
            updates          : [
                {
                    title                   : 'Collapse and invalidate together',
                    expanded                : false,
                    valid                   : false,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : false,
                    expectedValidity        : -1,
                    expectedRunningValidity : -1,
                },
                {
                    title                   : 'Wait for collapse and invalidate to finish',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -1,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Interrupt validity animation mid-transition',
            expanded         : false,
            valid            : false,
            updates          : [
                {
                    title                   : 'Start validating',
                    valid                   : true,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +1,
                    expectedRunningValidity : +1,
                },
                {
                    title                   : 'Switch to invalid before validation finishes',
                    valid                   : false,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -1, // Intent updated to 'invalid'.
                    expectedRunningValidity : +1, // Still validating (800ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Wait for validation to finish and trigger pending invalidation',
                    delay                   : 900, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -1,
                    expectedRunningValidity : -1, // Pending intent resumes after prior animation completes.
                },
                {
                    title                   : 'Let final invalidation finish',
                    delay                   : 1100, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -1,
                    expectedRunningValidity : undefined, // No running animation.
                },
            ],
        },
        {
            title            : 'Expand, collapse, and re-expand quickly',
            expanded         : false,
            valid            : null,
            updates          : [
                {
                    title                   : 'Expand',
                    expanded                : true,
                    delay                   : 100,
                    expectedExpand          : true,
                    expectedRunningExpand   : true,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
                {
                    title                   : 'Collapse before expansion finishes',
                    expanded                : false,
                    delay                   : 100,
                    expectedExpand          : false, // Intent updated to 'collapsed'.
                    expectedRunningExpand   : true,  // Still expanding (800ms remaining) — cannot cancel mid-flight.
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
                {
                    title                   : 'Re-expand again before collapse finishes',
                    expanded                : true,
                    delay                   : 100,
                    expectedExpand          : true, // Intent returned to 'expanded'.
                    expectedRunningExpand   : true, // Still in original expansion sequence (700ms remaining).
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
                {
                    title                   : 'Wait for final expansion to complete',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedExpand          : true,
                    expectedRunningExpand   : undefined, // No running animation.
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Repeated expansion does not restart animation',
            expanded         : false,
            valid            : null,
            updates          : [
                {
                    title                   : 'Expand (first time)',
                    expanded                : true,
                    delay                   : 100,
                    expectedExpand          : true,
                    expectedRunningExpand   : true,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
                {
                    title                   : 'Set expanded to true again (no change)',
                    expanded                : true,
                    delay                   : 100,
                    expectedExpand          : true,
                    expectedRunningExpand   : true, // Continues original animation, no reset (800ms remaining).
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 900, // Includes additional margin to guarantee completion.
                    expectedExpand          : true,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Back-to-back validity flips',
            expanded         : false,
            valid            : true,
            updates          : [
                {
                    title                   : 'Switch to invalid',
                    valid                   : false,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -1,
                    expectedRunningValidity : -1,
                },
                {
                    title                   : 'Switch back to valid during invalidation',
                    valid                   : true,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +1, // Intent updated to 'valid'.
                    expectedRunningValidity : -1, // Still invalidation (800ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Final switch to neutral',
                    valid                   : null,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -0, // Undoing the latest side effects.
                    expectedRunningValidity : -1, // Still invalidation (700ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Wait for invalidation to finish and trigger pending neutralization',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -0,
                    expectedRunningValidity : -0, // Pending intent resumes after prior animation completes.
                },
                {
                    title                   : 'Let final neutralization finish',
                    delay                   : 1100, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -0,
                    expectedRunningValidity : undefined, // No running animation.
                },
            ],
        },
        {
            title            : 'Expand from collapsed after undoing validity',
            expanded         : false,
            valid            : false,
            updates          : [
                {
                    title                   : 'Set validity to null (undo invalid)',
                    valid                   : null,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -0, // Undoing the latest side effects.
                    expectedRunningValidity : -0,
                },
                {
                    title                   : 'Wait for uninvalidating to finish',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : -0,
                    expectedRunningValidity : undefined,
                },
                {
                    title                   : 'Expand component',
                    expanded                : true,
                    delay                   : 100,
                    expectedExpand          : true,
                    expectedRunningExpand   : true,
                    expectedValidity        : -0,
                    expectedRunningValidity : undefined,
                },
                {
                    title                   : 'Let expansion finish',
                    delay                   : 1000, // Includes additional margin to guarantee completion.
                    expectedExpand          : true,
                    expectedRunningExpand   : undefined, // No running animation.
                    expectedValidity        : -0,
                    expectedRunningValidity : undefined,
                },
            ],
        },
        {
            title            : 'Set valid to null twice in a row',
            expanded         : false,
            valid            : true,
            updates          : [
                {
                    title                   : 'Undo valid → neutral',
                    valid                   : null,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +0, // Undoing the latest side effects.
                    expectedRunningValidity : +0,
                },
                {
                    title                   : 'Set valid to null again (should be no-op)',
                    valid                   : null,
                    delay                   : 100,
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +0, // Already in undo-valid state
                    expectedRunningValidity : +0, // Still in original unvalidating sequence (800ms remaining).
                },
                {
                    title                   : 'Let animation complete',
                    delay                   : 900, // Includes additional margin to guarantee completion.
                    expectedExpand          : false,
                    expectedRunningExpand   : undefined,
                    expectedValidity        : +0,
                    expectedRunningValidity : undefined, // No running animation.
                },
            ],
        },
    ])(
        `$title`,
        async ({
            // Test Inputs:
            title,
            
            expanded : initialExpanded,
            valid    : initialValid,
            
            updates,
        }) => {
            // Setup API refs for testing animation state:
            const expandStateRef   = createTestRef<AnimationStateApi<boolean, HTMLDivElement> | null>(null);
            const validityStateRef = createTestRef<AnimationStateApi<ValidityState, HTMLDivElement> | null>(null);
            
            // Hold previous props:
            let currentExpanded = initialExpanded;
            let currentValid    = initialValid;
            
            const { rerender } = render(
                <MockComponent
                    expanded={currentExpanded}
                    expandStateRef={expandStateRef}
                    
                    valid={currentValid}
                    validityStateRef={validityStateRef}
                />
            );
            
            
            
            // Assert ref initialization:
            expect(expandStateRef.current).toBeDefined();
            expect(validityStateRef.current).toBeDefined();
            
            
            
            // Tuple-style destructuring:
            const [
                isExpanded,
                setIsExpanded,
                isExpandingOrCollapsing,
                {
                    handleAnimationStart  : handleAnimationStartForExpand,
                    handleAnimationEnd    : handleAnimationEndForExpand,
                    handleAnimationCancel : handleAnimationCancelForExpand,
                },
            ] = expandStateRef.current!;
            const [
                isValid,
                setIsValid,
                isValidatingOrInvalidating,
                {
                    handleAnimationStart  : handleAnimationStartForValidity,
                    handleAnimationEnd    : handleAnimationEndForValidity,
                    handleAnimationCancel : handleAnimationCancelForValidity,
                },
            ] = validityStateRef.current!;
            
            
            
            // Named-property destructuring:
            const {
                intent    : isExpanded2,
                setIntent : setIsExpanded2,
                running   : isExpandingOrCollapsing2,
                
                handleAnimationStart  : handleAnimationStartForExpand2,
                handleAnimationEnd    : handleAnimationEndForExpand2,
                handleAnimationCancel : handleAnimationCancelForExpand2,
            } = expandStateRef.current!;
            const {
                intent    : isValid2,
                setIntent : setIsValid2,
                running   : isValidatingOrInvalidating2,
                
                handleAnimationStart  : handleAnimationStartForValidity2,
                handleAnimationEnd    : handleAnimationEndForValidity2,
                handleAnimationCancel : handleAnimationCancelForValidity2,
            } = validityStateRef.current!;
            
            
            
            // Confirm tuple-style and named properties match:
            expect(isExpanded).toBe(isExpanded2);
            expect(setIsExpanded).toBe(setIsExpanded2);
            expect(isExpandingOrCollapsing).toBe(isExpandingOrCollapsing2);
            expect(handleAnimationStartForExpand).toBe(handleAnimationStartForExpand2);
            expect(handleAnimationEndForExpand).toBe(handleAnimationEndForExpand2);
            expect(handleAnimationCancelForExpand).toBe(handleAnimationCancelForExpand2);
            
            expect(isValid).toBe(isValid2);
            expect(setIsValid).toBe(setIsValid2);
            expect(isValidatingOrInvalidating).toBe(isValidatingOrInvalidating2);
            expect(handleAnimationStartForValidity).toBe(handleAnimationStartForValidity2);
            expect(handleAnimationEndForValidity).toBe(handleAnimationEndForValidity2);
            expect(handleAnimationCancelForValidity).toBe(handleAnimationCancelForValidity2);
            
            
            
            // Initial assertions:
            expect(isExpanded).toBe(initialExpanded);
            expect(isExpandingOrCollapsing).toBe(undefined);
            
            expect(Object.is(isValid, (() => {
                if (initialValid === true) return +1;  // valid
                if (initialValid === false) return -1; // invalid
                return +0; // neutral
            })())).toBe(true);
            expect(isValidatingOrInvalidating).toBe(undefined);
            
            
            
            // Apply update scenarios:
            for (const {
                // Test Inputs:
                title    : updateTitle,
                
                expanded : nextExpanded,
                valid    : nextValid,
                
                delay,
                
                // Expected Outcomes:
                expectedExpand,
                expectedRunningExpand,
                expectedValidity,
                expectedRunningValidity,
            } of updates) {
                if (nextExpanded !== undefined) currentExpanded = nextExpanded;
                if (nextValid !== undefined) currentValid = nextValid;
                
                // Apply the update:
                rerender(
                    <MockComponent
                        expanded={currentExpanded}
                        expandStateRef={expandStateRef}
                        
                        valid={currentValid}
                        validityStateRef={validityStateRef}
                    />
                );
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await act(async () => {
                        await new Promise((resolve) => {
                            setTimeout(resolve, delay);
                        });
                    });
                };
                
                
                
                // Access current state after delay:
                expect(expandStateRef.current).toBeDefined();
                expect(validityStateRef.current).toBeDefined();
                const [isExpanded, , isExpandingOrCollapsing] = expandStateRef.current!;
                const [isValid, , isValidatingOrInvalidating] = validityStateRef.current!;
                
                
                
                // Verify the expected values:
                console.log(`[subtest] ${updateTitle}`);
                expect(isExpanded).toBe(expectedExpand);
                expect(isExpandingOrCollapsing).toBe(expectedRunningExpand);
                expect(Object.is(isValid, expectedValidity)).toBe(true);
                expect(isValidatingOrInvalidating).toBe(expectedRunningValidity);
            } // for
        }
    );
});
