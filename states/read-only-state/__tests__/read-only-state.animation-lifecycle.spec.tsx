import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ReadOnlyStateTest } from './ReadOnlyStateTest.js';



/**
 * Represents a single test scenario for validating editable/read-only state transitions.
 */
interface ReadOnlyStateAnimationTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title     : string
    
    /**
     * Initial editable/read-only state.
     * - `true`: read-only
     * - `false`: editable
     * - `undefined`: default to editable
     */
    readOnly ?: boolean
    
    /**
     * A sequence of updates applied to the editable/read-only state, including expected outcomes.
     */
    updates   : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                    : string
        
        /**
         * New value for read-only state.
         * Set to `undefined` to skip updating this part.
         */
        readOnly                ?: boolean
        
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
         * The expected presence of running editable/read-only animation after the delay.
         * - `true`      : there is a running thawing animation
         * - `false`     : there is a running freezing animation
         * - `null`      : there is no running editable/read-only animation
         * - `undefined` : nothing to expect
         */
        expectedRunningReadOnly ?: boolean | null
        
        /**
         * The expected opacity of the editable/read-only element.
         * - `number`    : expected opacity
         * - `undefined` : nothing to expect
         */
        expectedOpacity         ?: number
    }[]
}



test.describe('useReadOnlyBehaviorState - animation', () => {
    for (const { title, readOnly : initialReadOnly, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title    : 'No running editable/read-only animation in all time',
            readOnly : true,
            updates  : [
                {
                    title                   : 'Initially no running animation',
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 200,
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Still no running animation',
                    
                    delay                   : 1000,
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 0.5,
                },
            ],
        },
        {
            title    : 'Editable state after update',
            readOnly : true,
            updates  : [
                {
                    title                   : 'Initially read-only',
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Set read-only to true (immediate)',
                    readOnly                : false, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'Wait for editable animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 1,
                },
            ],
        },
        {
            title    : 'Read-only state after update',
            readOnly : false,
            updates  : [
                {
                    title                   : 'Initially editable',
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 1,
                },
                {
                    title                   : 'Set read-only to false (immediate)',
                    readOnly                : true, // The animation duration is 1000 ms.
                    
                    delay                   : 200, // Give a brief time to start the animation.
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'Still have running animation',
                    
                    delay                   : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'Wait for read-only animation to finish',
                    
                    delay                   : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 0.5,
                },
            ],
        },
        {
            title    : 'Editable, read-only, and re-editable quickly',
            readOnly : true,
            updates  : [
                {
                    title                   : 'Initially read-only',
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Editable',
                    readOnly                : false,
                    
                    delay                   : 200,
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'Read-only before read-only-ness finishes',
                    readOnly                : true,
                    
                    delay                   : 200,
                    expectedRunningReadOnly : false,  // Still thawing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-editable again before read-only finishes',
                    readOnly                : false,
                    
                    delay                   : 200,
                    expectedRunningReadOnly : false, // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final read-only-ness to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningReadOnly : null, // No running animation.
                    expectedOpacity         : 1,
                },
            ],
        },
        {
            title    : 'Read-only, editable, and re-read-only quickly',
            readOnly : false,
            updates  : [
                {
                    title                   : 'Initially editable',
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 1,
                },
                {
                    title                   : 'Read-only',
                    readOnly                : true,
                    
                    delay                   : 200,
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'Editable before read-only-ness finishes',
                    readOnly                : false,
                    
                    delay                   : 200,
                    expectedRunningReadOnly : true,  // Still freezing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-read-only again before editable finishes',
                    readOnly                : true,
                    
                    delay                   : 200,
                    expectedRunningReadOnly : true, // Still in original read-only-ness sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final read-only-ness to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningReadOnly : null, // No running animation.
                    expectedOpacity         : 0.5,
                },
            ],
        },
        {
            title    : 'Repeated editablement does not restart animation',
            readOnly : true,
            updates  : [
                {
                    title                   : 'Initially read-only',
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 0.5,
                },
                {
                    title                   : 'Editable (first time)',
                    readOnly                : false,
                    delay                   : 200,
                    expectedRunningReadOnly : false,
                },
                {
                    title                   : 'Set read-only to false again (no change)',
                    readOnly                : false,
                    delay                   : 200,
                    expectedRunningReadOnly : false, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 1,
                },
            ],
        },
        {
            title    : 'Repeated read-only-ness does not restart animation',
            readOnly : false,
            updates  : [
                {
                    title                   : 'Initially editable',
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 1,
                },
                {
                    title                   : 'Read-only (first time)',
                    readOnly                : true,
                    delay                   : 200,
                    expectedRunningReadOnly : true,
                },
                {
                    title                   : 'Set read-only to true again (no change)',
                    readOnly                : true,
                    delay                   : 200,
                    expectedRunningReadOnly : true, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningReadOnly : null,
                    expectedOpacity         : 0.5,
                },
            ],
        },
    ] as ReadOnlyStateAnimationTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentReadOnly : boolean | undefined = initialReadOnly;
            
            
            
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
                <ReadOnlyStateTest
                    readOnly={currentReadOnly}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('read-only-state-test');
            await expect(box).toContainText('ReadOnly State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, readOnly, delay, expectedRunningReadOnly, expectedOpacity} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (readOnly !== undefined) currentReadOnly = readOnly;
                
                
                
                // Re-render:
                await component.update(
                    <ReadOnlyStateTest
                        readOnly={currentReadOnly}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    />
                );
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('read-only-state-test');
                await expect(box).toContainText('ReadOnly State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedRunningReadOnly!== undefined) {
                    switch (expectedRunningReadOnly) {
                        case true: // expectedRunningReadOnly = true (freezing)
                            expect(runningAnimations.has('boo-test-thaw')).toBe(false);
                            expect(runningAnimations.has('boo-test-freeze')).toBe(true); // freezing
                            break;
                        case false: // expectedRunningReadOnly = false (thawing)
                            expect(runningAnimations.has('boo-test-thaw')).toBe(true); // thawing
                            expect(runningAnimations.has('boo-test-freeze')).toBe(false);
                            break;
                        case null: // expectedRunningReadOnly = null (idle)
                            expect(runningAnimations.has('boo-test-thaw')).toBe(false);
                            expect(runningAnimations.has('boo-test-freeze')).toBe(false);
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
