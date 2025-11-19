import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { HoverStateTest } from './HoverStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';
import { HoverPhase } from '../dist/index.js'



/**
 * Represents a single test scenario for validating event of hover state transitions.
 */
interface HoverStateEventTestCase {
    // Test Inputs:
    
    /**
     * A human-readable description of the overall test case.
     */
    title          : string
    
    /**
     * Initial hover state.
     * - `true`   : hovered
     * - `false`  : unhovered
     * - `'auto'` : automatic determine
     */
    hovered        : boolean | 'auto'
    
    /**
     * Initial computed hover state.
     * - `true`      : hovered
     * - `false`     : unhovered
     * - `undefined` : use default behavior.
     */
    computedHover ?: boolean
    
    /**
     * A sequence of updates applied to the hover state, including expected outcomes.
     */
    updates        : {
        // Test Inputs:
        
        /**
         * A descriptive label for the individual update step.
         */
        title                 : string
        
        /**
         * New value for hover state.
         * Set to `undefined` to skip updating this part.
         */
        hovered              ?: boolean | 'auto'
        
        /**
         * New value computed hover state.
         * - `true`      : hovered
         * - `false`     : unhovered
         * - `undefined` : skip updating this part.
         */
        computedHover        ?: boolean
        
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
         * The expected hover state.
         * - `'hovering'`   : onHoveringStart event has been invoked
         * - `'hovered'`    : onHoveringEnd event has been invoked
         * - `'unhovering'` : onUnhoveringStart event has been invoked
         * - `'unhovered'`  : onUnhoveringEnd event has been invoked
         * - `null`         : no event has been invoked
         * - `undefined`    : nothing to expect
         */
        expectedEvent        ?: HoverPhase | null
    }[]
}



