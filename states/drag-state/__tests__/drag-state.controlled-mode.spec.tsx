import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { DragStateTest } from './DragStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating controlled drag state transitions.
 */
interface DragStateControlledTestCase {
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
         * The expected drag state.
         * - 'dragged'   : should be dragged
         * - 'dropped'   : should be dropped
         * - `undefined` : nothing to expect
         */
        expectedDrag        ?: 'dragged' | 'dropped'
        
        /**
         * The expected presence of running drag animation after the delay.
         * - `true`      : there is a running dragging animation
         * - `false`     : there is a running dropping animation
         * - `0`         : there is no running drag animation
         * - `undefined` : nothing to expect
         */
        expectedRunningDrag ?: boolean | 0
    }[]
}



test.describe('useDragBehaviorState - controlled mode', () => {
    for (const { title, dragged : initialDragged, computedDrag: initialComputedDrag, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be controlled to dropped',
            dragged       : false,
            updates       : [
                {
                    title               : 'Should be dropped and no animation',
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Should be controlled to dragged',
            dragged       : true,
            updates       : [
                {
                    title               : 'Should be dragged and no animation',
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Should be changed from dropped to dragged',
            dragged       : false,
            updates       : [
                {
                    title               : 'Should be dropped and no animation',
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dragged',
                    dragged             : true,
                    
                    expectedDrag        : 'dragged',
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be stopped and the drag-state is still dragged',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Should be changed from dragged to dropped',
            dragged       : true,
            updates       : [
                {
                    title               : 'Should be dragged and no animation',
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dropped',
                    dragged             : false,
                    
                    expectedDrag        : 'dropped',
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be stopped and the drag-state is still dropped',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Should be changed from dropped to dragged then dropped',
            dragged       : false,
            updates       : [
                {
                    title               : 'Should be dropped and no animation',
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dragged',
                    dragged             : true,
                    
                    expectedDrag        : 'dragged',
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be stopped and the drag-state is still dragged',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dropped',
                    dragged             : false,
                    
                    expectedDrag        : 'dropped',
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be stopped and the drag-state is still dropped',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Should be changed from dragged to dropped then dragged',
            dragged       : true,
            updates       : [
                {
                    title               : 'Should be dragged and no animation',
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dropped',
                    dragged             : false,
                    
                    expectedDrag        : 'dropped',
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be stopped and the drag-state is still dropped',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dragged',
                    dragged             : true,
                    
                    expectedDrag        : 'dragged',
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be stopped and the drag-state is still dragged',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Drag, drop, and re-drag quickly',
            dragged       : false,
            updates       : [
                {
                    title               : 'Should be dropped and no animation',
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Drag',
                    dragged             : true,
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'Drop before dragging finishes',
                    dragged             : false,
                    
                    delay               : 200,
                    expectedDrag        : 'dragged', // Still dragged because the dragging animation is not finished yet.
                    expectedRunningDrag : true,  // Still dragging (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title               : 'Re-drag again before dropping finishes',
                    dragged             : true,
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true, // Still in original dragging sequence (400ms remaining).
                },
                {
                    title               : 'Wait for final dragging to complete',
                    
                    delay               : 600, // Includes additional margin to guarantee completion.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0, // No running animation.
                },
            ],
        },
        {
            title         : 'Drop, drag, and re-drop quickly',
            dragged       : true,
            updates       : [
                {
                    title               : 'Should be dragged and no animation',
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Drop',
                    dragged             : false,
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'Drag before dropping finishes',
                    dragged             : true,
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',  // Still dropped because the dropping animation is not finished yet.
                    expectedRunningDrag : false,  // Still dropping (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title               : 'Re-drop again before dragging finishes',
                    dragged             : false,
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false, // Still in original dropping sequence (400ms remaining).
                },
                {
                    title               : 'Wait for final dropping to complete',
                    
                    delay               : 600, // Includes additional margin to guarantee completion.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0, // No running animation.
                },
            ],
        },
        
        
        
        {
            title         : 'Should be respond to change from dropped to dragged',
            dragged       : 'auto',
            computedDrag : false,
            updates       : [
                {
                    title               : 'Should be dropped and no animation',
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dragged',
                    computedDrag        : true,
                    
                    delay               : 0, // wait for async process
                    expectedDrag        : 'dragged',
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be stopped and the drag-state is still dragged',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from dragged to dropped',
            dragged       : 'auto',
            computedDrag : true,
            updates       : [
                {
                    title               : 'Should be dragged and no animation',
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dropped',
                    computedDrag        : false,
                    
                    delay               : 0, // wait for async process
                    expectedDrag        : 'dropped',
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dragging animation should be stopped and the drag-state is still dropped',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from dropped to dragged then dropped',
            dragged       : 'auto',
            computedDrag : false,
            updates       : [
                {
                    title               : 'Should be dropped and no animation',
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dragged',
                    computedDrag        : true,
                    
                    delay               : 0, // wait for async process
                    expectedDrag        : 'dragged',
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be stopped and the drag-state is still dragged',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dropped',
                    computedDrag        : false,
                    
                    delay               : 0, // wait for async process
                    expectedDrag        : 'dropped',
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be stopped and the drag-state is still dropped',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to change from dragged to dropped then dragged',
            dragged       : 'auto',
            computedDrag : true,
            updates       : [
                {
                    title               : 'Should be dragged and no animation',
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dropped',
                    computedDrag        : false,
                    
                    delay               : 0, // wait for async process
                    expectedDrag        : 'dropped',
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'The dropping animation should be stopped and the drag-state is still dropped',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Change to dragged',
                    computedDrag        : true,
                    
                    delay               : 0, // wait for async process
                    expectedDrag        : 'dragged',
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay               : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'The dragging animation should be stopped and the drag-state is still dragged',
                    
                    delay               : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
            ],
        },
        {
            title         : 'Should be respond to drag, drop, and re-drag quickly',
            dragged       : 'auto',
            computedDrag : false,
            updates       : [
                {
                    title               : 'Should be dropped and no animation',
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Drag',
                    computedDrag        : true,
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true,
                },
                {
                    title               : 'Drop before dragging finishes',
                    computedDrag        : false,
                    
                    delay               : 200,
                    expectedDrag        : 'dragged', // Still dragged because the dragging animation is not finished yet.
                    expectedRunningDrag : true,  // Still dragging (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title               : 'Re-drag again before dropping finishes',
                    computedDrag        : true,
                    
                    delay               : 200,
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : true, // Still in original dragging sequence (400ms remaining).
                },
                {
                    title               : 'Wait for final dragging to complete',
                    
                    delay               : 600, // Includes additional margin to guarantee completion.
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0, // No running animation.
                },
            ],
        },
        {
            title         : 'Should be respond to drop, drag, and re-drop quickly',
            dragged       : 'auto',
            computedDrag : true,
            updates       : [
                {
                    title               : 'Should be dragged and no animation',
                    expectedDrag        : 'dragged',
                    expectedRunningDrag : 0,
                },
                {
                    title               : 'Drop',
                    computedDrag        : false,
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false,
                },
                {
                    title               : 'Drag before dropping finishes',
                    computedDrag        : true,
                    
                    delay               : 200,
                    expectedDrag        : 'dropped', // Still dropped because the dropping animation is not finished yet.
                    expectedRunningDrag : false,  // Still dropping (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title               : 'Re-drop again before dragging finishes',
                    computedDrag        : false,
                    
                    delay               : 200,
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : false, // Still in original dropping sequence (400ms remaining).
                },
                {
                    title               : 'Wait for final dropping to complete',
                    
                    delay               : 600, // Includes additional margin to guarantee completion.
                    expectedDrag        : 'dropped',
                    expectedRunningDrag : 0, // No running animation.
                },
            ],
        },
    ] as DragStateControlledTestCase[]) {
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
            for (const { title, dragged, computedDrag, delay, expectedDrag, expectedRunningDrag} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (dragged !== undefined) currentDragged = dragged;
                if (computedDrag !== undefined) currentComputedDrag = computedDrag;
                
                
                
                // Reset the last received values:
                lastNewDrag = undefined;
                lastEvent = undefined;
                
                
                
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
                if (expectedDrag !== undefined) {
                    expect(box).toHaveAttribute('data-state', expectedDrag);
                } // if
                
                if (expectedRunningDrag!== undefined) {
                    if (computedDrag === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    
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
            } // for
        });
    } // for
});
