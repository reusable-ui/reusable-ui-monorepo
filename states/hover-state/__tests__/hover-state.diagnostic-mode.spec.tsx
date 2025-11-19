import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { HoverStateTest } from './HoverStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating controlled hover state transitions.
 */
interface HoverStateControlledTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title          : string
    
    /**
     * Initial hover state.
     * - `true`   : hovered
     * - `false`  : unhovered
     * - `'auto'` : automatic determine
     */
    hovered        : boolean | 'auto'
    
    /**
     * A sequence of updates applied to the hover state, including expected outcomes.
     */
    updates        : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                 : string
        
        /**
         * New value computed hover state.
         * - `true`      : set hover to test element
         * - `false`     : set unhover to test element
         * - `undefined` : skip updating this part.
         */
        setHover             ?: boolean
        
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
         * The expected hover state.
         * - 'hovered'   : should be hovered
         * - 'unhovered' : should be unhovered
         * - `undefined` : nothing to expect
         */
        expectedHover        ?: 'hovered' | 'unhovered'
        
        /**
         * The expected presence of running hover animation after the delay.
         * - `true`      : there is a running hovering animation
         * - `false`     : there is a running unhovering animation
         * - `0`         : there is no running hover animation
         * - `undefined` : nothing to expect
         */
        expectedRunningHover ?: boolean | 0
    }[]
}



