import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { FocusStateTest } from './FocusStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating controlled focus state transitions.
 */
interface FocusStateControlledTestCase {
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
     * A sequence of updates applied to the focus state, including expected outcomes.
     */
    updates        : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                 : string
        
        /**
         * New value computed focus state.
         * - `true`      : set focus to test element
         * - `false`     : set blur to test element
         * - `undefined` : skip updating this part.
         */
        setFocus             ?: boolean
        
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
         * - 'focused'   : should be focused
         * - 'blurred'   : should be blurred
         * - `undefined` : nothing to expect
         */
        expectedFocus        ?: 'focused' | 'blurred'
        
        /**
         * The expected presence of running focus animation after the delay.
         * - `true`      : there is a running focusing animation
         * - `false`     : there is a running blurring animation
         * - `0`         : there is no running focus animation
         * - `undefined` : nothing to expect
         */
        expectedRunningFocus ?: boolean | 0
    }[]
}



test.describe('useFocusBehaviorState - diagnostic mode', () => {
    for (const { title, focused : initialFocused, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be respond to change from blurred to focused',
            focused       : 'auto',
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to focused',
                    setFocus             : true,
                    
                    delay                : 0, // wait for async process
                    expectedFocus        : 'focused',
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 200,
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true,
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true,
                },
                {
                    title                : 'The focusing animation should be stopped and the focus-state is still focused',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from focused to blurred',
            focused       : 'auto',
            updates       : [
                {
                    title                : 'Set to initially focused and wait until the focusing animation finishes',
                    setFocus             : true,
                    
                    delay                : 1500, // wait until the focusing animation finishes
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to blurred',
                    setFocus             : false,
                    
                    delay                : 0, // wait for async process
                    expectedFocus        : 'blurred',
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 200,
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false,
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false,
                },
                {
                    title                : 'The focusing animation should be stopped and the focus-state is still blurred',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from blurred to focused then blurred',
            focused       : 'auto',
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to focused',
                    setFocus             : true,
                    
                    delay                : 0, // wait for async process
                    expectedFocus        : 'focused',
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 200,
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true,
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true,
                },
                {
                    title                : 'The focusing animation should be stopped and the focus-state is still focused',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to blurred',
                    setFocus             : false,
                    
                    delay                : 0, // wait for async process
                    expectedFocus        : 'blurred',
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 200,
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false,
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false,
                },
                {
                    title                : 'The blurring animation should be stopped and the focus-state is still blurred',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from focused to blurred then focused',
            focused       : 'auto',
            updates       : [
                {
                    title                : 'Set to initially focused and wait until the focusing animation finishes',
                    setFocus             : true,
                    
                    delay                : 1500, // wait until the focusing animation finishes
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to blurred',
                    setFocus             : false,
                    
                    delay                : 0, // wait for async process
                    expectedFocus        : 'blurred',
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 200,
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false,
                },
                {
                    title                : 'The blurring animation should be running and the focus-state is still blurred',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false,
                },
                {
                    title                : 'The blurring animation should be stopped and the focus-state is still blurred',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to focused',
                    setFocus             : true,
                    
                    delay                : 0, // wait for async process
                    expectedFocus        : 'focused',
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 200,
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true,
                },
                {
                    title                : 'The focusing animation should be running and the focus-state is still focused',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true,
                },
                {
                    title                : 'The focusing animation should be stopped and the focus-state is still focused',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to focus, blur, and re-focus quickly',
            focused       : 'auto',
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Focus',
                    setFocus             : true,
                    
                    delay                : 200,
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true,
                },
                {
                    title                : 'Blur before focusing finishes',
                    setFocus             : false,
                    
                    delay                : 200,
                    expectedFocus        : 'focused', // Still focused because the focusing animation is not finished yet.
                    expectedRunningFocus : true,  // Still focusing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-focus again before blurring finishes',
                    setFocus             : true,
                    
                    delay                : 200,
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true, // Still in original focusing sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final focusing to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0, // No running animation.
                },
            ],
        },
        {
            title         : 'Should be respond to blur, focus, and re-blur quickly',
            focused       : 'auto',
            updates       : [
                {
                    title                : 'Set to initially focused and wait until the focusing animation finishes',
                    setFocus             : true,
                    
                    delay                : 1500, // wait until the focusing animation finishes
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Blur',
                    setFocus             : false,
                    
                    delay                : 200,
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false,
                },
                {
                    title                : 'Focus before blurring finishes',
                    setFocus             : true,
                    
                    delay                : 200,
                    expectedFocus        : 'blurred', // Still blurred because the blurring animation is not finished yet.
                    expectedRunningFocus : false,  // Still blurring (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-blur again before focusing finishes',
                    setFocus             : false,
                    
                    delay                : 200,
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false, // Still in original blurring sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final blurring to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0, // No running animation.
                },
            ],
        },
    ] as FocusStateControlledTestCase[]) {
        test(title, async ({ mount }) => {
            // Stores currently focus animation names:
            const runningAnimations = new Set<string>();
            
            
            
            // Handlers:
            const handleAnimationStart : AnimationEventHandler<HTMLDivElement> = (event): void => {
                console.log(`${(performance.now() / 1000).toFixed(2)} animation started: `, event.animationName);
                runningAnimations.add(event.animationName);
            };
            const handleAnimationEnd   : AnimationEventHandler<HTMLDivElement> = (event): void => {
                console.log(`${(performance.now() / 1000).toFixed(2)} animation ended: `, event.animationName);
                runningAnimations.delete(event.animationName);
            };
            
            let lastNewFocus : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleFocusUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newFocus, event) => {
                lastNewFocus = newFocus;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <FocusStateTest
                    implementsFocusHandlers={true}
                    focused={initialFocused}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onFocusUpdate={handleFocusUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('focus-state-test');
            await expect(box).toContainText('Focus State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, setFocus, delay, expectedFocus, expectedRunningFocus} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update the focus state:
                if (setFocus !== undefined) {
                    // Reset the last received values:
                    lastNewFocus = undefined;
                    lastEvent = undefined;
                    
                    // Simulate user interaction to change the focus state:
                    if (setFocus) {
                        await box.focus();
                    }
                    else {
                        await box.blur();
                    } // if
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewFocus).toBe(setFocus);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Validate events:
                if (setFocus !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box2 = component.getByTestId('focus-state-test');
                await expect(box2).toContainText('Focus State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedFocus !== undefined) {
                    expect(box2).toHaveAttribute('data-state', expectedFocus);
                } // if
                
                if (expectedRunningFocus!== undefined) {
                    if (setFocus === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    
                    switch (expectedRunningFocus) {
                        case true:
                            expect(runningAnimations.has('boo-test-focusing')).toBe(true);
                            expect(runningAnimations.has('boo-test-blurring')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-focusing')).toBe(false);
                            expect(runningAnimations.has('boo-test-blurring')).toBe(true);
                            break;
                        case 0:
                            expect(runningAnimations.has('boo-test-focusing')).toBe(false);
                            expect(runningAnimations.has('boo-test-blurring')).toBe(false);
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
