import React, { type AnimationEventHandler, MouseEvent as ReactMouseEvent } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ViewStateTest } from './ViewStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating uncontrolled view state transitions.
 */
interface ViewStateUncontrolledTestCase {
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
        title                  : string
        
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
        delay                 ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected view index.
         * - number: the expected view index
         * - `undefined`: nothing to expect
         */
        expectedViewIndex     ?: number
        
        /**
         * The expected presence of running view-switching animation after the delay.
         * - `'view-advancing'` : there is a advancing animation
         * - `'view-receding'`  : there is a receding animation
         * - `null`             : there is no running view-switching animation
         * - `undefined`        : nothing to expect
         */
        expectedRunningView   ?: 'view-advancing' | 'view-receding' | null
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



test.describe('useViewBehaviorState - uncontrolled mode', () => {
    for (const { title, viewIndex : initialViewIndex, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title     : 'Should be defaults to 0',
            viewIndex : undefined,
            updates   : [
                {
                    title                 : 'Should be 0 and no animation',
                    expectedViewIndex     : 0,
                    expectedRunningView   : null,
                },
            ],
        },
        ...possibleIndices.map((initialViewIndex) => ({
            title     : `Should be initially to ${initialViewIndex}`,
            viewIndex : initialViewIndex,
            updates   : [
                {
                    title                 : `Should be ${initialViewIndex} and no animation`,
                    expectedViewIndex     : initialViewIndex,
                    expectedRunningView   : null,
                },
            ],
        } satisfies ViewStateUncontrolledTestCase)),
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Should be respond to change from ${fromIndex} to ${toIndex}`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title                 : `Should be ${fromIndex} and no animation`,
                    expectedViewIndex     : fromIndex,
                    expectedRunningView   : null,
                },
                {
                    title                 : `Change to ${toIndex}`,
                    action                : toIndex,
                    
                    expectedViewIndex     : toIndex,
                },
                {
                    title                 : `The ${(toIndex > fromIndex) ? 'advancing (next)' : 'receding (previous)'} view animation should be running and the viewIndex is still ${toIndex}`,
                    
                    delay                 : 200,
                    expectedViewIndex     : toIndex,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title                 : `The ${(toIndex > fromIndex) ? 'advancing (next)' : 'receding (previous)'} view animation should be running and the viewIndex is still ${toIndex}`,
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedViewIndex     : toIndex,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title                 : `The ${(toIndex > fromIndex) ? 'advancing (next)' : 'receding (previous)'} view animation should be stopped and the viewIndex is still ${toIndex}`,
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedViewIndex     : toIndex,
                    expectedRunningView   : null,
                },
            ],
        } satisfies ViewStateUncontrolledTestCase)),
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Should be respond to change from ${fromIndex} to ${toIndex} then ${fromIndex}`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title                 : `Should be ${fromIndex} and no animation`,
                    expectedViewIndex     : fromIndex,
                    expectedRunningView   : null,
                },
                {
                    title                 : `Change to ${toIndex}`,
                    action                : toIndex,
                    
                    expectedViewIndex     : toIndex,
                },
                {
                    title                 : `The advancing (next) view animation should be running and the viewIndex is still ${toIndex}`,
                    
                    delay                 : 200,
                    expectedViewIndex     : toIndex,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title                 : `The advancing (next) view animation should be running and the viewIndex is still ${toIndex}`,
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedViewIndex     : toIndex,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title                 : `The advancing (next) view animation should be stopped and the viewIndex is still ${toIndex}`,
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedViewIndex     : toIndex,
                    expectedRunningView   : null,
                },
                {
                    title                 : `Change to ${fromIndex}`,
                    action                : fromIndex,
                    
                    expectedViewIndex     : fromIndex,
                },
                {
                    title                 : `The advancing (next) view animation should be running and the viewIndex is still ${fromIndex}`,
                    
                    delay                 : 200,
                    expectedViewIndex     : fromIndex,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-receding' : 'view-advancing',
                },
                {
                    title                 : `The advancing (next) view animation should be running and the viewIndex is still ${fromIndex}`,
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedViewIndex     : fromIndex,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-receding' : 'view-advancing',
                },
                {
                    title                 : `The advancing (next) view animation should be stopped and the viewIndex is still ${fromIndex}`,
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedViewIndex     : fromIndex,
                    expectedRunningView   : null,
                },
            ],
        } satisfies ViewStateUncontrolledTestCase)),
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Should be respond to ${toIndex}, ${fromIndex}, and re-${toIndex} quickly`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title                 : `Should be ${fromIndex} and no animation`,
                    expectedViewIndex     : fromIndex,
                    expectedRunningView   : null,
                },
                {
                    title                 : `Change to ${toIndex}`,
                    action                : toIndex,
                    
                    delay                 : 200,
                    expectedViewIndex     : toIndex,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',
                },
                {
                    title                 : `Change to ${fromIndex} before ${toIndex} finishes`,
                    action                : fromIndex,
                    
                    delay                 : 200,
                    expectedViewIndex     : toIndex, // Still ${toIndex} because the ${toIndex} animation is not finished yet.
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding',  // Still ${toIndex} (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                 : `Re-${toIndex} again before ${fromIndex} finishes`,
                    action                : toIndex,
                    
                    delay                 : 200,
                    expectedViewIndex     : toIndex,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-advancing' : 'view-receding', // Still in original ${toIndex} sequence (400ms remaining).
                },
                {
                    title                 : `Wait for final ${toIndex} to complete`,
                    
                    delay                 : 600, // Includes additional margin to guarantee completion.
                    expectedViewIndex     : toIndex,
                    expectedRunningView   : null, // No running animation.
                },
            ],
        } satisfies ViewStateUncontrolledTestCase)),
    ] as ViewStateUncontrolledTestCase[]) {
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
            
            let lastNewViewIndex : number | undefined = undefined;
            let lastEvent       : ReactMouseEvent<HTMLButtonElement, MouseEvent> | undefined = undefined;
            const handleViewIndexChange : ValueChangeEventHandler<number, ReactMouseEvent<HTMLButtonElement, MouseEvent>> = (newViewIndex, event) => {
                lastNewViewIndex = newViewIndex;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <ViewStateTest
                    defaultViewIndex={initialViewIndex}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onViewIndexChange={handleViewIndexChange}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('view-state-test');
            await expect(box).toContainText('View State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, action, delay, expectedViewIndex, expectedRunningView} of updates) {
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
                if (expectedViewIndex !== undefined) {
                    expect(box).toHaveAttribute('data-state', String(expectedViewIndex));
                } // if
                
                if (expectedRunningView!== undefined) {
                    switch (expectedRunningView) {
                        case 'view-advancing':
                            expect(runningAnimations.has('boo-test-view-advancing')).toBe(true);
                            expect(runningAnimations.has('boo-test-view-receding')).toBe(false);
                            break;
                        case 'view-receding':
                            expect(runningAnimations.has('boo-test-view-advancing')).toBe(false);
                            expect(runningAnimations.has('boo-test-view-receding')).toBe(true);
                            break;
                    } // switch
                } // if
            } // for
        });
    } // for
});
