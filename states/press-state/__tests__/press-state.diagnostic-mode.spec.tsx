import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { PressStateTest } from './PressStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating controlled press state transitions.
 */
interface PressStateControlledTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title          : string
    
    /**
     * Initial press state.
     * - `true`   : pressed
     * - `false`  : released
     * - `'auto'` : automatic determine
     */
    pressed        : boolean | 'auto'
    
    /**
     * A sequence of updates applied to the press state, including expected outcomes.
     */
    updates        : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                 : string
        
        /**
         * New value computed press state.
         * - `true`      : set press to test element
         * - `false`     : set release to test element
         * - `undefined` : skip updating this part.
         */
        setPress             ?: boolean
        
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
         * The expected press state.
         * - 'pressed'   : should be pressed
         * - 'released'   : should be released
         * - `undefined` : nothing to expect
         */
        expectedPress        ?: 'pressed' | 'released'
        
        /**
         * The expected presence of running press animation after the delay.
         * - `true`      : there is a running pressing animation
         * - `false`     : there is a running releasing animation
         * - `0`         : there is no running press animation
         * - `undefined` : nothing to expect
         */
        expectedRunningPress ?: boolean | 0
    }[]
}



test.describe('usePressBehaviorState - diagnostic mode', () => {
    for (const { title, pressed : initialPressed, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be respond to change from released to pressed',
            pressed       : 'auto',
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to pressed',
                    setPress             : true,
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'pressed',
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedRunningPress : true,
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedPress        : 'pressed',
                    expectedRunningPress : true,
                },
                {
                    title                : 'The pressing animation should be stopped and the press-state is still pressed',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from pressed to released',
            pressed       : 'auto',
            updates       : [
                {
                    title                : 'Set to initially pressed and wait until the pressing animation finishes',
                    setPress             : true,
                    
                    delay                : 1500, // wait until the pressing animation finishes
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to released',
                    setPress             : false,
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'released',
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 200,
                    expectedPress        : 'released',
                    expectedRunningPress : false,
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedPress        : 'released',
                    expectedRunningPress : false,
                },
                {
                    title                : 'The pressing animation should be stopped and the press-state is still released',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from released to pressed then released',
            pressed       : 'auto',
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to pressed',
                    setPress             : true,
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'pressed',
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedRunningPress : true,
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedPress        : 'pressed',
                    expectedRunningPress : true,
                },
                {
                    title                : 'The pressing animation should be stopped and the press-state is still pressed',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to released',
                    setPress             : false,
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'released',
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 200,
                    expectedPress        : 'released',
                    expectedRunningPress : false,
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedPress        : 'released',
                    expectedRunningPress : false,
                },
                {
                    title                : 'The releasing animation should be stopped and the press-state is still released',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from pressed to released then pressed',
            pressed       : 'auto',
            updates       : [
                {
                    title                : 'Set to initially pressed and wait until the pressing animation finishes',
                    setPress             : true,
                    
                    delay                : 1500, // wait until the pressing animation finishes
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to released',
                    setPress             : false,
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'released',
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 200,
                    expectedPress        : 'released',
                    expectedRunningPress : false,
                },
                {
                    title                : 'The releasing animation should be running and the press-state is still released',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedPress        : 'released',
                    expectedRunningPress : false,
                },
                {
                    title                : 'The releasing animation should be stopped and the press-state is still released',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to pressed',
                    setPress             : true,
                    
                    delay                : 0, // wait for async process
                    expectedPress        : 'pressed',
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedRunningPress : true,
                },
                {
                    title                : 'The pressing animation should be running and the press-state is still pressed',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedPress        : 'pressed',
                    expectedRunningPress : true,
                },
                {
                    title                : 'The pressing animation should be stopped and the press-state is still pressed',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to press, release, and re-press quickly',
            pressed       : 'auto',
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Press',
                    setPress             : true,
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedRunningPress : true,
                },
                {
                    title                : 'Release before pressing finishes',
                    setPress             : false,
                    
                    delay                : 200,
                    expectedPress        : 'pressed', // Still pressed because the pressing animation is not finished yet.
                    expectedRunningPress : true,  // Still pressing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-press again before releasing finishes',
                    setPress             : true,
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedRunningPress : true, // Still in original pressing sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final pressing to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0, // No running animation.
                },
            ],
        },
        {
            title         : 'Should be respond to release, press, and re-release quickly',
            pressed       : 'auto',
            updates       : [
                {
                    title                : 'Set to initially pressed and wait until the pressing animation finishes',
                    setPress             : true,
                    
                    delay                : 1500, // wait until the pressing animation finishes
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Release',
                    setPress             : false,
                    
                    delay                : 200,
                    expectedPress        : 'released',
                    expectedRunningPress : false,
                },
                {
                    title                : 'Press before releasing finishes',
                    setPress             : true,
                    
                    delay                : 200,
                    expectedPress        : 'released', // Still released because the releasing animation is not finished yet.
                    expectedRunningPress : false,  // Still releasing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-release again before pressing finishes',
                    setPress             : false,
                    
                    delay                : 200,
                    expectedPress        : 'released',
                    expectedRunningPress : false, // Still in original releasing sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final releasing to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedPress        : 'released',
                    expectedRunningPress : 0, // No running animation.
                },
            ],
        },
    ] as PressStateControlledTestCase[]) {
        test(title, async ({ mount, page }) => {
            // Stores currently press animation names:
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
            
            let lastNewPress : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handlePressUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newPress, event) => {
                lastNewPress = newPress;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <PressStateTest
                    implementsPressHandlers={true}
                    pressed={initialPressed}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onPressUpdate={handlePressUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('press-state-test');
            await expect(box).toContainText('Press State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, setPress, delay, expectedPress, expectedRunningPress} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update the press state:
                if (setPress !== undefined) {
                    // Reset the last received values:
                    lastNewPress = undefined;
                    lastEvent = undefined;
                    
                    
                    // Move mouse cursor to the center of the box:
                    const boxBounding = await box.boundingBox();
                    expect(boxBounding).not.toBeNull();
                    const { x, y, width, height } = boxBounding!;
                    const centerX = x + width / 2;
                    const centerY = y + height / 2;
                    await page.mouse.move(centerX, centerY);
                    
                    // Simulate user interaction to change the press state:
                    if (setPress) {
                        await page.mouse.down(); // simulate press
                    }
                    else {
                        await page.mouse.up();   // simulate release
                    } // if
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewPress).toBe(setPress);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Validate events:
                if (setPress !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box2 = component.getByTestId('press-state-test');
                await expect(box2).toContainText('Press State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedPress !== undefined) {
                    expect(box2).toHaveAttribute('data-state', expectedPress);
                } // if
                
                if (expectedRunningPress!== undefined) {
                    if (setPress === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    
                    switch (expectedRunningPress) {
                        case true:
                            expect(runningAnimations.has('boo-test-pressing')).toBe(true);
                            expect(runningAnimations.has('boo-test-releasing')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-pressing')).toBe(false);
                            expect(runningAnimations.has('boo-test-releasing')).toBe(true);
                            break;
                        case 0:
                            expect(runningAnimations.has('boo-test-pressing')).toBe(false);
                            expect(runningAnimations.has('boo-test-releasing')).toBe(false);
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
