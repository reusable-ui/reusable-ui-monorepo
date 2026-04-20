import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { DragStateTest } from './DragStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating drag state transitions.
 */
interface DragStateAnimationTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title         : string
    
    /**
     * Initial drag state.
     * - `true`   : dragged
     * - `false`  : dropped
     * - `'auto'` : automatic determine
     */
    dragged       : boolean | 'auto'
    
    /**
     * Initial computed drag state.
     * - `true`      : dragged
     * - `false`     : dropped
     * - `undefined` : use default behavior.
     */
    computedDrag ?: boolean
    
    /**
     * A sequence of updates applied to the drag state, including expected outcomes.
     */
    updates       : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                : string
        
        /**
         * New value for drag state.
         * Set to `undefined` to skip updating this part.
         */
        dragged             ?: boolean | 'auto'
        
        /**
         * New value computed drag state.
         * - `true`      : dragged
         * - `false`     : dropped
         * - `undefined` : skip updating this part.
         */
        computedDrag        ?: boolean
        
        /**
         * Delay (in milliseconds) after applying the update before performing result assertions.
         * 
         * - `undefined`: check immediately (no delay).
         * - `0`: defer until the next event loop tick.
         * - Any other value: wait for the specified duration before checking.
         */
        delay               ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected presence of running drag animation after the delay.
         * - `true`      : there is a running dragging animation
         * - `false`     : there is a running dropping animation
         * - `0`         : there is no running drag animation
         * - `undefined` : nothing to expect
         */
        expectedRunningDrag ?: boolean | 0
        
        /**
         * The expected background color of the draggable element.
         * - `string`    : expected background color`
         * - `undefined` : nothing to expect
         */
        expectedBackground  ?: string
    }[]
}



const BACKGROUND_COLOR_DRAGGED = 'color(srgb 0 0 1)'
const BACKGROUND_COLOR_DROPPED = 'color(srgb 0.5 0.5 1)';



