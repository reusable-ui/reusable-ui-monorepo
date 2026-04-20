import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { DragStateTest } from './DragStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { DragPhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of drag state transitions.
 */
interface DragStateEventTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title          : string
    
    /**
     * Initial drag state.
     * - `true`   : dragged
     * - `false`  : dropped
     * - `'auto'` : automatic determine
     */
    dragged        : boolean | 'auto'
    
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
    updates        : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                 : string
        
        /**
         * New value for drag state.
         * Set to `undefined` to skip updating this part.
         */
        dragged              ?: boolean | 'auto'
        
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
        delay                ?: number
        
        // Expected Outcomes:
        
        /**
         * The expected drag state.
         * - `'dragging'` : onDraggingStart event has been invoked
         * - `'dragged'`  : onDraggingEnd event has been invoked
         * - `'dropping'` : onDroppingStart event has been invoked
         * - `'dropped'`  : onDroppingEnd event has been invoked
         * - `null`       : no event has been invoked
         * - `undefined`  : nothing to expect
         */
        expectedEvent        ?: DragPhase | null
    }[]
}



test.describe('useDragStatePhaseEvents', () => {
    for (const { title, dragged : initialDragged, computedDrag: initialComputedDrag, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be respond to change from dropped to dragged',
            dragged       : 'auto',
            computedDrag : false,
            updates       : [
                {
                    title                : 'Should be dropped and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to dragged',
                    computedDrag        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay                : 200,
                    expectedEvent        : 'dragging',
                },
                {
                    title                : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'dragging',
                },
                {
                    title                : 'The dragging animation should be stopped and the drag-state is still dragged',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'dragged',
                },
            ],
        },
        {
            title         : 'Should be respond to change from dragged to dropped',
            dragged       : 'auto',
            computedDrag : true,
            updates       : [
                {
                    title                : 'Should be dragged and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to dropped',
                    computedDrag        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay                : 200,
                    expectedEvent        : 'dropping',
                },
                {
                    title                : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'dropping',
                },
                {
                    title                : 'The dragging animation should be stopped and the drag-state is still dropped',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'dropped',
                },
            ],
        },
        {
            title         : 'Should be respond to change from dropped to dragged then dropped',
            dragged       : 'auto',
            computedDrag : false,
            updates       : [
                {
                    title                : 'Should be dropped and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to dragged',
                    computedDrag        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay                : 200,
                    expectedEvent        : 'dragging',
                },
                {
                    title                : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'dragging',
                },
                {
                    title                : 'The dragging animation should be stopped and the drag-state is still dragged',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'dragged',
                },
                {
                    title                : 'Change to dropped',
                    computedDrag        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay                : 200,
                    expectedEvent        : 'dropping',
                },
                {
                    title                : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'dropping',
                },
                {
                    title                : 'The dropping animation should be stopped and the drag-state is still dropped',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'dropped',
                },
            ],
        },
        {
            title         : 'Should be respond to change from dragged to dropped then dragged',
            dragged       : 'auto',
            computedDrag : true,
            updates       : [
                {
                    title                : 'Should be dragged and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to dropped',
                    computedDrag        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay                : 200,
                    expectedEvent        : 'dropping',
                },
                {
                    title                : 'The dropping animation should be running and the drag-state is still dropped',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'dropping',
                },
                {
                    title                : 'The dropping animation should be stopped and the drag-state is still dropped',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'dropped',
                },
                {
                    title                : 'Change to dragged',
                    computedDrag        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay                : 200,
                    expectedEvent        : 'dragging',
                },
                {
                    title                : 'The dragging animation should be running and the drag-state is still dragged',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'dragging',
                },
                {
                    title                : 'The dragging animation should be stopped and the drag-state is still dragged',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'dragged',
                },
            ],
        },
        {
            title         : 'Should be respond to drag, drop, and re-drag quickly',
            dragged       : 'auto',
            computedDrag : false,
            updates       : [
                {
                    title                : 'Should be dropped and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Drag',
                    computedDrag        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'dragging',
                },
                {
                    title                : 'Drop before dragging finishes',
                    computedDrag        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'dragging',  // Still dragging (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-drag again before dropping finishes',
                    computedDrag        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'dragging', // Still in original dragging sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final dragging to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedEvent        : 'dragged', // No running animation.
                },
            ],
        },
        {
            title         : 'Should be respond to drop, drag, and re-drop quickly',
            dragged       : 'auto',
            computedDrag : true,
            updates       : [
                {
                    title                : 'Should be dragged and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Drop',
                    computedDrag        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'dropping',
                },
                {
                    title                : 'Drag before dropping finishes',
                    computedDrag        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'dropping',  // Still dropping (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-drop again before dragging finishes',
                    computedDrag        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'dropping', // Still in original dropping sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final dropping to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedEvent        : 'dropped', // No running animation.
                },
            ],
        },
    ] as DragStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentDragged         : boolean | 'auto' | undefined = initialDragged;
            let currentComputedDrag : boolean | null          | undefined = initialComputedDrag;
            
            
            
            // Handlers:
            let lastNewDrag : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleDragUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newDrag, event) => {
                lastNewDrag = newDrag;
                lastEvent = event;
            };
            
            let lastDragPhase : DragPhase | null = null;
            const handleDraggingStart : ValueChangeEventHandler<DragPhase, unknown> = (dragPhase) => {
                expect(dragPhase).toBe('dragging');
                lastDragPhase = dragPhase;
            };
            const handleDraggingEnd : ValueChangeEventHandler<DragPhase, unknown> = (dragPhase) => {
                expect(dragPhase).toBe('dragged');
                lastDragPhase = dragPhase;
            };
            const handleDroppingStart : ValueChangeEventHandler<DragPhase, unknown> = (dragPhase) => {
                expect(dragPhase).toBe('dropping');
                lastDragPhase = dragPhase;
            };
            const handleDroppingEnd : ValueChangeEventHandler<DragPhase, unknown> = (dragPhase) => {
                expect(dragPhase).toBe('dropped');
                lastDragPhase = dragPhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <DragStateTest
                    dragged={currentDragged}
                    computedDrag={currentComputedDrag}
                    
                    onDragUpdate={handleDragUpdate}
                    
                    onDraggingStart={handleDraggingStart}
                    onDraggingEnd={handleDraggingEnd}
                    onDroppingStart={handleDroppingStart}
                    onDroppingEnd={handleDroppingEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('drag-state-test');
            await expect(box).toContainText('Drag State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, dragged, computedDrag, delay, expectedEvent} of updates) {
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
                        
                        onDragUpdate={handleDragUpdate}
                        
                        onDraggingStart={handleDraggingStart}
                        onDraggingEnd={handleDraggingEnd}
                        onDroppingStart={handleDroppingStart}
                        onDroppingEnd={handleDroppingEnd}
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
                if (expectedEvent !== undefined) {
                    expect(lastDragPhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
