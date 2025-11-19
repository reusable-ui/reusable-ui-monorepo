import React, { type AnimationEventHandler } from 'react'
import { test, expect } from '@playwright/experimental-ct-react';
import { HoverStateTest } from './HoverStateTest.js';
import { ValueChangeEventHandler } from '@reusable-ui/events';



/**
 * Represents a single test scenario for validating hover state transitions.
 */
interface HoverStateAnimationTestCase {
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
         * The expected presence of running hover animation after the delay.
         * - `true`      : there is a running hovering animation
         * - `false`     : there is a running unhovering animation
         * - `0`         : there is no running hover animation
         * - `undefined` : nothing to expect
         */
        expectedRunningHover ?: boolean | 0
        
        /**
         * The expected outline style of the hoverable element.
         * - `string`    : expected outline style`
         * - `undefined` : nothing to expect
         */
        expectedOutline      ?: string
    }[]
}



const OUTLINE_HOVERED   = 'rgb(0, 0, 255) solid 2px'
const OUTLINE_UNHOVERED = 'rgb(0, 0, 0) solid 0px';



test.describe('useHoverBehaviorState - animation', () => {
    for (const { title, hovered : initialHovered, computedHover: initialComputedHover, updates } of [
        /*
            The timing precision is quite bad, up to ± 200 ms of inaccuracy.
            To check the existance of the animation,
            please do it between +200 ms after the expected starts and -200 ms before the expected ends.
        */
        {
            title         : 'No running hover animation in all time for initially hovered',
            hovered       : true,
            computedHover : undefined,
            updates       : [
                {
                    title                : 'Initially no running animation',
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_HOVERED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 200,
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_HOVERED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_HOVERED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_HOVERED,
                },
            ],
        },
        {
            title         : 'No running hover animation in all time for initially unhovered',
            hovered       : false,
            computedHover : undefined,
            updates       : [
                {
                    title                : 'Initially no running animation',
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 200,
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
                {
                    title                : 'Still no running animation',
                    
                    delay                : 1000,
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
            ],
        },
        {
            title         : 'Hovered state after update (unhovered => hovered)',
            hovered       : false,
            updates       : [
                {
                    title                : 'Initially unhovered',
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
                {
                    title                : 'Set hovered to true (immediate)',
                    hovered              : true, // The animation duration is 1000 ms.
                    
                    delay                : 200, // Give a brief time to start the animation.
                    expectedRunningHover : true,
                },
                {
                    title                : 'Still have running animation',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningHover : true,
                },
                {
                    title                : 'Wait for hovering animation to finish',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_HOVERED,
                },
            ],
        },
        {
            title         : 'Unhovered state after update (hovered => unhovered)',
            hovered       : true,
            updates       : [
                {
                    title                : 'Initially hovered',
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_HOVERED,
                },
                {
                    title                : 'Set hovered to false (immediate)',
                    hovered              : false, // The animation duration is 1000 ms.
                    
                    delay                : 200, // Give a brief time to start the animation.
                    expectedRunningHover : false,
                },
                {
                    title                : 'Still have running animation',
                    
                    delay                : 500, // 200 + 500 = 700 ms, the animation should still running.
                    expectedRunningHover : false,
                },
                {
                    title                : 'Wait for unhovering animation to finish',
                    
                    delay                : 500,  // 200 + 500 + 500 = 1200 ms, the animation should have stopped 200 ms ago.
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
            ],
        },
        {
            title         : 'Hover, unhover, and re-hover quickly',
            hovered       : false,
            updates       : [
                {
                    title                : 'Initially unhovered',
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
                {
                    title                : 'Hover',
                    hovered              : true,
                    
                    delay                : 200,
                    expectedRunningHover : true,
                },
                {
                    title                : 'Unhover before hovering finishes',
                    hovered              : false,
                    
                    delay                : 200,
                    expectedRunningHover : true,  // Still hovering (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-hover again before unhovering finishes',
                    hovered              : true,
                    
                    delay                : 200,
                    expectedRunningHover : true, // Still in original hovering sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final hovering to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedRunningHover : 0, // No running animation.
                    expectedOutline      : OUTLINE_HOVERED,
                },
            ],
        },
        {
            title         : 'Unhover, hover, and re-unhover quickly',
            hovered       : true,
            updates       : [
                {
                    title                : 'Initially hovered',
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_HOVERED,
                },
                {
                    title                : 'Unhover',
                    hovered              : false,
                    
                    delay                : 200,
                    expectedRunningHover : false,
                },
                {
                    title                : 'Hover before unhovering finishes',
                    hovered              : true,
                    
                    delay                : 200,
                    expectedRunningHover : false,  // Still unhovering (600ms remaining) — cannot cancel mid-flight.
                },
                {
                    title                : 'Re-unhover again before hovering finishes',
                    hovered              : false,
                    
                    delay                : 200,
                    expectedRunningHover : false, // Still in original unhovering sequence (400ms remaining).
                },
                {
                    title                : 'Wait for final unhovering to complete',
                    
                    delay                : 600, // Includes additional margin to guarantee completion.
                    expectedRunningHover : 0, // No running animation.
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
            ],
        },
        {
            title         : 'Repeated hovering does not restart animation',
            hovered       : false,
            updates       : [
                {
                    title                : 'Initially unhovered',
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
                {
                    title                : 'Hover (first time)',
                    hovered              : true,
                    delay                : 200,
                    expectedRunningHover : true,
                },
                {
                    title                : 'Set hovered to true again (no change)',
                    hovered              : true,
                    delay                : 200,
                    expectedRunningHover : true, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                : 'Wait for final animation to finish',
                    delay                : 800, // Includes additional margin to guarantee completion.
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_HOVERED,
                },
            ],
        },
        {
            title         : 'Repeated unhovering does not restart animation',
            hovered       : true,
            updates       : [
                {
                    title                : 'Initially hovered',
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_HOVERED,
                },
                {
                    title                : 'Unhover (first time)',
                    hovered              : false,
                    delay                : 200,
                    expectedRunningHover : false,
                },
                {
                    title                : 'Set hovered to false again (no change)',
                    hovered              : false,
                    delay                : 200,
                    expectedRunningHover : false, // Continues original animation, no reset (800ms remaining).
                },
                {
                    title                : 'Wait for final animation to finish',
                    delay                : 800, // Includes additional margin to guarantee completion.
                    expectedRunningHover : 0,
                    expectedOutline      : OUTLINE_UNHOVERED,
                },
            ],
        },
    ] as HoverStateAnimationTestCase[]) {
        test(title, async ({ mount }) => {
            // States:
            let currentHovered         : boolean | 'auto' | undefined = initialHovered;
            let currentComputedHover : boolean | null          | undefined = initialComputedHover;
            
            
            
            // Stores currently hover animation names:
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
            
            let lastNewHover : boolean | null | undefined = undefined;
            let lastEvent       : unknown | undefined = undefined;
            const handleHoverUpdate : ValueChangeEventHandler<boolean | null, unknown> = (newHover, event) => {
                lastNewHover = newHover;
                lastEvent = event;
            };
            
            
            
            // First render:
            const component = await mount(
                <HoverStateTest
                    hovered={currentHovered}
                    computedHover={currentComputedHover}
                    
                    onAnimationStart={handleAnimationStart}
                    onAnimationEnd={handleAnimationEnd}
                    
                    onHoverUpdate={handleHoverUpdate}
                />
            );
            
            
            
            // Ensure the component is rendered correctly:
            const box = component.getByTestId('hover-state-test');
            await expect(box).toContainText('Hover State Test');
            
            
            
            // Apply update scenarios:
            for (const { title, hovered, computedHover, delay, expectedRunningHover, expectedOutline} of updates) {
                console.log(`[Subtest] ${title}`);
                
                
                
                // Update props:
                if (hovered !== undefined) currentHovered = hovered;
                if (computedHover !== undefined) currentComputedHover = computedHover;
                
                
                
                // Re-render:
                await component.update(
                    <HoverStateTest
                        hovered={currentHovered}
                        computedHover={currentComputedHover}
                        
                        onAnimationStart={handleAnimationStart}
                        onAnimationEnd={handleAnimationEnd}
                        
                        onHoverUpdate={handleHoverUpdate}
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
                if (expectedRunningHover!== undefined) {
                    if (computedHover === undefined) {
                        // Wait for brief moment to ensure the events are captured:
                        await new Promise<void>((resolve) => {
                            setTimeout(resolve, 20);
                        });
                    } // if
                    console.log(`${(performance.now() / 1000).toFixed(2)} expect running hover-state: `, expectedRunningHover);
                    
                    switch (expectedRunningHover) {
                        case true:
                            expect(runningAnimations.has('boo-test-hovering')).toBe(true);
                            expect(runningAnimations.has('boo-test-unhovering')).toBe(false);
                            break;
                        case false:
                            expect(runningAnimations.has('boo-test-hovering')).toBe(false);
                            expect(runningAnimations.has('boo-test-unhovering')).toBe(true);
                            break;
                        case 0:
                            expect(runningAnimations.has('boo-test-hovering')).toBe(false);
                            expect(runningAnimations.has('boo-test-unhovering')).toBe(false);
                            break;
                    } // switch
                } // if
                
                if (expectedOutline !== undefined) {
                    const actualOutline = await box.evaluate((el) => window.getComputedStyle(el).outline);
                    expect(actualOutline).toBe((expectedOutline));
                } // if
            } // for
        });
    } // for
});
