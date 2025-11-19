import React, { MouseEvent as ReactMouseEvent } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ViewStateTest } from './ViewStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { ViewPhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of view state transitions.
 */
interface ViewStateEventTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title      : string
    
    /**
     * Initial view index.
     * - `0`, `1`, `2`, … : the component is showing the view at the given index
     * - `undefined`: default to `0` (first view)
     */
    viewIndex ?: number
    
    /**
     * A sequence of updates applied to the view state, including expected outcomes.
     */
    updates    : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title          : string
        
        /**
         * Command for jumping to a specific view.
         * - `0`, `1`, `2`, … : jump to the view at the given index
         * - `undefined`: to skip updating this part.
         */
        action                ?: number
        
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
         * The expected view-switching state.
         * - `'view-advancing'` : onViewAdvancingStart event has been invoked
         * - `'view-receding'`  : onViewRecedingStart event has been invoked
         * - `'view-settled'`   : onViewAdvancingEnd or onViewRecedingEnd event has been invoked
         * - `null`             : no event has been invoked
         * - `undefined`        : nothing to expect
         */
        expectedEvent ?: ViewPhase | null
    }[]
}



const possibleIndices = [0, 1, 2, 3];

interface IndexChange {
    fromIndex : number
    toIndex   : number
}
const possibleChanges : IndexChange[] = possibleIndices.flatMap(fromIndex => (
    possibleIndices
        .filter(toIndex => toIndex !== fromIndex)
        .map(toIndex => ({ fromIndex, toIndex } satisfies IndexChange))
));