test.describe('useDragBehaviorState - animation', () => {
    for (const { title, dragged : initialDragged, computedDrag: initialComputedDrag, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'No running drag animation in all time for initially dragged',
            dragged       : true,
            computedDrag : undefined,
            updates       : [
                {
                    title               : 'Initially no running animation',
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
                {
                    title               : 'Still no running animation',
                    
                    delay               : 200,
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
                {
                    title               : 'Still no running animation',
                    
                    delay               : 1000,
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
                {
                    title               : 'Still no running animation',
                    
                    delay               : 1000,
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
            ],
        },
        {
            title         : 'No running drag animation in all time for initially dropped',
            dragged       : false,
            computedDrag : undefined,
            updates       : [
                {
                    title               : 'Initially no running animation',
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
                {
                    title               : 'Still no running animation',
                    
                    delay               : 200,
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
                {
                    title               : 'Still no running animation',
                    
                    delay               : 1000,
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
                {
                    title               : 'Still no running animation',
                    
                    delay               : 1000,
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
            ],
        },
        {
            title         : 'Dragged state after update (dropped => dragged)',
            dragged       : false,
            updates       : [
                {
                    title               : 'Initially dropped',
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
                {
                    title               : 'Set dragged to true (immediate)',
                    dragged             : true, // The animation duration is 1000 ms.
                    
                    delay               : 200, // Give a brief time to start the animation.
                    expectedRunningDrag : true,
                },
                {
                    title               : 'Still have running animation',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningDrag : true,
                },
                {
                    title               : 'Wait for dragging animation to finish',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
            ],
        },
        {
            title         : 'Dropped state after update (dragged => dropped)',
            dragged       : true,
            updates       : [
                {
                    title               : 'Initially dragged',
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
                {
                    title               : 'Set dragged to false (immediate)',
                    dragged             : false, // The animation duration is 1000 ms.
                    
                    delay               : 200, // Give a brief time to start the animation.
                    expectedRunningDrag : false,
                },
                {
                    title               : 'Still have running animation',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningDrag : false,
                },
                {
                    title               : 'Wait for dropping animation to finish',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
            ],
        },
        {
            title         : 'Drag, drop, and re-drag quickly',
            dragged       : false,
            updates       : [
                {
                    title               : 'Initially dropped',
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
                {
                    title               : 'Drag',
                    dragged             : true,
                    
                    delay               : 200,
                    expectedRunningDrag : true,
                },
                {
                    title               : 'Drop before dragging finishes',
                    dragged             : false,
                    
                    delay               : 200,
                    expectedRunningDrag : true,  // Still dragging (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title               : 'Re-drag again before dropping finishes',
                    dragged             : true,
                    
                    delay               : 200,
                    expectedRunningDrag : true, // Still in original dragging sequence (400ms remaining).
                },
                {
                    title               : 'Wait for final dragging to complete',
                    
                    delay               : 600, // Includes additional margin to guarantee completion.
                    expectedRunningDrag : 0, // No running animation.
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
            ],
        },
        {
            title         : 'Drop, drag, and re-drop quickly',
            dragged       : true,
            updates       : [
                {
                    title               : 'Initially dragged',
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
                {
                    title               : 'Drop',
                    dragged             : false,
                    
                    delay               : 200,
                    expectedRunningDrag : false,
                },
                {
                    title               : 'Drag before dropping finishes',
                    dragged             : true,
                    
                    delay               : 200,
                    expectedRunningDrag : false,  // Still dropping (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title               : 'Re-drop again before dragging finishes',
                    dragged             : false,
                    
                    delay               : 200,
                    expectedRunningDrag : false, // Still in original dropping sequence (400ms remaining).
                },
                {
                    title               : 'Wait for final dropping to complete',
                    
                    delay               : 600, // Includes additional margin to guarantee completion.
                    expectedRunningDrag : 0, // No running animation.
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
            ],
        },
        {
            title         : 'Repeated dragging does not restart animation',
            dragged       : false,
            updates       : [
                {
                    title               : 'Initially dropped',
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
                {
                    title               : 'Drag (first time)',
                    dragged             : true,
                    delay               : 200,
                    expectedRunningDrag : true,
                },
                {
                    title               : 'Set dragged to true again (no change)',
                    dragged             : true,
                    delay               : 200,
                    expectedRunningDrag : true, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title               : 'Wait for final animation to finish',
                    delay               : 800, // Includes additional margin to guarantee completion.
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
            ],
        },
        {
            title         : 'Repeated dropping does not restart animation',
            dragged       : true,
            updates       : [
                {
                    title               : 'Initially dragged',
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DRAGGED,
                },
                {
                    title               : 'Drop (first time)',
                    dragged             : false,
                    delay               : 200,
                    expectedRunningDrag : false,
                },
                {
                    title               : 'Set dragged to false again (no change)',
                    dragged             : false,
                    delay               : 200,
                    expectedRunningDrag : false, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title               : 'Wait for final animation to finish',
                    delay               : 800, // Includes additional margin to guarantee completion.
                    expectedRunningDrag : 0,
                    expectedBackground  : BACKGROUND_COLOR_DROPPED,
                },
            ],
        },
    ] as DragStateAnimationTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentDragged         : boolean | 'auto' | undefined = initialDragged;
            let currentComputedDrag : boolean | null          | undefined = initialComputedDrag;
            
            
            
            // Stores currently drag animation names:
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
            
            let lastNewDrag : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleDragUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newDrag, event) => {
                lastNewDrag = newDrag;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <DragStateTest
                    dragged={currentDragged}
                    computedDrag={currentComputedDrag}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onDragUpdate={handleDragUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('drag-state-test');
            await expect(box).toContainText('Drag State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, dragged, computedDrag, delay, expectedRunningDrag, expectedBackground} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (dragged !== undefined) currentDragged = dragged;
                if (computedDrag !== undefined) currentComputedDrag = computedDrag;
                
                
                
                // Re-render:
                await component.update(
                    <DragStateTest
                        dragged={currentDragged}
                        computedDrag={currentComputedDrag}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onDragUpdate={handleDragUpdate}
                    />
                );
                
                
                
                // Validate events:
                if (computedDrag !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewDrag).toBe(computedDrag);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('drag-state-test');
                await expect(box).toContainText('Drag State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedRunningDrag!== undefined) {
                    if (computedDrag === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    console.log(`${(performance.now() / 1000).toFixed(2)} expect running drag-state: `, expectedRunningDrag);
                    
                    switch (expectedRunningDrag) {
                        case true:
                            expect(runningAnimations.has('boo-test-dragging')).toBe(true);
                            expect(runningAnimations.has('boo-test-dropping')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-dragging')).toBe(false);
                            expect(runningAnimations.has('boo-test-dropping')).toBe(true);
                            break;
                        case 0:
                            expect(runningAnimations.has('boo-test-dragging')).toBe(false);
                            expect(runningAnimations.has('boo-test-dropping')).toBe(false);
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
