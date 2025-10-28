import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { ViewStateTest } from './ViewStateTest.js';



/**
 * Represents a single test scenario for validating view state transitions.
 */
interface ViewStateAnimationTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title     : string
    
    /**
     * Initial view index.
     * - `0`, `1`, `2`, … : the component is showing the view at the given index
     */
    viewIndex : number
    
    /**
     * A sequence of updates applied to the view state, including expected outcomes.
     */
    updates   : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                  : string
        
        /**
         * New value for view index.
         * Set to `undefined` to skip updating this part.
         */
        viewIndex             ?: number
        
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
         * The expected presence of running view-switching animation after the delay.
         * - `'view-progressing'` : there is a progressing animation
         * - `'view-regressing'`  : there is a regressing animation
         * - `null`               : there is no running view-switching animation
         * - `undefined`          : nothing to expect
         */
        expectedRunningView   ?: 'view-progressing' | 'view-regressing' | null
        
        /**
         * The expected shift (marginInlineStart) in pixel of the shifting element.
         * - `number`    : expected shift in pixel
         * - `undefined` : nothing to expect
         */
        expectedShift         ?: number
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



test.describe('useViewBehaviorState - animation', () => {
    for (const { title, viewIndex : initialViewIndex, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        ...possibleIndices.map((controlledViewIndex) => ({
            title     : `No running view-switching animation in all time with viewIndex: ${controlledViewIndex}`,
            viewIndex : controlledViewIndex,
            updates   : [
                {
                    title                 : 'Initially no running animation',
                    expectedRunningView   : null,
                    expectedShift         : controlledViewIndex * 100,
                },
                {
                    title                 : 'Still no running animation',
                    
                    delay                 : 200,
                    expectedRunningView   : null,
                    expectedShift         : controlledViewIndex * 100,
                },
                {
                    title                 : 'Still no running animation',
                    
                    delay                 : 1000,
                    expectedRunningView   : null,
                    expectedShift         : controlledViewIndex * 100,
                },
                {
                    title                 : 'Still no running animation',
                    
                    delay                 : 1000,
                    expectedRunningView   : null,
                    expectedShift         : controlledViewIndex * 100,
                },
            ],
        } satisfies ViewStateAnimationTestCase)),
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Should be ${toIndex} after update from ${fromIndex}`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title                 : `Initially ${fromIndex}`,
                    expectedRunningView   : null,
                    expectedShift         : fromIndex * 100,
                },
                {
                    title                 : `Set viewIndex to ${toIndex} (immediate)`,
                    viewIndex             : toIndex, // The animation duration is 1000 ms.
                    
                    delay                 : 200, // Give a brief time to start the animation.
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-progressing' : 'view-regressing',
                },
                {
                    title                 : 'Still have running animation',
                    
                    delay                 : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-progressing' : 'view-regressing',
                },
                {
                    title                 : `Wait for ${toIndex} animation to finish`,
                    
                    delay                 : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningView   : null,
                    expectedShift         : toIndex * 100,
                },
            ],
        } satisfies ViewStateAnimationTestCase)),
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Change to ${toIndex}, ${fromIndex}, and re-${toIndex} quickly`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title                 : `Initially ${fromIndex}`,
                    expectedRunningView   : null,
                    expectedShift         : fromIndex * 100,
                },
                {
                    title                 : `Change to ${toIndex}`,
                    viewIndex             : toIndex,
                    
                    delay                 : 200,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-progressing' : 'view-regressing',
                },
                {
                    title                 : `Change to ${fromIndex} before ${toIndex} finishes`,
                    viewIndex             : fromIndex,
                    
                    delay                 : 200,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-progressing' : 'view-regressing',  // Still ${toIndex} (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                 : `Re-${toIndex} again before ${fromIndex} finishes`,
                    viewIndex             : toIndex,
                    
                    delay                 : 200,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-progressing' : 'view-regressing', // Still in original ${toIndex} sequence (400ms remaining).
                },
                {
                    title                 : `Wait for final ${toIndex} to complete`,
                    
                    delay                 : 600, // Includes additional margin to guarantee completion.
                    expectedRunningView   : null, // No running animation.
                    expectedShift         : toIndex * 100,
                },
            ],
        } satisfies ViewStateAnimationTestCase)),
        ...possibleChanges.map(({ fromIndex, toIndex }) => ({
            title     : `Repeated ${toIndex} does not restart animation (initially ${fromIndex})`,
            viewIndex : fromIndex,
            updates   : [
                {
                    title                 : `Initially ${fromIndex}`,
                    expectedRunningView   : null,
                    expectedShift         : fromIndex * 100,
                },
                {
                    title                 : `Change to ${toIndex} (first time)`,
                    viewIndex             : toIndex,
                    delay                 : 200,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-progressing' : 'view-regressing',
                },
                {
                    title                 : `Set viewIndex to ${toIndex} again (no change)`,
                    viewIndex             : toIndex,
                    delay                 : 200,
                    expectedRunningView   : (toIndex > fromIndex) ? 'view-progressing' : 'view-regressing', // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                 : 'Wait for final animation to finish',
                    delay                 : 800, // Includes additional margin to guarantee completion.
                    expectedRunningView   : null,
                    expectedShift         : toIndex * 100,
                },
            ],
        } satisfies ViewStateAnimationTestCase)),
    ] as ViewStateAnimationTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentViewIndex : number = initialViewIndex;
            
            
            
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
                <ViewStateTest
                    viewIndex={currentViewIndex}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('view-state-test');
            await expect(box).toContainText('View State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, viewIndex, delay, expectedRunningView, expectedShift} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (viewIndex !== undefined) currentViewIndex = viewIndex;
                
                
                
                // Re-render:
                await component.update(
                    <ViewStateTest
                        viewIndex={currentViewIndex}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                    />
                );
                
                
                
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
                if (expectedRunningView!== undefined) {
                    switch (expectedRunningView) {
                        case 'view-progressing':
                            expect(runningAnimations.has('boo-test-view-progressing')).toBe(true);
                            expect(runningAnimations.has('boo-test-view-regressing')).toBe(false);
                            break;
                        case 'view-regressing':
                            expect(runningAnimations.has('boo-test-view-progressing')).toBe(false);
                            expect(runningAnimations.has('boo-test-view-regressing')).toBe(true);
                            break;
                    } // switch
                } // if
                
                if (expectedShift !== undefined) {
                    // Get the expected shifted view box:
                    const viewBox = component.getByTestId(`view-item-${currentViewIndex}`);
                    await expect(viewBox).toContainText(`Item #${currentViewIndex}`);
                    
                    
                    
                    // Calculate the actual shift:
                    const boxLeft = await box.evaluate((el) => {
                        const left = el.getBoundingClientRect().left;
                        const borderLeftWidth = parseFloat(getComputedStyle(el).borderLeftWidth || '0');
                        return left + borderLeftWidth;
                    });
                    const viewBoxLeft = await viewBox.evaluate((el) => {
                        const left = el.getBoundingClientRect().left;
                        return left;
                    });
                    const relativeLeft = viewBoxLeft - boxLeft;
                    const virtualLeft = relativeLeft - (currentViewIndex * 100); // Compute the virtual left as if all views are rendered and stacked horizontally.
                    const virtualShift = -virtualLeft;
                    
                    
                    
                    // Verify the shift:
                    const deviance = Math.abs(virtualShift - expectedShift);
                    expect(deviance).toBeLessThanOrEqual(0.5); // Allow 0.5px of deviance due to subpixel rendering.
                } // if
            } // for
        });
    } // for
});