test.describe('useViewStatePhaseEvents', () => {
    for (const { title, viewIndex : initialViewIndex, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Should be respond to change from ${fromIndex} to ${toIndex}`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title         : `Change to  ${toIndex}`,
                    action        : toIndex,
                    
                    delay         : 0,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title         : `The ${(toIndex > fromIndex) ? 'advancing (next)' : 'receding (previous)'} view animation should be running and the viewIndex is still ${toIndex}`,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title         : `The ${(toIndex > fromIndex) ? 'advancing (next)' : 'receding (previous)'} view animation should be running and the viewIndex is still ${toIndex}`,
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title         : `The ${(toIndex > fromIndex) ? 'advancing (next)' : 'receding (previous)'} view animation should be stopped and the viewIndex is still ${toIndex}`,
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'view-settled',
                },
            ],
        } satisfies ViewStateEventTestCase)),
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Should be respond to change from ${fromIndex} to ${toIndex} then ${fromIndex}`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title         : `Change to ${toIndex}`,
                    action        : toIndex,
                    
                    delay         : 0,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title         : `The advancing (next) view animation should be running and the viewIndex is still ${toIndex}`,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title         : `The advancing (next) view animation should be running and the viewIndex is still ${toIndex}`,
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title         : `The advancing (next) view animation should be stopped and the viewIndex is still ${toIndex}`,
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'view-settled',
                },
                {
                    title         : `Change to ${fromIndex}`,
                    action        : fromIndex,
                    
                    delay         : 0,
                    expectedEvent : (toIndex > fromIndex) ? 'view-receding' : 'view-advancing',
                },
                {
                    title         : `The advancing (next) view animation should be running and the viewIndex is still ${fromIndex}`,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-receding' : 'view-advancing',
                },
                {
                    title         : `The advancing (next) view animation should be running and the viewIndex is still ${fromIndex}`,
                    
                    delay         : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent : (toIndex > fromIndex) ? 'view-receding' : 'view-advancing',
                },
                {
                    title         : `The advancing (next) view animation should be stopped and the viewIndex is still ${fromIndex}`,
                    
                    delay         : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent : 'view-settled',
                },
            ],
        } satisfies ViewStateEventTestCase)),
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Should be respond to ${toIndex}, ${fromIndex}, and re-${toIndex} quickly`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title         : `Change to ${toIndex}`,
                    action        : toIndex,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title         : `Change to ${fromIndex} before ${toIndex} finishes`,
                    action        : fromIndex,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding', // Still ${toIndex} (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : `Re-${toIndex} again before ${fromIndex} finishes`,
                    action        : toIndex,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding', // Still in original ${toIndex} sequence (400ms remaining).
                },
                {
                    title         : `Wait for final ${toIndex} to complete`,
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : 'view-settled',
                },
            ],
        } satisfies ViewStateEventTestCase)),
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Should be respond to ${toIndex} and quickly switch to ${fromIndex}`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title         : `Change to ${toIndex}`,
                    action        : toIndex,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title         : `Change to ${fromIndex} before ${toIndex} finishes`,
                    action        : fromIndex,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding', // Still ${toIndex} (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title         : `Still ${toIndex}`,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding', // Still in original ${toIndex} sequence (400ms remaining).
                },
                {
                    title         : `Wait for final ${toIndex} to complete and switching to ${fromIndex}`,
                    
                    delay         : 600, // Includes additional margin to guarantee completion.
                    expectedEvent : (toIndex > fromIndex) ? 'view-receding' : 'view-advancing',
                },
                {
                    title         : `Still ${fromIndex}`,
                    
                    delay         : 200,
                    expectedEvent : (toIndex > fromIndex) ? 'view-receding' : 'view-advancing', // Still in switching ${fromIndex} sequence.
                },
                {
                    title         : `Wait for final ${fromIndex} to complete`,
                    
                    delay         : 1000, // Includes additional margin to guarantee completion.
                    expectedEvent : 'view-settled',
                },
            ],
        } satisfies ViewStateEventTestCase)),
    ] as ViewStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // Handlers:
            let lastNewViewIndex : number | undefined = undefined;
            let lastEvent       : ReactMouseEvent<HTMLButtonElement, MouseEvent> | undefined = undefined;
            const handleViewIndexChange : ValueChangeEventHandler<number, ReactMouseEvent<HTMLButtonElement, MouseEvent>> = (newViewIndex, event) => {
                lastNewViewIndex = newViewIndex;
                lastEvent = event;
            };
            
            let lastViewPhase : ViewPhase | null = null;
            const handleViewAdvancingStart : ValueChangeEventHandler<ViewPhase, unknown> = (viewPhase) => {
                expect(viewPhase).toBe('view-advancing');
                lastViewPhase = viewPhase;
            };
            const handleViewAdvancingEnd   : ValueChangeEventHandler<ViewPhase, unknown> = (viewPhase) => {
                expect(viewPhase).toBe('view-settled');
                lastViewPhase = viewPhase;
            };
            const handleViewRecedingStart  : ValueChangeEventHandler<ViewPhase, unknown> = (viewPhase) => {
                expect(viewPhase).toBe('view-receding');
                lastViewPhase = viewPhase;
            };
            const handleViewRecedingEnd    : ValueChangeEventHandler<ViewPhase, unknown> = (viewPhase) => {
                expect(viewPhase).toBe('view-settled');
                lastViewPhase = viewPhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <ViewStateTest
                    defaultViewIndex={initialViewIndex}
                    
                    onViewIndexChange={handleViewIndexChange}
                    
                    onViewAdvancingStart={handleViewAdvancingStart}
                    onViewAdvancingEnd={handleViewAdvancingEnd}
                    onViewRecedingStart={handleViewRecedingStart}
                    onViewRecedingEnd={handleViewRecedingEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('view-state-test');
            await expect(box).toContainText('View State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, action, delay, expectedEvent} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (action !== undefined) {
                    // Reset the last received values:
                    lastNewViewIndex = undefined;
                    lastEvent = undefined;
                    
                    // Simulate user interaction to change the state:
                    await component.getByTestId(`switch-${action}-btn`).click({
                        force: true,
                        noWaitAfter: true,
                        timeout : 0,
                    });
                    
                    // Wait for brief moment to ensure the click event is already processed:
                    await new Promise((resolve) => {
                        setTimeout(resolve, 10);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewViewIndex).toBe(action);
                    expect((lastEvent as any)?.type).toBe('click');
                    expect((lastEvent as any)?.nativeEvent.isTrusted).toBe(true);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('view-state-test');
                await expect(box).toContainText('View State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedEvent !== undefined) {
                    expect(lastViewPhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
