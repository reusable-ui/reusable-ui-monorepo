import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ActiveStateTest } from './ActiveStateTest.js';



/**
 * Represents a single test scenario for validating active/inactive state transitions.
 */
interface ActiveStateAnimationTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title   : string
    
    /**
     * Initial active/inactive state.
     * - `true`: active
     * - `false`: inactive
     */
    active  : boolean
    
    /**
     * A sequence of updates applied to the active/inactive state, including expected outcomes.
     */
    updates : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                    : string
        
        /**
         * New value for active state.
         * Set to `undefined` to skip updating this part.
         */
        active                  ?: boolean
        
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
         * The expected presence of running activate/deactivate animation after the delay.
         * - `true`      : there is a running activate animation
         * - `false`     : there is a running deactivate animation
         * - `null`      : there is no running activate/deactivate animation
         * - `undefined` : nothing to expect
         */
        expectedRunningActivate ?: boolean | null
        
        /**
         * The expected opacity in percentage of the active/inactive element.
         * - `number`    : expected opacity in percentage
         * - `undefined` : nothing to expect
         */
        expectedOpacity         ?: number
    }[]
}



test.describe('useActiveBehaviorState - animation', () => {
    for (const { title, active : initialActive, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title   : 'No running activate/deactivate animation in all time',
            active  : false,
            updates : [
                {
                    title                   : 'Initially no running animation',
                    expectedRunningActivate : null,
                    expectedOpacity         : 60,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 200,
                    expectedRunningActivate : null,
                    expectedOpacity         : 60,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningActivate : null,
                    expectedOpacity         : 60,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningActivate : null,
                    expectedOpacity         : 60,
                },
            ],
        },
        {
            title   : 'Active state after update',
            active  : false,
            updates : [
                {
                    title                   : 'Initially inactive',
                    expectedRunningActivate : null,
                    expectedOpacity         : 60,
                },
                {
                    title                   : 'Set active to true (immediate)',
                    active                  : true, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'Wait for activating animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningActivate : null,
                    expectedOpacity         : 100,
                },
            ],
        },
        {
            title   : 'Inactive state after update',
            active  : true,
            updates : [
                {
                    title                   : 'Initially active',
                    expectedRunningActivate : null,
                    expectedOpacity         : 100,
                },
                {
                    title                   : 'Set active to false (immediate)',
                    active                  : false, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'Wait for deactivating animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningActivate : null,
                    expectedOpacity         : 60,
                },
            ],
        },
        {
            title   : 'Activate, deactivate, and re-activate quickly',
            active  : false,
            updates : [
                {
                    title                   : 'Initially inactive',
                    expectedRunningActivate : null,
                    expectedOpacity         : 60,
                },
                {
                    title                   : 'Activate',
                    active                  : true,
                    
                    delay                   : 200,
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'Deactivate before activation finishes',
                    active                  : false,
                    
                    delay                   : 200,
                    expectedRunningActivate : true,  // Still activating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-activate again before deactivating finishes',
                    active                  : true,
                    
                    delay                   : 200,
                    expectedRunningActivate : true, // Still in original activation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final activation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningActivate : null, // No running animation.
                    expectedOpacity         : 100,
                },
            ],
        },
        {
            title   : 'Deactivate, activate, and re-deactivate quickly',
            active  : true,
            updates : [
                {
                    title                   : 'Initially active',
                    expectedRunningActivate : null,
                    expectedOpacity         : 100,
                },
                {
                    title                   : 'Deactivate',
                    active                  : false,
                    
                    delay                   : 200,
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'Activate before deactivation finishes',
                    active                  : true,
                    
                    delay                   : 200,
                    expectedRunningActivate : false,  // Still deactivating (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-deactivate again before activating finishes',
                    active                  : false,
                    
                    delay                   : 200,
                    expectedRunningActivate : false, // Still in original deactivation sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final deactivation to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningActivate : null, // No running animation.
                    expectedOpacity         : 60,
                },
            ],
        },
        {
            title   : 'Repeated activation does not restart animation',
            active  : false,
            updates : [
                {
                    title                   : 'Initially inactive',
                    expectedRunningActivate : null,
                    expectedOpacity         : 60,
                },
                {
                    title                   : 'Activate (first time)',
                    active                  : true,
                    delay                   : 200,
                    expectedRunningActivate : true,
                },
                {
                    title                   : 'Set active to true again (no change)',
                    active                  : true,
                    delay                   : 200,
                    expectedRunningActivate : true, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningActivate : null,
                    expectedOpacity         : 100,
                },
            ],
        },
        {
            title   : 'Repeated deactivation does not restart animation',
            active  : true,
            updates : [
                {
                    title                   : 'Initially active',
                    expectedRunningActivate : null,
                    expectedOpacity         : 100,
                },
                {
                    title                   : 'Deactivate (first time)',
                    active                  : false,
                    delay                   : 200,
                    expectedRunningActivate : false,
                },
                {
                    title                   : 'Set active to false again (no change)',
                    active                  : false,
                    delay                   : 200,
                    expectedRunningActivate : false, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningActivate : null,
                    expectedOpacity         : 60,
                },
            ],
        },
    ] as ActiveStateAnimationTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentActive : boolean = initialActive;
            
            
            
            // Stores currently active animation names:
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
            
            
            
            // First render:
            const component = await mount(
                <ActiveStateTest
                    active={currentActive}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('active-state-test');
            await expect(box).toContainText('Active State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, active, delay, expectedRunningActivate, expectedOpacity} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (active !== undefined) currentActive = active;
                
                
                
                // Re-render:
                await component.update(
                    <ActiveStateTest
                        active={currentActive}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    />
                );
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('active-state-test');
                await expect(box).toContainText('Active State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedRunningActivate!== undefined) {
                    switch (expectedRunningActivate) {
                        case true:
                            expect(runningAnimations.has('boo-test-activating')).toBe(true);
                            expect(runningAnimations.has('boo-test-deactivating')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-activating')).toBe(false);
                            expect(runningAnimations.has('boo-test-deactivating')).toBe(true);
                            break;
                        case null:
                            expect(runningAnimations.has('boo-test-activating')).toBe(false);
                            expect(runningAnimations.has('boo-test-deactivating')).toBe(false);
                            break;
                    } // switch
                } // if
                
                if (expectedOpacity !== undefined) {
                    const actualOpacity = await box.evaluate((el) => window.getComputedStyle(el).opacity);
                    const actualOpacityNum = Number.parseFloat(actualOpacity) * 100;
                    expect(actualOpacityNum.toFixed(2)).toBe((expectedOpacity).toFixed(2));
                } // if
            } // for
        });
    } // for
});
