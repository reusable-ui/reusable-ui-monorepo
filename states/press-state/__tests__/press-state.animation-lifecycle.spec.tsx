import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { PressStateTest } from './PressStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating press state transitions.
 */
interface PressStateAnimationTestCase {
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
         * The expected presence of running press animation after the delay.
         * - `true`      : there is a running pressing animation
         * - `false`     : there is a running releasing animation
         * - `0`         : there is no running press animation
         * - `undefined` : nothing to expect
         */
        expectedRunningPress ?: boolean | 0
        
        /**
         * The expected background color of the pressable element.
         * - `string`    : expected background color`
         * - `undefined` : nothing to expect
         */
        expectedBackground   ?: string
    }[]
}



const BACKGROUND_COLOR_PRESSED  = 'color(srgb 0 0 0.25)'
const BACKGROUND_COLOR_RELEASED = 'color(srgb 0 0 1)';



test.describe('usePressBehaviorState - animation', () => {
    for (const { title, pressed : initialPressed, computedPress: initialComputedPress, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'No running press animation in all time for initially pressed',
            pressed       : true,
            computedPress : undefined,
            updates       : [
                {
                    title                : 'Initially no running animation',
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 200,
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
            ],
        },
        {
            title         : 'No running press animation in all time for initially released',
            pressed       : false,
            computedPress : undefined,
            updates       : [
                {
                    title                : 'Initially no running animation',
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 200,
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
            ],
        },
        {
            title         : 'Pressed state after update (released => pressed)',
            pressed       : false,
            updates       : [
                {
                    title                : 'Initially released',
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
                {
                    title                : 'Set pressed to true (immediate)',
                    pressed              : true, // The animation duration is 1000 ms.
                    
                    delay                : 200, // Give a brief time to start the animation.
                    expectedRunningPress : true,
                },
                {
                    title                : 'Still have running animation',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningPress : true,
                },
                {
                    title                : 'Wait for pressing animation to finish',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
            ],
        },
        {
            title         : 'Released state after update (pressed => released)',
            pressed       : true,
            updates       : [
                {
                    title                : 'Initially pressed',
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
                {
                    title                : 'Set pressed to false (immediate)',
                    pressed              : false, // The animation duration is 1000 ms.
                    
                    delay                : 200, // Give a brief time to start the animation.
                    expectedRunningPress : false,
                },
                {
                    title                : 'Still have running animation',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningPress : false,
                },
                {
                    title                : 'Wait for releasing animation to finish',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
            ],
        },
        {
            title         : 'Press, release, and re-press quickly',
            pressed       : false,
            updates       : [
                {
                    title                : 'Initially released',
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
                {
                    title                : 'Press',
                    pressed              : true,
                    
                    delay                : 200,
                    expectedRunningPress : true,
                },
                {
                    title                : 'Release before pressing finishes',
                    pressed              : false,
                    
                    delay                : 200,
                    expectedRunningPress : true,  // Still pressing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-press again before releasing finishes',
                    pressed              : true,
                    
                    delay                : 200,
                    expectedRunningPress : true, // Still in original pressing sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final pressing to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedRunningPress : 0, // No running animation.
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
            ],
        },
        {
            title         : 'Release, press, and re-release quickly',
            pressed       : true,
            updates       : [
                {
                    title                : 'Initially pressed',
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
                {
                    title                : 'Release',
                    pressed              : false,
                    
                    delay                : 200,
                    expectedRunningPress : false,
                },
                {
                    title                : 'Press before releasing finishes',
                    pressed              : true,
                    
                    delay                : 200,
                    expectedRunningPress : false,  // Still releasing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-release again before pressing finishes',
                    pressed              : false,
                    
                    delay                : 200,
                    expectedRunningPress : false, // Still in original releasing sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final releasing to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedRunningPress : 0, // No running animation.
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
            ],
        },
        {
            title         : 'Repeated pressing does not restart animation',
            pressed       : false,
            updates       : [
                {
                    title                : 'Initially released',
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
                {
                    title                : 'Press (first time)',
                    pressed              : true,
                    delay                : 200,
                    expectedRunningPress : true,
                },
                {
                    title                : 'Set pressed to true again (no change)',
                    pressed              : true,
                    delay                : 200,
                    expectedRunningPress : true, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                : 'Wait for final animation to finish',
                    delay                : 800, // Includes additional margin to guarantee completion.
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
            ],
        },
        {
            title         : 'Repeated releasing does not restart animation',
            pressed       : true,
            updates       : [
                {
                    title                : 'Initially pressed',
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_PRESSED,
                },
                {
                    title                : 'Release (first time)',
                    pressed              : false,
                    delay                : 200,
                    expectedRunningPress : false,
                },
                {
                    title                : 'Set pressed to false again (no change)',
                    pressed              : false,
                    delay                : 200,
                    expectedRunningPress : false, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                : 'Wait for final animation to finish',
                    delay                : 800, // Includes additional margin to guarantee completion.
                    expectedRunningPress : 0,
                    expectedBackground   : BACKGROUND_COLOR_RELEASED,
                },
            ],
        },
    ] as PressStateAnimationTestCase[]) {
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
            for (const { title, pressed, computedPress, delay, expectedRunningPress, expectedBackground} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (pressed !== undefined) currentPressed = pressed;
                if (computedPress !== undefined) currentComputedPress = computedPress;
                
                
                
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
                if (expectedRunningPress!== undefined) {
                    if (computedPress === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    console.log(`${(performance.now() / 1000).toFixed(2)} expect running press-state: `, expectedRunningPress);
                    
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
                
                if (expectedBackground !== undefined) {
                    const actualBackgroundColor = await box.evaluate((el) => window.getComputedStyle(el).backgroundColor);
                    expect(actualBackgroundColor).toBe((expectedBackground));
                } // if
            } // for
        });
    } // for
});