test.describe('useHoverBehaviorState - diagnostic mode', () => {
    for (const { title, hovered : initialHovered, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be respond to change from unhovered to hovered',
            hovered       : 'auto',
            updates       : [
                {
                    title                : 'Should be unhovered and no animation',
                    expectedHover        : 'unhovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Change to hovered',
                    setHover             : true,
                    
                    delay                : 0, // wait for async process
                    expectedHover        : 'hovered',
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 200,
                    expectedHover        : 'hovered',
                    expectedRunningHover : true,
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedHover        : 'hovered',
                    expectedRunningHover : true,
                },
                {
                    title                : 'The hovering animation should be stopped and the hover-state is still hovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from hovered to unhovered',
            hovered       : 'auto',
            updates       : [
                {
                    title                : 'Set to initially hovered and wait until the hovering animation finishes',
                    setHover             : true,
                    
                    delay                : 1500, // wait until the hovering animation finishes
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Should be hovered and no animation',
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Change to unhovered',
                    setHover             : false,
                    
                    delay                : 0, // wait for async process
                    expectedHover        : 'unhovered',
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 200,
                    expectedHover        : 'unhovered',
                    expectedRunningHover : false,
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedHover        : 'unhovered',
                    expectedRunningHover : false,
                },
                {
                    title                : 'The hovering animation should be stopped and the hover-state is still unhovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedHover        : 'unhovered',
                    expectedRunningHover : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from unhovered to hovered then unhovered',
            hovered       : 'auto',
            updates       : [
                {
                    title                : 'Should be unhovered and no animation',
                    expectedHover        : 'unhovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Change to hovered',
                    setHover             : true,
                    
                    delay                : 0, // wait for async process
                    expectedHover        : 'hovered',
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 200,
                    expectedHover        : 'hovered',
                    expectedRunningHover : true,
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedHover        : 'hovered',
                    expectedRunningHover : true,
                },
                {
                    title                : 'The hovering animation should be stopped and the hover-state is still hovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Change to unhovered',
                    setHover             : false,
                    
                    delay                : 0, // wait for async process
                    expectedHover        : 'unhovered',
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 200,
                    expectedHover        : 'unhovered',
                    expectedRunningHover : false,
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedHover        : 'unhovered',
                    expectedRunningHover : false,
                },
                {
                    title                : 'The unhovering animation should be stopped and the hover-state is still unhovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedHover        : 'unhovered',
                    expectedRunningHover : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from hovered to unhovered then hovered',
            hovered       : 'auto',
            updates       : [
                {
                    title                : 'Set to initially hovered and wait until the hovering animation finishes',
                    setHover             : true,
                    
                    delay                : 1500, // wait until the hovering animation finishes
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Should be hovered and no animation',
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Change to unhovered',
                    setHover             : false,
                    
                    delay                : 0, // wait for async process
                    expectedHover        : 'unhovered',
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 200,
                    expectedHover        : 'unhovered',
                    expectedRunningHover : false,
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedHover        : 'unhovered',
                    expectedRunningHover : false,
                },
                {
                    title                : 'The unhovering animation should be stopped and the hover-state is still unhovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedHover        : 'unhovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Change to hovered',
                    setHover             : true,
                    
                    delay                : 0, // wait for async process
                    expectedHover        : 'hovered',
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 200,
                    expectedHover        : 'hovered',
                    expectedRunningHover : true,
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedHover        : 'hovered',
                    expectedRunningHover : true,
                },
                {
                    title                : 'The hovering animation should be stopped and the hover-state is still hovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to hover, unhover, and re-hover quickly',
            hovered       : 'auto',
            updates       : [
                {
                    title                : 'Should be unhovered and no animation',
                    expectedHover        : 'unhovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Hover',
                    setHover             : true,
                    
                    delay                : 200,
                    expectedHover        : 'hovered',
                    expectedRunningHover : true,
                },
                {
                    title                : 'Unhover before hovering finishes',
                    setHover             : false,
                    
                    delay                : 200,
                    expectedHover        : 'hovered', // Still hovered because the hovering animation is not finished yet.
                    expectedRunningHover : true,  // Still hovering (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-hover again before unhovering finishes',
                    setHover             : true,
                    
                    delay                : 200,
                    expectedHover        : 'hovered',
                    expectedRunningHover : true, // Still in original hovering sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final hovering to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0, // No running animation.
                },
            ],
        },
        {
            title         : 'Should be respond to unhover, hover, and re-unhover quickly',
            hovered       : 'auto',
            updates       : [
                {
                    title                : 'Set to initially hovered and wait until the hovering animation finishes',
                    setHover             : true,
                    
                    delay                : 1500, // wait until the hovering animation finishes
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Should be hovered and no animation',
                    expectedHover        : 'hovered',
                    expectedRunningHover : 0,
                },
                {
                    title                : 'Unhover',
                    setHover             : false,
                    
                    delay                : 200,
                    expectedHover        : 'unhovered',
                    expectedRunningHover : false,
                },
                {
                    title                : 'Hover before unhovering finishes',
                    setHover             : true,
                    
                    delay                : 200,
                    expectedHover        : 'unhovered', // Still unhovered because the unhovering animation is not finished yet.
                    expectedRunningHover : false,  // Still unhovering (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-unhover again before hovering finishes',
                    setHover             : false,
                    
                    delay                : 200,
                    expectedHover        : 'unhovered',
                    expectedRunningHover : false, // Still in original unhovering sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final unhovering to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedHover        : 'unhovered',
                    expectedRunningHover : 0, // No running animation.
                },
            ],
        },
    ] as HoverStateControlledTestCase[]) {
        test(title, async ({ mount, page }) => {
            // Stores currently hover animation names:
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
            
            let lastNewHover : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleHoverUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newHover, event) => {
                lastNewHover = newHover;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <HoverStateTest
                    implementsHoverHandlers={true}
                    hovered={initialHovered}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onHoverUpdate={handleHoverUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('hover-state-test');
            await expect(box).toContainText('Hover State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, setHover, delay, expectedHover, expectedRunningHover} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update the hover state:
                if (setHover !== undefined) {
                    // Reset the last received values:
                    lastNewHover = undefined;
                    lastEvent = undefined;
                    
                    // Simulate user interaction to change the hover state:
                    if (setHover) {
                        await box.hover();
                    }
                    else {
                        // Move mouse away to unhover:
                        const exitBox = component.getByTestId('hover-exit');
                        await expect(exitBox).toContainText('An exit area to move mouse cursor away');
                        await exitBox.hover();
                    } // if
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewHover).toBe(setHover);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Validate events:
                if (setHover !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box2 = component.getByTestId('hover-state-test');
                await expect(box2).toContainText('Hover State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedHover !== undefined) {
                    expect(box2).toHaveAttribute('data-state', expectedHover);
                } // if
                
                if (expectedRunningHover!== undefined) {
                    if (setHover === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    
                    switch (expectedRunningHover) {
                        case true:
                            expect(runningAnimations.has('boo-test-hovering')).toBe(true);
                            expect(runningAnimations.has('boo-test-unhovering')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-hovering')).toBe(false);
                            expect(runningAnimations.has('boo-test-unhovering')).toBe(true);
                            break;
                        case 0:
                            expect(runningAnimations.has('boo-test-hovering')).toBe(false);
                            expect(runningAnimations.has('boo-test-unhovering')).toBe(false);
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
