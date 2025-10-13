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



test.describe('useFocusBehaviorState - controlled mode', () => {
    for (const { title, focused : initialFocused, computedFocus: initialComputedFocus, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be controlled to blurred',
            focused       : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
            ],
        },
        {
            title         : 'Should be controlled to focused',
            focused       : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
            ],
        },
        {
            title         : 'Should be changed from blurred to focused',
            focused       : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to focused',
                    focused              : true,
                    
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
            title         : 'Should be changed from focused to blurred',
            focused       : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to blurred',
                    focused              : false,
                    
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
            title         : 'Should be changed from blurred to focused then blurred',
            focused       : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to focused',
                    focused              : true,
                    
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
                    focused              : false,
                    
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
            title         : 'Should be changed from focused to blurred then focused',
            focused       : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to blurred',
                    focused              : false,
                    
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
                    focused              : true,
                    
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
            title         : 'Focus, blur, and re-focus quickly',
            focused       : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Focus',
                    focused              : true,
                    
                    delay                : 200,
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true,
                },
                {
                    title                : 'Blur before focusing finishes',
                    focused              : false,
                    
                    delay                : 200,
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : true,  // Still focusedating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-focus again before blurring finishes',
                    focused              : true,
                    
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
            title         : 'Blur, focus, and re-blur quickly',
            focused       : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Blur',
                    focused              : false,
                    
                    delay                : 200,
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false,
                },
                {
                    title                : 'Focus before blurring finishes',
                    focused              : true,
                    
                    delay                : 200,
                    expectedFocus        : 'focused',
                    expectedRunningFocus : false,  // Still blurredating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-blur again before focusing finishes',
                    focused              : false,
                    
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
        
        
        
        {
            title         : 'Should be respond to change from blurred to focused',
            focused       : 'auto',
            computedFocus : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to focused',
                    computedFocus        : true,
                    
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
            computedFocus : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to blurred',
                    computedFocus        : false,
                    
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
            computedFocus : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to focused',
                    computedFocus        : true,
                    
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
                    computedFocus        : false,
                    
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
            computedFocus : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Change to blurred',
                    computedFocus        : false,
                    
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
                    computedFocus        : true,
                    
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
            computedFocus : false,
            updates       : [
                {
                    title                : 'Should be blurred and no animation',
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Focus',
                    computedFocus        : true,
                    
                    delay                : 200,
                    expectedFocus        : 'focused',
                    expectedRunningFocus : true,
                },
                {
                    title                : 'Blur before focusing finishes',
                    computedFocus        : false,
                    
                    delay                : 200,
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : true,  // Still focusedating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-focus again before blurring finishes',
                    computedFocus        : true,
                    
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
            computedFocus : true,
            updates       : [
                {
                    title                : 'Should be focused and no animation',
                    expectedFocus        : 'focused',
                    expectedRunningFocus : 0,
                },
                {
                    title                : 'Blur',
                    computedFocus        : false,
                    
                    delay                : 200,
                    expectedFocus        : 'blurred',
                    expectedRunningFocus : false,
                },
                {
                    title                : 'Focus before blurring finishes',
                    computedFocus        : true,
                    
                    delay                : 200,
                    expectedFocus        : 'focused',
                    expectedRunningFocus : false,  // Still blurredating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-blur again before focusing finishes',
                    computedFocus        : false,
                    
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
            // States:
            let currentFocused         : boolean | 'auto' | undefined = initialFocused;
            let currentComputedFocus : boolean | null          | undefined = initialComputedFocus;
            
            
            
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
                    focused={currentFocused}
                    computedFocus={currentComputedFocus}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onFocusUpdate={handleFocusUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('focus-state-test');
            await expect(box).toContainText('Focus State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, focused, computedFocus, delay, expectedFocus, expectedRunningFocus} of updates) {
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
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onFocusUpdate={handleFocusUpdate}
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
                if (expectedFocus !== undefined) {
                    expect(box).toHaveAttribute('data-state', expectedFocus);
                } // if
                
                if (expectedRunningFocus!== undefined) {
                    if (computedFocus === undefined) {
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