test.describe('useHoverStatePhaseEvents', () => {
    for (const { title, hovered : initialHovered, computedHover: initialComputedHover, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'Should be respond to change from unhovered to hovered',
            hovered       : 'auto',
            computedHover : false,
            updates       : [
                {
                    title                : 'Should be unhovered and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to hovered',
                    computedHover        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 200,
                    expectedEvent        : 'hovering',
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'hovering',
                },
                {
                    title                : 'The hovering animation should be stopped and the hover-state is still hovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'hovered',
                },
            ],
        },
        {
            title         : 'Should be respond to change from hovered to unhovered',
            hovered       : 'auto',
            computedHover : true,
            updates       : [
                {
                    title                : 'Should be hovered and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to unhovered',
                    computedHover        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 200,
                    expectedEvent        : 'unhovering',
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'unhovering',
                },
                {
                    title                : 'The hovering animation should be stopped and the hover-state is still unhovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'unhovered',
                },
            ],
        },
        {
            title         : 'Should be respond to change from unhovered to hovered then unhovered',
            hovered       : 'auto',
            computedHover : false,
            updates       : [
                {
                    title                : 'Should be unhovered and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to hovered',
                    computedHover        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 200,
                    expectedEvent        : 'hovering',
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'hovering',
                },
                {
                    title                : 'The hovering animation should be stopped and the hover-state is still hovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'hovered',
                },
                {
                    title                : 'Change to unhovered',
                    computedHover        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 200,
                    expectedEvent        : 'unhovering',
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'unhovering',
                },
                {
                    title                : 'The unhovering animation should be stopped and the hover-state is still unhovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'unhovered',
                },
            ],
        },
        {
            title         : 'Should be respond to change from hovered to unhovered then hovered',
            hovered       : 'auto',
            computedHover : true,
            updates       : [
                {
                    title                : 'Should be hovered and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Change to unhovered',
                    computedHover        : false,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 200,
                    expectedEvent        : 'unhovering',
                },
                {
                    title                : 'The unhovering animation should be running and the hover-state is still unhovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'unhovering',
                },
                {
                    title                : 'The unhovering animation should be stopped and the hover-state is still unhovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'unhovered',
                },
                {
                    title                : 'Change to hovered',
                    computedHover        : true,
                    
                    delay                : 0, // wait for async process
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 200,
                    expectedEvent        : 'hovering',
                },
                {
                    title                : 'The hovering animation should be running and the hover-state is still hovered',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedEvent        : 'hovering',
                },
                {
                    title                : 'The hovering animation should be stopped and the hover-state is still hovered',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedEvent        : 'hovered',
                },
            ],
        },
        {
            title         : 'Should be respond to hover, unhover, and re-hover quickly',
            hovered       : 'auto',
            computedHover : false,
            updates       : [
                {
                    title                : 'Should be unhovered and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Hover',
                    computedHover        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'hovering',
                },
                {
                    title                : 'Unhover before hovering finishes',
                    computedHover        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'hovering',  // Still hovering (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-hover again before unhovering finishes',
                    computedHover        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'hovering', // Still in original hovering sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final hovering to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedEvent        : 'hovered', // No running animation.
                },
            ],
        },
        {
            title         : 'Should be respond to unhover, hover, and re-unhover quickly',
            hovered       : 'auto',
            computedHover : true,
            updates       : [
                {
                    title                : 'Should be hovered and no animation',
                    expectedEvent        : null,
                },
                {
                    title                : 'Unhover',
                    computedHover        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'unhovering',
                },
                {
                    title                : 'Hover before unhovering finishes',
                    computedHover        : true,
                    
                    delay                : 200,
                    expectedEvent        : 'unhovering',  // Still unhovering (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-unhover again before hovering finishes',
                    computedHover        : false,
                    
                    delay                : 200,
                    expectedEvent        : 'unhovering', // Still in original unhovering sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final unhovering to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedEvent        : 'unhovered', // No running animation.
                },
            ],
        },
    ] as HoverStateEventTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentHovered         : boolean | 'auto' | undefined = initialHovered;
            let currentComputedHover : boolean | null          | undefined = initialComputedHover;
            
            
            
            // Handlers:
            let lastNewHover : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleHoverUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newHover, event) => {
                lastNewHover = newHover;
                lastEvent = event;
            };
            
            let lastHoverPhase : HoverPhase | null = null;
            const handleHoveringStart : ValueChangeEventHandler<HoverPhase, unknown> = (hoverPhase) => {
                expect(hoverPhase).toBe('hovering');
                lastHoverPhase = hoverPhase;
            };
            const handleHoveringEnd : ValueChangeEventHandler<HoverPhase, unknown> = (hoverPhase) => {
                expect(hoverPhase).toBe('hovered');
                lastHoverPhase = hoverPhase;
            };
            const handleUnhoveringStart : ValueChangeEventHandler<HoverPhase, unknown> = (hoverPhase) => {
                expect(hoverPhase).toBe('unhovering');
                lastHoverPhase = hoverPhase;
            };
            const handleUnhoveringEnd : ValueChangeEventHandler<HoverPhase, unknown> = (hoverPhase) => {
                expect(hoverPhase).toBe('unhovered');
                lastHoverPhase = hoverPhase;
            };
            
            
            
            // First render:
            const component = await mount(
                <HoverStateTest
                    hovered={currentHovered}
                    computedHover={currentComputedHover}
                    
                    onHoverUpdate={handleHoverUpdate}
                    
                    onHoveringStart={handleHoveringStart}
                    onHoveringEnd={handleHoveringEnd}
                    onUnhoveringStart={handleUnhoveringStart}
                    onUnhoveringEnd={handleUnhoveringEnd}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('hover-state-test');
            await expect(box).toContainText('Hover State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, hovered, computedHover, delay, expectedEvent} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (hovered !== undefined) currentHovered = hovered;
                if (computedHover !== undefined) currentComputedHover = computedHover;
                
                
                
                // Reset the last received values:
                lastNewHover = undefined;
                lastEvent = undefined;
                
                
                
                // Re-render:
                await component.update(
                    <HoverStateTest
                        hovered={currentHovered}
                        computedHover={currentComputedHover}
                        
                        onHoverUpdate={handleHoverUpdate}
                        
                        onHoveringStart={handleHoveringStart}
                        onHoveringEnd={handleHoveringEnd}
                        onUnhoveringStart={handleUnhoveringStart}
                        onUnhoveringEnd={handleUnhoveringEnd}
                    />
                );
                
                
                
                // Validate events:
                if (computedHover !== undefined) {
                    // Wait for brief moment to ensure the events are captured:
                    await new Promise<void>((resolve) => {
                        setTimeout(resolve, 20);
                    });
                    
                    // Ensure the change handler was called with correct parameters:
                    expect(lastNewHover).toBe(computedHover);
                    expect((lastEvent as any)?.type).toBe(undefined);
                } // if
                
                
                
                // Ensure the component is rendered correctly:
                const box = component.getByTestId('hover-state-test');
                await expect(box).toContainText('Hover State Test');
                
                
                
                // Wait for the specified delay:
                if (delay !== undefined) {
                    await new Promise((resolve) => {
                        setTimeout(resolve, delay);
                    });
                } // if
                
                
                
                // Verify the expected values:
                if (expectedEvent !== undefined) {
                    expect(lastHoverPhase).toBe(expectedEvent);
                } // if
            } // for
        });
    } // for
});
