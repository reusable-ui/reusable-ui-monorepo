import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { CollapseStateTest } from './CollapseStateTest.js';



/**
 * Represents a single test scenario for validating expand/collapse state transitions.
 */
interface CollapseStateAnimationTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title    : string
    
    /**
     * Initial expanded/collapsed state.
     * - `true`: expanded
     * - `false`: collapsed
     */
    expanded : boolean
    
    /**
     * A sequence of updates applied to the expand/collapse state, including expected outcomes.
     */
    updates  : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                  : string
        
        /**
         * New value for expanded state.
         * Set to `undefined` to skip updating this part.
         */
        expanded              ?: boolean
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay                 ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected presence of running expand/collapse animation after the delay.
         * - `true`      : there is a running expand animation
         * - `false`     : there is a running collapse animation
         * - `null`      : there is no running expand/collapse animation
         * - `undefined` : nothing to expect
         */
        expectedRunningExpand ?: boolean | null
    }[]
}



test.describe('useCollapseState - animation', () => {
    for (const { title, expanded : initialExpanded, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title    : 'No running expand/collapse animation in all time',
            expanded : false,
            updates  : [
                {
                    title                 : 'Initially no running animation',
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Still no running animation',
                    
                    delay                 : 200,
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Still no running animation',
                    
                    delay                 : 1000,
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Still no running animation',
                    
                    delay                 : 1000,
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Expanded state after update',
            expanded : false,
            updates  : [
                {
                    title                 : 'Set expanded to true (immediate)',
                    expanded              : true, // The animation duration is 1000 ms.
                    
                    delay                 : 200, // Give a brief time to start the animation.
                    expectedRunningExpand : true,
                },
                {
                    title                 : 'Still have running animation',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningExpand : true,
                },
                {
                    title                 : 'Wait for expand animation to finish',
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Collapsed state after update',
            expanded : true,
            updates  : [
                {
                    title                 : 'Set expanded to false (immediate)',
                    expanded              : false, // The animation duration is 1000 ms.
                    
                    delay                 : 200, // Give a brief time to start the animation.
                    expectedRunningExpand : false,
                },
                {
                    title                 : 'Still have running animation',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningExpand : false,
                },
                {
                    title                 : 'Wait for collapse animation to finish',
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Expand, collapse, and re-expand quickly',
            expanded : false,
            updates  : [
                {
                    title                   : 'Expand',
                    expanded                : true,
                    
                    delay                   : 200,
                    expectedRunningExpand   : true,
                },
                {
                    title                   : 'Collapse before expansion finishes',
                    expanded                : false,
                    
                    delay                   : 200,
                    expectedRunningExpand   : true,  // Still expanding (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-expand again before collapse finishes',
                    expanded                : true,
                    
                    delay                   : 200,
                    expectedRunningExpand   : true, // Still in original expansion sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final expansion to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningExpand   : undefined, // No running animation.
                },
            ],
        },
        {
            title    : 'Collapse, expand, and re-collapse quickly',
            expanded : true,
            updates  : [
                {
                    title                   : 'Collapse',
                    expanded                : false,
                    
                    delay                   : 200,
                    expectedRunningExpand   : false,
                },
                {
                    title                   : 'Expand before collapsion finishes',
                    expanded                : true,
                    
                    delay                   : 200,
                    expectedRunningExpand   : false,  // Still collapsing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                   : 'Re-collapse again before expand finishes',
                    expanded                : false,
                    
                    delay                   : 200,
                    expectedRunningExpand   : false, // Still in original collapsion sequence (400ms remaining).
                },
                {
                    title                   : 'Wait for final collapsion to complete',
                    
                    delay                   : 600, // Includes additional margin to guarantee completion.
                    expectedRunningExpand   : undefined, // No running animation.
                },
            ],
        },
        {
            title    : 'Repeated expansion does not restart animation',
            expanded : false,
            updates  : [
                {
                    title                   : 'Expand (first time)',
                    expanded                : true,
                    delay                   : 200,
                    expectedRunningExpand   : true,
                },
                {
                    title                   : 'Set expanded to true again (no change)',
                    expanded                : true,
                    delay                   : 200,
                    expectedRunningExpand   : true, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningExpand   : undefined,
                },
            ],
        },
        {
            title    : 'Repeated collapsion does not restart animation',
            expanded : true,
            updates  : [
                {
                    title                   : 'Collapse (first time)',
                    expanded                : false,
                    delay                   : 200,
                    expectedRunningExpand   : false,
                },
                {
                    title                   : 'Set expanded to false again (no change)',
                    expanded                : false,
                    delay                   : 200,
                    expectedRunningExpand   : false, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                   : 'Wait for final animation to finish',
                    delay                   : 800, // Includes additional margin to guarantee completion.
                    expectedRunningExpand   : undefined,
                },
            ],
        },
    ] as CollapseStateAnimationTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentExpanded : boolean = initialExpanded;
            
            
            
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
                <CollapseStateTest
                    expanded={currentExpanded}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('collapse-state-test');
            await expect(box).toContainText('Collapse State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, expanded, delay, expectedRunningExpand} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (expanded !== undefined) currentExpanded = expanded;
                
                
                
                // Re-render:
                await component.update(
                    <CollapseStateTest
                        expanded={currentExpanded}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    />
                );
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('collapse-state-test');
                await expect(box).toContainText('Collapse State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedRunningExpand!== undefined) {
                    switch (expectedRunningExpand) {
                        case true:
                            expect(runningAnimations.has('boo-test-expand')).toBe(true);
                            expect(runningAnimations.has('boo-test-collapse')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-expand')).toBe(false);
                            expect(runningAnimations.has('boo-test-collapse')).toBe(true);
                            break;
                        case null:
                            expect(runningAnimations.has('boo-test-expand')).toBe(false);
                            expect(runningAnimations.has('boo-test-collapse')).toBe(false);
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
