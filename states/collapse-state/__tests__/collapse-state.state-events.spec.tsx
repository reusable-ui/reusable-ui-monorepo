import React, { MouseEvent as ReactMouseEvent } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { CollapseStateTest } from './CollapseStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { ExpandPhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of expanded/collapsed state transitions.
 */
interface CollapseStateEventTestCase {
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
     * A sequence of updates applied to the expanded/collapsed state, including expected outcomes.
     */
    updates   : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title          : string
        
        /**
         * Command a new value for expanded state.
         * - `'expand'` command to expand this part.
         * - `'collapse'` command to collapse this part.
         * - `undefined`: to skip updating this part.
         */
        action        ?: 'expand' | 'collapse'
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay         ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected expanded state.
         * - `'collapsed'`  : onCollapsingEnd event has been invoked
         * - `'collapsing'` : onCollapsingStart event has been invoked
         * - `'expanding'`  : onExpandingStart event has been invoked
         * - `'expanded'`   : onExpandingEnd event has been invoked
         * - `null`         : no event has been invoked
         * - `undefined`    : nothing to expect
         */
        expectedEvent ?: ExpandPhase | null
    }[]
}



test.describe('useCollapseStatePhaseEvents', () => {
    for (const { title, expanded : initialExpanded, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title    : 'Should be respond to change from collapsed to expanded',
            expanded : false,
            updates  : [
                {
                    title         : 'Change to expanded',
                    action        : 'expand',
                    
                    delay         : 0,
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay         : 200,
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'The expanding animation should be stopped and the expansion is still expanded',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'expanded',
                },
            ],
        },
        {
            title    : 'Should be respond to change from expanded to collapsed',
            expanded : true,
            updates  : [
                {
                    title         : 'Change to collapsed',
                    action        : 'collapse',
                    
                    delay         : 0,
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'The expanding animation should be stopped and the expansion is still collapsed',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'collapsed',
                },
            ],
        },
        {
            title    : 'Should be respond to change from collapsed to expanded then collapsed',
            expanded : false,
            updates  : [
                {
                    title         : 'Change to expanded',
                    action        : 'expand',
                    
                    delay         : 0,
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay         : 200,
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'The expanding animation should be stopped and the expansion is still expanded',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'expanded',
                },
                {
                    title         : 'Change to collapsed',
                    action        : 'collapse',
                    
                    delay         : 0,
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'The expanding animation should be stopped and the expansion is still collapsed',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'collapsed',
                },
            ],
        },
        {
            title    : 'Should be respond to change from expanded to collapsed then expanded',
            expanded : true,
            updates  : [
                {
                    title         : 'Change to collapsed',
                    action        : 'collapse',
                    
                    delay         : 0,
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still collapsed',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'The expanding animation should be stopped and the expansion is still collapsed',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'collapsed',
                },
                {
                    title         : 'Change to expanded',
                    action        : 'expand',
                    
                    delay         : 0,
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay         : 200,
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'The expanding animation should be running and the expansion is still expanded',
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'The expanding animation should be stopped and the expansion is still expanded',
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'expanded',
                },
            ],
        },
        {
            title    : 'Should be respond to expand, collapse, and re-expand quickly',
            expanded : false,
            updates  : [
                {
                    title         : 'Expand',
                    action        : 'expand',
                    
                    delay         : 200,
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'Collapse before expansion finishes',
                    action        : 'collapse',
                    
                    delay         : 200,
                    expectedEvent : 'expanding', // Still expanding (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Re-expand again before collapse finishes',
                    action        : 'expand',
                    
                    delay         : 200,
                    expectedEvent : 'expanding', // Still in original expansion sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final expansion to complete',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'expanded',
                },
            ],
        },
        {
            title    : 'Should be respond to collapse, expand, and re-collapse quickly',
            expanded : true,
            updates  : [
                {
                    title         : 'Collapse',
                    action        : 'collapse',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'Expand before collapsion finishes',
                    action        : 'expand',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing', // Still collapsing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Re-collapse again before expand finishes',
                    action        : 'collapse',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing', // Still in original collapsion sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final collapsion to complete',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'collapsed',
                },
            ],
        },
        {
            title    : 'Should be respond to expand and quickly switch to collapse',
            expanded : false,
            updates  : [
                {
                    title         : 'Expand',
                    action        : 'expand',
                    
                    delay         : 200,
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'Collapse before expansion finishes',
                    action        : 'collapse',
                    
                    delay         : 200,
                    expectedEvent : 'expanding', // Still expanding (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Still expanding',
                    
                    delay         : 200,
                    expectedEvent : 'expanding', // Still in original expansion sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final expansion to complete and switching to collapsing',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'Still collapsing',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing', // Still in switching collapsion sequence.
                },
                {
                    title         : 'Wait for final collapsion to complete',
                    
                    delay         : 1000, // Includes additional margin to guarantee completion.
                    expectedEvent : 'collapsed',
                },
            ],
        },
        {
            title    : 'Should be respond to collapse and quickly switch to expand',
            expanded : true,
            updates  : [
                {
                    title         : 'Collapse',
                    action        : 'collapse',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing',
                },
                {
                    title         : 'Expand before collapsion finishes',
                    action        : 'expand',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing', // Still collapsing (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : 'Still collapsing',
                    
                    delay         : 200,
                    expectedEvent : 'collapsing', // Still in original collapsion sequence (400ms remaining).
                },
                {
                    title         : 'Wait for final collapsion to complete and switching to expanding',
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'expanding',
                },
                {
                    title         : 'Still expanding',
                    
                    delay         : 200,
                    expectedEvent : 'expanding', // Still in original expansion sequence.
                },
                {
                    title         : 'Wait for final expansion to complete',
                    
                    delay         : 1000, // Includes additional margin to guarantee completion.
                    expectedEvent : 'expanded',
                },
            ],
        },
    ] as CollapseStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // Handlers:
            let lastNewExpanded : boolean | undefined = undefined;
            let lastEvent       : ReactMouseEvent<HTMLButtonElement, MouseEvent> | undefined = undefined;
            const handleExpandedChange : ValueChangeEventHandler<boolean, ReactMouseEvent<HTMLButtonElement, MouseEvent>> = (newExpanded, event) => {
                lastNewExpanded = newExpanded;
                lastEvent = event;
            };
            
            let lastExpandPhase : ExpandPhase | null = null;
            const handleExpandingStart : ValueChangeEventHandler<ExpandPhase, unknown> = (expandPhase) => {
                expect(expandPhase).toBe('expanding');
                lastExpandPhase = expandPhase;
            };
            const handleExpandingEnd : ValueChangeEventHandler<ExpandPhase, unknown> = (expandPhase) => {
                expect(expandPhase).toBe('expanded');
                lastExpandPhase = expandPhase;
            };
            const handleCollapsingStart : ValueChangeEventHandler<ExpandPhase, unknown> = (expandPhase) => {
                expect(expandPhase).toBe('collapsing');
                lastExpandPhase = expandPhase;
            };
            const handleCollapsingEnd : ValueChangeEventHandler<ExpandPhase, unknown> = (expandPhase) => {
                expect(expandPhase).toBe('collapsed');
                lastExpandPhase = expandPhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <CollapseStateTest
                    defaultExpanded={initialExpanded}
                    
                    onExpandedChange={handleExpandedChange}
                    
                    onExpandingStart={handleExpandingStart}
                    onExpandingEnd={handleExpandingEnd}
                    onCollapsingStart={handleCollapsingStart}
                    onCollapsingEnd={handleCollapsingEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('collapse-state-test');
            await expect(box).toContainText('Collapse State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, action, delay, expectedEvent} of updates) {
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
                if (expectedEvent !== undefined) {
                    expect(lastExpandPhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
