import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { FocusStateTest } from './FocusStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { FocusPhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of focus state transitions.
 */
interface FocusStateEventTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title          : string
    
    /**
     * Initial focus state.
     * - `true`   : focused
     * - `false`  : blurred
     * - `'auto'` : automatic determine
     */
    focused        : boolean | 'auto'
    
    /**
     * Initial computed focus state.
     * - `true`      : focused
     * - `false`     : blurred
     * - `undefined` : use default behavior.
     */
    computedFocus ?: boolean
    
    /**
     * A sequence of updates applied to the focus state, including expected outcomes.
     */
    updates        : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                 : string
        
        /**
         * New value for focus state.
         * Set to `undefined` to skip updating this part.
         */
        focused              ?: boolean | 'auto'
        
        /**
         * New value computed focus state.
         * - `true`      : focused
         * - `false`     : blurred
         * - `undefined` : skip updating this part.
         */
        computedFocus        ?: boolean
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay                ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected focus state.
         * - `'focusing'` : onFocusingStart event has been invoked
         * - `'focused'`  : onFocusingEnd event has been invoked
         * - `'blurring'` : onBlurringStart event has been invoked
         * - `'blurred'`  : onBlurringEnd event has been invoked
         * - `null`       : no event has been invoked
         * - `undefined`  : nothing to expect
         */
        expectedEvent        ?: FocusPhase | null
    }[]
}



test.describe('useFocusStatePhaseEvents', () => {
    for (const { title, focused : initialFocused, computedFocus: initialComputedFocus, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be respond to change from blurred to focused',
            focused       : 'auto',
            computedFocus : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to focused',
                    computedFocus        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 200,
                    expectedEvent        : 'focusing',
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'focusing',
                },
                {
                    title                : 'The focusing animation should be stopped and the focus-state is still focused',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'focused',
                },
            ],
        },
        {
            title         : 'Should be respond to change from focused to blurred',
            focused       : 'auto',
            computedFocus : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to blurred',
                    computedFocus        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 200,
                    expectedEvent        : 'blurring',
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'blurring',
                },
                {
                    title                : 'The focusing animation should be stopped and the focus-state is still blurred',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'blurred',
                },
            ],
        },
        {
            title         : 'Should be respond to change from blurred to focused then blurred',
            focused       : 'auto',
            computedFocus : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to focused',
                    computedFocus        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 200,
                    expectedEvent        : 'focusing',
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'focusing',
                },
                {
                    title                : 'The focusing animation should be stopped and the focus-state is still focused',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'focused',
                },
                {
                    title                : 'Change to blurred',
                    computedFocus        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 200,
                    expectedEvent        : 'blurring',
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'blurring',
                },
                {
                    title                : 'The blurring animation should be stopped and the focus-state is still blurred',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'blurred',
                },
            ],
        },
        {
            title         : 'Should be respond to change from focused to blurred then focused',
            focused       : 'auto',
            computedFocus : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to blurred',
                    computedFocus        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 200,
                    expectedEvent        : 'blurring',
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'blurring',
                },
                {
                    title                : 'The blurring animation should be stopped and the focus-state is still blurred',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'blurred',
                },
                {
                    title                : 'Change to focused',
                    computedFocus        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 200,
                    expectedEvent        : 'focusing',
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'focusing',
                },
                {
                    title                : 'The focusing animation should be stopped and the focus-state is still focused',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'focused',
                },
            ],
        },
        {
            title         : 'Should be respond to focus, blur, and re-focus quickly',
            focused       : 'auto',
            computedFocus : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Focus',
                    computedFocus        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'focusing',
                },
                {
                    title                : 'Blur before focusing finishes',
                    computedFocus        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'focusing',  // Still focusedating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-focus again before blurring finishes',
                    computedFocus        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'focusing', // Still in original focusing sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final focusing to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedEvent        : 'focused', // No running animation.
                },
            ],
        },
        {
            title         : 'Should be respond to blur, focus, and re-blur quickly',
            focused       : 'auto',
            computedFocus : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Blur',
                    computedFocus        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'blurring',
                },
                {
                    title                : 'Focus before blurring finishes',
                    computedFocus        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'blurring',  // Still blurredating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-blur again before focusing finishes',
                    computedFocus        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'blurring', // Still in original blurring sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final blurring to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedEvent        : 'blurred', // No running animation.
                },
            ],
        },
    ] as FocusStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentFocused         : boolean | 'auto' | undefined = initialFocused;
            let currentComputedFocus : boolean | null          | undefined = initialComputedFocus;
            
            
            
            // Handlers:
            let lastNewFocus : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleFocusUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newFocus, event) => {
                lastNewFocus = newFocus;
                lastEvent = event;
            };
            
            let lastFocusPhase : FocusPhase | null = null;
            const handleFocusingStart : ValueChangeEventHandler<FocusPhase, unknown> = (focusPhase) => {
                expect(focusPhase).toBe('focusing');
                lastFocusPhase = focusPhase;
            };
            const handleFocusingEnd : ValueChangeEventHandler<FocusPhase, unknown> = (focusPhase) => {
                expect(focusPhase).toBe('focused');
                lastFocusPhase = focusPhase;
            };
            const handleBlurringStart : ValueChangeEventHandler<FocusPhase, unknown> = (focusPhase) => {
                expect(focusPhase).toBe('blurring');
                lastFocusPhase = focusPhase;
            };
            const handleBlurringEnd : ValueChangeEventHandler<FocusPhase, unknown> = (focusPhase) => {
                expect(focusPhase).toBe('blurred');
                lastFocusPhase = focusPhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <FocusStateTest
                    focused={currentFocused}
                    computedFocus={currentComputedFocus}
                    
                    onFocusUpdate={handleFocusUpdate}
                    
                    onFocusingStart={handleFocusingStart}
                    onFocusingEnd={handleFocusingEnd}
                    onBlurringStart={handleBlurringStart}
                    onBlurringEnd={handleBlurringEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('focus-state-test');
            await expect(box).toContainText('Focus State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, focused, computedFocus, delay, expectedEvent} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (focused !== undefined) currentFocused = focused;
                if (computedFocus !== undefined) currentComputedFocus = computedFocus;
                
                
                
                // Reset the last received values:
                lastNewFocus = undefined;
                lastEvent = undefined;
                
                
                
                // Re-render:
                await component.update(
                    <FocusStateTest
                        focused={currentFocused}
                        computedFocus={currentComputedFocus}
                        
                        onFocusUpdate={handleFocusUpdate}
                        
                        onFocusingStart={handleFocusingStart}
                        onFocusingEnd={handleFocusingEnd}
                        onBlurringStart={handleBlurringStart}
                        onBlurringEnd={handleBlurringEnd}
                    />
                );
                
                
                
                // Validate events:
                if (computedFocus !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewFocus).toBe(computedFocus);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('focus-state-test');
                await expect(box).toContainText('Focus State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedEvent !== undefined) {
                    expect(lastFocusPhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
