import React from 'react'
import { type ValidityState, MockComponent } from './MockComponent.js'
import { test, expect } from '@playwright/experimental-ct-react';



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





test.describe('useAnimationState', () => {
    for (const {
        title,
        
        expanded : initialExpanded,
        valid    : initialValid,
        
        updates,
    } of [
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
    ] as AnimationStateTestCase[]) {
        test(title, async ({ mount }) => {
            // Setup API refs for testing animation state:
            let expandValue   : [boolean, boolean | undefined] | null             = null;
            let validityValue : [ValidityState, ValidityState | undefined] | null = null;
            
            // Hold previous props:
            let currentExpanded = initialExpanded;
            let currentValid    = initialValid;
            
            const component = await mount(
                <MockComponent
                    expanded={currentExpanded}
                    expandValueRef={(current) => { expandValue = current; }}
                    
                    valid={currentValid}
                    validityValueRef={(current) => { validityValue = current; }}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            await expect(component).toContainText('Mock Component Test');
            
            
            
            // Destructure state values:
            const [isExpanded, isExpandingOrCollapsing] = expandValue ?? [undefined, undefined];
            const [isValid, isValidatingOrInvalidating] = validityValue ?? [undefined, undefined];
            
            
            
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
                await component.update(
                    <MockComponent
                        expanded={currentExpanded}
                        expandValueRef={(current) => { expandValue = current; }}
                        
                        valid={currentValid}
                        validityValueRef={(current) => { validityValue = current; }}
                    />
                );
                
                
                
                // Ensure the component is rendered correctly:
                await expect(component).toContainText('Mock Component Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                };
                
                
                
                // Access current state after delay:
                const [isExpanded, isExpandingOrCollapsing] = expandValue ?? [undefined, undefined];
                const [isValid, isValidatingOrInvalidating] = validityValue ?? [undefined, undefined];
                
                
                
                // Verify the expected values:
                console.log(`[subtest] ${updateTitle}`);
                expect(isExpanded).toBe(expectedExpand);
                expect(isExpandingOrCollapsing).toBe(expectedRunningExpand);
                expect(Object.is(isValid, expectedValidity)).toBe(true);
                expect(isValidatingOrInvalidating).toBe(expectedRunningValidity);
            } // for
        });
    } // for
});
