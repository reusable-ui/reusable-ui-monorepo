import React, { type AnimationEventHandler, MouseEvent as ReactMouseEvent } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { CollapseStateTest } from './CollapseStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating uncontrolled expand/collapse state transitions.
 */
interface CollapseStateUncontrolledTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title     : string
    
    /**
     * Initial expanded/collapsed state.
     * - `true`: expanded
     * - `false`: collapsed
     * - `undefined`: default to collapsed
     */
    expanded ?: boolean
    
    /**
     * A sequence of updates applied to the expand/collapse state, including expected outcomes.
     */
    updates   : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                  : string
        
        /**
         * Command a new value for expanded state.
         * - `'expand'` command to expand this part.
         * - `'collapse'` command to collapse this part.
         * - `undefined`: to skip updating this part.
         */
        action                ?: 'expand' | 'collapse'
        
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
         * The expected expanded state.
         * - 'expanded': should be expanded
         * - 'collapsed': should be collapsed
         * - `undefined`: nothing to expect
         */
        expectedExpanded      ?: 'expanded' | 'collapsed'
        
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



test.describe('useCollapseBehaviorState - uncontrolled mode', () => {
    for (const { title, expanded : initialExpanded, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title    : 'Should be defaults to collapsed',
            expanded : undefined,
            updates  : [
                {
                    title                 : 'Should be collapsed and no animation',
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Should be initially to collapsed',
            expanded : false,
            updates  : [
                {
                    title                 : 'Should be collapsed and no animation',
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Should be initially to expanded',
            expanded : true,
            updates  : [
                {
                    title                 : 'Should be expanded and no animation',
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Should be respond to change from collapsed to expanded',
            expanded : false,
            updates  : [
                {
                    title                 : 'Should be collapsed and no animation',
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Change to expanded',
                    action                : 'expand',
                    
                    expectedExpanded      : 'expanded',
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay                 : 200,
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : true,
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : true,
                },
                {
                    title                 : 'The expanding animation should be stopped and the expansion is still expanded',
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Should be respond to change from expanded to collapsed',
            expanded : true,
            updates  : [
                {
                    title                 : 'Should be expanded and no animation',
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Change to collapsed',
                    action                : 'collapse',
                    
                    expectedExpanded      : 'collapsed',
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay                 : 200,
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : false,
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : false,
                },
                {
                    title                 : 'The expanding animation should be stopped and the expansion is still collapsed',
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Should be respond to change from collapsed to expanded then collapsed',
            expanded : false,
            updates  : [
                {
                    title                 : 'Should be collapsed and no animation',
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Change to expanded',
                    action                : 'expand',
                    
                    expectedExpanded      : 'expanded',
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay                 : 200,
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : true,
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : true,
                },
                {
                    title                 : 'The expanding animation should be stopped and the expansion is still expanded',
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Change to collapsed',
                    action                : 'collapse',
                    
                    expectedExpanded      : 'collapsed',
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay                 : 200,
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : false,
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : false,
                },
                {
                    title                 : 'The expanding animation should be stopped and the expansion is still collapsed',
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Should be respond to change from expanded to collapsed then expanded',
            expanded : true,
            updates  : [
                {
                    title                 : 'Should be expanded and no animation',
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Change to collapsed',
                    action                : 'collapse',
                    
                    expectedExpanded      : 'collapsed',
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay                 : 200,
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : false,
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : false,
                },
                {
                    title                 : 'The expanding animation should be stopped and the expansion is still collapsed',
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Change to expanded',
                    action                : 'expand',
                    
                    expectedExpanded      : 'expanded',
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay                 : 200,
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : true,
                },
                {
                    title                 : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : true,
                },
                {
                    title                 : 'The expanding animation should be stopped and the expansion is still expanded',
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : null,
                },
            ],
        },
        {
            title    : 'Should be respond to expand, collapse, and re-expand quickly',
            expanded : false,
            updates  : [
                {
                    title                 : 'Should be collapsed and no animation',
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Expand',
                    action                : 'expand',
                    
                    delay                 : 200,
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : true,
                },
                {
                    title                 : 'Collapse before expansion finishes',
                    action                : 'collapse',
                    
                    delay                 : 200,
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : true,  // Still expanding (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                 : 'Re-expand again before collapse finishes',
                    action                : 'expand',
                    
                    delay                 : 200,
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : true, // Still in original expansion sequence (400ms remaining).
                },
                {
                    title                 : 'Wait for final expansion to complete',
                    
                    delay                 : 600, // Includes additional margin to guarantee completion.
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : null, // No running animation.
                },
            ],
        },
        {
            title    : 'Should be respond to collapse, expand, and re-collapse quickly',
            expanded : true,
            updates  : [
                {
                    title                 : 'Should be expanded and no animation',
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : null,
                },
                {
                    title                 : 'Collapse',
                    action                : 'collapse',
                    
                    delay                 : 200,
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : false,
                },
                {
                    title                 : 'Expand before collapsion finishes',
                    action                : 'expand',
                    
                    delay                 : 200,
                    expectedExpanded      : 'expanded',
                    expectedRunningExpand : false,  // Still collapsing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                 : 'Re-collapse again before expand finishes',
                    action                : 'collapse',
                    
                    delay                 : 200,
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : false, // Still in original collapsion sequence (400ms remaining).
                },
                {
                    title                 : 'Wait for final collapsion to complete',
                    
                    delay                 : 600, // Includes additional margin to guarantee completion.
                    expectedExpanded      : 'collapsed',
                    expectedRunningExpand : null, // No running animation.
                },
            ],
        },
    ] as CollapseStateUncontrolledTestCase[]) {
        test(title, async ({ mount }) => {
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
            
            let lastNewExpanded : boolean | undefined = undefined;
            let lastEvent       : ReactMouseEvent<HTMLButtonElement, MouseEvent> | undefined = undefined;
            const handleExpandedChange : ValueChangeEventHandler<boolean, ReactMouseEvent<HTMLButtonElement, MouseEvent>> = (newExpanded, event) => {
                lastNewExpanded = newExpanded;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <CollapseStateTest
                    defaultExpanded={initialExpanded}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onExpandedChange={handleExpandedChange}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('collapse-state-test');
            await expect(box).toContainText('Collapse State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, action, delay, expectedExpanded, expectedRunningExpand} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (action !== undefined) {
                    // Reset the last received values:
                    lastNewExpanded = undefined;
                    lastEvent = undefined;
                    
                    // Simulate user interaction to change the state:
                    if (action === 'expand') {
                        await component.getByTestId('expand-btn').click();
                    }
                    else if (action === 'collapse') {
                        await component.getByTestId('collapse-btn').click();
                    } // if
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewExpanded).toBe(action === 'expand');
                    expect((lastEvent as any)?.type).toBe('click');
                    expect((lastEvent as any)?.nativeEvent.isTrusted).toBe(true);
                } // if
                
                
                
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
                if (expectedExpanded !== undefined) {
                    expect(box).toHaveAttribute('data-state', expectedExpanded);
                } // if
                
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
