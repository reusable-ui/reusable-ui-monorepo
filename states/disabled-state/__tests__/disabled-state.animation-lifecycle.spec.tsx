import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { DisabledStateTest } from './DisabledStateTest.js';



/**
 * Represents a single test scenario for validating enabled/disabled state transitions.
 */
interface DisabledStateAnimationTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title     : string
    
    /**
     * Initial enabled/disabled state.
     * - `true`: disabled
     * - `false`: enabled
     * - `undefined`: default to enabled
     */
    disabled ?: boolean
    
    /**
     * A sequence of updates applied to the enabled/disabled state, including expected outcomes.
     */
    updates   : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                    : string
        
        /**
         * New value for disabled state.
         * Set to `undefined` to skip updating this part.
         */
        disabled                ?: boolean
        
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
         * The expected presence of running enable/disable animation after the delay.
         * - `true`      : there is a running disable animation
         * - `false`     : there is a running enable animation
         * - `null`      : there is no running enable/disable animation
         * - `undefined` : nothing to expect
         */
        expectedRunningDisabled ?: boolean | null
        
        /**
         * The expected opacity of the enabled/disabled element.
         * - `number`    : expected opacity
         * - `undefined` : nothing to expect
         */
        expectedOpacity         ?: number
    }[]
}



test.describe('useDisabledBehaviorState - animation', () => {
    for (const { title, disabled : initialDisabled, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title    : 'No running enable/disable animation in all time',
            disabled : true,
            updates  : [
                {
                    title                   : 'Initially no running animation',
                    expectedRunningDisabled : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 200,
                    expectedRunningDisabled : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningDisabled : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningDisabled : null,
                    expectedOpacity         : 0.5,
                },
            ],
        },
        {
            title    : 'Enabled state after update',
            disabled : true,
            updates  : [
                {
                    title                   : 'Initially disabled',
                    expectedRunningDisabled : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Set disabled to true (immediate)',
                    disabled                : false, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'Wait for enabling animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningDisabled : null,
                    expectedOpacity         : 1,
                },
            ],
        },
        {
            title    : 'Disabled state after update',
            disabled : false,
            updates  : [
                {
                    title                   : 'Initially enabled',
                    expectedRunningDisabled : null,
                    expectedOpacity         : 1,
                },
                {
                    title                   : 'Set disabled to false (immediate)',
                    disabled                : true, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'Wait for disabling animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningDisabled : null,
                    expectedOpacity         : 0.5,
                },
            ],
        },
        {
            title    : 'Enable, disable, and re-enable quickly',
            disabled : true,
            updates  : [
                {
                    title                   : 'Initially disabled',
                    expectedRunningDisabled : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Enable',
                    disabled                : false,
                    
                    delay                   : 200,
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'Disable before disablement finishes',
                    disabled                : true,
                    
                    delay                   : 200,
                    expectedRunningDisabled : false,  // Still enabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-enable again before disable finishes',
                    disabled                : false,
                    
                    delay                   : 200,
                    expectedRunningDisabled : false, // Still in original disablement sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final disablement to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningDisabled : null, // No running animation.
                    expectedOpacity         : 1,
                },
            ],
        },
        {
            title    : 'Disable, enable, and re-disable quickly',
            disabled : false,
            updates  : [
                {
                    title                   : 'Initially enabled',
                    expectedRunningDisabled : null,
                    expectedOpacity         : 1,
                },
                {
                    title                   : 'Disable',
                    disabled                : true,
                    
                    delay                   : 200,
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'Enable before disablement finishes',
                    disabled                : false,
                    
                    delay                   : 200,
                    expectedRunningDisabled : true,  // Still disabling (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-disable again before enable finishes',
                    disabled                : true,
                    
                    delay                   : 200,
                    expectedRunningDisabled : true, // Still in original disablement sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final disablement to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningDisabled : null, // No running animation.
                    expectedOpacity         : 0.5,
                },
            ],
        },
        {
            title    : 'Repeated enablement does not restart animation',
            disabled : true,
            updates  : [
                {
                    title                   : 'Initially disabled',
                    expectedRunningDisabled : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Enable (first time)',
                    disabled                : false,
                    delay                   : 200,
                    expectedRunningDisabled : false,
                },
                {
                    title                   : 'Set disabled to false again (no change)',
                    disabled                : false,
                    delay                   : 200,
                    expectedRunningDisabled : false, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningDisabled : null,
                    expectedOpacity         : 1,
                },
            ],
        },
        {
            title    : 'Repeated disablement does not restart animation',
            disabled : false,
            updates  : [
                {
                    title                   : 'Initially enabled',
                    expectedRunningDisabled : null,
                    expectedOpacity         : 1,
                },
                {
                    title                   : 'Disable (first time)',
                    disabled                : true,
                    delay                   : 200,
                    expectedRunningDisabled : true,
                },
                {
                    title                   : 'Set disabled to true again (no change)',
                    disabled                : true,
                    delay                   : 200,
                    expectedRunningDisabled : true, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningDisabled : null,
                    expectedOpacity         : 0.5,
                },
            ],
        },
    ] as DisabledStateAnimationTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentDisabled : boolean | undefined = initialDisabled;
            
            
            
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
                <DisabledStateTest
                    disabled={currentDisabled}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('disabled-state-test');
            await expect(box).toContainText('Disabled State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, disabled, delay, expectedRunningDisabled, expectedOpacity} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (disabled !== undefined) currentDisabled = disabled;
                
                
                
                // Re-render:
                await component.update(
                    <DisabledStateTest
                        disabled={currentDisabled}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    />
                );
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('disabled-state-test');
                await expect(box).toContainText('Disabled State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedRunningDisabled!== undefined) {
                    switch (expectedRunningDisabled) {
                        case true: // expectedRunningDisabled = true (disabling)
                            expect(runningAnimations.has('boo-test-enable')).toBe(false);
                            expect(runningAnimations.has('boo-test-disable')).toBe(true); // disabling
                            break;
                        case false: // expectedRunningDisabled = false (enabling)
                            expect(runningAnimations.has('boo-test-enable')).toBe(true); // enabling
                            expect(runningAnimations.has('boo-test-disable')).toBe(false);
                            break;
                        case null: // expectedRunningDisabled = null (idle)
                            expect(runningAnimations.has('boo-test-enable')).toBe(false);
                            expect(runningAnimations.has('boo-test-disable')).toBe(false);
                            break;
                    } // switch
                } // if
                
                if (expectedOpacity !== undefined) {
                    const actualOpacity = await box.evaluate((el) => window.getComputedStyle(el).opacity);
                    expect(actualOpacity).toBe(`${expectedOpacity}`);
                } // if
            } // for
        });
    } // for
});
