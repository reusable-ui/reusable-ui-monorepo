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
     * Initial computed press state.
     * - `true`      : pressed
     * - `false`     : released
     * - `undefined` : use default behavior.
     */
    computedPress ?: boolean
    
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
         * New value for press state.
         * Set to `undefined` to skip updating this part.
         */
        pressed              ?: boolean | 'auto'
        
        /**
         * New value computed press state.
         * - `true`      : pressed
         * - `false`     : released
         * - `undefined` : skip updating this part.
         */
        computedPress        ?: boolean
        
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



test.describe('usePressBehaviorState - controlled mode', () => {
    for (const { title, pressed : initialPressed, computedPress: initialComputedPress, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be controlled to released',
            pressed       : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
            ],
        },
        {
            title         : 'Should be controlled to pressed',
            pressed       : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
            ],
        },
        {
            title         : 'Should be changed from released to pressed',
            pressed       : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to pressed',
                    pressed              : true,
                    
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
            title         : 'Should be changed from pressed to released',
            pressed       : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to released',
                    pressed              : false,
                    
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
            title         : 'Should be changed from released to pressed then released',
            pressed       : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to pressed',
                    pressed              : true,
                    
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
                    pressed              : false,
                    
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
            title         : 'Should be changed from pressed to released then pressed',
            pressed       : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to released',
                    pressed              : false,
                    
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
                    pressed              : true,
                    
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
            title         : 'Press, release, and re-press quickly',
            pressed       : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Press',
                    pressed              : true,
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedRunningPress : true,
                },
                {
                    title                : 'Release before pressing finishes',
                    pressed              : false,
                    
                    delay                : 200,
                    expectedPress        : 'released',
                    expectedRunningPress : true,  // Still pressing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-press again before releasing finishes',
                    pressed              : true,
                    
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
            title         : 'Release, press, and re-release quickly',
            pressed       : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Release',
                    pressed              : false,
                    
                    delay                : 200,
                    expectedPress        : 'released',
                    expectedRunningPress : false,
                },
                {
                    title                : 'Press before releasing finishes',
                    pressed              : true,
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedRunningPress : false,  // Still releasing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-release again before pressing finishes',
                    pressed              : false,
                    
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
        
        
        
        {
            title         : 'Should be respond to change from released to pressed',
            pressed       : 'auto',
            computedPress : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to pressed',
                    computedPress        : true,
                    
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
            computedPress : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to released',
                    computedPress        : false,
                    
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
            computedPress : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to pressed',
                    computedPress        : true,
                    
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
                    computedPress        : false,
                    
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
            computedPress : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Change to released',
                    computedPress        : false,
                    
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
                    computedPress        : true,
                    
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
            computedPress : false,
            updates       : [
                {
                    title                : 'Should be released and no animation',
                    expectedPress        : 'released',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Press',
                    computedPress        : true,
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedRunningPress : true,
                },
                {
                    title                : 'Release before pressing finishes',
                    computedPress        : false,
                    
                    delay                : 200,
                    expectedPress        : 'released',
                    expectedRunningPress : true,  // Still pressing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-press again before releasing finishes',
                    computedPress        : true,
                    
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
            computedPress : true,
            updates       : [
                {
                    title                : 'Should be pressed and no animation',
                    expectedPress        : 'pressed',
                    expectedRunningPress : 0,
                },
                {
                    title                : 'Release',
                    computedPress        : false,
                    
                    delay                : 200,
                    expectedPress        : 'released',
                    expectedRunningPress : false,
                },
                {
                    title                : 'Press before releasing finishes',
                    computedPress        : true,
                    
                    delay                : 200,
                    expectedPress        : 'pressed',
                    expectedRunningPress : false,  // Still releasing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-release again before pressing finishes',
                    computedPress        : false,
                    
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
        test(title, async ({ mount }) => {
            // States:
            let currentPressed         : boolean | 'auto' | undefined = initialPressed;
            let currentComputedPress : boolean | null          | undefined = initialComputedPress;
            
            
            
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
                    pressed={currentPressed}
                    computedPress={currentComputedPress}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onPressUpdate={handlePressUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('press-state-test');
            await expect(box).toContainText('Press State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, pressed, computedPress, delay, expectedPress, expectedRunningPress} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (pressed !== undefined) currentPressed = pressed;
                if (computedPress !== undefined) currentComputedPress = computedPress;
                
                
                
                // Reset the last received values:
                lastNewPress = undefined;
                lastEvent = undefined;
                
                
                
                // Re-render:
                await component.update(
                    <PressStateTest
                        pressed={currentPressed}
                        computedPress={currentComputedPress}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onPressUpdate={handlePressUpdate}
                    />
                );
                
                
                
                // Validate events:
                if (computedPress !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewPress).toBe(computedPress);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('press-state-test');
                await expect(box).toContainText('Press State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedPress !== undefined) {
                    expect(box).toHaveAttribute('data-state', expectedPress);
                } // if
                
                if (expectedRunningPress!== undefined) {
                    if (computedPress === undefined) {
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
